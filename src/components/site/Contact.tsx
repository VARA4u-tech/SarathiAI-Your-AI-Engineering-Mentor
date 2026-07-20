import { motion } from "motion/react";
import orb2 from "@/assets/orb-2.jpg";

const plans = [
  {
    name: "Pro",
    price: "$20",
    period: "/mo",
    desc: "For individual engineers building fast.",
    features: [
      "Unlimited Repositories",
      "Advanced Knowledge Graph",
      "Feature Planner",
      "Debug Center",
      "Community Support",
    ],
    button: "Get Started",
  },
  {
    name: "Team",
    price: "$99",
    period: "/mo",
    desc: "For engineering teams shipping together.",
    features: [
      "Everything in Pro",
      "Shared Workspaces",
      "Team Analytics",
      "Priority Support",
      "Custom API Limits",
    ],
    button: "Contact Sales",
    featured: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-32 overflow-hidden">
      <img
        src={orb2}
        alt=""
        loading="lazy"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] max-w-none opacity-40 blur-2xl pointer-events-none"
      />
      <div className="relative mx-auto w-[min(96%,1200px)] text-center">
        <h2 className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.95] text-gradient mb-4">
          Simple pricing for
          <br />
          <span className="italic text-iridescent">ambitious teams.</span>
        </h2>
        <p className="mt-4 text-muted-foreground max-w-md mx-auto mb-16">
          Start for free, upgrade when you need more power.
        </p>

        <div className="grid md:grid-cols-2 gap-6 text-left">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`glass rounded-3xl p-8 md:p-10 relative overflow-hidden ${p.featured ? "border-foreground/20" : ""}`}
            >
              {p.featured && (
                <div className="absolute top-0 right-8 bg-gradient-to-b from-foreground/20 to-transparent w-16 h-32 blur-2xl pointer-events-none" />
              )}
              <h3 className="font-display text-3xl mb-2">{p.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-medium tracking-tight">{p.price}</span>
                <span className="text-muted-foreground">{p.period}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
                {p.desc}
              </p>
              <ul className="space-y-4 mb-10">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <span className="size-1.5 rounded-full bg-emerald-400" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full rounded-full px-6 py-4 text-sm font-medium transition ${p.featured ? "bg-foreground text-background hover:opacity-90" : "glass hover:bg-white/10"}`}
              >
                {p.button}
              </button>
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
