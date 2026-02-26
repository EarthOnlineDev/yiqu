import { SidebarNav } from "./sidebar-nav";
import { type ReactNode } from "react";

interface SidebarLayoutProps {
  readonly children: ReactNode;
  readonly currentPath: string;
  readonly asideExtra?: ReactNode;
}

export function SidebarLayout({
  children,
  currentPath,
  asideExtra,
}: SidebarLayoutProps) {
  return (
    <div className="sidebar-layout">
      <aside className="sidebar-aside">
        <SidebarNav currentPath={currentPath} asideExtra={asideExtra} />
      </aside>
      <main>{children}</main>
    </div>
  );
}
