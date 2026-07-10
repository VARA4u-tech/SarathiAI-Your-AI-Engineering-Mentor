import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Award-style scroll reveals:
 *  - [data-reveal="mask"]  → image/section unmasks from bottom via clip-path
 *  - [data-reveal="lines"] → child words rise from below with stagger
 *  - [data-reveal="fade"]  → subtle fade + rise
 */
export function ScrollReveals() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Mask reveals
      gsap.utils.toArray<HTMLElement>('[data-reveal="mask"]').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 82%" },
          }
        );
      });

      // Line/word reveals — split simple words on spaces
      gsap.utils.toArray<HTMLElement>('[data-reveal="lines"]').forEach((el) => {
        if (!el.dataset.split) {
          const words = el.textContent?.split(/(\s+)/) ?? [];
          el.textContent = "";
          words.forEach((w) => {
            if (/^\s+$/.test(w)) {
              el.appendChild(document.createTextNode(w));
            } else {
              const outer = document.createElement("span");
              outer.style.display = "inline-block";
              outer.style.overflow = "hidden";
              outer.style.verticalAlign = "bottom";
              const inner = document.createElement("span");
              inner.style.display = "inline-block";
              inner.style.willChange = "transform";
              inner.textContent = w;
              outer.appendChild(inner);
              el.appendChild(outer);
            }
          });
          el.dataset.split = "1";
        }
        const inners = el.querySelectorAll<HTMLElement>("span > span");
        gsap.fromTo(
          inners,
          { yPercent: 115 },
          {
            yPercent: 0,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.06,
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });

      // Fade + rise
      gsap.utils.toArray<HTMLElement>('[data-reveal="fade"]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });
    });

    // let the DOM & Lenis settle, then refresh triggers
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      window.clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return null;
}
