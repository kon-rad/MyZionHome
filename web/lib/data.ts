// Structured listing data. Safe to import from client or server components.

export const SITE = {
  name: "NatureHouse",
  tagline: "Where style meets serenity.",
  pitch:
    "A refined escape on 6 private acres in Zion, Illinois. Fast WiFi, forest trails, and quiet spots for reflection.",
  location: "Zion, Illinois",
  rating: 4.68,
  reviewCount: 112,
  guests: 6,
  bedrooms: 3,
  beds: 3,
  baths: 2,
  airbnbUrl: "https://www.airbnb.com/rooms/52111402",
  repoUrl: "https://github.com/kon-rad/MyZionHome",
  // Approximate map center (exact location provided after booking).
  approxLat: 42.47,
  approxLng: -87.9,
} as const;

export const HIGHLIGHTS = [
  {
    title: "Self check-in",
    body: "Let yourself in any time after 3 PM with the smart-lock key code.",
    icon: "key",
  },
  {
    title: "Extra spacious",
    body: "Single-level home for six across three bedrooms, with room to spread out.",
    icon: "expand",
  },
  {
    title: "Peace & quiet",
    body: "Six private acres, far from neighbors, corn fields on one side.",
    icon: "leaf",
  },
] as const;

export const BEDROOMS = [
  {
    name: "Bedroom 1",
    detail: "1 queen bed",
    note: "Standing desk, dual monitor, and a Casper mattress. Built for remote work.",
  },
  {
    name: "Bedroom 2 · Master",
    detail: "1 queen bed",
    note: "Private ensuite bathroom with a shower.",
  },
  {
    name: "Bedroom 3",
    detail: "1 double bed",
    note: "Room-darkening shades and a quiet corner.",
  },
  {
    name: "Living room",
    detail: "Couch + reading chair",
    note: "The hammock swing chair guests fall asleep in. Books and cozy blankets.",
  },
] as const;

export const AMENITY_GROUPS = [
  {
    label: "Work & connectivity",
    items: [
      "Fast WiFi",
      "Dedicated workspace in a room with a door",
      "Standing desk + dual monitor",
      "Ergonomic desks in bedrooms",
    ],
  },
  {
    label: "Kitchen & dining",
    items: [
      "Full kitchen, gas stove & oven",
      "Dishwasher & refrigerator",
      "Coffee maker + moka pot",
      "Kettle, toaster, blender",
      "Dishes, cookware & basics",
      "Dining table",
    ],
  },
  {
    label: "Comfort",
    items: [
      "43\" HDTV · Apple TV · Roku",
      "Sonos sound system",
      "Window AC + central heating",
      "Room-darkening shades",
      "Free washer & dryer",
      "Fresh linens & towels",
    ],
  },
  {
    label: "Outdoors",
    items: [
      "6 private acres & forest trail",
      "Private backyard & patio",
      "Fire pit",
      "Hammock swing chair",
      "Large deck & outdoor dining",
      "Scenic park views",
    ],
  },
  {
    label: "Access & safety",
    items: [
      "Self check-in · smart lock",
      "Free parking on premises",
      "Single-level, no stairs",
      "Exterior security cameras",
      "Smoke & CO alarms",
      "Fire extinguisher & first aid",
    ],
  },
  {
    label: "Services",
    items: [
      "Long-term stays (28+ days)",
      "Private entrance",
      "100% host response rate",
      "Responds within an hour",
    ],
  },
] as const;

export const DRIVE_TIMES = [
  { place: "North Point Marina", min: 10 },
  { place: "Kenosha, WI", min: 16 },
  { place: "Illinois Beach State Park", min: 17 },
  { place: "Six Flags Great America", min: 18 },
  { place: "Great Lakes Naval Base", min: 27 },
  { place: "Lake Geneva, WI", min: 44 },
  { place: "Milwaukee, WI", min: 46 },
  { place: "Chicago, IL", min: 55 },
] as const;

export const RATING_BREAKDOWN = [
  { label: "Cleanliness", score: 4.7 },
  { label: "Accuracy", score: 4.8 },
  { label: "Check-in", score: 4.9 },
  { label: "Communication", score: 4.9 },
  { label: "Location", score: 4.8 },
  { label: "Value", score: 4.6 },
] as const;

export const REVIEWS = [
  {
    name: "Andrea",
    from: "Chicago, Illinois",
    date: "November 2021",
    stars: 5,
    text: "Perfect for a weekend retreat away from the city. We enjoyed quiet meditations, reading and appreciating the fall beauty of the surrounding property. Check-in was easy and great communication when we needed it.",
  },
  {
    name: "Lisa",
    from: "Logan, Utah",
    date: "October 2021",
    stars: 5,
    text: "We LOVED this house, and the location was great too. Away from all the noise and people of the city. The house is quite spacious, with plenty of places to sit and relax. We especially enjoyed the hammock swing.",
  },
  {
    name: "Susan",
    from: "Bartlesville, Oklahoma",
    date: "September 2025",
    stars: 5,
    text: "Beautiful location with a very large peaceful, private yard. Very spacious inside and out. Great location about halfway between Great Lakes RTC and Kenosha. If you are looking for a peaceful spot to relax and unwind, this is it.",
  },
  {
    name: "Jess & Ben",
    from: "Manhattan, Montana",
    date: "July 2025",
    stars: 5,
    text: "We were on a cross-country trip. Konrad's place was a perfect place to rest for a few nights while we visited Six Flags. The 3 bedrooms were all amazing and had great beds. Plenty of room for our kids to stretch their legs.",
  },
  {
    name: "Martin",
    from: "Brooklet, Georgia",
    date: "August 2024",
    stars: 5,
    text: "Very serene, especially if you plan to work or relax outside in the backyard among the trees. I highly recommend it, especially for an upcoming navy graduation. It's only 20 minutes from the base and an hour from Chicago.",
  },
  {
    name: "Jennifer",
    from: "Summers, Arkansas",
    date: "February 2026",
    stars: 5,
    text: "We really enjoyed our stay. Loved the swing chair in the living area. I think every time I sat in it I fell asleep. Close to some pretty great restaurants. Thank you so much for letting us stay at your place.",
  },
] as const;

export const HOST = {
  name: "Konrad",
  years: 5,
  reviews: 134,
  rating: 4.7,
  responseRate: "100%",
  responseTime: "within an hour",
  bio: "Software engineer, entrepreneur, global citizen. University of Illinois at Chicago.",
} as const;

export const HOUSE_RULES = [
  "Check-in after 3:00 PM",
  "Checkout before 11:00 AM",
  "6 guests maximum",
  "No parties",
] as const;
