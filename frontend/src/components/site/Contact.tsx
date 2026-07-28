import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer
      className="relative h-auto md:h-[80vh] min-h-[720px] w-full"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="relative md:fixed bottom-0 w-full min-h-[720px] md:h-[80vh] bg-black border-t border-white/5 flex flex-col justify-between overflow-hidden">
        {/* Minimalist Link Grid */}
        <div className="px-5 sm:px-8 md:px-16 pt-24 md:pt-32 pb-10 md:pb-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-[1600px] mx-auto w-full flex-grow z-10">
          <div className="flex flex-col gap-6">
            <h4 className="text-muted-foreground uppercase tracking-[0.2em] text-xs font-semibold mb-2">
              Connect
            </h4>
            <a
              href="#"
              className="text-4xl font-display text-white/70 hover:text-white hover:translate-x-2 transition-all duration-300 w-max"
            >
              Twitter ↗
            </a>
            <a
              href="#"
              className="text-4xl font-display text-white/70 hover:text-white hover:translate-x-2 transition-all duration-300 w-max"
            >
              GitHub ↗
            </a>
            <a
              href="#"
              className="text-4xl font-display text-white/70 hover:text-white hover:translate-x-2 transition-all duration-300 w-max"
            >
              LinkedIn ↗
            </a>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-muted-foreground uppercase tracking-[0.2em] text-xs font-semibold mb-2">
              Explore
            </h4>
            <a
              href="#"
              className="text-4xl font-display text-white/70 hover:text-white hover:translate-x-2 transition-all duration-300 w-max"
            >
              Platform
            </a>
            <a
              href="#"
              className="text-4xl font-display text-white/70 hover:text-white hover:translate-x-2 transition-all duration-300 w-max"
            >
              Company
            </a>
            <a
              href="#"
              className="text-4xl font-display text-white/70 hover:text-white hover:translate-x-2 transition-all duration-300 w-max"
            >
              Pricing
            </a>
          </div>

          <div className="flex flex-col gap-6 md:items-end md:text-right">
            <h4 className="text-muted-foreground uppercase tracking-[0.2em] text-xs font-semibold mb-2">
              Say Hello
            </h4>
            <a
              href="mailto:hello@sarathi.ai"
              className="text-4xl font-display text-white/70 hover:text-white transition-colors"
            >
              hello@sarathi.ai
            </a>
            <p className="text-white/40 max-w-[200px] mt-4">
              100 Innovation Drive
              <br />
              San Francisco, CA
            </p>
          </div>
        </div>

        {/* Bottom Giant Typography & Copyright */}
        <div className="relative w-full px-8 md:px-16 pb-8 flex flex-col md:flex-row items-end md:items-center justify-between gap-4 z-10">
          <div className="flex items-center gap-4 text-sm text-white/40">
            <span>© {new Date().getFullYear()} Sarathi.ai.</span>
            <span className="hidden md:inline">•</span>
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
            <span className="text-sm font-medium text-white/70 uppercase tracking-widest">
              All systems operational
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-white/50">
            <Link to="/login" className="hover:text-white transition-colors">
              Log in
            </Link>
            <Link to="/signup" className="hover:text-white transition-colors">
              Create account
            </Link>
          </div>
        </div>

        {/* Massive Background Text */}
        <div className="absolute bottom-[-5%] left-0 w-full flex justify-center pointer-events-none select-none overflow-hidden opacity-80">
          <h1 className="text-[22vw] font-display font-bold leading-none text-transparent bg-clip-text bg-gradient-to-b from-fuchsia-500/40 via-violet-500/20 to-transparent">
            SARATHI
          </h1>
        </div>
      </div>
    </footer>
  );
}
