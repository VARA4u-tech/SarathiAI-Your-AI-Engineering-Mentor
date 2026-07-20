export function Nav() {
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(96%,1100px)]">
      <nav className="glass rounded-full flex items-center justify-between px-5 py-2.5">
        <a href="#" className="flex items-center gap-2 font-display text-xl">
          <span className="size-2 rounded-full bg-gradient-to-br from-fuchsia-400 to-cyan-400 shadow-[0_0_12px_currentColor]" />
          CodePilot AI
        </a>
        <div className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition">Features</a>
          <a href="#how-it-works" className="hover:text-foreground transition">How it Works</a>
          <a href="#benefits" className="hover:text-foreground transition">Benefits</a>
          <a href="#pricing" className="hover:text-foreground transition">Pricing</a>
        </div>
        <a href="/dashboard" className="text-sm rounded-full bg-foreground text-background px-4 py-1.5 hover:opacity-90 transition">
          Dashboard
        </a>
      </nav>
    </header>
  );
}
