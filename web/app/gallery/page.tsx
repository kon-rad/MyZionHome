import type { Metadata } from "next";
import Link from "next/link";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import { GALLERY, GALLERY_CATEGORIES } from "@/lib/media";
import { ArrowIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos and drone video of the MyZionHome retreat in Zion, Illinois.",
};

export default function GalleryPage() {
  return (
    <main className="bg-paper">
      <section className="bg-forest pb-16 pt-32 text-cream">
        <div className="edge">
          <Link
            href="/"
            className="inline-flex rotate-180 items-center font-mono text-xs text-cream/60 transition hover:text-amber-bright"
            aria-label="Back home"
          >
            <ArrowIcon className="h-4 w-4" />
          </Link>
          <p className="eyebrow mt-6 text-amber-bright">The Gallery</p>
          <h1 className="mt-4 max-w-2xl font-display text-5xl font-light leading-tight sm:text-6xl">
            Every room, trail, and golden hour.
          </h1>
          <p className="mt-4 max-w-lg text-cream/70">
            Tap any frame to open it full-screen. Use the arrow keys to move through
            the collection. Video tiles play in place.
          </p>
        </div>
      </section>

      <section className="edge py-16">
        <Gallery items={GALLERY} categories={GALLERY_CATEGORIES} showFilters />
      </section>

      <Footer />
    </main>
  );
}
