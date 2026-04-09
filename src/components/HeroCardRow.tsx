import { useState, useRef } from "react";
import { Link } from "wouter";

/* ── News card data ──────────────────────────────────────────────
   Add more items here any time. No limit.                         */
export interface NewsCard {
    id: string;
    image?: string;
    accentColor: string;
    tag: string;
    title: string;
    body: string;
    link?: { text: string; href: string };
}

export const NEWS_CARDS: NewsCard[] = [
    {
        id: "sepolia-verified",
        image: "/sepolia-testnet-servers.png",
        accentColor: "#627EEA",
        tag: "Sepolia Testnet",
        title: "Verified on Sepolia",
        body: "84/84 tests. 8 live scenarios. All contracts deployed and verified on Etherscan (Chain ID 11155111).",
        link: { text: "View full record", href: "/sepolia-verified" },
    },
    {
        id: "factory-v3",
        image: "/factory-v2-deploy.png",
        accentColor: "#22C55E",
        tag: "Deployment",
        title: "QryptSafe v3 Deployed",
        body: "QryptSafe and PersonalQryptSafe v3 live on Sepolia. No admin keys, no pause function. Both verified on Etherscan.",
        link: { text: "View contracts", href: "https://sepolia.etherscan.io/address/0x5c24dd33C33e70FcD9451e1Fc401E7C810c4135B" },
    },
];

/* ── Shared card shell ──────────────────────────────────────────── */
const CARD_STYLE: React.CSSProperties = {
    background: "linear-gradient(160deg, rgba(18,14,40,0.97) 0%, rgba(8,10,28,0.98) 100%)",
    borderRadius: 20,
    border: "1px solid rgba(98,126,234,0.18)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
};

/* ── Challenge card content ─────────────────────────────────────── */
function ChallengeCardContent() {
    return (
        <div style={{ ...CARD_STYLE, position: "relative", padding: "16px 90px 16px 20px" }}>
            {/* floating hacker image */}
            <div style={{ position: "absolute", top: 10, right: 12, zIndex: 2, width: 68, height: 68, filter: "drop-shadow(0 6px 24px rgba(98,126,234,0.6))" }}>
                <img src="/hacker-challenge-small.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
            </div>

            {/* badge */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 7 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.22)", flexShrink: 0 }} />
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,255,255,0.36)", textTransform: "uppercase" }}>Coming Soon</span>
            </div>

            {/* headline */}
            <h3 style={{ margin: "0 0 7px", fontFamily: "'Inter',sans-serif", fontWeight: 800, fontSize: 19, color: "rgba(255,255,255,0.42)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                Crack the Qrypt-Safe.
            </h3>

            {/* body */}
            <p style={{ margin: "0 0 14px", fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.26)", lineHeight: 1.5, flex: 1 }}>
                The challenge goes live on mainnet. We will publish a private key. qETH will be shielded inside the Qrypt-Safe. Transfer out if you can.
            </p>

            {/* disabled button */}
            <div style={{ display: "inline-flex", alignItems: "center", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.2)", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 12, padding: "8px 16px", borderRadius: 9, cursor: "not-allowed", userSelect: "none" }}>
                Mainnet only
            </div>
        </div>
    );
}

/* ── News card content ──────────────────────────────────────────── */
function NewsCardContent({ card }: { card: NewsCard }) {
    return (
        <div style={{ ...CARD_STYLE, border: `1px solid ${card.accentColor}22` }}>
            {card.image && (
                <div style={{ height: 78, flexShrink: 0, overflow: "hidden" }}>
                    <img src={card.image} alt={card.title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.65)", display: "block" }} />
                </div>
            )}
            <div style={{ padding: "12px 16px 14px", display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
                <div style={{ width: 22, height: 3, borderRadius: 2, background: card.accentColor, flexShrink: 0 }} />
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: card.accentColor }}>{card.tag}</div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em", lineHeight: 1.2 }}>{card.title}</div>
                <p style={{ margin: 0, fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.42)", lineHeight: 1.5, flex: 1, overflow: "hidden" }}>{card.body}</p>
                {card.link && (
                    card.link.href.startsWith("http")
                        ? <a href={card.link.href} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 11.5, color: card.accentColor, textDecoration: "none", marginTop: 2 }}>
                            {card.link.text}
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                          </a>
                        : <Link href={card.link.href} style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 11.5, color: card.accentColor, textDecoration: "none", marginTop: 2 }}>
                            {card.link.text}
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                          </Link>
                )}
            </div>
        </div>
    );
}

/* ── Arrow button ───────────────────────────────────────────────── */
function ArrowBtn({ dir, onClick, disabled }: { dir: "left" | "right"; onClick: () => void; disabled: boolean }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={{ flexShrink: 0, width: 64, height: 64, borderRadius: "50%", background: disabled ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.2 : 1, padding: 0, alignSelf: "center", transition: "background 0.15s, opacity 0.15s" }}
            onMouseEnter={e => { if (!disabled) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.22)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = disabled ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.12)"; }}
        >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5">
                {dir === "left" ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
            </svg>
        </button>
    );
}

/* ── Desktop: unified scrolling carousel, challenge is first card ── */
const ALL_DESKTOP_CARDS: Array<{ type: "challenge" } | { type: "news"; card: NewsCard }> = [
    { type: "challenge" },
    ...NEWS_CARDS.map(c => ({ type: "news" as const, card: c })),
];
const DESKTOP_VISIBLE = 3;

