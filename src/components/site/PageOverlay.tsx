import { useEffect, useRef } from "react";
import gsap from "gsap";

export function PageOverlay() {
  const rootRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const word = wordRef.current;
    const panels = panelsRef.current;
    if (!root || !word || !panels) return;

    // lock scroll during intro
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const chars = word.querySelectorAll<HTMLSpanElement>("[data-char]");
    const panelEls = panels.querySelectorAll<HTMLDivElement>("[data-panel]");

    const tl = gsap.timeline({
      defaults: { ease: "expo.inOut" },
      onComplete: () => {
        document.body.style.overflow = prevOverflow;
        root.style.display = "none";
      },
    });

    tl.set(chars, { yPercent: 120, opacity: 0 })
      .set(panelEls, { yPercent: 0 })
      .to(chars, {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        stagger: 0.05,
        ease: "expo.out",
      })
      .to(
        chars,
        { yPercent: -120, opacity: 0, duration: 0.9, stagger: 0.03, ease: "expo.in" },
        "+=0.55"
      )
      .to(
        panelEls,
        { yPercent: -101, duration: 1.15, stagger: 0.08 },
        "-=0.4"
      );

    return () => {
      tl.kill();
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const brand = "FLUIDIC";

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] pointer-events-none"
      aria-hidden="true"
    >
      <div ref={panelsRef} className="absolute inset-0 flex">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            data-panel
            className="flex-1 h-full bg-background border-r border-white/[0.04] last:border-r-0"
          />
        ))}
      </div>
      <div className="absolute inset-0 grid place-items-center">
        <span
          ref={wordRef}
          className="font-display text-iridescent text-[clamp(3rem,12vw,10rem)] leading-none tracking-tight flex overflow-hidden"
        >
          {brand.split("").map((c, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <span data-char className="inline-block will-change-transform">
                {c}
              </span>
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
