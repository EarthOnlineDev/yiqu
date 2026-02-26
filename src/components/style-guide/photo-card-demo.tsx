/* eslint-disable @next/next/no-img-element */
import { SectionWrapper } from "./section-wrapper";
import { getAllWorks, s2t } from "@/lib/works";

export function PhotoCardDemo() {
  const works = getAllWorks();

  // Pick 3 works with nice images for the photo display
  const photoWork1 = works[0]; // 心里的草原·心里的家
  const photoWork2 = works[4]; // 大理的日出是温柔
  const photoWork3 = works[9]; // 每日散步时间

  // Use the first work's description for the series metadata
  const seriesWork = works[0];
  const descriptionLines = seriesWork.description.split("\n").slice(0, 3).join("\n");

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
            {seriesWork.series ? s2t(seriesWork.series) : "散步日記"}
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
              whiteSpace: "pre-line",
            }}
          >
            {s2t(descriptionLines)}
          </p>
        </div>

        {/* Right Column — Photos */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-32)" }}>
          {/* Photo 1 */}
          {photoWork1?.images[2] && (
            <div>
              <img
                src={photoWork1.images[2].src}
                alt={s2t(photoWork1.title)}
                style={{ width: "100%", height: "auto" }}
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
                {s2t(photoWork1.description.split("\n")[0])}
              </p>
            </div>
          )}

          {/* Photo 2 */}
          {photoWork2?.images[1] && (
            <div>
              <img
                src={photoWork2.images[1].src}
                alt={s2t(photoWork2.title)}
                style={{ width: "100%", height: "auto" }}
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
                {s2t(photoWork2.title)}
              </p>
            </div>
          )}

          {/* Photo 3 */}
          {photoWork3?.images[1] && (
            <div>
              <img
                src={photoWork3.images[1].src}
                alt={s2t(photoWork3.title)}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          )}
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
          caption: 13px, secondary color, 16px gap from photo
        </p>
      </div>
    </SectionWrapper>
  );
}
