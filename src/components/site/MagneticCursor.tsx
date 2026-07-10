import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Soft magnetic cursor + trailing dot. Award-site staple.
 * Hides on touch devices automatically.
 */
export function MagneticCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const d = dot.current;
    const r = ring.current;
    if (!d || !r) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };
    gsap.set([d, r], { xPercent: -50, yPercent: -50, opacity: 1 });

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      gsap.to(d, { x: pos.x, y: pos.y, duration: 0.15, ease: "power3.out" });
    };

    let raf = 0;
    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.12;
      ringPos.y += (pos.y - ringPos.y) * 0.12;
      gsap.set(r, { x: ringPos.x, y: ringPos.y });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const grow = () => gsap.to(r, { scale: 1.9, duration: 0.4, ease: "expo.out" });
    const shrink = () => gsap.to(r, { scale: 1, duration: 0.4, ease: "expo.out" });
    const targets = document.querySelectorAll("a, button, [data-cursor]");
    targets.forEach((t) => {
      t.addEventListener("mouseenter", grow);
      t.addEventListener("mouseleave", shrink);
    });

    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      targets.forEach((t) => {
        t.removeEventListener("mouseenter", grow);
        t.removeEventListener("mouseleave", shrink);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        className="fixed left-0 top-0 z-[90] size-9 rounded-full border border-white/50 pointer-events-none opacity-0 mix-blend-difference hidden md:block"
      />
      <div
        ref={dot}
        className="fixed left-0 top-0 z-[91] size-1.5 rounded-full bg-white pointer-events-none opacity-0 mix-blend-difference hidden md:block"
      />
    </>
  );
}
