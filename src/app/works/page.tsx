import type { Metadata } from "next";
import { getAllWorks, s2t } from "@/lib/works";
import { WorksPageClient } from "@/components/ui/works-page-client";

export const metadata: Metadata = {
  title: "Works",
};

export default function WorksPage() {
  const works = getAllWorks();

  const worksForPreview = works.map((work) => ({
    id: work.id,
    titleTC: s2t(work.title),
    firstImageSrc: work.images[0].src,
    allImageSrcs: work.images.map((img) => img.src),
  }));

  return <WorksPageClient works={worksForPreview} />;
}
