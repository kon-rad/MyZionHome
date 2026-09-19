"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SITE, whatsappUrl } from "@/lib/data";

const LINKS = [
  { href: "/#space", label: "The Space" },
  { href: "/gallery", label: "Gallery" },
  { href: "/#air", label: "From the Air" },
  { href: "/#location", label: "Location" },
  { href: "/availability", label: "Availability" },
  { href: "/guidebook", label: "Guidebook" },
  { href: "/library", label: "Library" },
  { href: "/#reviews", label: "Reviews" },
];

export default function Nav() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? "bg-forest/90 backdrop-blur-md border-b border-cream/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="edge flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-full border border-amber/60 text-amber transition-colors group-hover:bg-amber group-hover:text-forest">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M5 19C5 11 11 5 19 5c0 8-6 14-14 14z" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="font-display text-lg tracking-tight text-cream">
            {SITE.name}
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-cream/75 transition-colors hover:text-amber"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
        {SITE.whatsapp && (
          <a
            href={whatsappUrl(SITE.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden font-mono text-[0.66rem] uppercase tracking-[0.14em] text-cream/80 transition-colors hover:text-amber sm:inline"
          >
            WhatsApp
          </a>
        )}
        <a
          href={SITE.airbnbUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-amber px-5 py-2 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-forest transition-all hover:bg-amber-bright"
        >
          Book
        </a>
        </div>
      </nav>
    </header>
  );
}
