"use client";

import { useState, useEffect, type ReactNode } from "react";

interface PhotoFadeProps {
  readonly children: ReactNode;
}

export function PhotoFade({ children }: PhotoFadeProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity var(--transition-slow)",
      }}
    >
      {children}
    </div>
  );
}
