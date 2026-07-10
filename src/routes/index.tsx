import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Services } from "@/components/site/Services";
import { Work } from "@/components/site/Work";
import { Process } from "@/components/site/Process";
import { Contact, Footer } from "@/components/site/Contact";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { PageOverlay } from "@/components/site/PageOverlay";
import { ScrollReveals } from "@/components/site/ScrollReveals";
import { MagneticCursor } from "@/components/site/MagneticCursor";
import { Toaster } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fluidic — A studio for fluid brand & interactive design" },
      { name: "description", content: "Fluidic is a design studio crafting brand systems, websites, and product experiences for ambitious teams." },
      { property: "og:title", content: "Fluidic — Design that flows" },
      { property: "og:description", content: "Brand, web, and product design for companies who refuse to look ordinary." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&display=swap" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      <SmoothScroll />
      <Nav />
      <Hero />
      <Marquee />
      <Services />
      <Work />
      <Process />
      <Contact />
      <Footer />
      <Toaster theme="dark" position="bottom-center" />
    </main>
  );
}
