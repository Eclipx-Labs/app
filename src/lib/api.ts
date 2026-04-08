const BASE = `${import.meta.env.BASE_URL}api`;

export async function fetchVault(walletAddress: string) {
    const res = await fetch(`${BASE}/vaults/${walletAddress}`);
    if (res.status === 404) return null;
    if (!res.ok) throw new Error("Failed to fetch vault");
    return res.json();
}

export async function registerVault(data: {
    walletAddress: string;
    vaultContractAddress: string;
    networkId: number;
}) {
    const res = await fetch(`${BASE}/vaults`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to register vault");
    return res.json();
}

export async function fetchTransactions(walletAddress: string, limit = 20, offset = 0) {
    const res = await fetch(`${BASE}/transactions/${walletAddress}?limit=${limit}&offset=${offset}`);
    if (!res.ok) throw new Error("Failed to fetch transactions");
    return res.json();
}

export async function recordTransaction(data: {
    walletAddress: string;
    txHash: string;
    type: "shield" | "unshield" | "transfer";
    tokenAddress: string;
    tokenSymbol: string;
    tokenName: string;
    amount: string;
    fromAddress: string;
    toAddress?: string;
    networkId: number;
}) {
    const res = await fetch(`${BASE}/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to record transaction");
    return res.json();
}
