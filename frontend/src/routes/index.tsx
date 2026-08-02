import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Services } from "@/components/site/Services";
import { Work } from "@/components/site/Work";
import { Process } from "@/components/site/Process";
import { FaqSection } from "@/components/site/FaqSection";
import { Footer } from "@/components/site/Contact";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Toaster } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sarathi.ai — Your AI Engineering Team" },
      {
        name: "description",
        content:
          "An AI-powered Engineering Operating System that understands entire repositories, explains architecture, finds code, generates documentation, plans features, debugs applications, and helps developers build software faster.",
      },
      { property: "og:title", content: "Sarathi.ai — Your AI Engineering Team" },
      {
        property: "og:description",
        content:
          "An AI-powered Engineering Operating System that understands entire repositories, explains architecture, finds code, generates documentation, plans features, debugs applications, and helps developers build software faster.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-background text-foreground">
      <SmoothScroll>
        <ScrollProgress />
        <Nav />
        <Hero />
        <Marquee />
        <Services />
        <Work />
        <Process />
        <FaqSection />
        <Footer />
        <Toaster theme="dark" position="bottom-center" />
      </SmoothScroll>
    </main>
  );
}

