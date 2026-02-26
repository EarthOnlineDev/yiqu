import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllWorks, getWorkById, s2t } from "@/lib/works";
import { WorkImage } from "@/components/ui/work-image";
import { PhotoFade } from "@/components/ui/photo-fade";

interface PageProps {
  readonly params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const works = getAllWorks();
  return works.map((work) => ({ id: work.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const work = getWorkById(id);
  if (!work) return { title: "Not Found" };
  return { title: s2t(work.title) };
}

export default async function JournalDetailPage({ params }: PageProps) {
  const { id } = await params;
  const work = getWorkById(id);

  if (!work) notFound();

  // Split description by "-" separator for section breaks
  const sections = work.description.split("\n-\n");

  return (
    <div
      style={{
        backgroundColor: "var(--bg-primary)",
        minHeight: "100vh",
        padding: "var(--space-20)",
      }}
    >
      <div
        style={{
          maxWidth: 680,
          margin: "0 auto",
        }}
      >
        {/* Back link */}
        <Link
          href="/journal"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "var(--text-sm)",
            fontWeight: 400,
            color: "var(--text-tertiary)",
            textDecoration: "none",
            letterSpacing: "0.05em",
            display: "block",
            marginBottom: "var(--space-16)",
          }}
        >
          &larr; journal
        </Link>

        {/* Title */}
        <h1
          style={{
            fontFamily: "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
            fontSize: "var(--text-2xl)",
            fontWeight: 400,
            color: "var(--text-primary)",
            lineHeight: 1.4,
            marginBottom: "var(--space-16)",
          }}
        >
          {s2t(work.title)}
        </h1>

        {/* Body: text sections interleaved with photos */}
        {sections.map((section, i) => (
          <div key={i}>
            <p
              style={{
                fontFamily:
                  "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
                fontSize: "var(--text-base)",
                fontWeight: 400,
                color: "var(--text-primary)",
                lineHeight: 2.0,
                marginBottom: "var(--space-12)",
                whiteSpace: "pre-line",
              }}
            >
              {s2t(section.trim())}
            </p>
            {work.images[i] && (
              <div style={{ marginBottom: "var(--space-12)" }}>
                <PhotoFade>
                  <WorkImage
                    src={work.images[i].src}
                    alt={s2t(work.title)}
                    priority={i === 0}
                  />
                </PhotoFade>
              </div>
            )}
          </div>
        ))}

        {/* Remaining images not paired with text sections */}
        {work.images.slice(sections.length).map((img) => (
          <div key={img.src} style={{ marginBottom: "var(--space-12)" }}>
            <PhotoFade>
              <WorkImage src={img.src} alt={s2t(work.title)} />
            </PhotoFade>
          </div>
        ))}

        {/* Back link at bottom */}
        <Link
          href="/journal"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "var(--text-sm)",
            fontWeight: 400,
            color: "var(--text-tertiary)",
            textDecoration: "none",
            letterSpacing: "0.05em",
            display: "block",
            marginTop: "var(--space-16)",
          }}
        >
          &larr; journal
        </Link>
      </div>
    </div>
  );
}
