import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Zap, BrainCircuit, Wrench, Rocket } from "lucide-react";

const steps = [
  {
    n: "01",
    t: "Accelerate",
    d: "Offload boilerplate, refactoring, and documentation to AI so you can focus on hard problems.",
    color: "from-blue-500/10 to-purple-500/10",
    glow: "bg-blue-500",
    icon: Zap,
  },
  {
    n: "02",
    t: "Understand",
    d: "Get instant answers about your architecture without digging through thousands of files.",
    color: "from-purple-500/10 to-pink-500/10",
    glow: "bg-purple-500",
    icon: BrainCircuit,
  },
  {
    n: "03",
    t: "Refactor",
    d: "Automatically identify and fix anti-patterns before they become systemic issues.",
    color: "from-pink-500/10 to-orange-500/10",
    glow: "bg-pink-500",
    icon: Wrench,
  },
  {
    n: "04",
    t: "Ship",
    d: "Generate edge-case tests and review your code instantly before merging.",
    color: "from-orange-500/10 to-red-500/10",
    glow: "bg-orange-500",
    icon: Rocket,
  },
];

export function Process() {
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardsContainerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="benefits" className="relative bg-background">
      <div className="mx-auto w-[min(96%,1200px)] py-32 md:py-48">
        {/* Title Area */}
        <div className="sticky top-[15vh] z-0 mb-[20vh] md:mb-[30vh]">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
            — Benefits
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-gradient max-w-3xl leading-[1]">
            Build better software, <span className="italic text-iridescent">faster</span>.
          </h2>
        </div>

        {/* Sticky Stacking Cards Area */}
        <div ref={cardsContainerRef} className="relative z-10">
          {steps.map((step, index) => (
            <ProcessCard key={step.n} step={step} index={index} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

type ProcessCardProps = {
  step: (typeof steps)[number];
  index: number;
  scrollYProgress: MotionValue<number>;
};

function ProcessCard({ step, index, scrollYProgress }: ProcessCardProps) {
  const progressStart = index * (1 / (steps.length - 1));
  const targetScale = 1 - (steps.length - 1 - index) * 0.05;
  const scale = useTransform(scrollYProgress, [progressStart, 1], [1, targetScale]);
  const overlayOpacity = useTransform(scrollYProgress, [progressStart, 1], [0, 0.6]);
  const Icon = step.icon;

  return (
    <div className="sticky top-0 flex items-start justify-center w-full h-screen">
      <motion.div
        style={{
          scale,
          top: `calc(15vh + ${index * 40}px)`,
        }}
        className={`absolute w-full h-[400px] md:h-[500px] bg-gradient-to-br ${step.color} bg-background border border-white/10 rounded-[2.5rem] glass overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/5`}
      >
        {/* Top Inner Highlight for Glass Effect */}
        <div className="absolute inset-0 rounded-[2.5rem] pointer-events-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]" />

        {/* Darkening overlay for 3D depth */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-black z-20 pointer-events-none rounded-[2.5rem]"
        />

        {/* Giant Watermark */}
        <div className="absolute -right-4 -bottom-10 md:-right-10 md:-bottom-20 text-[12rem] md:text-[20rem] font-display text-white/[0.02] font-bold select-none leading-none z-0">
          {step.n}
        </div>

        <div className="relative z-10 p-10 md:p-16 h-full flex flex-col md:flex-row md:items-center justify-between gap-10">
          {/* Text Content */}
          <div className="flex-1 z-10">
            <h3 className="font-display text-4xl md:text-6xl mb-6 text-white drop-shadow-lg">
              {step.t}
            </h3>
            <p className="text-lg md:text-2xl text-muted-foreground max-w-xl leading-relaxed">
              {step.d}
            </p>
          </div>

          {/* Rich Visual Art / Icon */}
          <div className="hidden md:flex flex-1 items-center justify-center relative">
            {/* Deep Background Glow */}
            <div
              className={`absolute w-64 h-64 ${step.glow} opacity-20 blur-[100px] rounded-full`}
            ></div>

            {/* Floating Glass Icon Orb */}
            <div className="relative p-10 bg-white/5 border border-white/10 rounded-full shadow-2xl backdrop-blur-xl">
              <Icon
                className={`w-32 h-32 text-white/90 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]`}
                strokeWidth={1}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
