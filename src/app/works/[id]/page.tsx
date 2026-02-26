import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllWorks, getWorkById, s2t } from "@/lib/works";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { ImageCarousel } from "@/components/ui/image-carousel";
import { WorkDetailAside } from "@/components/ui/work-detail-aside";
import { WorkTopNav } from "@/components/ui/work-top-nav";

interface PageProps {
  readonly params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const works = getAllWorks();
  return works.map((work) => ({ id: work.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
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

  const prevWork =
    currentIndex > 0
      ? { id: works[currentIndex - 1].id, titleTC: s2t(works[currentIndex - 1].title) }
      : null;

  const nextWork =
    currentIndex < works.length - 1
      ? { id: works[currentIndex + 1].id, titleTC: s2t(works[currentIndex + 1].title) }
      : null;

  const titleTC = s2t(work.title);
  const seriesTC = work.series ? s2t(work.series) : undefined;
  const descriptionTC = s2t(work.description);

  const asideContent = (
    <WorkDetailAside
      titleTC={titleTC}
      seriesTC={seriesTC}
      descriptionTC={descriptionTC}
    />
  );

  return (
    <div className="work-detail-wrapper">
      {/* Top navigation — outside content area */}
      <WorkTopNav prevWork={prevWork} nextWork={nextWork} />

      {/* Mobile-only: title above image (sidebar hidden on mobile) */}
      <div className="work-detail-mobile-meta">
        <p
          style={{
            fontFamily: "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
            fontSize: "var(--text-sm)",
            fontWeight: 400,
            color: "var(--text-primary)",
            lineHeight: 1.6,
          }}
        >
          {titleTC}
        </p>
        {seriesTC && (
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "var(--text-xs)",
              color: "var(--text-tertiary)",
              letterSpacing: "0.02em",
              marginTop: "var(--space-1)",
            }}
          >
            {seriesTC}
          </p>
        )}
      </div>

      {/* Content: sidebar (brand + metadata) + carousel */}
      <div className="work-detail-grid">
        <aside className="sidebar-aside">
          <SidebarNav currentPath="/works" asideExtra={asideContent} hideMainNav />
        </aside>
        <main style={{ height: "100%", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <ImageCarousel images={work.images} alt={titleTC} />
        </main>
      </div>

      {/* Mobile-only: full description below the image */}
      <div className="work-detail-mobile-meta" style={{ paddingTop: "var(--space-4)" }}>
        {descriptionTC && (
          <p
            style={{
              fontFamily: "var(--font-noto-serif-tc), 'Noto Serif TC', serif",
              fontSize: "var(--text-xs)",
              fontWeight: 400,
              color: "var(--text-secondary)",
              lineHeight: 2,
              whiteSpace: "pre-line",
            }}
          >
            {descriptionTC}
          </p>
        )}
        <p
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "var(--text-xs)",
            color: "var(--text-tertiary)",
            paddingTop: "var(--space-8)",
            paddingBottom: "var(--space-4)",
          }}
        >
          &copy; 2026 YIQU
        </p>
      </div>
    </div>
  );
}
