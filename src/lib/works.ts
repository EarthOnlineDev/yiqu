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

export function getWorkByIndex(index: number): Work | undefined {
  return worksData[index] as Work | undefined;
}
