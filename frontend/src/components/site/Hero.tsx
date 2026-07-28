import { motion } from "motion/react";
import { lazy, Suspense } from "react";
// @ts-expect-error - Orb is a JSX component without type declarations
const Orb = lazy(() => import("@/components/ui/Orb"));

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center pt-32 pb-20 isolate">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background/90 pointer-events-none z-10" />
        <div className="absolute inset-0 noise pointer-events-none z-10" />
        <div className="absolute top-[5vh] md:top-[8vh] left-0 w-full h-full z-0">
          <Suspense
            fallback={
              <div className="absolute inset-0 w-full h-full border-4 border-yellow-500 z-50">
                Loading Orb...
              </div>
            }
          >
            <Orb hoverIntensity={0.5} rotateOnHover={true} hue={0} forceHoverState={false} />
          </Suspense>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-[min(96%,1200px)] text-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-3 glass rounded-full px-5 py-2 text-xs mb-8 border border-white/10 shadow-[0_0_30px_rgba(232,121,249,0.15)]"
        >
          <span className="size-2 rounded-full bg-fuchsia-400 animate-pulse shadow-[0_0_12px_rgba(232,121,249,0.9)]" />
          <span className="tracking-[0.2em] uppercase font-bold text-white/90">Introducing Sarathi.ai</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="font-display text-6xl md:text-7xl lg:text-[8rem] leading-[0.9] tracking-tight"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">Your AI</span>
          <br />
          <span className="text-iridescent italic pr-4">Engineering</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70"> Mentor.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-8 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground/90 leading-relaxed font-light"
        >
          Transform basic code into <strong className="text-white font-medium">production-ready</strong> software. Sarathi acts as your Senior Engineer—scanning architecture, fixing vulnerabilities, and charting a definitive roadmap to excellence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex items-center justify-center gap-3 pointer-events-auto"
        >
          <a
            href="/dashboard"
            className="rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition"
          >
            Review My Project
          </a>
          <a
            href="#features"
            className="rounded-full glass px-6 py-3 text-sm hover:bg-white/10 transition"
          >
            View capabilities →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
