import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllWorks, getWorkById, s2t, prepareJournalBlocks } from "@/lib/works";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { JournalPaginated } from "@/components/ui/journal-paginated";
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
  if (!work) return { title: "Not Found" };
  return { title: s2t(work.title) };
}

export default async function JournalDetailPage({ params }: PageProps) {
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

  const blocks = prepareJournalBlocks(work);
  const titleTC = s2t(work.title);
  const publishDate = work.publishDate || undefined;
  const locationTC = work.location ? s2t(work.location) : undefined;
  const metaLine = [publishDate, locationTC].filter(Boolean).join("  \u00b7  ");

  const asideContent = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-4)",
        height: "100%",
        minHeight: 0,
      }}
    >
      <div style={{ flexShrink: 0 }}>
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
        {metaLine && (
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "var(--text-xs)",
              color: "var(--text-tertiary)",
              letterSpacing: "0.02em",
              marginTop: "var(--space-2)",
            }}
          >
            {metaLine}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="work-detail-wrapper">
      {/* Top navigation: ← Journal / Back / Next */}
      <WorkTopNav
        prevWork={prevWork}
        nextWork={nextWork}
        backLabel="Journal"
        backHref="/journal"
        basePath="/journal"
      />

      {/* Mobile-only: title above content (sidebar hidden on mobile) */}
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
        {metaLine && (
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "var(--text-xs)",
              color: "var(--text-tertiary)",
              letterSpacing: "0.02em",
              marginTop: "var(--space-2)",
            }}
          >
            {metaLine}
          </p>
        )}
      </div>

      {/* Content: sidebar (brand + title) + paginated journal */}
      <div className="work-detail-grid">
        <aside className="sidebar-aside">
          <SidebarNav currentPath="/journal" asideExtra={asideContent} hideMainNav />
        </aside>
        <main
          className="journal-main"
          style={{
            height: "100%",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <JournalPaginated blocks={blocks} title={titleTC} />
        </main>
      </div>

      {/* Mobile-only: footer */}
      <div className="work-detail-mobile-meta" style={{ paddingTop: "var(--space-4)" }}>
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
