import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { motion } from "motion/react";
import {
  Menu,
  Bot,
  BrainCircuit,
  ShieldAlert,
  TestTube2,
  Terminal,
  Activity,
  Zap,
  Sparkles
} from "lucide-react";

export const Route = createFileRoute("/agent-teams")({
  component: AgentTeamsPage,
});

const agents = [
  {
    id: "architect",
    name: "Principal Architect",
    role: "System Design & Architecture",
    icon: BrainCircuit,
    model: "nvidia/nemotron-3-super-120b-a12b:free",
    status: "Idle",
    color: "text-fuchsia-300",
    bg: "bg-fuchsia-500/10",
    border: "border-fuchsia-500/20",
    specialties: ["Microservices", "Cloud Infrastructure", "Database Schema", "API Design"],
    tasksCompleted: 142
  },
  {
    id: "developer",
    name: "Senior Developer",
    role: "Full-Stack Implementation",
    icon: Terminal,
    model: "google/gemma-4-31b-it:free",
    status: "Working",
    color: "text-cyan-300",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    specialties: ["React / Next.js", "Node.js", "TypeScript", "Performance Tuning"],
    tasksCompleted: 856
  },
  {
    id: "security",
    name: "SecOps Lead",
    role: "Vulnerability & Compliance",
    icon: ShieldAlert,
    model: "openai/gpt-oss-20b:free",
    status: "Idle",
    color: "text-emerald-300",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    specialties: ["OWASP Top 10", "Dependency Scanning", "Auth Audits"],
    tasksCompleted: 89
  },
  {
    id: "qa",
    name: "QA Specialist",
    role: "Testing & Validation",
    icon: TestTube2,
    model: "nvidia/nemotron-nano-12b-v2-vl:free",
    status: "Idle",
    color: "text-amber-300",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    specialties: ["Unit Tests", "E2E Testing", "Edge Case Discovery"],
    tasksCompleted: 312
  }
];

function AgentTeamsPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground flex">
      <div className="absolute inset-0 noise pointer-events-none" />
      <Sidebar mobileOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="relative z-10 flex-1 min-w-0 overflow-y-auto p-5 md:p-10">
        <header className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
          <div>
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden mb-5 grid size-11 place-items-center rounded-xl border border-border bg-white/5"
              aria-label="Open navigation"
            >
              <Menu className="size-5" />
            </button>
            <p className="text-xs uppercase tracking-[0.24em] text-fuchsia-300 mb-2 flex items-center gap-2">
              <Bot className="size-3" /> Autonomous Workforce
            </p>
            <h1 className="font-display text-4xl md:text-5xl">Agent Teams</h1>
            <p className="text-muted-foreground mt-2 max-w-lg">
              Manage your specialized AI personas. Each agent is powered by an industry-leading OpenRouter model tailored to its specific domain.
            </p>
          </div>
          <div className="rounded-full glass px-5 py-2.5 text-sm flex items-center gap-2 border border-white/10">
            <Activity className="size-4 text-emerald-400" />
            All Systems Nominal
          </div>
        </header>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {agents.map((agent, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              key={agent.id}
              className="glass rounded-3xl p-6 border border-border/50 hover:bg-white/5 transition-colors relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition duration-500 pointer-events-none">
                <agent.icon className={`size-32 ${agent.color}`} />
              </div>

              <div className="flex items-start justify-between mb-6 relative z-10">
                <div className="flex items-center gap-4">
                  <div className={`size-14 rounded-2xl flex items-center justify-center border ${agent.bg} ${agent.border}`}>
                    <agent.icon className={`size-7 ${agent.color}`} />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl">{agent.name}</h2>
                    <p className="text-sm text-muted-foreground">{agent.role}</p>
                  </div>
                </div>
                
                <div className={`px-3 py-1 flex items-center gap-1.5 rounded-full text-xs font-medium border ${agent.status === "Working" ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-300" : "bg-white/5 border-white/10 text-muted-foreground"}`}>
                  {agent.status === "Working" && <Zap className="size-3 fill-cyan-300" />}
                  {agent.status}
                </div>
              </div>

              <div className="space-y-4 relative z-10">
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                    <Sparkles className="size-3" /> Assigned Model
                  </h4>
                  <div className="bg-black/40 border border-white/5 rounded-lg px-3 py-2 text-xs font-mono text-white/80 truncate">
                    {agent.model}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    Core Specialties
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {agent.specialties.map(spec => (
                      <span key={spec} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-muted-foreground">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-border/50 flex items-center justify-between relative z-10">
                <div className="text-sm text-muted-foreground">
                  <span className="text-foreground font-display text-lg mr-1.5">{agent.tasksCompleted}</span> 
                  tasks completed
                </div>
                <button className="text-xs font-medium text-foreground hover:text-cyan-300 transition-colors">
                  Configure Agent &rarr;
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
