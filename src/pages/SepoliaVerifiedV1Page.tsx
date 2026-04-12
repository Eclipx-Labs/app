import { useState } from "react";
import SharedNavBar from "@/components/SharedNavBar";
import { Link } from "wouter";

const FACTORY_V1  = "0xd05F4fb3f24C7bF0cb482123186CF797E42CF17A";
const IMPL_V1     = "0x5E398e1E0Ba28f9659013B1212f24b8B43d69393";
const TX_DEPLOY   = "0xf240a2beec5303a6d83fdd8abfc585b608bb51bacb6185d11564cd98e4a4aeb5";

const ETHERSCAN = "https://sepolia.etherscan.io";
const PASS = "#22C55E";

const short = (v: string, h = 8, t = 6) => `${v.slice(0, h)}...${v.slice(-t)}`;

function CopySpan({ value, display }: { value: string; display?: string }) {
    const [ok, setOk] = useState(false);
    const copy = () => {
        navigator.clipboard.writeText(value).then(() => {
            setOk(true);
            setTimeout(() => setOk(false), 1600);
        });
    };
    return (
        <span
            onClick={copy}
            title="Click to copy"
            style={{
                fontFamily: "'JetBrains Mono','Courier New',monospace",
                fontSize: 12,
                color: "rgba(255,255,255,0.65)",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: 6,
                padding: "3px 10px",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
            }}
        >
            {display ?? value}
            {ok
                ? <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={PASS} strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                : <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
            }
        </span>
    );
}

function ExtLink({ href, label }: { href: string; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
                color: "rgba(255,255,255,0.45)",
                fontSize: 12,
                fontFamily: "'Inter',sans-serif",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                borderBottom: "1px solid rgba(255,255,255,0.15)",
                paddingBottom: 1,
            }}
        >
            {label}
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
        </a>
    );
}

function Row({ label, addr, tx }: { label: string; addr?: string; tx?: string }) {
    const val = addr || tx || "";
    const link = tx
        ? `${ETHERSCAN}/tx/${val}`
        : `${ETHERSCAN}/address/${val}#code`;
    return (
        <div style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 16,
            padding: "14px 0",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            flexWrap: "wrap",
        }}>
            <span style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: 11,
                fontWeight: 600,
                color: "rgba(255,255,255,0.35)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                width: 180,
                flexShrink: 0,
                paddingTop: 2,
            }}>
                {label}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                {val
                    ? <>
                        <CopySpan value={val} display={short(val)} />
                        <ExtLink href={link} label="Etherscan" />
                      </>
                    : <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.2)", fontStyle: "italic" }}>
                        Pending
                      </span>
                }
            </div>
        </div>
    );
}

