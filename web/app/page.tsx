import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import About from "@/components/About";
import GalleryPreview from "@/components/GalleryPreview";
import Amenities from "@/components/Amenities";
import LocationMap from "@/components/LocationMap";
import GuidebookPreview from "@/components/GuidebookPreview";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import { getAllGuides } from "@/lib/content";

export default function Home() {
  const guides = getAllGuides();
  return (
    <main>
      <Hero />
      <Highlights />
      <About />
      <GalleryPreview />
      <Amenities />
      <LocationMap />
      <GuidebookPreview guides={guides} />
      <Reviews />
      <Footer />
    </main>
  );
}
