/**
 * ScrollStack — Card deck stacking effect.
 *
 * Visual: Cards are stacked like a physical deck.
 *  - Front card is fully visible.
 *  - Cards behind it peek from the top with slight offsets + scale.
 *  - As you scroll, the top card "lifts" off the deck and the next card
 *    becomes the front.
 *
 * Uses GSAP ScrollTrigger with gsap.context() for scoped, clean teardown.
 */

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Item wrapper ─────────────────────────────────────────────────────────────
interface ScrollStackItemProps {
  children: React.ReactNode;
  itemClassName?: string;
}

export const ScrollStackItem = ({ children, itemClassName = "" }: ScrollStackItemProps) => (
  <div
    className={`scroll-stack-card absolute inset-x-0 top-0 w-full rounded-3xl overflow-hidden shadow-2xl ${itemClassName}`}
    style={{
      transformOrigin: "bottom center",
      backfaceVisibility: "hidden",
      willChange: "transform, opacity",
    }}
  >
    {children}
  </div>
);

// ─── Container ────────────────────────────────────────────────────────────────
interface ScrollStackProps {
  children: React.ReactNode;
  className?: string;
  /** px each card behind is offset downward (peek effect) */
  peekOffset?: number;
  /** Scale reduction per depth level */
  itemScale?: number;
  /** vh per card — controls scroll distance per card transition */
  scrollPerCard?: number;
}

const ScrollStack = ({
  children,
  className = "",
  peekOffset = 16,
  itemScale = 0.06,
  scrollPerCard = 80,
}: ScrollStackProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const sticky = stickyRef.current;
    if (!container || !sticky) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".scroll-stack-card", sticky);
      const total = cards.length;
      if (total < 2) return;

      // ── Initial deck layout: cards stacked with peek offsets ─────────────
      // card[total-1] = top of deck (front), card[0] = bottom of deck (back)
      cards.forEach((card, i) => {
        const depth = total - 1 - i; // 0 = front, total-1 = back
        gsap.set(card, {
          zIndex: i + 1,
          y: depth * peekOffset,
          scale: 1 - depth * itemScale,
          opacity: depth > 3 ? 0 : 1, // hide very deep cards
        });
      });

      // ── Scroll-driven transitions ─────────────────────────────────────────
      // For each card transition (total - 1 transitions), we animate the
      // current front card out and promote the next card to front position.
      const scrollDistance = total * (scrollPerCard / 100) * window.innerHeight;

      // Pin the sticky deck while we scroll through all card transitions
      ScrollTrigger.create({
        trigger: container,
        start: "top top+=18vh",
        end: `+=${scrollDistance}`,
        pin: sticky,
        pinSpacing: true,
        invalidateOnRefresh: true,
      });

      // For each step (removing card from top of deck)
      for (let step = 0; step < total - 1; step++) {
        // The card being removed from the front at this step
        // Front = index total-1, then total-2, etc.
        const frontIdx = total - 1 - step;
        const frontCard = cards[frontIdx];

        const stepStart = (step / (total - 1)) * scrollDistance;
        const stepEnd = ((step + 1) / (total - 1)) * scrollDistance;

        // 1. Fly the front card up and out
        gsap.to(frontCard, {
          y: "-120%",
          opacity: 0,
          scale: 0.8,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: `top+=${stepStart} top+=18vh`,
            end: `top+=${stepEnd} top+=18vh`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // 2. Promote ALL remaining cards forward (reduce their depth by 1)
        for (let j = 0; j < frontIdx; j++) {
          const newDepth = frontIdx - 1 - j; // depth after this card is removed
          const card = cards[j];
          gsap.to(card, {
            y: newDepth * peekOffset,
            scale: 1 - newDepth * itemScale,
            opacity: newDepth > 3 ? 0 : 1,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: `top+=${stepStart} top+=18vh`,
              end: `top+=${stepEnd} top+=18vh`,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, [peekOffset, itemScale, scrollPerCard]);

  return (
    // Outer container defines scroll height
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Inner sticky deck — all cards are absolute inside here */}
      <div ref={stickyRef} className="relative w-full" style={{ height: "60vh" }}>
        {children}
      </div>
    </div>
  );
};

export default ScrollStack;
