import { motion } from "motion/react";
import { Brain, Map, Bug, Zap } from "lucide-react";
import orb1 from "@/assets/orb-1.jpg";
import orb2 from "@/assets/orb-2.jpg";
import hero from "@/assets/hero-fluid.jpg";
import CardSwap, { Card } from "../ui/CardSwap";

const features = [
  {
    n: "01",
    t: "Repository Intelligence",
    d: "Understands your entire codebase, dependencies, and architecture instantly.",
    icon: Brain,
  },
  {
    n: "02",
    t: "Feature Planner",
    d: "Automatically break down features into actionable steps and risk analysis.",
    icon: Map,
  },
  {
    n: "03",
    t: "Debug & Test Center",
    d: "Paste errors and get instant root cause analysis with suggested fixes.",
    icon: Bug,
  },
  {
    n: "04",
    t: "AI Code Generation",
    d: "Generate boilerplate, API routes, and components that match your existing design system.",
    icon: Zap,
  },
];

const cards = [
  { step: "Step 01", title: "Knowledge Graph", sub: "Repository Intelligence", img: hero,  grad: "from-fuchsia-900/70 to-violet-900/70" },
  { step: "Step 02", title: "Feature Planner",  sub: "Planning & Architecture",  img: orb1,  grad: "from-cyan-900/70 to-blue-900/70" },
  { step: "Step 03", title: "Debug Center",     sub: "Error Analysis & Fixes",   img: orb2,  grad: "from-emerald-900/70 to-teal-900/70" },
  { step: "Step 04", title: "AI Generation",    sub: "Code & Documentation",     img: hero,  grad: "from-orange-900/70 to-rose-900/70" },
];


export function Services() {
  return (
    <section id="features" className="relative py-32 overflow-hidden">
      <div className="mx-auto w-[min(96%,1200px)]">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="flex items-end justify-between mb-20 flex-wrap gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">— Features</p>
            <h2 className="font-display text-5xl md:text-7xl text-gradient max-w-2xl leading-[1]">
              Everything you need to{" "}
              <span className="italic text-iridescent">ship faster.</span>
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            CodePilot AI is your central hub for repository intelligence, planning, debugging, and code generation.
          </p>
        </div>

        {/* ── Main Layout: Feature list (left) + CardSwap (right) ─────────── */}
        <div className="grid lg:grid-cols-[2fr_3fr] gap-10 items-center">

          {/* Left — feature list (compact) */}
          <div className="space-y-3">
            {features.map((f, i) => (
              <motion.div
                key={f.n}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex gap-3 items-start p-3 rounded-xl glass hover:bg-white/5 transition-colors duration-300 cursor-default"
              >
                <div className="shrink-0 w-9 h-9 rounded-lg glass flex items-center justify-center text-muted-foreground">
                  <f.icon size={16} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground mb-0.5 uppercase tracking-[0.15em]">{f.n}</p>
                  <h3 className="font-display text-base md:text-lg mb-0.5 text-foreground">{f.t}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{f.d}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right — CardSwap visual (larger) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:flex items-center justify-center"
            style={{ height: 560 }}
          >
            <CardSwap
              width={480}
              height={320}
              cardDistance={55}
              verticalDistance={60}
              delay={3500}
              pauseOnHover={true}
              skewAmount={5}
              easing="elastic"
            >
              {cards.map((c, i) => (
                <Card key={i} customClass="shadow-2xl overflow-hidden">
                  {/* Photo background */}
                  <img src={c.img} alt={c.title} className="absolute inset-0 w-full h-full object-cover" />
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${c.grad}`} />
                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <p className="text-xs uppercase tracking-widest text-white/60">{c.step}</p>
                    <div>
                      <h4 className="font-display text-3xl text-white mb-1">{c.title}</h4>
                      <p className="text-white/60 text-sm">{c.sub}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </CardSwap>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
