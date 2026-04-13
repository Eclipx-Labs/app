// GitHub Pages: no backend server — all functions return empty/no-op
// Blockchain reads (wagmi useReadContract) still work directly

export async function fetchVault(_walletAddress: string) {
    return null;
}

export async function registerVault(_data: {
    walletAddress: string;
    vaultContractAddress: string;
    networkId: number;
}) {
    return null;
}

export async function fetchTransactions(_walletAddress: string, _limit = 20, _offset = 0) {
    return [];
}

export interface PortfolioToken {
    address: string;
    symbol: string;
    name: string;
    decimals: number;
    balance: string;
}

export async function fetchPortfolio(_walletAddress: string, _chainId: number): Promise<PortfolioToken[]> {
    return [];
}

export async function broadcastUnshieldTx(params: {
    to: string;
    data: string;
    value?: string;
    chainId: number;
}): Promise<{ txHash: string; broadcaster: string }> {
    // No broadcaster on GitHub Pages — caller must use wallet directly
    throw Object.assign(new Error("Direct wallet required"), { fallback: true });
}

export async function recordTransaction(_data: {
    walletAddress: string;
    txHash: string;
    type: string;
    tokenAddress: string;
    tokenSymbol: string;
    tokenName: string;
    amount: string;
    fromAddress: string;
    toAddress?: string;
    networkId: number;
}) {
    return null;
}
