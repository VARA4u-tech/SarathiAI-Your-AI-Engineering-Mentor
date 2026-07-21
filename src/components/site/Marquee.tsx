const items = [
  "System Architecture",
  "Rapid Prototyping",
  "Automated Testing",
  "Code Generation",
  "Bug Squashing",
  "Performance Tuning",
  "Security Auditing",
  "Cloud Deployment",
];

export function Marquee() {
  return (
    <section className="relative py-24 overflow-hidden flex flex-col items-center bg-transparent z-10">
      <div className="mb-12 flex flex-col items-center gap-4">
         <p className="uppercase tracking-[0.3em] text-xs font-semibold text-muted-foreground/60">Core Engineering Capabilities</p>
         <div className="w-12 h-[1px] bg-white/10"></div>
      </div>
      
      {/* Edge fade mask */}
      <div 
        className="w-full max-w-[100vw] overflow-hidden" 
        style={{ 
          maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)", 
          WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)" 
        }}
      >
        <div className="animate-marquee flex w-max will-change-transform transform-gpu">
          {/* Copy 1 */}
          <div className="flex shrink-0 items-center">
            {items.map((n, i) => (
              <div key={`a-${i}`} className="flex items-center px-8 md:px-12">
                <span className="font-display italic text-5xl md:text-6xl text-white/70 hover:text-white transition-colors duration-500 cursor-default">
                  {n}
                </span>
                <span className="ml-16 md:ml-24 text-fuchsia-500 text-3xl md:text-4xl drop-shadow-[0_0_15px_rgba(217,70,239,0.5)]">✦</span>
              </div>
            ))}
          </div>
          {/* Copy 2 - For seamless looping */}
          <div className="flex shrink-0 items-center" aria-hidden="true">
            {items.map((n, i) => (
              <div key={`b-${i}`} className="flex items-center px-8 md:px-12">
                <span className="font-display italic text-5xl md:text-6xl text-white/70 hover:text-white transition-colors duration-500 cursor-default">
                  {n}
                </span>
                <span className="ml-16 md:ml-24 text-fuchsia-500 text-3xl md:text-4xl drop-shadow-[0_0_15px_rgba(217,70,239,0.5)]">✦</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
