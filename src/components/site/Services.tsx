import { motion } from "motion/react";
import orb1 from "@/assets/orb-1.jpg";
import orb2 from "@/assets/orb-2.jpg";

const services = [
  { n: "01", t: "Repository Intelligence", d: "Understands your entire codebase, dependencies, and architecture instantly.", img: orb1 },
  { n: "02", t: "Feature Planner", d: "Automatically break down features into actionable steps and risk analysis.", img: orb2 },
  { n: "03", t: "Debug & Test Center", d: "Paste errors and get instant root cause analysis with suggested fixes.", img: orb1 },
  { n: "04", t: "AI Code Generation", d: "Generate boilerplate, API routes, and components that match your existing design system.", img: orb2 },
];

export function Services() {
  return (
    <section id="features" className="relative py-32">
      <div className="mx-auto w-[min(96%,1200px)]">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">— Features</p>
            <h2 className="font-display text-5xl md:text-7xl text-gradient max-w-2xl leading-[1]">
              Everything you need to ship faster.
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            CodePilot AI is your central hub for repository intelligence, planning, debugging, and code generation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-3xl glass p-8 md:p-10 min-h-[340px] flex flex-col justify-between"
            >
              <img src={s.img} alt="" width={600} height={600} loading="lazy"
                className="absolute -right-20 -bottom-20 w-72 opacity-50 group-hover:opacity-90 group-hover:scale-110 transition duration-700" />
              <div className="relative">
                <span className="text-xs text-muted-foreground">{s.n}</span>
                <h3 className="font-display text-3xl md:text-4xl mt-3">{s.t}</h3>
              </div>
              <p className="relative text-muted-foreground max-w-sm">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
