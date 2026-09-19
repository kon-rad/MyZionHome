# Media drop-in

Replace the placeholders with real photos and the drone video.

## Drone hero video
Drop your drone flyover here as:

    public/media/drone-hero.mp4

Recommended: 1080p (or 720p) H.264 MP4, 15 to 40 seconds, silent, loops cleanly.
It plays muted and looping in the hero and as the first tile in the gallery.
Add a still frame as `public/media/gallery/exterior-01.svg` replacement (or point
`HERO_VIDEO.poster` in `lib/media.ts` at a real `.jpg`).

## Photos
Drop real images into `public/media/gallery/` (jpg, png, or webp). Then open
`lib/media.ts` and update each item's `src` (and `poster` for videos) to point at
your files. You can add or remove items freely; `span` controls grid emphasis
(`"big"`, `"wide"`, `"tall"`, or omit for a normal tile).

Guidebook hero images are set per-guide in the frontmatter `image:` field inside
`content/guidebook/*.md`.

The SVG files currently here are generated placeholders (see
`scripts/gen-placeholders.mjs`). Delete them once you have real media.
