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

  const asideContent = (
    <WorkDetailAside
      titleTC={s2t(work.title)}
      seriesTC={work.series ? s2t(work.series) : undefined}
      descriptionTC={s2t(work.description)}
    />
  );

  return (
    <div style={{ height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* Top navigation — outside content area */}
      <WorkTopNav prevWork={prevWork} nextWork={nextWork} />

      {/* Content: sidebar (brand + metadata) + carousel */}
      <div className="work-detail-grid">
        <aside className="sidebar-aside">
          <SidebarNav currentPath="/works" asideExtra={asideContent} hideMainNav />
        </aside>
        <main style={{ height: "100%", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <ImageCarousel images={work.images} alt={s2t(work.title)} />
        </main>
      </div>
    </div>
  );
}
