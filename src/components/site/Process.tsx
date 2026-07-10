const steps = [
  { n: "01", t: "Discover", d: "We immerse in your category, your team, your ambition. Strategy is the foundation." },
  { n: "02", t: "Define", d: "A sharp creative direction with the look, voice, and motion principles agreed before pixels." },
  { n: "03", t: "Design", d: "Iterative craft cycles. Tight feedback. Living systems — not static deliverables." },
  { n: "04", t: "Deliver", d: "Build, polish, ship. Then partner with you on what comes after launch." },
];

export function Process() {
  return (
    <section id="process" className="py-32 border-t border-border">
      <div className="mx-auto w-[min(92%,1200px)]">
        <p data-reveal="fade" className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">— Process</p>
        <h2 data-reveal="lines" className="font-display text-5xl md:text-7xl text-gradient max-w-3xl leading-[1] mb-20">
          A rhythm built for momentum.
        </h2>

        <div className="grid md:grid-cols-4 gap-px bg-border rounded-3xl overflow-hidden">
          {steps.map((s) => (
            <div key={s.n} className="bg-background p-8 md:p-10 hover:bg-card transition">
              <div className="font-display text-iridescent text-5xl mb-8">{s.n}</div>
              <h3 className="font-display text-2xl mb-3">{s.t}</h3>
              <p className="text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
