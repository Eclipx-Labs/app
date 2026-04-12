import { useEffect, useState } from "react";
import SharedNavBar from "@/components/SharedNavBar";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

type SR2 = typeof translations.en.sepoliaRecord.v2;

const FACTORY_V2 = "0x26BAb8B6e88201ad4824ea1290a7C9c7b9B10fCf";
const IMPL_V2    = "0x675f70646713D4026612c673E644C61ae3aa7725";
const TX_DEPLOY  = "0x8e934988c40519d973ed2cdaf00a28ff0255448e2cfaf3c30101b5922ec26e30";
const ETHERSCAN  = "https://sepolia.etherscan.io";
const PASS       = "#22C55E";
const W          = 1200;
const GITHUB_TEST = "https://github.com/Qryptumorg/contracts/blob/main/test/QryptSafeV2.test.js";

const short = (v: string, h = 8, t = 6) => `${v.slice(0, h)}...${v.slice(-t)}`;

function CopySpan({ value, display }: { value: string; display?: string }) {
    const [ok, setOk] = useState(false);
    return (
        <span
            onClick={() => { navigator.clipboard.writeText(value).then(() => { setOk(true); setTimeout(() => setOk(false), 1600); }); }}
            title="Click to copy"
            style={{ fontFamily: "'JetBrains Mono','Courier New',monospace", fontSize: 12, color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 6, padding: "3px 9px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
            {display ?? value}
            {ok
                ? <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={PASS} strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                : <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>}
        </span>
    );
}

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer"
            style={{ color: "#627EEA", fontSize: 12, fontFamily: "'Inter',sans-serif", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.textDecoration = "underline"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.textDecoration = "none"; }}>
            {children}
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
        </a>
    );
}

function AddrRow({ label, value, link, verified }: { label: string; value: string; link: string; verified?: boolean }) {
    const isPending = value === "PENDING";
    return (
        <div style={{ padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.4)", letterSpacing: "0.04em" }}>{label}</span>
                {verified && !isPending && (
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: PASS, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.22)", borderRadius: 4, padding: "1px 6px" }}>VERIFIED MIT</span>
                )}
                {isPending && (
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#F59E0B", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.22)", borderRadius: 4, padding: "1px 6px" }}>PENDING</span>
                )}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
                {isPending
                    ? <span style={{ fontFamily: "'JetBrains Mono','Courier New',monospace", fontSize: 12, color: "rgba(255,255,255,0.28)" }}>Deployment in progress</span>
                    : <><CopySpan value={value} display={short(value)} /><ExtLink href={link}>Etherscan</ExtLink></>}
            </div>
        </div>
    );
}

function SectionHead({ text, color = PASS }: { text: string; color?: string }) {
    return (
        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color, marginBottom: 12, paddingTop: 6 }}>{text}</div>
    );
}

interface TestRowProps { n: number; title: string; desc: string; isMobile: boolean }
function TestRow({ n, title, desc, isMobile }: TestRowProps) {
    return (
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", padding: isMobile ? "14px 0" : "16px 0", display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ flexShrink: 0, width: 28, height: 28, borderRadius: "50%", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={PASS} strokeWidth="2.8"><path d="M20 6L9 17l-5-5" /></svg>
            </div>
            <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5, flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.22)", letterSpacing: "0.06em" }}>{String(n).padStart(2, "0")}</span>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>{title}</span>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: PASS, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.22)", borderRadius: 4, padding: "2px 6px" }}>PASS</span>
                </div>
                <p style={{ margin: 0, fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.42)", lineHeight: 1.6 }}>{desc}</p>
            </div>
        </div>
    );
}

