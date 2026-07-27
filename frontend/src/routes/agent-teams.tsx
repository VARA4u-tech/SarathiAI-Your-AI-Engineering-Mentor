import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";

export const Route = createFileRoute("/agent-teams")({
  component: AgentTeamsPage,
});

function AgentTeamsPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground flex">
      <div className="absolute inset-0 noise pointer-events-none" />
      <Sidebar mobileOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="relative z-10 flex-1 min-w-0 overflow-y-auto p-5 md:p-10">
        <header className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
          <div>
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden mb-5 grid size-11 place-items-center rounded-xl border border-border bg-white/5"
              aria-label="Open navigation"
            >
              <Menu className="size-5" />
            </button>
            <h1 className="font-display text-4xl md:text-5xl">Agent Teams</h1>
            <p className="text-muted-foreground mt-2">
              Configure and monitor your AI engineering teams.
            </p>
          </div>
        </header>

        <div className="max-w-7xl mx-auto">
          <div className="glass rounded-3xl p-6 md:p-8 flex items-center justify-center min-h-[400px]">
            <p className="text-muted-foreground">Agent teams content coming soon.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
