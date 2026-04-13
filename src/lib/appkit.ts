import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export const hasAppKit = false;
export const appKitModal = null;

export const wagmiConfig = createConfig({
    chains: [sepolia, mainnet],
    connectors: [injected()],
    transports: {
        [sepolia.id]: http("https://ethereum-sepolia-rpc.publicnode.com"),
        [mainnet.id]: http("https://ethereum-rpc.publicnode.com"),
    },
});

/** V5 factory addresses (historical — read-only fallback) */
export const SHIELD_FACTORY_ADDRESSES: Record<number, string> = {
    11155111: "",
    1: "",
};

/** V6 factory addresses */
export const SHIELD_FACTORY_V6_ADDRESSES: Record<number, string> = {
    11155111: "0xeaa722e996888b662E71aBf63d08729c6B6802F4",
    1: "",
};

export const SUPPORTED_CHAIN_IDS = [11155111, 1];
