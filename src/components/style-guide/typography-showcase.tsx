import { SectionWrapper } from "./section-wrapper";

export function TypographyShowcase() {
  return (
    <SectionWrapper title="typography">
      {/* English — Cormorant Garamond */}
      <div style={{ marginBottom: "var(--space-12)" }}>
        <p
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "var(--text-xs)",
            color: "var(--text-tertiary)",
            letterSpacing: "0.05em",
            marginBottom: "var(--space-6)",
          }}
        >
          english — cormorant garamond
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
          <div>
            <p
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "var(--text-4xl)",
                fontWeight: 500,
                color: "var(--text-primary)",
                lineHeight: 1.1,
                letterSpacing: "0.02em",
              }}
            >
              YIQU
            </p>
            <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "var(--text-xs)", color: "var(--text-tertiary)", marginTop: "var(--space-2)" }}>
              48px / 500 weight — photographer name display
            </p>
          </div>

          <div>
            <p
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "var(--text-3xl)",
                fontWeight: 400,
                color: "var(--text-primary)",
                lineHeight: 1.2,
                letterSpacing: "0.02em",
              }}
            >
              Walking Diary
            </p>
            <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "var(--text-xs)", color: "var(--text-tertiary)", marginTop: "var(--space-2)" }}>
              36px / 400 weight — series title
            </p>
          </div>

          <div>
            <p
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "var(--text-xl)",
                fontWeight: 400,
                color: "var(--text-primary)",
                lineHeight: 1.5,
                letterSpacing: "0.02em",
              }}
            >
              Female Portraits, She and the Mountain
            </p>
            <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "var(--text-xs)", color: "var(--text-tertiary)", marginTop: "var(--space-2)" }}>
              22px / 400 weight — page title
            </p>
          </div>

          <div>
            <p
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "var(--text-sm)",
                fontWeight: 400,
                color: "var(--text-primary)",
                lineHeight: 1.6,
                letterSpacing: "0.05em",
              }}
            >
              Works &nbsp;&nbsp; Journal &nbsp;&nbsp; About &nbsp;&nbsp; Contact
            </p>
            <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "var(--text-xs)", color: "var(--text-tertiary)", marginTop: "var(--space-2)" }}>
              13px / 400 weight / 0.05em tracking — navigation
            </p>
          </div>
        </div>
      </div>

      {/* Traditional Chinese — Noto Serif TC */}
      <div>
        <p
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "var(--text-xs)",
            color: "var(--text-tertiary)",
            letterSpacing: "0.05em",
            marginBottom: "var(--space-6)",
          }}
        >
          繁體中文 — noto serif tc
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
          <div>
            <p
              style={{
                fontFamily: "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
                fontSize: "var(--text-3xl)",
                fontWeight: 400,
                color: "var(--text-primary)",
                lineHeight: 1.3,
              }}
            >
              一曲
            </p>
            <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "var(--text-xs)", color: "var(--text-tertiary)", marginTop: "var(--space-2)" }}>
              36px / 400 weight — name in Chinese
            </p>
          </div>

          <div>
            <p
              style={{
                fontFamily: "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
                fontSize: "var(--text-2xl)",
                fontWeight: 400,
                color: "var(--text-primary)",
                lineHeight: 1.4,
              }}
            >
              散步途中的光
            </p>
            <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "var(--text-xs)", color: "var(--text-tertiary)", marginTop: "var(--space-2)" }}>
              28px / 400 weight — journal entry title
            </p>
          </div>

          <div>
            <p
              style={{
                fontFamily: "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
                fontSize: "var(--text-lg)",
                fontWeight: 400,
                color: "var(--text-primary)",
                lineHeight: 1.7,
              }}
            >
              散步日記 &nbsp;&nbsp; 女性人像 &nbsp;&nbsp; 她與山
            </p>
            <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "var(--text-xs)", color: "var(--text-tertiary)", marginTop: "var(--space-2)" }}>
              18px / 400 weight — series name in Chinese
            </p>
          </div>

          <div>
            <p
              style={{
                fontFamily: "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
                fontSize: "var(--text-base)",
                fontWeight: 400,
                color: "var(--text-primary)",
                lineHeight: 2.0,
                maxWidth: 680,
              }}
            >
              草原環繞著我生長的土地，那裡有無邊的風和低垂的雲。三點多的清晨太陽升起來，兩點多天漸亮，四點多太陽已經很高了。種子知道如何等待，大理的日出是溫柔的，像一場不動聲色的告白。
            </p>
            <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "var(--text-xs)", color: "var(--text-tertiary)", marginTop: "var(--space-2)" }}>
              15px / 400 weight / 2.0 line-height — body text (journal reading)
            </p>
          </div>

          <div>
            <p
              style={{
                fontFamily: "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
                fontSize: "var(--text-sm)",
                fontWeight: 400,
                color: "var(--text-secondary)",
                lineHeight: 1.6,
              }}
            >
              冬日午後，沿著蒼山腳下的小路慢慢走。
            </p>
            <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "var(--text-xs)", color: "var(--text-tertiary)", marginTop: "var(--space-2)" }}>
              13px / 400 weight / secondary color — photo caption
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