function renderDesktopCard(item: (typeof ALL_DESKTOP_CARDS)[number], key: string) {
    return (
        <div key={key} style={{ flex: 1, minWidth: 0 }}>
            {item.type === "challenge"
                ? <ChallengeCardContent />
                : <NewsCardContent card={(item as { type: "news"; card: NewsCard }).card} />}
        </div>
    );
}

function DesktopRow() {
    const total = ALL_DESKTOP_CARDS.length;
    const [offset, setOffset] = useState(0);
    const canPrev = offset > 0;
    const canNext = offset + DESKTOP_VISIBLE < total;

    const visible = ALL_DESKTOP_CARDS.slice(offset, offset + DESKTOP_VISIBLE);

    return (
        <div style={{ display: "flex", alignItems: "stretch", gap: 10, width: "100%", height: 230 }}>
            <ArrowBtn dir="left" onClick={() => setOffset(o => o - 1)} disabled={!canPrev} />

            {visible.map((item, i) =>
                renderDesktopCard(item, item.type === "challenge" ? "challenge" : (item as { type: "news"; card: NewsCard }).card.id)
            )}

            <ArrowBtn dir="right" onClick={() => setOffset(o => o + 1)} disabled={!canNext} />
        </div>
    );
}

/* ── Mobile: stacked swipeable deck ─────────────────────────────── */
const ALL_MOBILE_CARDS = [{ type: "challenge" as const }, ...NEWS_CARDS.map(c => ({ type: "news" as const, card: c }))];

function MobileStack() {
    const [current, setCurrent] = useState(0);
    const [flyDir, setFlyDir] = useState<"left" | "right" | null>(null);
    const touchStartX = useRef<number | null>(null);
    const touchStartY = useRef<number | null>(null);
    const total = ALL_MOBILE_CARDS.length;

    const goNext = () => {
        if (current >= total - 1 || flyDir) return;
        setFlyDir("left");
        setTimeout(() => { setCurrent(c => c + 1); setFlyDir(null); }, 300);
    };
    const goPrev = () => {
        if (current <= 0 || flyDir) return;
        setFlyDir("right");
        setTimeout(() => { setCurrent(c => c - 1); setFlyDir(null); }, 300);
    };

    const onTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
    };
    const onTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null || touchStartY.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        const dy = e.changedTouches[0].clientY - touchStartY.current;
        /* only trigger if horizontal swipe dominates */
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 44) {
            if (dx < 0) goNext();
            else goPrev();
        }
        touchStartX.current = null;
        touchStartY.current = null;
    };

    /* stack: show current + up to 2 behind it */
    const stackRotations = [
        { rotate: 0, scale: 1, tx: 0, ty: 0, z: 10 },
        { rotate: -2.8, scale: 0.955, tx: 7, ty: 9, z: 9 },
        { rotate: 1.6, scale: 0.91, tx: -5, ty: 16, z: 8 },
    ];

    const cardIndices = [current, current + 1, current + 2].filter(i => i < total);

    function renderCard(item: (typeof ALL_MOBILE_CARDS)[number]) {
        if (item.type === "challenge") return <ChallengeCardContent />;
        return <NewsCardContent card={(item as { type: "news"; card: NewsCard }).card} />;
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Stack container */}
            <div
                style={{ position: "relative", height: 240, touchAction: "pan-y", userSelect: "none" }}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
            >
                {/* render in reverse order so front card is on top */}
                {[...cardIndices].reverse().map((idx) => {
                    const stackPos = cardIndices.indexOf(idx);
                    const t = stackRotations[stackPos] ?? stackRotations[2];
                    const isFront = stackPos === 0;

                    let flyStyle: React.CSSProperties = {};
                    if (isFront && flyDir === "left") {
                        flyStyle = { transform: `rotate(${t.rotate - 4}deg) scale(${t.scale}) translate(-130%, ${t.ty}px)`, opacity: 0, transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.25s" };
                    } else if (isFront && flyDir === "right") {
                        flyStyle = { transform: `rotate(${t.rotate + 4}deg) scale(${t.scale}) translate(130%, ${t.ty}px)`, opacity: 0, transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.25s" };
                    }

                    return (
                        <div
                            key={ALL_MOBILE_CARDS[idx].type === "challenge" ? "challenge" : (ALL_MOBILE_CARDS[idx] as { type: "news"; card: NewsCard }).card.id}
                            style={{
                                position: "absolute",
                                inset: 0,
                                zIndex: t.z,
                                transform: `rotate(${t.rotate}deg) scale(${t.scale}) translate(${t.tx}px, ${t.ty}px)`,
                                transformOrigin: "bottom center",
                                transition: isFront && !flyDir ? "none" : "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
                                ...(Object.keys(flyStyle).length ? flyStyle : {}),
                            }}
                        >
                            {renderCard(ALL_MOBILE_CARDS[idx])}
                        </div>
                    );
                })}
            </div>

            {/* Dots + hint */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 2 }}>
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.22)" }}>Swipe to navigate</span>
                <div style={{ display: "flex", gap: 5 }}>
                    {Array.from({ length: total }).map((_, i) => (
                        <div key={i} style={{ width: i === current ? 18 : 6, height: 6, borderRadius: 3, background: i === current ? "#627EEA" : "rgba(255,255,255,0.15)", transition: "width 0.2s, background 0.2s" }} />
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ── Export ─────────────────────────────────────────────────────── */
export default function HeroCardRow({ isMobile }: { isMobile: boolean }) {
    return isMobile ? <MobileStack /> : <DesktopRow />;
}
