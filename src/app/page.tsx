import { getAllWorks, s2t } from "@/lib/works";
import { SidebarLayout } from "@/components/layout/sidebar-layout";
import { WorkImage } from "@/components/ui/work-image";

export default function HomePage() {
  const works = getAllWorks();
  // 沉醉在无边的灰白 — atmospheric grey-white landscape, most editorial
  const heroWork = works[8];
  const heroImage = heroWork?.images[0];

  if (!heroImage) return null;

  return (
    <SidebarLayout currentPath="/">
      <WorkImage
        src={heroImage.src}
        alt={s2t(heroWork.title)}
        contain
        priority
      />
    </SidebarLayout>
  );
}
