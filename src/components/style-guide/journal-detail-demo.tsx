/* eslint-disable @next/next/no-img-element */
import { SectionWrapper } from "./section-wrapper";
import { getWorkByIndex, s2t } from "@/lib/works";

export function JournalDetailDemo() {
  // Use work index 4: "大理的日出是温柔" — has rich text and multiple images
  const work = getWorkByIndex(4);

  if (!work) return null;

  const title = s2t(work.title);
  // Split description by "-" separator (used as section breaks in the content)
  const descParts = work.description.split("\n-\n");

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
            marginBottom: "var(--space-16)",
          }}
        >
          {title}
        </h2>

        {/* Body Text — first paragraph */}
        {descParts[0] && (
          <p
            style={{
              fontFamily: "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
              fontSize: "var(--text-base)",
              fontWeight: 400,
              color: "var(--text-primary)",
              lineHeight: 2.0,
              marginBottom: "var(--space-12)",
              whiteSpace: "pre-line",
            }}
          >
            {s2t(descParts[0].trim())}
          </p>
        )}

        {/* Inline Photo */}
        {work.images[0] && (
          <img
            src={work.images[0].src}
            alt={title}
            style={{
              width: "100%",
              height: "auto",
              marginBottom: "var(--space-12)",
            }}
          />
        )}

        {/* More Body Text — second paragraph */}
        {descParts[1] && (
          <p
            style={{
              fontFamily: "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
              fontSize: "var(--text-base)",
              fontWeight: 400,
              color: "var(--text-primary)",
              lineHeight: 2.0,
              marginBottom: "var(--space-12)",
              whiteSpace: "pre-line",
            }}
          >
            {s2t(descParts[1].trim())}
          </p>
        )}

        {/* Another Photo */}
        {work.images[2] && (
          <img
            src={work.images[2].src}
            alt={`${title} — 2`}
            style={{
              width: "100%",
              height: "auto",
              marginBottom: "var(--space-12)",
            }}
          />
        )}

        {/* Ending Text — third paragraph */}
        {descParts[2] && (
          <p
            style={{
              fontFamily: "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
              fontSize: "var(--text-base)",
              fontWeight: 400,
              color: "var(--text-primary)",
              lineHeight: 2.0,
              marginBottom: "var(--space-16)",
              whiteSpace: "pre-line",
            }}
          >
            {s2t(descParts[2].trim())}
          </p>
        )}

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
