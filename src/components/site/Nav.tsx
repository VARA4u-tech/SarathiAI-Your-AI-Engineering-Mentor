import CardNav from "../ui/CardNav";
import { Link } from "@tanstack/react-router";

export function Nav() {
  const items = [
    {
      label: "Platform",
      bgColor: "oklch(0.12 0.02 280)", // Darker glass-like color
      textColor: "#fff",
      links: [
        { label: "Features", href: "#features", ariaLabel: "Platform Features" },
        { label: "How it Works", href: "#how-it-works", ariaLabel: "How it Works" },
        { label: "Benefits", href: "#benefits", ariaLabel: "Platform Benefits" },
      ],
    },
    {
      label: "Resources",
      bgColor: "oklch(0.14 0.03 280)",
      textColor: "#fff",
      links: [
        { label: "Documentation", href: "#", ariaLabel: "Documentation" },
        { label: "Knowledge Graph API", href: "#", ariaLabel: "API Reference" },
        { label: "Pricing", href: "#pricing", ariaLabel: "Pricing Plans" },
      ],
    },
    {
      label: "Company",
      bgColor: "oklch(0.16 0.04 280)",
      textColor: "#fff",
      links: [
        { label: "About Us", href: "#", ariaLabel: "About Company" },
        { label: "Careers", href: "#", ariaLabel: "Careers" },
        { label: "Contact", href: "#", ariaLabel: "Contact Us" },
      ],
    },
  ];

  const logoNode = (
    <Link
      to="/"
      className="flex items-center gap-2 font-display text-xl px-4 hover:opacity-80 transition"
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
          baseColor="rgba(20, 15, 25, 0.65)" // Glass background
          menuColor="#fff"
          buttonBgColor="#fff"
          buttonTextColor="#000"
          ease="back.out(1.7)"
          className="!static !w-full !max-w-none !transform-none !top-4"
        />
      </div>
    </header>
  );
}
