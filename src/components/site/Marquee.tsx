const items = ["Lumen Labs", "Northwind", "Atelier 9", "Verge", "Halcyon", "Monolith", "Parallax", "Obscura"];
export function Marquee() {
  const row = [...items, ...items];
  return (
    <section className="py-10 border-y border-border overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {row.map((n, i) => (
          <div key={i} className="flex items-center gap-16 px-8 font-display text-2xl md:text-3xl text-muted-foreground/70">
            {n}
            <span className="size-1.5 rounded-full bg-muted-foreground/40" />
          </div>
        ))}
      </div>
    </section>
  );
}
