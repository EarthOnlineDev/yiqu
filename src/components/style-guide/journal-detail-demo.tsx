import { SectionWrapper } from "./section-wrapper";

export function JournalDetailDemo() {
  return (
    <SectionWrapper title="journal detail">
      <div
        style={{
          maxWidth: 680,
          margin: "0 auto",
        }}
      >
        {/* Title */}
        <h2
          style={{
            fontFamily: "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
            fontSize: "var(--text-2xl)",
            fontWeight: 400,
            color: "var(--text-primary)",
            lineHeight: 1.4,
            marginBottom: "var(--space-3)",
          }}
        >
          心裡的草原·心裡的土地
        </h2>

        {/* Date */}
        <p
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "var(--text-sm)",
            fontWeight: 400,
            color: "var(--text-tertiary)",
            marginBottom: "var(--space-16)",
          }}
        >
          2024.12.20
        </p>

        {/* Body Text */}
        <p
          style={{
            fontFamily: "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
            fontSize: "var(--text-base)",
            fontWeight: 400,
            color: "var(--text-primary)",
            lineHeight: 2.0,
            marginBottom: "var(--space-12)",
          }}
        >
          草原環繞著我生長的土地，那裡有無邊的風和低垂的雲。清晨醒來的時候，窗外的光還是灰藍色的，遠處的蒼山隱在薄霧裡。
        </p>

        {/* Inline Photo */}
        <div
          style={{
            width: "100%",
            aspectRatio: "3 / 2",
            backgroundColor: "var(--bg-image)",
            marginBottom: "var(--space-12)",
          }}
        />

        {/* More Body Text */}
        <p
          style={{
            fontFamily: "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
            fontSize: "var(--text-base)",
            fontWeight: 400,
            color: "var(--text-primary)",
            lineHeight: 2.0,
            marginBottom: "var(--space-12)",
          }}
        >
          沿著田埂走了很久，腳下的泥土是濕潤的，空氣裡有青草和泥土混合的氣味。遠處有人在燒稻草，煙氣升起來又被風吹散。一切都很慢，慢到可以聽見自己的呼吸。
        </p>

        {/* Another Photo */}
        <div
          style={{
            width: "100%",
            aspectRatio: "2 / 3",
            backgroundColor: "var(--bg-image)",
            marginBottom: "var(--space-12)",
          }}
        />

        {/* Ending Text */}
        <p
          style={{
            fontFamily: "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
            fontSize: "var(--text-base)",
            fontWeight: 400,
            color: "var(--text-primary)",
            lineHeight: 2.0,
            marginBottom: "var(--space-16)",
          }}
        >
          回去的路上，夕陽把所有的東西都染成了金色。我站在那裡看了很久，直到天完全暗下來。
        </p>

        {/* Back Link */}
        <a
          href="#"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "var(--text-sm)",
            fontWeight: 400,
            color: "var(--text-tertiary)",
            textDecoration: "none",
            letterSpacing: "0.05em",
          }}
        >
          &larr; back to journal
        </a>
      </div>
    </SectionWrapper>
  );
}
