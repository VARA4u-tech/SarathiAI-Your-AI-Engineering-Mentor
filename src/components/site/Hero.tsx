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
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-muted-foreground mb-8"
        >
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          CodePilot AI v2.0 is live
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="font-display text-[clamp(3rem,9vw,9rem)] leading-[0.95] tracking-tight"
        >
          <span className="text-gradient">Your AI</span>
          <br />
          <span className="text-iridescent italic">engineering</span>
          <span className="text-gradient"> team.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-8 max-w-xl mx-auto text-base md:text-lg text-muted-foreground"
        >
          An AI-powered Engineering Operating System that understands entire repositories, explains
          architecture, finds code, generates documentation, plans features, debugs applications,
          and helps developers build software faster.
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
            Start engineering
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
