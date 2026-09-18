"use client";

import type { WikiSlug } from "@/lib/content";
import { WikiSidebar } from "./WikiSidebar";
import { WikiToc } from "./WikiToc";

export function WikiShell({
  slug,
  title,
  children,
}: {
  slug?: WikiSlug;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="wiki-layout">
      <WikiSidebar slug={slug} />
      <div className="wiki-main">
        <header className="wiki-main__header">
          <h1>{title}</h1>
        </header>
        <div className="wiki-main__body">{children}</div>
      </div>
      {slug ? <WikiToc slug={slug} /> : <div className="wiki-toc wiki-toc--empty" aria-hidden />}
    </div>
  );
}
