import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { createAppKit } from "@reown/appkit";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

const _apiBase = (import.meta.env.VITE_API_BASE as string | undefined)?.replace(/\/$/, "");
const _railwayBase = _apiBase ? `${_apiBase}/api` : null;

function rpcUrl(chainId: number): string {
    if (_railwayBase) return `${_railwayBase}/rpc/${chainId}`;
    return chainId === 1
        ? "https://ethereum-rpc.publicnode.com"
        : "https://ethereum-sepolia-rpc.publicnode.com";
}

const _defaultConfig = createConfig({
    chains: [sepolia, mainnet],
    connectors: [injected()],
    transports: {
        [sepolia.id]: http(rpcUrl(sepolia.id)),
        [mainnet.id]: http(rpcUrl(mainnet.id)),
    },
});

export let wagmiConfig: ReturnType<typeof createConfig> = _defaultConfig;
export let hasAppKit = false;
export let appKitModal: any = null;

export async function initAppKit(projectId: string): Promise<void> {
    try {
        const networks = [sepolia, mainnet] as [any, any];
        const adapter = new WagmiAdapter({
            networks,
            projectId,
            transports: {
                [sepolia.id]: http(rpcUrl(sepolia.id)),
                [mainnet.id]: http(rpcUrl(mainnet.id)),
            },
        });
        const modal = createAppKit({
            adapters: [adapter],
            networks,
            projectId,
            metadata: {
                name: "Qryptum",
                description: "Privacy-first DeFi protocol on Ethereum",
                url: "https://qryptum.eth.limo",
                icons: [`${window.location.origin}${import.meta.env.BASE_URL}qryptum-logo.png`],
            },
            features: { analytics: false },
        });
        wagmiConfig = adapter.wagmiConfig;
        appKitModal = modal;
        hasAppKit = true;
    } catch (e) {
        console.warn("[AppKit] init failed, falling back to injected only:", e);
    }
}

export const SHIELD_FACTORY_ADDRESSES: Record<number, string> = {
    11155111: "",
    1: "",
};

export const SHIELD_FACTORY_V6_ADDRESSES: Record<number, string> = {
    11155111: "0xeaa722e996888b662E71aBf63d08729c6B6802F4",
    1:        "0xE3583f8cA00Edf89A00d9D8c46AE456487a4C56f",
};

export const SUPPORTED_CHAIN_IDS = [11155111, 1];
