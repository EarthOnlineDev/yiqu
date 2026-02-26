import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllWorks, getWorkById, s2t } from "@/lib/works";
import { SidebarLayout } from "@/components/layout/sidebar-layout";
import { ImageCarousel } from "@/components/ui/image-carousel";

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
  const work = getWorkById(id);

  if (!work) notFound();

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
          fontSize: "var(--text-xs)",
          fontWeight: 400,
          color: "var(--text-secondary)",
          lineHeight: 1.8,
          marginTop: "var(--space-6)",
          whiteSpace: "pre-line",
          overflow: "auto",
          maxHeight: "40vh",
        }}
      >
        {s2t(work.description)}
      </p>
    </div>
  );

  return (
    <SidebarLayout currentPath="/works" asideExtra={asideContent}>
      <ImageCarousel images={work.images} alt={s2t(work.title)} />
    </SidebarLayout>
  );
}
