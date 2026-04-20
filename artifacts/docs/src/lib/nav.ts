import type { TranslationSet } from "./translations";

export interface NavItem {
    key: keyof TranslationSet["nav"]["items"];
    href: string;
}

export interface NavSection {
    key: keyof TranslationSet["nav"]["sections"];
    items: NavItem[];
}

export const NAV: NavSection[] = [
    {
        key: "introduction",
        items: [
            { key: "overview", href: "/introduction/overview" },
            { key: "whyQryptum", href: "/introduction/why-qryptum" },
            { key: "howItWorks", href: "/introduction/how-it-works" },
        ],
    },
    {
        key: "security",
        items: [
            { key: "securityModel", href: "/security/security-model" },
            { key: "nonCustodial", href: "/security/non-custodial" },
            { key: "tokenProtection", href: "/security/token-protection" },
            { key: "postQuantum", href: "/security/post-quantum" },
        ],
    },
    {
        key: "smartContracts",
        items: [
            { key: "shieldFactory", href: "/contracts/deployed-addresses" },
            { key: "personalVault", href: "/contracts/personal-vault" },
            { key: "qryptSafeV6", href: "/contracts/qrypt-safe-v6" },
            { key: "qryptSafeV5", href: "/contracts/qrypt-safe-v5" },
            { key: "qryptSafeV4", href: "/contracts/qrypt-safe-v4" },
            { key: "qryptSafeV3", href: "/contracts/qrypt-safe-v3" },
            { key: "qryptSafeV2", href: "/contracts/qrypt-safe-v2" },
            { key: "qryptSafeV1", href: "/contracts/qrypt-safe-v1" },
        ],
    },
    {
        key: "guide",
        items: [
            { key: "testnetGuide", href: "/guide/testnet" },
            { key: "mainnetGuide", href: "/guide/mainnet" },
        ],
    },
    {
        key: "devTestnet",
        items: [
            { key: "testnetQS", href: "/developer/testnet/quick-start" },
            { key: "testnetIntegration", href: "/developer/testnet/integration" },
            { key: "testnetAbi", href: "/developer/testnet/abi" },
        ],
    },
    {
        key: "devMainnet",
        items: [
            { key: "mainnetQS", href: "/developer/mainnet/quick-start" },
            { key: "mainnetIntegration", href: "/developer/mainnet/integration" },
            { key: "mainnetAbi", href: "/developer/mainnet/abi" },
        ],
    },
    {
        key: "devReference",
        items: [
            { key: "initFinalizeFlow", href: "/developer/init-finalize-flow" },
            { key: "apiReference", href: "/developer/api-reference" },
            { key: "joinTestnet", href: "/developer/join-testnet" },
        ],
    },
    {
        key: "roadmap",
        items: [
            { key: "roadmapPhase1", href: "/roadmap/phase-1" },
            { key: "roadmapPhase2", href: "/roadmap/phase-2" },
            { key: "roadmapPhase3", href: "/roadmap/phase-3" },
            { key: "roadmapPhase4", href: "/roadmap/phase-4" },
            { key: "roadmapPhase5", href: "/roadmap/phase-5" },
        ],
    },
    {
        key: "tokenomics",
        items: [
            { key: "tokenomics", href: "/tokenomics" },
        ],
    },
    {
        key: "faq",
        items: [
            { key: "faq", href: "/faq" },
        ],
    },
];

export function getAllItems(t: TranslationSet) {
    return NAV.flatMap((s) =>
        s.items.map((item) => ({
            title: t.nav.items[item.key],
            section: t.nav.sections[s.key],
            href: item.href,
        }))
    );
}
