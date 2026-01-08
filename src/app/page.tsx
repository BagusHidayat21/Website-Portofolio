import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Contact } from "@/components/sections/Contact";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <>
      <Hero />
      <Separator className="max-w-4xl mx-auto" />
      <About />
      <Separator className="max-w-4xl mx-auto" />
      <FeaturedProjects />
      <Separator className="max-w-4xl mx-auto" />
      <Contact />
    </>
  );
}
