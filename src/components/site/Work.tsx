import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import orb1 from "@/assets/orb-1.jpg";
import orb2 from "@/assets/orb-2.jpg";
import hero from "@/assets/hero-fluid.jpg";

const projects = [
  {
    t: "Import & Analyze",
    c: "Step 01",
    img: hero,
    tags: ["Knowledge Graph", "AST Parsing", "Vector Search"],
    desc: "CodePilot instantly ingests your entire repository, mapping out every function, class, and dependency to build a comprehensive understanding of your architecture.",
  },
  {
    t: "Plan & Architect",
    c: "Step 02",
    img: orb1,
    tags: ["Feature Planner", "Dependency Tracing", "Impact Analysis"],
    desc: "Before writing a single line of code, the AI proposes a detailed implementation plan, highlighting exactly which files need to change and potential side effects.",
  },
  {
    t: "Code & Debug",
    c: "Step 03",
    img: orb2,
    tags: ["Unified Workspace", "Auto-Refactor", "Bug Squashing"],
    desc: "Seamlessly execute the plan. CodePilot writes the code, handles the refactoring, and automatically squashes bugs before they ever reach production.",
  },
  {
    t: "Deploy & Monitor",
    c: "Step 04",
    img: orb1,
    tags: ["CI/CD Pipeline", "Zero-Downtime", "Health Checks"],
    desc: "Ship with absolute confidence. CodePilot automatically provisions infrastructure, handles edge-case deployment failures, and monitors performance in real-time.",
  },
];

export function Work() {
  const targetRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (carouselRef.current) {
        // Calculate exactly how far the container needs to slide to reach the end
        setScrollRange(carouselRef.current.scrollWidth - window.innerWidth);
      }
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Dynamically translate by the exact required pixel distance
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  return (
    <section id="how-it-works" ref={targetRef} className="relative h-[400vh] bg-background">
      <div className="sticky top-0 h-screen flex flex-col items-start justify-center overflow-hidden w-full">
        <div className="w-full px-8 md:px-[calc(50vw-600px)] flex-shrink-0 z-10 mb-8 md:mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
            — How it works
          </p>
          <h2 className="font-display text-4xl md:text-6xl text-gradient max-w-3xl leading-[1]">
            Import your repository{" "}
            <span className="italic text-iridescent">and start building</span> instantly.
          </h2>
        </div>

        <motion.div
          ref={carouselRef}
          style={{ x }}
          className="flex gap-8 px-8 md:px-[calc(50vw-600px)] h-[550px] md:h-[500px] w-max will-change-transform"
        >
          {projects.map((p) => (
            <div
              key={p.t}
              className="group relative w-[90vw] md:w-[900px] h-full flex-shrink-0 rounded-[2.5rem] overflow-hidden border border-white/10 glass flex flex-col md:flex-row"
            >
              {/* Left Side: Typography & Data */}
              <div className="w-full md:w-[55%] p-8 md:p-12 flex flex-col justify-center relative overflow-hidden bg-white/[0.02]">
                {/* Giant Watermark */}
                <div className="absolute -bottom-8 -left-6 text-[10rem] md:text-[14rem] font-display text-white/[0.03] font-bold pointer-events-none select-none leading-none">
                  {p.c.split(" ")[1]}
                </div>

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-3 mb-6">
                    <span className="size-2 rounded-full bg-fuchsia-500 animate-pulse shadow-[0_0_10px_rgba(217,70,239,0.5)]" />
                    <span className="text-xs text-fuchsia-400 font-bold uppercase tracking-widest">
                      {p.c}
                    </span>
                  </div>

                  <h3 className="font-display text-4xl md:text-5xl mb-4 text-white group-hover:text-fuchsia-100 transition-colors">
                    {p.t}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-8 md:text-lg">{p.desc}</p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-muted-foreground group-hover:bg-white/10 group-hover:text-white transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className="text-sm font-semibold text-white/70 hover:text-white transition flex items-center gap-2 group/btn w-fit">
                    Explore feature{" "}
                    <span className="text-fuchsia-500 group-hover/btn:translate-x-1 transition-transform">
                      →
                    </span>
                  </button>
                </div>
              </div>

              {/* Right Side: Image Mask */}
              <div className="w-full md:w-[45%] h-full hidden md:block relative overflow-hidden bg-black/50 border-l border-white/10">
                <img
                  src={p.img}
                  alt={p.t}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition duration-[1200ms] group-hover:opacity-100"
                />
                <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.9)] pointer-events-none" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
