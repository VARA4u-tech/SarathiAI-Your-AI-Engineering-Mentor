import { motion } from "motion/react";
import hero from "@/assets/hero-fluid.jpg";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center pt-32 pb-20">
      <div className="absolute inset-0 -z-10">
        <img src={hero} alt="" width={1920} height={1080}
          className="absolute inset-0 w-full h-full object-cover opacity-60 animate-float-slow" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        <div className="absolute inset-0 noise" />
      </div>

      <div className="relative mx-auto w-[min(92%,1200px)] text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-muted-foreground mb-8">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Now accepting Q3 projects
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="font-display text-[clamp(3rem,9vw,9rem)] leading-[0.95] tracking-tight">
          <span className="text-gradient">Designs that</span>
          <br />
          <span className="text-iridescent italic">flow into</span>
          <span className="text-gradient"> motion.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-8 max-w-xl mx-auto text-base md:text-lg text-muted-foreground">
          A studio crafting fluid brand systems, websites, and product
          experiences for companies who refuse to look ordinary.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex items-center justify-center gap-3">
          <a href="#work" className="rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition">
            View selected work
          </a>
          <a href="#contact" className="rounded-full glass px-6 py-3 text-sm hover:bg-white/10 transition">
            Book a call →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
