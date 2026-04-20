import { useLanguage } from "@/lib/LanguageContext";
import { roadmapContent } from "@/lib/content/roadmap";

const PHASE_COLOR = "#F97316";

export default function Phase5() {
  const { lang } = useLanguage();
  const c = roadmapContent[lang].phase5;

  return (
    <div className="docs-content">
      <div style={{ marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "hsl(var(--muted-fg))" }}>
          {c.sectionLabel}
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
        <span style={{ fontWeight: 700, fontSize: "0.85rem", color: PHASE_COLOR, textTransform: "uppercase", letterSpacing: "0.08em" }}>{c.phaseLabel}</span>
        <span style={{
          fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em",
          color: PHASE_COLOR, background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.3)",
          borderRadius: "0.3rem", padding: "0.1rem 0.55rem",
        }}>{c.statusBadge}</span>
      </div>

      <h1 style={{ marginTop: 0 }}>{c.title}</h1>
      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "2rem" }}>
        {c.intro}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {c.items.map((item) => (
          <div key={item.title}>
            <h3 style={{ margin: "0 0 0.5rem 0", color: PHASE_COLOR }}>{item.title}</h3>
            <p style={{ margin: 0, lineHeight: 1.8 }}>{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
