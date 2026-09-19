// Server-only: loads guidebook markdown from content/guidebook/*.md.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const GUIDE_DIR = path.join(process.cwd(), "content", "guidebook");

export type GuideMeta = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  order: number;
  image: string;
  readTime: string;
};

export type Guide = GuideMeta & { html: string };

function readGuide(file: string): Guide {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(GUIDE_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const html = marked.parse(content, { async: false }) as string;
  return {
    slug,
    title: data.title ?? slug,
    excerpt: data.excerpt ?? "",
    category: data.category ?? "Guide",
    order: typeof data.order === "number" ? data.order : 99,
    image: data.image ?? "/media/gallery/drone-0093.jpg",
    readTime: data.readTime ?? "3 min",
    html,
  };
}

export function getAllGuides(): Guide[] {
  if (!fs.existsSync(GUIDE_DIR)) return [];
  return fs
    .readdirSync(GUIDE_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(readGuide)
    .sort((a, b) => a.order - b.order);
}

export function getGuide(slug: string): Guide | null {
  const file = path.join(GUIDE_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  return readGuide(`${slug}.md`);
}

export function getGuideSlugs(): string[] {
  if (!fs.existsSync(GUIDE_DIR)) return [];
  return fs
    .readdirSync(GUIDE_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}
