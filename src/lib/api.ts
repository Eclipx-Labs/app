// GitHub Pages: no backend — all functions return empty/no-op results
// Blockchain reads (wagmi useReadContract) still work directly

export async function fetchVault(_walletAddress: string): Promise<any> {
    return null;
}

export async function registerVault(_data: {
    walletAddress: string;
    vaultContractAddress: string;
    networkId: number;
}): Promise<any> {
    return null;
}

// Returns shape { transactions: [], total: 0 } to match server response shape
export async function fetchTransactions(
    _walletAddress: string,
    _limit = 20,
    _offset = 0
): Promise<{ transactions: any[]; total: number }> {
    return { transactions: [], total: 0 };
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

export async function broadcastUnshieldTx(_params: {
    to: string;
    data: string;
    value?: string;
    chainId: number;
}): Promise<{ txHash: string; broadcaster: string }> {
    // No broadcaster on GitHub Pages — caller must send via wallet
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
}): Promise<any> {
    return null;
}
