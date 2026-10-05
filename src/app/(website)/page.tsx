import { Hero } from "@/components/sections/Hero";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { About } from "@/components/sections/About";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { techStackData } from "@/data/static-db";

export default function Home() {
  const marqueeItems = techStackData
    .filter((tech) => tech.inMarquee && tech.isVisible)
    .sort((a, b) => a.order - b.order)
    .map((tech) => tech.name);

  return (
    <>
      <Hero />
      <TechMarquee items={marqueeItems} />
      <About />
      <FeaturedProjects />
      <Experience />
      <Contact />
    </>
  );
}
