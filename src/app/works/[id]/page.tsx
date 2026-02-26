import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllWorks, getWorkById, s2t } from "@/lib/works";
import { WorkDetailClient } from "@/components/ui/work-detail-client";

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

  return (
    <WorkDetailClient
      titleTC={s2t(work.title)}
      seriesTC={work.series ? s2t(work.series) : undefined}
      descriptionTC={s2t(work.description)}
      images={work.images}
      prevWork={prevWork}
      nextWork={nextWork}
    />
  );
}
