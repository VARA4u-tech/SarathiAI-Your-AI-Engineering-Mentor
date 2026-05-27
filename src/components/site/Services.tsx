import { motion } from "motion/react";
import orb1 from "@/assets/orb-1.jpg";
import orb2 from "@/assets/orb-2.jpg";

const services = [
  { n: "01", t: "Brand Identity", d: "Logomarks, type systems, and motion principles that hold up across every surface.", img: orb1 },
  { n: "02", t: "Web & Interactive", d: "Editorial sites and product marketing pages built with care, speed, and craft.", img: orb2 },
  { n: "03", t: "Product Design", d: "End-to-end interface design for ambitious software teams. From zero to launch.", img: orb1 },
  { n: "04", t: "Art Direction", d: "Campaigns, launches, and visual languages with a singular point of view.", img: orb2 },
];

export function Services() {
  return (
    <section id="services" className="relative py-32">
      <div className="mx-auto w-[min(92%,1200px)]">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">— Services</p>
            <h2 className="font-display text-5xl md:text-7xl text-gradient max-w-2xl leading-[1]">
              Four disciplines, one fluid practice.
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            We blur the lines between brand, product, and interactive — because the best work refuses to sit in one box.
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
