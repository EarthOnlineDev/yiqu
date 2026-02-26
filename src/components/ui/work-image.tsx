import Image from "next/image";

interface WorkImageProps {
  readonly src: string;
  readonly alt: string;
  readonly priority?: boolean;
}

export function WorkImage({ src, alt, priority = false }: WorkImageProps) {
  return (
    <div style={{ backgroundColor: "var(--bg-image)" }}>
      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 900px"
        style={{ width: "100%", height: "auto", display: "block" }}
        priority={priority}
      />
    </div>
  );
}
