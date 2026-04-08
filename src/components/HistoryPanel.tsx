import { useQuery } from "@tanstack/react-query";
import { HistoryIcon, ExternalLinkIcon, ShieldIcon, SendIcon, UnlockIcon } from "lucide-react";
import { fetchTransactions } from "@/lib/api";

interface HistoryPanelProps {
    walletAddress: string;
}

export default function HistoryPanel({ walletAddress }: HistoryPanelProps) {
    const { data, isLoading } = useQuery({
        queryKey: ["transactions", walletAddress],
        queryFn: () => fetchTransactions(walletAddress, 50, 0),
        enabled: !!walletAddress,
    });

    const transactions = data?.transactions || [];

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <HistoryIcon className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Transaction History</h2>
            </div>
            <p className="text-muted-foreground text-sm">
                All your Qryptum activity. Click the Etherscan link to view on-chain details.
            </p>

            {isLoading && (
                <div className="glass rounded-2xl p-8 text-center text-muted-foreground">
                    Loading transactions...
                </div>
            )}

            {!isLoading && transactions.length === 0 && (
                <div className="glass rounded-2xl p-8 text-center">
                    <HistoryIcon className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">No transactions yet. Shield some tokens to get started.</p>
                </div>
            )}

            <div className="space-y-3">
                {transactions.map((tx: Transaction) => (
                    <TxCard key={tx.id} tx={tx} />
                ))}
            </div>
        </div>
    );
}

interface Transaction {
    id: number;
    type: string;
    tokenSymbol: string;
    tokenName: string;
    amount: string;
    txHash: string;
    fromAddress: string;
    toAddress?: string;
    networkId: number;
    createdAt: string;
}

function TxCard({ tx }: { tx: Transaction }) {
    const icon = tx.type === "shield"
        ? <ShieldIcon className="w-4 h-4 text-primary" />
        : tx.type === "transfer"
            ? <SendIcon className="w-4 h-4 text-blue-400" />
            : <UnlockIcon className="w-4 h-4 text-yellow-400" />;

    const label = tx.type === "shield" ? "Shielded" : tx.type === "transfer" ? "Transferred" : "Unshielded";
    const color = tx.type === "shield" ? "text-primary" : tx.type === "transfer" ? "text-blue-400" : "text-yellow-400";

    const etherscanBase = tx.networkId === 11155111
        ? "https://sepolia.etherscan.io/tx/"
        : tx.networkId === 1
            ? "https://etherscan.io/tx/"
            : null;

    const date = new Date(tx.createdAt).toLocaleString();

    return (
        <div className="glass rounded-xl p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    {icon}
                </div>
                <div>
                    <p className={`text-sm font-medium ${color}`}>{label}</p>
                    <p className="text-foreground font-semibold">
                        {tx.amount} {tx.type === "shield" ? "" : "s"}{tx.tokenSymbol}
                    </p>
                    <p className="text-xs text-muted-foreground">{date}</p>
                </div>
            </div>

            {etherscanBase && (
                <a
                    href={etherscanBase + tx.txHash}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-primary hover:underline flex-shrink-0"
                >
                    Etherscan <ExternalLinkIcon className="w-3 h-3" />
                </a>
            )}
        </div>
    );
}
