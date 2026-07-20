import { motion } from "motion/react";
import orb1 from "@/assets/orb-1.jpg";
import orb2 from "@/assets/orb-2.jpg";
import hero from "@/assets/hero-fluid.jpg";

const projects = [
  { t: "Lumen Labs", c: "Identity · Web", img: hero, year: "2025" },
  { t: "Atelier Nine", c: "Brand · Motion", img: orb1, year: "2025" },
  { t: "Verge Studio", c: "Product · Interactive", img: orb2, year: "2024" },
];

export function Work() {
  return (
    <section id="work" className="py-32">
      <div className="mx-auto w-[min(92%,1300px)]">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">— Selected work</p>
        <h2 className="font-display text-5xl md:text-7xl text-gradient mb-16 max-w-3xl leading-[1]">
          Recent collaborations <span className="italic text-iridescent">with</span> good people.
        </h2>

        <div className="space-y-6">
          {projects.map((p, i) => (
            <motion.a
              href="#"
              key={p.t}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group block relative overflow-hidden rounded-3xl"
            >
              <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden">
                <img src={p.img} alt={p.t} loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-[1200ms]" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                <div className="flex items-end justify-between flex-wrap gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">{p.c} · {p.year}</p>
                    <h3 className="font-display text-4xl md:text-6xl">{p.t}</h3>
                  </div>
                  <span className="glass rounded-full px-5 py-2 text-sm group-hover:bg-foreground group-hover:text-background transition">
                    View case →
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
