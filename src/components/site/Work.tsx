import { motion } from "motion/react";
import orb1 from "@/assets/orb-1.jpg";
import orb2 from "@/assets/orb-2.jpg";
import hero from "@/assets/hero-fluid.jpg";
import ScrollStack, { ScrollStackItem } from "../ui/ScrollStack";

const projects = [
  { t: "Import & Analyze", c: "Step 01", img: hero, year: "Knowledge Graph" },
  { t: "Plan & Architect", c: "Step 02", img: orb1, year: "Feature Planner" },
  { t: "Code & Debug", c: "Step 03", img: orb2, year: "Unified Workspace" },
];

export function Work() {
  return (
    <section id="how-it-works" className="py-32">
      <div className="mx-auto w-[min(96%,1200px)]">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">— How it works</p>
        <h2 className="font-display text-5xl md:text-7xl text-gradient mb-16 max-w-3xl leading-[1]">
          Import your repository <span className="italic text-iridescent">and start building</span> instantly.
        </h2>

        <ScrollStack useWindowScroll={true} stackPosition="25%" blurAmount={5} itemDistance={60}>
          {projects.map((p, i) => (
            <ScrollStackItem key={p.t}>
              <div
                className="group block relative overflow-hidden rounded-3xl"
              >
                <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden">
                  <img src={p.img} alt={p.t} loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-[1200ms]" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                  <div className="flex items-end justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">{p.c} · {p.year}</p>
                      <h3 className="font-display text-4xl md:text-6xl">{p.t}</h3>
                    </div>
                    <span className="glass rounded-full px-5 py-2 text-sm group-hover:bg-foreground group-hover:text-background transition">
                      Explore feature →
                    </span>
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}
