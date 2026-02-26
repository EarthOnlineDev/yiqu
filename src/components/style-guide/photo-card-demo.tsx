import { SectionWrapper } from "./section-wrapper";

export function PhotoCardDemo() {
  return (
    <SectionWrapper title="photo display">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: "var(--space-20)",
        }}
      >
        {/* Left Column — Metadata */}
        <div style={{ paddingTop: "var(--space-10)" }}>
          <p
            style={{
              fontFamily: "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
              fontSize: "var(--text-lg)",
              fontWeight: 400,
              color: "var(--text-primary)",
              lineHeight: 1.6,
              marginBottom: "var(--space-2)",
            }}
          >
            散步日記
          </p>
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "var(--text-sm)",
              fontWeight: 400,
              color: "var(--text-secondary)",
              letterSpacing: "0.02em",
              marginBottom: "var(--space-6)",
            }}
          >
            Walking Diary · 2024—
          </p>
          <p
            style={{
              fontFamily: "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
              fontSize: "var(--text-sm)",
              fontWeight: 400,
              color: "var(--text-secondary)",
              lineHeight: 1.8,
            }}
          >
            大理的日常散步隨拍與文字記錄。<br />
            沿著洱海，穿過古城，<br />
            在光影裡慢慢走。
          </p>
        </div>

        {/* Right Column — Photos */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-32)" }}>
          {/* Photo 1 */}
          <div>
            <div
              style={{
                width: "100%",
                aspectRatio: "3 / 2",
                backgroundColor: "var(--bg-image)",
              }}
            />
            <p
              style={{
                fontFamily: "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
                fontSize: "var(--text-sm)",
                fontWeight: 400,
                color: "var(--text-secondary)",
                marginTop: "var(--space-4)",
                lineHeight: 1.6,
              }}
            >
              草原環繞著我生長的土地
            </p>
          </div>

          {/* Photo 2 */}
          <div>
            <div
              style={{
                width: "100%",
                aspectRatio: "2 / 3",
                backgroundColor: "var(--bg-image)",
              }}
            />
            <p
              style={{
                fontFamily: "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
                fontSize: "var(--text-sm)",
                fontWeight: 400,
                color: "var(--text-secondary)",
                marginTop: "var(--space-4)",
                lineHeight: 1.6,
              }}
            >
              三點多的清晨太陽升起來
            </p>
          </div>

          {/* Photo 3 — No caption */}
          <div>
            <div
              style={{
                width: "100%",
                aspectRatio: "16 / 9",
                backgroundColor: "var(--bg-image)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Spacing Note */}
      <div
        style={{
          marginTop: "var(--space-12)",
          padding: "var(--space-6)",
          backgroundColor: "var(--bg-secondary)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "var(--text-xs)",
            color: "var(--text-tertiary)",
            lineHeight: 1.8,
          }}
        >
          photos: no borders, no shadows, no rounded corners — sit directly on background<br />
          spacing between photos: 128px (--space-32)<br />
          caption: 13px, secondary color, 16px gap from photo<br />
          aspect ratios shown: 3:2 (landscape), 2:3 (portrait), 16:9 (cinematic)
        </p>
      </div>
    </SectionWrapper>
  );
}
