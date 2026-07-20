import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Services } from "@/components/site/Services";
import { Work } from "@/components/site/Work";
import { Process } from "@/components/site/Process";
import { Pricing, Footer } from "@/components/site/Contact";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { Toaster } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CodePilot AI — Your AI Engineering Team" },
      {
        name: "description",
        content:
          "An AI-powered Engineering Operating System that understands entire repositories, explains architecture, finds code, generates documentation, plans features, debugs applications, and helps developers build software faster.",
      },
      { property: "og:title", content: "CodePilot AI — Your AI Engineering Team" },
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
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&display=swap",
      },
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
      <Pricing />
      <Footer />
      <Toaster theme="dark" position="bottom-center" />
    </main>
  );
}
