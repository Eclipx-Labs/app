import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

function getFiles(dir, base) {
  if (!base) base = dir;
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...getFiles(full, base));
    else {
      const rel = path.relative(base, full);
      if (!rel.endsWith('.map')) out.push({ full, rel });
    }
  }
  return out;
}

const jwt = process.env.PINATA_JWT;
const sha = (process.env.COMMIT_SHA || 'unknown').slice(0, 7);
const folder = 'qryptum-hub-' + sha;

// --- 1. Delete old pins ---
console.log('Fetching existing pins to clean up...');
const listRes = await fetch('https://api.pinata.cloud/pinning/pinList?status=pinned&pageLimit=1000', {
  headers: { Authorization: 'Bearer ' + jwt },
});
const listData = await listRes.json();
const oldPins = (listData.rows || []).filter(p => p.metadata?.name?.startsWith('qryptum-hub-'));
console.log('Old pins to delete:', oldPins.length);
for (const pin of oldPins) {
  const delRes = await fetch('https://api.pinata.cloud/pinning/unpin/' + pin.ipfs_pin_hash, {
    method: 'DELETE',
    headers: { Authorization: 'Bearer ' + jwt },
  });
  console.log('Deleted', pin.ipfs_pin_hash, '->', delRes.status);
}

// --- 2. Upload new bundle ---
const entries = getFiles('./dist');
let totalBytes = 0;
const data = new FormData();
for (const { full, rel } of entries) {
  const bytes = fs.readFileSync(full);
  totalBytes += bytes.length;
  const filePath = folder + '/' + rel;
  data.append('file', new File([bytes], filePath), filePath);
}
data.append('pinataMetadata', JSON.stringify({ name: folder }));
data.append('pinataOptions', JSON.stringify({ cidVersion: 1 }));

console.log('Files  :', entries.length, '(source maps excluded)');
console.log('Size   :', (totalBytes / 1024 / 1024).toFixed(2), 'MB');
console.log('Uploading to Pinata...');

const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
  method: 'POST',
  headers: { Authorization: 'Bearer ' + jwt, Source: 'sdk/fileArray' },
  body: data,
});
const text = await res.text();
console.log('HTTP   :', res.status);

let result;
try { result = JSON.parse(text); }
catch { console.error('Bad response:', text.slice(0, 500)); process.exit(1); }

if (!result.IpfsHash) {
  console.error('Pinata error:', JSON.stringify(result));
  process.exit(1);
}

const cid = result.IpfsHash;
console.log('');
console.log('===== IPFS Upload Success =====');
console.log('CID    :', cid);
console.log('ipfs://' + cid);
console.log('===============================');

// --- 3. Update ENS contenthash ---
if (process.env.ENS_PRIVATE_KEY && process.env.MAINNET_RPC_URL) {
  console.log('\nUpdating ENS contenthash for qryptum.eth...');
  try {
    const { ethers } = await import('ethers');
    const require = createRequire(import.meta.url);
    const contentHash = require('@ensdomains/content-hash');

    const privateKey = process.env.ENS_PRIVATE_KEY.startsWith('0x')
      ? process.env.ENS_PRIVATE_KEY
      : '0x' + process.env.ENS_PRIVATE_KEY;

    const provider = new ethers.JsonRpcProvider(process.env.MAINNET_RPC_URL);
    const wallet = new ethers.Wallet(privateKey, provider);
    console.log('Operator wallet:', wallet.address);

    const ENS_REGISTRY = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e';
    const registry = new ethers.Contract(
      ENS_REGISTRY,
      ['function resolver(bytes32 node) view returns (address)'],
      provider
    );

    const node = ethers.namehash('qryptum.eth');
    const resolverAddr = await registry.resolver(node);
    console.log('Resolver:', resolverAddr);

    const resolver = new ethers.Contract(
      resolverAddr,
      ['function setContenthash(bytes32 node, bytes calldata hash) external'],
      wallet
    );

    const encoded = '0x' + contentHash.encode('ipfs', cid);
    const tx = await resolver.setContenthash(node, encoded);
    console.log('TX sent:', tx.hash);
    const receipt = await tx.wait();
    console.log('ENS contenthash updated! Block:', receipt.blockNumber);
    console.log('qryptum.eth now points to ipfs://' + cid);
  } catch (err) {
    console.error('ENS update failed (non-fatal):', err.message);
  }
} else {
  console.log('Skipping ENS update - secrets not configured');
}

const summary = [
  '## IPFS Deploy - Qryptum Hub',
  '',
  '| | |',
  '|---|---|',
  '| **CID** | `' + cid + '` |',
  '| **Commit** | `' + sha + '` |',
  '| **IPFS** | ipfs://' + cid + ' |',
  '| **eth.limo** | https://qryptum.eth.limo |',
  '',
  '### Sub-paths',
  '| Path | App |',
  '|---|---|',
  '| `/` | Landing Hub |',
  '| `/app` | ShieldTransfer dApp |',
  '| `/qryptair` | QryptAir PWA |',
  '| `/docs` | Docs |',
  '| `/site` | Site |',
].join('\n');

fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary);