/* ── Genesis Art: 12-block grid (one per test) ──────────────────── */
function GenesisGrid() {
    const tests = [
        "Factory deployment",
        "Salt verification",
        "Vault creation",
        "hasVault lookup",
        "Duplicate vault reject",
        "Shield ERC-20",
        "18-decimal bug confirmed",
        "Unshield ERC-20",
        "Wrong password: shield",
        "Wrong password: unshield",
        "Non-owner blocked",
        "Pause blocks creation",
    ];

    return (
        <svg viewBox="0 0 320 160" style={{ width: "100%", height: "100%", display: "block" }}>
            {tests.map((label, i) => {
                const col = i % 4;
                const row = Math.floor(i / 4);
                const x = col * 80 + 8;
                const y = row * 52 + 8;
                return (
                    <g key={i}>
                        <rect
                            x={x} y={y} width={66} height={40} rx={5}
                            fill="rgba(255,255,255,0.03)"
                            stroke="rgba(255,255,255,0.08)"
                            strokeWidth="0.8"
                        />
                        <text
                            x={x + 6} y={y + 12}
                            fontFamily="'JetBrains Mono',monospace"
                            fontSize="7"
                            fill="rgba(255,255,255,0.25)"
                        >
                            {String(i + 1).padStart(2, "0")}
                        </text>
                        <circle cx={x + 56} cy={y + 10} r={4} fill="none" stroke={PASS} strokeWidth="1.2" strokeOpacity={0.8} />
                        <path
                            d={`M${x + 53} ${y + 10} L${x + 55.5} ${y + 12.5} L${x + 59} ${y + 8}`}
                            fill="none" stroke={PASS} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" strokeOpacity={0.9}
                        />
                        <text
                            x={x + 6} y={y + 32}
                            fontFamily="'Inter',sans-serif"
                            fontSize="5.5"
                            fill="rgba(255,255,255,0.22)"
                        >
                            {label.length > 18 ? label.slice(0, 17) + "." : label}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}

/* ── Page ─────────────────────────────────────────────────────────── */
export default function SepoliaVerifiedV1Page() {
    return (
        <div style={{ minHeight: "100vh", background: "#000", color: "#fff", fontFamily: "'Inter',sans-serif" }}>
            <SharedNavBar />

            <div style={{ maxWidth: 780, margin: "0 auto", padding: "64px 24px 80px" }}>

                {/* Breadcrumb */}
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 32 }}>
                    <Link href="/" style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, textDecoration: "none" }}>Home</Link>
                    <span style={{ color: "rgba(255,255,255,0.18)", fontSize: 12 }}>/</span>
                    <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}>V1 Record</span>
                </div>

                {/* Header */}
                <div style={{ marginBottom: 40 }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
                        <span style={{
                            fontFamily: "'Inter',sans-serif",
                            fontSize: 10,
                            fontWeight: 700,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.4)",
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: 4,
                            padding: "3px 10px",
                        }}>
                            V1 Historical
                        </span>
                        <span style={{
                            fontFamily: "'Inter',sans-serif",
                            fontSize: 10,
                            fontWeight: 700,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: "#EF4444",
                            background: "rgba(239,68,68,0.08)",
                            border: "1px solid rgba(239,68,68,0.2)",
                            borderRadius: 4,
                            padding: "3px 10px",
                        }}>
                            Superseded
                        </span>
                    </div>
                    <h1 style={{
                        fontSize: "clamp(28px, 5vw, 44px)",
                        fontWeight: 900,
                        letterSpacing: "-0.03em",
                        lineHeight: 1.05,
                        color: "#fff",
                        margin: "0 0 14px",
                    }}>
                        QryptSafe V1
                    </h1>
                    <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, maxWidth: 560, margin: 0 }}>
                        First deployment from clean wallet. Factory has owner + pause controls (removed in V3).
                        ShieldToken hardcoded 18 decimals: USDC-backed qTokens displayed incorrect amounts in Etherscan.
                        Superseded by V2.
                    </p>
                </div>

                {/* Stats row */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                    gap: 1,
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: 12,
                    overflow: "hidden",
                    marginBottom: 40,
                    border: "1px solid rgba(255,255,255,0.07)",
                }}>
                    {[
                        { val: "12 / 12", sub: "Tests passing" },
                        { val: "EIP-1167", sub: "Clone pattern" },
                        { val: "Ownable", sub: "Admin keys (V1)" },
                        { val: "18 dec", sub: "qToken bug (fixed V2)" },
                    ].map(({ val, sub }) => (
                        <div key={sub} style={{ padding: "18px 20px", background: "rgba(0,0,0,0.5)" }}>
                            <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: 4 }}>{val}</div>
                            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.04em" }}>{sub}</div>
                        </div>
                    ))}
                </div>

                {/* Genesis grid art */}
                <div style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 14,
                    padding: "20px 16px",
                    marginBottom: 40,
                }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>
                            Test Record
                        </span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: PASS, letterSpacing: "0.06em" }}>
                            12 / 12 PASS
                        </span>
                    </div>
                    <div style={{ height: 165 }}>
                        <GenesisGrid />
                    </div>
                </div>

                {/* Contract addresses */}
                <div style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 14,
                    padding: "6px 24px 6px",
                    marginBottom: 32,
                }}>
                    <div style={{ padding: "14px 0 10px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>
                            Sepolia Contracts
                        </span>
                    </div>
                    <Row label="QryptSafeV1 (factory)" addr={FACTORY_V1} />
                    <Row label="PersonalQryptSafeV1 (impl)" addr={IMPL_V1} />
                    <Row label="Deploy TX" tx={TX_DEPLOY} />
                </div>

                {/* V1 known issue */}
                <div style={{
                    background: "rgba(239,68,68,0.04)",
                    border: "1px solid rgba(239,68,68,0.12)",
                    borderRadius: 12,
                    padding: "18px 22px",
                    marginBottom: 32,
                }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#EF4444", textTransform: "uppercase", marginBottom: 8 }}>
                        Known Issue
                    </div>
                    <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                        ShieldTokenV1 always returns 18 decimals. USDC (6 decimals) backed qTokens
                        read as 0.000000000001 instead of 1.0 in Etherscan token trackers.
                        On-chain balances are stored correctly. Fixed in V2 by reading decimals()
                        from the underlying ERC-20 at deploy time.
                    </p>
                </div>

                {/* Nav */}
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <Link href="/" style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        fontFamily: "'Inter',sans-serif",
                        fontWeight: 600,
                        fontSize: 13,
                        color: "rgba(255,255,255,0.4)",
                        textDecoration: "none",
                        padding: "10px 20px",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 9,
                    }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
                        Back to home
                    </Link>
                    <Link href="/sepolia-verified" style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        fontFamily: "'Inter',sans-serif",
                        fontWeight: 600,
                        fontSize: 13,
                        color: "rgba(255,255,255,0.4)",
                        textDecoration: "none",
                        padding: "10px 20px",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 9,
                    }}>
                        V2 Record
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}
