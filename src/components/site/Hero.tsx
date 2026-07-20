import { motion } from "motion/react";
import LightPillar from "../ui/LightPillar";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center pt-32 pb-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        <div className="absolute inset-0">
          <LightPillar
            topColor="#FF9FFC"
            bottomColor="#5227FF"
            intensity={0.8}
            rotationSpeed={0.3}
            glowAmount={0.002}
            pillarWidth={1.5}
            pillarHeight={0.3}
            noiseIntensity={0.4}
            pillarRotation={25}
            interactive={false}
            mixBlendMode="screen"
            quality="low"
          />
        </div>
        <div className="absolute inset-0 noise" />
      </div>

      <div className="relative z-10 mx-auto w-[min(96%,1200px)] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        <div className="text-left">
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
            className="font-display text-[clamp(3rem,6vw,6rem)] leading-[1.05] tracking-tight text-white"
          >
            Your AI<br />
            <span className="italic">engineering</span><br />
            team.
          </motion.h1>
        </div>

        <div className="text-left lg:pl-12">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-base md:text-lg text-white/90"
          >
            An AI-powered Engineering Operating System that understands entire repositories, explains
            architecture, finds code, generates documentation, plans features, debugs applications,
            and helps developers build software faster.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex items-center justify-start gap-3"
          >
            <a
              href="/dashboard"
              className="rounded-full bg-white text-black px-6 py-3 text-sm font-medium hover:opacity-90 transition"
            >
              Start engineering
            </a>
            <a
              href="#features"
              className="rounded-full glass px-6 py-3 text-sm hover:bg-white/10 text-white transition"
            >
              View capabilities →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
