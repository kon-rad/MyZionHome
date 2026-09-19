import Link from "next/link";
import { GALLERY } from "@/lib/media";
import Gallery from "./Gallery";
import Reveal from "./Reveal";
import { ArrowIcon } from "./Icons";

export default function GalleryPreview() {
  const previewIds = ["drone-hero", "drone-0093", "home-001", "home-007", "home-019", "home-055"];
  const preview = previewIds.flatMap((id) => GALLERY.filter((m) => m.id === id));
  return (
    <section id="gallery" className="bg-forest py-24 text-cream sm:py-32">
      <div className="edge">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-amber-bright">The Gallery</p>
            <h2 className="mt-4 max-w-lg font-display text-4xl font-light leading-tight sm:text-5xl">
              Drone flights, quiet rooms, and golden-hour trees.
            </h2>
          </div>
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-amber-bright transition hover:text-cream"
          >
            View all photos & video
            <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <div className="mt-10">
          <Gallery items={preview} />
        </div>
      </div>
    </section>
  );
}
