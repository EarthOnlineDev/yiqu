"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";

interface PhotoFadeProps {
  readonly children: ReactNode;
}

export function PhotoFade({ children }: PhotoFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity var(--transition-slow)",
      }}
    >
      {children}
    </div>
  );
}