export default function SepoliaVerifiedV2Page() {
    const { t } = useLanguage();
    const sr = (t.sepoliaRecord as typeof translations.en.sepoliaRecord).v2 as SR2;

    const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth < 900 : false);
    useEffect(() => {
        const fn = () => setIsMobile(window.innerWidth < 900);
        window.addEventListener("resize", fn);
        return () => window.removeEventListener("resize", fn);
    }, []);

    const pad = isMobile ? "0 18px" : "0 40px";
    const card = (extra?: React.CSSProperties): React.CSSProperties => ({
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 20,
        ...extra,
    });

    return (
        <div style={{ minHeight: "100vh", background: "#000000", color: "#fff" }}>
            <SharedNavBar />

            {/* ═══ HERO ══════════════════════════════════════════════ */}
            <div style={{ position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
                    <img
                        src="/images/v1-hero-bg.png"
                        alt=""
                        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%", filter: "brightness(0.3) saturate(1.3)" }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.6) 70%, #000 100%)" }} />
                </div>

                <div style={{ position: "relative", zIndex: 1, maxWidth: W, margin: "0 auto", padding: pad }}>
                    <div style={{ padding: isMobile ? "100px 0 40px" : "110px 0 56px" }}>
                        <div style={{ display: isMobile ? "block" : "grid", gridTemplateColumns: "1fr 380px", gap: 56, alignItems: "center" }}>
                            <div>
                                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.22)", borderRadius: 20, padding: "4px 14px 4px 9px", marginBottom: 22 }}>
                                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#EF4444" }} />
                                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#EF4444", textTransform: "uppercase" }}>{sr.heroBadge}</span>
                                </div>
                                <h1 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 900, fontSize: isMobile ? 36 : 56, letterSpacing: "-0.03em", lineHeight: 1.04, margin: "0 0 20px", color: "#fff" }}>
                                    {sr.heroTitle}
                                </h1>
                                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: isMobile ? 14 : 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, margin: "0 0 32px", maxWidth: 540 }}>
                                    {sr.heroBody}
                                </p>
                                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                                    {[
                                        { val: "23 / 23", label: sr.statLabels[0], color: PASS },
                                        { val: "4", label: sr.statLabels[1], color: "#22D3EE" },
                                        { val: "1", label: sr.statLabels[2], color: "#EF4444" },
                                        { val: "MIT", label: sr.statLabels[3], color: "#06B6D4" },
                                    ].map(s => (
                                        <div key={s.label} style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${s.color}28`, borderRadius: 12, padding: "12px 18px", textAlign: "center", minWidth: 100 }}>
                                            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em", color: s.color }}>{s.val}</div>
                                            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.36)", marginTop: 4 }}>{s.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Right: version nav */}
                            {!isMobile && (
                                <div style={{ ...card({ padding: "28px 24px" }), display: "flex", flexDirection: "column", gap: 12 }}>
                                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: 4 }}>Contract History</div>
                                    {[
                                        { href: "/sepolia-verified", label: "v0 — ShieldFactory (original)", active: false },
                                        { href: "/sepolia-verified-v1", label: "V1 — QryptSafe V1", active: false },
                                        { href: "/sepolia-verified-v2", label: "V2 — QryptSafe V2 (this)", active: true },
                                        { href: "/sepolia-verified-v3", label: "V3 — QryptSafe V3", active: false },
                                    ].map(item => (
                                        <a key={item.href} href={item.href} style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: item.active ? 700 : 500, color: item.active ? "#fff" : "rgba(255,255,255,0.4)", textDecoration: "none", padding: "8px 14px", borderRadius: 10, background: item.active ? "rgba(255,255,255,0.08)" : "transparent", border: item.active ? "1px solid rgba(255,255,255,0.13)" : "1px solid transparent", display: "block" }}>
                                            {item.label}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══ BODY ══════════════════════════════════════════════ */}
            <div style={{ maxWidth: W, margin: "0 auto", padding: pad }}>

                {/* ── V2 Changes ── */}
                <div style={{ ...card({ padding: isMobile ? "24px 18px" : "32px", marginBottom: 24 }) }}>
                    <SectionHead text={sr.introLabel} />
                    <h2 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 28, letterSpacing: "-0.02em", margin: "0 0 12px", color: "#fff" }}>{sr.introHeading}</h2>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, margin: "0 0 24px" }}>{sr.introBody}</p>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }}>
                        {sr.introItems.map((item, i) => (
                            <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "18px 20px" }}>
                                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 700, color: PASS, marginBottom: 8, letterSpacing: "0.01em" }}>{item.label}</div>
                                <p style={{ margin: 0, fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.44)", lineHeight: 1.6 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Known Bug ── */}
                <div style={{ ...card({ padding: isMobile ? "24px 18px" : "32px", marginBottom: 24, borderColor: "rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.04)" }) }}>
                    <SectionHead text={sr.bugLabel} color="#EF4444" />
                    <h2 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 800, fontSize: isMobile ? 20 : 24, letterSpacing: "-0.02em", margin: "0 0 12px", color: "#fff" }}>{sr.bugHeading}</h2>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, margin: "0 0 16px" }}>{sr.bugBody}</p>
                    <div style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: 12, padding: "14px 18px" }}>
                        <p style={{ margin: 0, fontFamily: "'JetBrains Mono','Courier New',monospace", fontSize: 12, color: "rgba(239,68,68,0.7)", lineHeight: 1.7 }}>{sr.bugExample}</p>
                    </div>
                </div>

                {/* ── Sepolia Contracts ── */}
                <div style={{ ...card({ padding: isMobile ? "24px 18px" : "32px", marginBottom: 24 }) }}>
                    <SectionHead text={sr.addrLabel} />
                    <h2 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 800, fontSize: isMobile ? 20 : 24, letterSpacing: "-0.02em", margin: "0 0 20px", color: "#fff" }}>{sr.addrHeading}</h2>
                    <AddrRow
                        label={sr.addrLabels.factory}
                        value={FACTORY_V2}
                        link={`${ETHERSCAN}/address/${FACTORY_V2}`}
                        verified
                    />
                    <AddrRow
                        label={sr.addrLabels.impl}
                        value={IMPL_V2}
                        link={`${ETHERSCAN}/address/${IMPL_V2}`}
                        verified
                    />
                    <div style={{ padding: "12px 0" }}>
                        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>{sr.addrLabels.deployTx}</div>
                        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
                            {TX_DEPLOY === "PENDING"
                                ? <span style={{ fontFamily: "'JetBrains Mono','Courier New',monospace", fontSize: 12, color: "rgba(255,255,255,0.28)" }}>Deployment in progress</span>
                                : <><CopySpan value={TX_DEPLOY} display={short(TX_DEPLOY, 12, 6)} /><ExtLink href={`${ETHERSCAN}/tx/${TX_DEPLOY}`}>Etherscan</ExtLink></>}
                        </div>
                    </div>
                </div>

                {/* ── Test Results ── */}
                <div style={{ ...card({ padding: isMobile ? "24px 18px" : "32px", marginBottom: 24 }) }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
                        <div>
                            <SectionHead text={sr.testResultsLabel} />
                            <h2 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 800, fontSize: isMobile ? 20 : 24, letterSpacing: "-0.02em", margin: "0 0 8px", color: "#fff" }}>{sr.testResultsHeading}</h2>
                            <p style={{ margin: 0, fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{sr.testResultsBody}</p>
                        </div>
                        <ExtLink href={GITHUB_TEST}>{sr.testFileLink}</ExtLink>
                    </div>
                    {sr.tests.map((test, i) => (
                        <TestRow key={i} n={i + 1} title={test.title} desc={test.desc} isMobile={isMobile} />
                    ))}
                </div>

                {/* ── Navigation ── */}
                <div style={{ ...card({ padding: isMobile ? "22px 18px" : "26px 32px", marginBottom: 60, borderColor: "rgba(255,255,255,0.06)" }), display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                    <a
                        href="/sepolia-verified-v1"
                        style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 10, padding: "10px 20px" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)"; }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
                        V1 Record
                    </a>
                    <div style={{ textAlign: "right" }}>
                        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: 4 }}>Next Record</div>
                        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>QryptSafe V3: Ownable removed</div>
                    </div>
                    <a
                        href="/sepolia-verified-v3"
                        style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 13, color: "#fff", textDecoration: "none", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.13)", borderRadius: 10, padding: "10px 20px" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.11)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.07)"; }}>
                        V3 Record
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                    </a>
                </div>
            </div>
        </div>
    );
}
