import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export interface NavLink {
  label: string;
  href: string;
  ariaLabel?: string;
}

export interface NavItem {
  label: string;
  bgColor?: string;
  textColor?: string;
  links?: NavLink[];
}

export interface CardNavProps {
  logo?: React.ReactNode;
  logoAlt?: string;
  items?: NavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  rightAction?: React.ReactNode;
}

const CardNav = ({
  logo,
  logoAlt = "Logo",
  items,
  className = "",
  ease = "power3.out",
  baseColor = "#fff",
  menuColor,
  buttonBgColor,
  buttonTextColor,
  rightAction,
}: CardNavProps) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      const contentEl = navEl.querySelector(".card-nav-content") as HTMLElement;
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = "visible";
        contentEl.style.pointerEvents = "auto";
        contentEl.style.position = "static";
        contentEl.style.height = "auto";

        void contentEl.offsetHeight;

        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + padding;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease,
    });

    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, "-=0.1");

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div className={`card-nav-container relative w-full z-[99] ${className}`}>
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? "open" : ""} block h-[60px] p-0 rounded-2xl shadow-md relative overflow-hidden will-change-[height] glass max-md:!bg-[#080808]`}
      >
        <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between px-2 md:px-4 z-[2]">
          {/* Menu Trigger on the Left */}
          <button
            type="button"
            className="flex items-center gap-2 px-2 md:px-4 py-2 font-display text-xl transition-opacity hover:opacity-80 text-foreground"
            onClick={toggleMenu}
            aria-label={isExpanded ? "Close menu" : "Open menu"}
            aria-expanded={isExpanded}
          >
            Menu
            <div className="flex flex-col gap-[4px] w-[18px]">
              <div
                className={`h-[1.5px] bg-current transition-transform duration-300 ${isExpanded ? "translate-y-[2.75px] rotate-45" : ""}`}
              />
              <div
                className={`h-[1.5px] bg-current transition-transform duration-300 ${isExpanded ? "-translate-y-[2.75px] -rotate-45" : ""}`}
              />
            </div>
          </button>

          {/* Logo perfectly Centered */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center h-full pointer-events-auto">
            {typeof logo === "string" ? (
              <img src={logo} alt={logoAlt} className="logo h-[28px]" />
            ) : (
              logo
            )}
          </div>

          {/* Dynamic Right Action */}
          {rightAction}
        </div>

        <div
          className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col items-stretch gap-2 justify-start z-[1] ${
            isExpanded ? "visible pointer-events-auto" : "invisible pointer-events-none"
          } md:flex-row md:items-end md:gap-[12px]`}
          aria-hidden={!isExpanded}
        >
          {(items || []).slice(0, 3).map((item, idx: number) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card select-none relative flex flex-col gap-2 p-[16px_20px] rounded-[calc(0.75rem-0.2rem)] min-w-0 flex-[1_1_auto] h-auto min-h-[60px] md:h-full md:min-h-0 md:flex-[1_1_0%] glass"
              ref={setCardRef(idx)}
            >
              <div className="nav-card-label font-display text-2xl md:text-3xl text-foreground">
                {item.label}
              </div>
              <div className="nav-card-links mt-auto flex flex-col gap-[8px]">
                {item.links?.map((lnk, i: number) => (
                  <a
                    key={`${lnk.label}-${i}`}
                    className="nav-card-link inline-flex items-center gap-[6px] no-underline cursor-pointer transition-opacity duration-300 hover:opacity-75 font-display text-lg md:text-xl"
                    href={lnk.href}
                    aria-label={lnk.ariaLabel}
                  >
                    <ArrowUpRight
                      className="nav-card-link-icon shrink-0 size-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
