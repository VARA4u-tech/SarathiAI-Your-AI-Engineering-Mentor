import CardNav from "../ui/CardNav";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";

export function Nav() {
  const [isAtTop, setIsAtTop] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest <= 50) {
      setIsAtTop(true);
    } else {
      setIsAtTop(false);
    }
  });

  const items = [
    {
      label: "Platform",
      links: [
        { label: "Features", href: "#features", ariaLabel: "Platform Features" },
        { label: "How it Works", href: "#how-it-works", ariaLabel: "How it Works" },
        { label: "Benefits", href: "#benefits", ariaLabel: "Platform Benefits" },
      ],
    },
    {
      label: "Company",
      links: [
        { label: "About Us", href: "#", ariaLabel: "About Company" },
        { label: "Careers", href: "#", ariaLabel: "Careers" },
        { label: "Contact", href: "#contact", ariaLabel: "Contact Us" },
      ],
    },
  ];

  const logoNode = (
    <Link to="/" className="flex items-center gap-2 font-display text-lg">
      <span className="size-3 rounded-full bg-gradient-to-br from-fuchsia-400 to-cyan-400 shadow-[0_0_12px_currentColor]" />
      <span className="hidden sm:inline-block">Sarathi.ai</span>
    </Link>
  );

  return (
    <motion.header
      initial={false}
      animate={{
        scale: isAtTop ? 1 : 0.85,
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed left-1/2 -translate-x-1/2 z-50 w-[min(96%,1200px)] pointer-events-none origin-top transition-all duration-500 ease-out ${
        isAtTop ? "top-8" : "top-2"
      }`}
    >
      <div className="pointer-events-auto">
        <CardNav
          logo={logoNode}
          items={items}
          ease="back.out(1.7)"
          className={`!static !w-full !max-w-none !transform-none !top-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/10 ${
            isAtTop ? "bg-black/20" : "bg-black/60 backdrop-blur-2xl"
          }`}
          rightAction={
            <div className="flex items-center gap-4 text-sm font-display pr-1">
              <Link
                to="/login"
                className="text-foreground/80 hover:text-foreground transition-colors hidden sm:block"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="inline-flex border-0 rounded-full bg-foreground text-background px-4 py-1.5 md:px-5 items-center cursor-pointer transition-all duration-300 hover:opacity-90 hover:scale-105"
              >
                Sign Up
              </Link>
            </div>
          }
        />
      </div>
    </motion.header>
  );
}
