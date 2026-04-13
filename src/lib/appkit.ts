import { createConfig } from "wagmi";
import { sepolia, mainnet } from "wagmi/chains";
import { http } from "wagmi";
import { injected, metaMask } from "wagmi/connectors";

// Public RPCs — no API key needed
const SEPOLIA_RPC = "https://ethereum-sepolia-rpc.publicnode.com";
const MAINNET_RPC = "https://ethereum-rpc.publicnode.com";

export const hasAppKit = false;
export const appKitModal = null;

export const wagmiConfig = createConfig({
    chains: [sepolia, mainnet],
    connectors: [
        injected({ target: "metaMask" }),
        metaMask(),
        injected(),
    ],
    transports: {
        [sepolia.id]: http(SEPOLIA_RPC),
        [mainnet.id]: http(MAINNET_RPC),
    },
});

/** V5 factory addresses (historical reference only) */
export const SHIELD_FACTORY_ADDRESSES: Record<number, string> = {
    11155111: "",
    1: "",
};

/** V6 factory addresses — hardcoded, no env var needed */
export const SHIELD_FACTORY_V6_ADDRESSES: Record<number, string> = {
    11155111: "0xeaa722e996888b662E71aBf63d08729c6B6802F4",
    1: "",
};

export const SUPPORTED_CHAIN_IDS = [11155111, 1];
