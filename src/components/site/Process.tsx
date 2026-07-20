const steps = [
  {
    n: "01",
    t: "Accelerate",
    d: "Offload boilerplate, refactoring, and documentation to AI so you can focus on hard problems.",
  },
  {
    n: "02",
    t: "Understand",
    d: "Get instant answers about your architecture without digging through thousands of files.",
  },
  {
    n: "03",
    t: "Refactor",
    d: "Automatically identify and fix anti-patterns before they become systemic issues.",
  },
  {
    n: "04",
    t: "Ship",
    d: "Generate edge-case tests and review your code instantly before merging.",
  },
];

export function Process() {
  return (
    <section id="benefits" className="py-32 border-t border-border">
      <div className="mx-auto w-[min(96%,1200px)]">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">— Benefits</p>
        <h2 className="font-display text-5xl md:text-7xl text-gradient max-w-3xl leading-[1] mb-20">
          Build better software, <span className="italic text-iridescent">faster</span>.
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
