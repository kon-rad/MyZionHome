import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { getGuide, getGuideSlugs, getAllGuides } from "@/lib/content";
import { ArrowIcon } from "@/components/Icons";

export function generateStaticParams() {
  return getGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "Guide not found" };
  return { title: guide.title, description: guide.excerpt };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const others = getAllGuides().filter((g) => g.slug !== slug).slice(0, 3);

  return (
    <main className="bg-paper">
      {/* Hero */}
      <section className="relative flex min-h-[52vh] items-end overflow-hidden bg-forest pt-24">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-45"
          style={{ backgroundImage: `url(${guide.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/60 to-forest/30" />
        <div className="edge relative pb-14 text-cream">
          <Link
            href="/guidebook"
            className="inline-flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-cream/70 transition hover:text-amber-bright"
          >
            <span className="rotate-180"><ArrowIcon className="h-3.5 w-3.5" /></span>
            All guides
          </Link>
          <p className="eyebrow mt-6 text-amber-bright">
            {guide.category} · {guide.readTime}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-light leading-tight sm:text-6xl">
            {guide.title}
          </h1>
        </div>
      </section>

      {/* Body */}
      <article className="edge max-w-3xl py-16">
        <p className="border-l-2 border-amber pl-5 font-display text-xl italic text-forest/85">
          {guide.excerpt}
        </p>
        <div
          className="prose-nature mt-10"
          dangerouslySetInnerHTML={{ __html: guide.html }}
        />
      </article>

      {/* More guides */}
      <section className="edge border-t border-moss/20 py-16">
        <p className="eyebrow">Keep reading</p>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {others.map((g) => (
            <Link
              key={g.slug}
              href={`/guidebook/${g.slug}`}
              className="group rounded-2xl border border-moss/15 bg-paper-deep/50 p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-amber">
                {g.category}
              </p>
              <h3 className="mt-2 font-display text-lg text-forest">{g.title}</h3>
              <p className="mt-2 text-sm text-ink/60">{g.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
