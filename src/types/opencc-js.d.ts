declare module "opencc-js" {
  interface ConverterOptions {
    readonly from: "cn" | "tw" | "twp" | "hk" | "jp" | "t";
    readonly to: "cn" | "tw" | "twp" | "hk" | "jp" | "t";
  }

  export function Converter(options: ConverterOptions): (text: string) => string;
}
