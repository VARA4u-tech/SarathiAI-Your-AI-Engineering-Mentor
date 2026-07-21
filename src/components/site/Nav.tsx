import CardNav from "../ui/CardNav";
import { Link } from "@tanstack/react-router";

export function Nav() {
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
    <Link
      to="/"
      className="flex items-center gap-2 font-display text-xl px-4 hover:opacity-80 transition text-foreground"
    >
      <span className="size-2 rounded-full bg-gradient-to-br from-fuchsia-400 to-cyan-400 shadow-[0_0_12px_currentColor]" />
      CodePilot AI
    </Link>
  );

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[min(96%,1200px)] pointer-events-none">
      <div className="pointer-events-auto">
        <CardNav
          logo={logoNode}
          items={items}
          ease="back.out(1.7)"
          className="!static !w-full !max-w-none !transform-none !top-4"
        />
      </div>
    </header>
  );
}
