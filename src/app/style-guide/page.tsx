import { ColorPalette } from "@/components/style-guide/color-palette";
import { TypographyShowcase } from "@/components/style-guide/typography-showcase";
import { SpacingScale } from "@/components/style-guide/spacing-scale";
import { NavigationDemo } from "@/components/style-guide/navigation-demo";
import { PhotoCardDemo } from "@/components/style-guide/photo-card-demo";
import { JournalListDemo } from "@/components/style-guide/journal-list-demo";
import { JournalDetailDemo } from "@/components/style-guide/journal-detail-demo";
import { HomepageDemo } from "@/components/style-guide/homepage-demo";
import { InteractionDemo } from "@/components/style-guide/interaction-demo";

export default function StyleGuidePage() {
  return (
    <main>
      {/* Hero: Homepage Layout Preview */}
      <HomepageDemo />

      {/* Style Guide Sections */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "var(--space-20) var(--space-10)",
        }}
      >
        <header style={{ marginBottom: "var(--space-16)" }}>
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "var(--text-sm)",
              color: "var(--text-tertiary)",
              letterSpacing: "0.05em",
              marginBottom: "var(--space-3)",
            }}
          >
            design style guide
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "var(--text-2xl)",
              fontWeight: 400,
              color: "var(--text-primary)",
              lineHeight: 1.3,
            }}
          >
            Visual Language Reference
          </h2>
        </header>

        <ColorPalette />
        <TypographyShowcase />
        <SpacingScale />
        <NavigationDemo />
        <InteractionDemo />
        <PhotoCardDemo />
        <JournalListDemo />
        <JournalDetailDemo />
      </div>
    </main>
  );
}
