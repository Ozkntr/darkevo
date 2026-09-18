"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type NavItem = {
  href: string;
  label: string;
};

export function NavDropdown({
  label,
  href,
  items,
  active,
}: {
  label: string;
  href: string;
  items: NavItem[];
  active: boolean;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className={`nav-drop ${active ? "is-active" : ""} ${open ? "is-open" : ""}`} ref={rootRef}>
      <Link
        href={href}
        className="nav-link nav-link--drop"
        aria-expanded={open}
        onClick={(event) => {
          if (window.matchMedia("(min-width: 900px)").matches) return;
          event.preventDefault();
          setOpen((value) => !value);
        }}
        onMouseEnter={() => setOpen(true)}
        onFocus={() => setOpen(true)}
      >
        {label}
        <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden>
          <path d="M4 6l4 4 4-4H4z" />
        </svg>
      </Link>
      {open ? (
        <div className="nav-drop__menu" onMouseLeave={() => setOpen(false)}>
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="nav-drop__item" onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
