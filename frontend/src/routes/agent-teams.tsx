import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, Network, Code2, Bug, BookOpen, TestTube2, Sparkles, Settings2, Activity } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";

export const Route = createFileRoute("/agent-teams")({
  component: AgentTeamsPage,
});

const teamAgents = [
  {
    id: "architect",
    name: "Architect Agent",
    role: "System Design & Planning",
    icon: Network,
    color: "text-violet-300",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    status: "Idle",
    responsibilities: [
      "Understand repository architecture",
      "Explain architecture and flows",
      "Create dependency maps",
      "Generate UML & ER diagrams"
    ]
  },
  {
    id: "builder",
    name: "Builder Agent",
    role: "Feature Implementation",
    icon: Code2,
    color: "text-fuchsia-300",
    bg: "bg-fuchsia-500/10",
    border: "border-fuchsia-500/20",
    status: "Implementing",
    responsibilities: [
      "Generate features & APIs",
      "Modify components",
      "Update database schemas",
      "Generate migrations"
    ]
  },
  {
    id: "debug",
    name: "Debug Agent",
    role: "Issue Resolution",
    icon: Bug,
    color: "text-red-300",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    status: "Idle",
    responsibilities: [
      "Analyze logs & stack traces",
      "Detect root causes",
      "Suggest code fixes",
      "Patch broken code"
    ]
  },
  {
    id: "docs",
    name: "Documentation Agent",
    role: "Knowledge Management",
    icon: BookOpen,
    color: "text-amber-300",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    status: "Idle",
    responsibilities: [
      "Generate READMEs",
      "Write API documentation",
      "Document architecture",
      "Maintain changelogs"
    ]
  },
  {
    id: "test",
    name: "Test Agent",
    role: "Quality Assurance",
    icon: TestTube2,
    color: "text-emerald-300",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    status: "Idle",
    responsibilities: [
      "Generate unit tests",
      "Generate integration tests",
      "Identify edge cases",
      "Estimate coverage"
    ]
  },
  {
    id: "intelligence",
    name: "Repository Intelligence",
    role: "Codebase Analysis",
    icon: Sparkles,
    color: "text-cyan-300",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    status: "Analyzing",
    responsibilities: [
      "Perform semantic search",
      "Detect duplicate/dead code",
      "Identify unused APIs",
      "Explain dependency trees"
    ]
  }
];

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
            <p className="text-xs uppercase tracking-[0.24em] text-fuchsia-300 mb-2">
              Autonomous Team Roster
            </p>
            <h1 className="font-display text-4xl md:text-5xl">Agent Teams</h1>
            <p className="text-muted-foreground mt-2">
              Configure and monitor the specialized AI engineers building your software.
            </p>
          </div>
        </header>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {teamAgents.map((agent) => (
            <div key={agent.id} className="glass rounded-3xl p-6 relative overflow-hidden group hover:border-white/20 transition-colors">
              <div className={`absolute -right-12 -top-12 size-32 rounded-full blur-3xl opacity-20 pointer-events-none transition-opacity group-hover:opacity-40 ${agent.bg}`} />
              
              <div className="flex items-start justify-between mb-5">
                <div className={`size-12 rounded-2xl flex items-center justify-center border ${agent.bg} ${agent.border}`}>
                  <agent.icon className={`size-6 ${agent.color}`} />
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/20 border border-white/5 text-xs">
                    <span className={`size-1.5 rounded-full ${agent.status !== 'Idle' ? 'bg-emerald-400 animate-pulse' : 'bg-muted-foreground'}`} />
                    {agent.status}
                  </div>
                  <button className="size-8 flex items-center justify-center rounded-full hover:bg-white/10 transition text-muted-foreground hover:text-foreground">
                    <Settings2 className="size-4" />
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="font-display text-2xl">{agent.name}</h2>
                <p className="text-sm text-muted-foreground uppercase tracking-wider mt-1">{agent.role}</p>
              </div>

              <div className="space-y-2 mb-8">
                {agent.responsibilities.map((resp, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Activity className={`size-4 mt-0.5 shrink-0 ${agent.color}`} />
                    <span>{resp}</span>
                  </div>
                ))}
              </div>

              <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-sm font-medium transition-colors">
                View Agent History
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
