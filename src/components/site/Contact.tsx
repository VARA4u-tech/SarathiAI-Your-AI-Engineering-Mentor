import { motion } from "motion/react";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto w-[min(96%,1200px)] flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 font-display text-lg text-foreground">
          <span className="size-2 rounded-full bg-gradient-to-br from-fuchsia-400 to-cyan-400" />
          CodePilot AI
        </div>
        <p>© {new Date().getFullYear()} CodePilot AI. All rights reserved.</p>
        <div className="flex gap-5">
          <a href="#" className="hover:text-foreground">
            Terms
          </a>
          <a href="#" className="hover:text-foreground">
            Privacy
          </a>
          <a href="#" className="hover:text-foreground">
            Twitter
          </a>
          <a href="#" className="hover:text-foreground">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
