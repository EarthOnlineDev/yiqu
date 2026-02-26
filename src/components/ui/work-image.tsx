import Image from "next/image";

interface WorkImageProps {
  readonly src: string;
  readonly alt: string;
  readonly priority?: boolean;
  readonly contain?: boolean;
  readonly maxHeight?: string;
}

export function WorkImage({
  src,
  alt,
  priority = false,
  contain = false,
  maxHeight,
}: WorkImageProps) {
  if (contain) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={0}
          height={0}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 900px"
          style={{
            width: "auto",
            height: "auto",
            maxWidth: "100%",
            maxHeight: maxHeight ?? "calc(100vh - 160px)",
            objectFit: "contain",
            display: "block",
          }}
          priority={priority}
        />
      </div>
    );
  }

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
