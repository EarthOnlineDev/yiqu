import { SidebarNav } from "./sidebar-nav";
import { type ReactNode } from "react";

interface SidebarLayoutProps {
  readonly children: ReactNode;
  readonly currentPath: string;
  readonly asideExtra?: ReactNode;
  readonly hideMainNav?: boolean;
}

export function SidebarLayout({
  children,
  currentPath,
  asideExtra,
  hideMainNav,
}: SidebarLayoutProps) {
  return (
    <div className="sidebar-layout">
      <aside className="sidebar-aside">
        <SidebarNav currentPath={currentPath} asideExtra={asideExtra} hideMainNav={hideMainNav} />
      </aside>
      <main
        style={{
          height: "100%",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </main>
    </div>
  );
}
