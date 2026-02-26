import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllWorks, getWorkById, s2t, prepareJournalBlocks } from "@/lib/works";
import { SidebarLayout } from "@/components/layout/sidebar-layout";
import { JournalPaginated } from "@/components/ui/journal-paginated";

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
  const work = getWorkById(id);

  if (!work) notFound();

  const blocks = prepareJournalBlocks(work);
  const titleTC = s2t(work.title);

  return (
    <SidebarLayout currentPath="/journal">
      <JournalPaginated title={titleTC} blocks={blocks} />
    </SidebarLayout>
  );
}
