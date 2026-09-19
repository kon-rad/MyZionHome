// Gallery media manifest. Photos live in public/media/gallery/, the hero video in
// public/media/. Add an entry here to show a new photo.
//
// Video items: set `type: "video"`, `src` to the .mp4 path, and `poster` to a
// still image. Image items: set `type: "image"` and `src`.

export type MediaCategory =
  | "Exterior & Drone"
  | "Living"
  | "Kitchen"
  | "Bedrooms"
  | "Bathrooms"
  | "Outdoors";

export type MediaItem = {
  id: string;
  type: "image" | "video";
  src: string;
  poster?: string;
  category: MediaCategory;
  caption: string;
  span?: "wide" | "tall" | "big"; // editorial grid emphasis
};

export const HERO_VIDEO = {
  src: "/media/drone-hero.mp4",
  poster: "/media/hero-poster.jpg",
};

const img = (
  file: string,
  category: MediaCategory,
  caption: string,
  span?: MediaItem["span"]
): MediaItem => ({
  id: file,
  type: "image",
  src: `/media/gallery/${file}.jpg`,
  category,
  caption,
  ...(span ? { span } : {}),
});

export const GALLERY: MediaItem[] = [
  {
    id: "drone-hero",
    type: "video",
    src: HERO_VIDEO.src,
    poster: HERO_VIDEO.poster,
    category: "Exterior & Drone",
    caption: "Drone flight over the property",
    span: "big",
  },

  // Exterior & Drone
  img("drone-0093", "Exterior & Drone", "Lake Michigan on the horizon, woods and fields below", "wide"),
  img("drone-0081", "Exterior & Drone", "The neighbourhood from above"),
  img("drone-0103", "Exterior & Drone", "The roundabout near the house", "tall"),
  img("drone-0126", "Exterior & Drone", "The house tucked into the trees", "wide"),
  img("drone-0132", "Exterior & Drone", "The house from the air"),
  img("drone-0137", "Exterior & Drone", "Rear deck seen from above", "wide"),
  img("home-052", "Exterior & Drone", "Front of the house", "wide"),
  img("home-053", "Exterior & Drone", "Front door"),
  img("home-057", "Exterior & Drone", "The house from the side yard"),

  // Living
  img("home-001", "Living", "Living room with hammock chair", "wide"),
  img("home-003", "Living", "Living room and stone fireplace", "wide"),
  img("home-005", "Living", "Futon, hammock chair and picture window"),
  img("home-002", "Living", "Dining table and futon"),
  img("home-004", "Living", "Dining area with built-in hutch"),
  img("home-011", "Living", "Dining and lounge"),
  img("home-006", "Living", "Reading nook with a papasan chair and bookshelves"),
  img("home-029", "Living", "Meditation corner by the window", "tall"),
  img("home-039", "Living", "Hammock chair and bookshelf", "tall"),

  // Kitchen
  img("home-007", "Kitchen", "Kitchen with gas range and stainless appliances", "wide"),
  img("home-009", "Kitchen", "Kitchen island and stone fireplace", "wide"),
  img("home-008", "Kitchen", "Kitchen and breakfast nook"),
  img("home-010", "Kitchen", "Stone hearth in the kitchen"),
  img("home-032", "Kitchen", "Hanging pots and a window over the counter", "tall"),
  img("home-036", "Kitchen", "Breakfast bar", "tall"),
  img("home-031", "Kitchen", "Kitchen counter and coffee maker", "tall"),

  // Bedrooms
  img("home-012", "Bedrooms", "Bedroom with a desk and navy bedding", "wide"),
  img("home-014", "Bedrooms", "Bedroom, desk and closet"),
  img("home-019", "Bedrooms", "Bedroom with mountain tapestry and hardwood floors", "wide"),
  img("home-020", "Bedrooms", "Bedroom with desk and reading lamp"),
  img("home-021", "Bedrooms", "Bedroom with dresser and mirror"),
  img("home-024", "Bedrooms", "Bedroom with standing desk and dual monitors", "wide"),
  img("home-026", "Bedrooms", "Bedroom with a striped blanket"),
  img("home-041", "Bedrooms", "Bedroom desk by the window", "tall"),
  img("home-044", "Bedrooms", "Bedroom with blue bedding and tapestry", "tall"),
  img("home-046", "Bedrooms", "Dresser and full-length mirror", "tall"),

  // Bathrooms
  img("home-015", "Bathrooms", "Bathroom with tub and shower"),
  img("home-016", "Bathrooms", "Bathroom vanity"),
  img("home-023", "Bathrooms", "Bathroom with walk-in shower", "tall"),

  // Outdoors
  img("home-055", "Outdoors", "Back deck and fire pit", "wide"),
  img("home-054", "Outdoors", "Deck steps and back door"),
  img("home-056", "Outdoors", "Driveway, shed and detached garage", "wide"),
];

export const GALLERY_CATEGORIES: MediaCategory[] = [
  "Exterior & Drone",
  "Living",
  "Kitchen",
  "Bedrooms",
  "Bathrooms",
  "Outdoors",
];
