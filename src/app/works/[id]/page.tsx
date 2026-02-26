import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllWorks, getWorkById, s2t } from "@/lib/works";
import { SidebarLayout } from "@/components/layout/sidebar-layout";
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
  if (!work) return { title: "Work Not Found" };
  return { title: s2t(work.title) };
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { id } = await params;
  const works = getAllWorks();
  const work = getWorkById(id);

  if (!work) notFound();

  const currentIndex = works.findIndex((w) => w.id === id);
  const prevWork = currentIndex > 0 ? works[currentIndex - 1] : null;
  const nextWork =
    currentIndex < works.length - 1 ? works[currentIndex + 1] : null;

  // Aside content: title + series + description
  const asideContent = (
    <div style={{ marginTop: "var(--space-16)" }}>
      <h1
        style={{
          fontFamily: "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
          fontSize: "var(--text-lg)",
          fontWeight: 400,
          color: "var(--text-primary)",
          lineHeight: 1.6,
        }}
      >
        {s2t(work.title)}
      </h1>

      {work.series && (
        <p
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "var(--text-sm)",
            fontWeight: 400,
            color: "var(--text-secondary)",
            letterSpacing: "0.02em",
            marginTop: "var(--space-2)",
          }}
        >
          {s2t(work.series)}
        </p>
      )}

      <p
        style={{
          fontFamily: "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
          fontSize: "var(--text-sm)",
          fontWeight: 400,
          color: "var(--text-secondary)",
          lineHeight: 1.8,
          marginTop: "var(--space-6)",
          whiteSpace: "pre-line",
        }}
      >
        {s2t(work.description)}
      </p>
    </div>
  );

  return (
    <SidebarLayout currentPath="/works" asideExtra={asideContent}>
      <div style={{ paddingTop: "var(--space-10)" }}>
        {/* Photos */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-32)",
          }}
        >
          {work.images.map((image, index) => (
            <PhotoFade key={image.src}>
              <WorkImage
                src={image.src}
                alt={`${s2t(work.title)} — ${index + 1}`}
                priority={index === 0}
              />
            </PhotoFade>
          ))}
        </div>

        {/* Prev / Next navigation */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "var(--space-20)",
            paddingTop: "var(--space-10)",
            borderTop: "1px solid var(--border)",
            paddingBottom: "var(--space-10)",
          }}
        >
          {prevWork ? (
            <Link
              href={`/works/${prevWork.id}`}
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "var(--text-sm)",
                color: "var(--text-tertiary)",
                textDecoration: "none",
                letterSpacing: "0.05em",
              }}
            >
              &larr; {s2t(prevWork.title)}
            </Link>
          ) : (
            <span />
          )}
          {nextWork ? (
            <Link
              href={`/works/${nextWork.id}`}
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "var(--text-sm)",
                color: "var(--text-tertiary)",
                textDecoration: "none",
                letterSpacing: "0.05em",
                textAlign: "right",
              }}
            >
              {s2t(nextWork.title)} &rarr;
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </SidebarLayout>
  );
}
