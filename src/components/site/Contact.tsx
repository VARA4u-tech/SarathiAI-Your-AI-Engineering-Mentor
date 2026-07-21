import { motion } from "motion/react";
import orb2 from "@/assets/orb-2.jpg";

const benefitsList = [
  {
    title: "10x Faster Shipping",
    desc: "Automate repetitive tasks, boilerplate generation, and complex refactors so you can focus on core logic.",
    icon: "🚀",
  },
  {
    title: "Zero Context Switching",
    desc: "Everything you need from planning to debugging is natively integrated into your IDE workflow.",
    icon: "🧠",
  },
  {
    title: "Unmatched Code Quality",
    desc: "AI catches edge cases, suggests optimizations, and writes comprehensive tests before you even merge.",
    icon: "✨",
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="relative py-32 overflow-hidden">
      {/* Replaced heavy blurred image with a high-performance CSS radial gradient */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none transform-gpu" />
      <div className="relative mx-auto w-[min(96%,1200px)] text-center">
        <h2 className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.95] text-gradient mb-4">
          Built for teams that
          <br />
          <span className="italic text-iridescent">demand excellence.</span>
        </h2>
        <p className="mt-4 text-muted-foreground max-w-md mx-auto mb-16">
          Experience a paradigm shift in how your engineering organization operates.
        </p>

        <div className="grid md:grid-cols-3 gap-6 text-left">
          {benefitsList.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass rounded-3xl p-8 md:p-10 relative overflow-hidden group hover:border-foreground/20 transition-colors transform-gpu"
            >
              <div className="absolute top-0 right-8 bg-gradient-to-b from-foreground/10 to-transparent w-16 h-32 blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-4xl mb-6">{b.icon}</div>
              <h3 className="font-display text-2xl mb-4 text-foreground">{b.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {b.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto w-[min(96%,1200px)] flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 font-display text-lg text-foreground">
          <span className="size-2 rounded-full bg-gradient-to-br from-fuchsia-400 to-cyan-400" />
          CodePilot AI
        </div>
        <p>© {new Date().getFullYear()} CodePilot AI. All rights reserved.</p>
        <div className="flex gap-5">
          <a href="#" className="hover:text-foreground">
            Terms
          </a>
          <a href="#" className="hover:text-foreground">
            Privacy
          </a>
          <a href="#" className="hover:text-foreground">
            Twitter
          </a>
          <a href="#" className="hover:text-foreground">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
