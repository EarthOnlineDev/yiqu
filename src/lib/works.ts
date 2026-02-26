import worksData from "@/data/works.json";
import * as OpenCC from "opencc-js";

export interface WorkImage {
  readonly src: string;
  readonly name: string;
}

export interface Work {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly series: string;
  readonly images: readonly WorkImage[];
}

// Simplified Chinese → Traditional Chinese (Taiwan) converter
const converter = OpenCC.Converter({ from: "cn", to: "twp" });

export function s2t(text: string): string {
  return converter(text);
}

export function getAllWorks(): readonly Work[] {
  return worksData as readonly Work[];
}

export function getWorkById(id: string): Work | undefined {
  return (worksData as readonly Work[]).find((w) => w.id === id);
}

export function getWorkByIndex(index: number): Work | undefined {
  return worksData[index] as Work | undefined;
}

// Journal content block for horizontal pagination
export interface ContentBlock {
  readonly text: string;
  readonly imageSrc?: string;
}

export function prepareJournalBlocks(work: Work): readonly ContentBlock[] {
  const sections = work.description.split("\n-\n");
  const blocks: ContentBlock[] = [];

  sections.forEach((section, i) => {
    const text = s2t(section.trim());
    const image = work.images[i];

    if (text.length > 300) {
      // Split long text into separate blocks, only first gets image
      const paragraphs = text.split("\n\n").filter((p) => p.trim());
      paragraphs.forEach((para, j) => {
        blocks.push({
          text: para.trim(),
          imageSrc: j === 0 ? image?.src : undefined,
        });
      });
    } else {
      blocks.push({
        text,
        imageSrc: image?.src,
      });
    }
  });

  // Remaining images not paired with text
  const pairedCount = Math.min(sections.length, work.images.length);
  work.images.slice(pairedCount).forEach((img) => {
    blocks.push({ text: "", imageSrc: img.src });
  });

  return blocks;
}
