import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getProjects, Project } from "@/lib/api";
import {
  Menu,
  Database,
  Shield,
  CreditCard,
  ShoppingCart,
  Bell,
  GitBranch,
  Activity,
  Layers,
  Code2,
  Sparkles,
} from "lucide-react";
import { Sidebar } from "@/components/Sidebar";

export const Route = createFileRoute("/repositories")({
  component: RepositoriesPage,
});

const concepts = [
  {
    id: "auth",
    name: "Authentication",
    icon: Shield,
    color: "text-violet-300",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    stats: {
      files: 14,
      apis: 4,
      models: 2,
    },
    status: "Healthy",
    recent: "Added role-based middleware",
  },
  {
    id: "payments",
    name: "Payments",
    icon: CreditCard,
    color: "text-emerald-300",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    stats: {
      files: 8,
      apis: 2,
      models: 1,
    },
    status: "Healthy",
    recent: "Updated Stripe webhook logic",
  },
  {
    id: "orders",
    name: "Orders",
    icon: ShoppingCart,
    color: "text-fuchsia-300",
    bg: "bg-fuchsia-500/10",
    border: "border-fuchsia-500/20",
    stats: {
      files: 22,
      apis: 6,
      models: 4,
    },
    status: "Needs Review",
    recent: "Detected dead code in legacy router",
  },
  {
    id: "notifications",
    name: "Notifications",
    icon: Bell,
    color: "text-cyan-300",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    stats: {
      files: 11,
      apis: 3,
      models: 2,
    },
    status: "Healthy",
    recent: "Indexed new email templates",
  },
  {
    id: "core",
    name: "Core Services",
    icon: Layers,
    color: "text-amber-300",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    stats: {
      files: 45,
      apis: 12,
      models: 8,
    },
    status: "Healthy",
    recent: "Dependency graph updated",
  },
  {
    id: "database",
    name: "Data Layer",
    icon: Database,
    color: "text-blue-300",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    stats: {
      files: 18,
      apis: 0,
      models: 17,
    },
    status: "Healthy",
    recent: "Schema validation completed",
  },
];

function RepositoriesPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjects()
      .then((data) => setProjects(data))
      .catch((err) => console.error("Failed to load projects", err));
  }, []);

  const currentProjectName = projects.length > 0 ? projects[0].name : "ecommerce-platform-v2";

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
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-300 mb-2">
              Repository Intelligence
            </p>
            <h1 className="font-display text-4xl md:text-5xl">Conceptual Map</h1>
            <p className="text-muted-foreground mt-2">
              Your codebase understood by domains and concepts, not just folders.
            </p>
          </div>
          <div className="rounded-full glass px-5 py-2.5 text-sm flex items-center gap-2 border border-white/10">
            <GitBranch className="size-4 text-cyan-300" />
            {currentProjectName} / main
          </div>
        </header>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {concepts.map((concept) => (
            <div
              key={concept.id}
              className="glass rounded-3xl p-6 group hover:bg-white/5 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between mb-6">
                <div
                  className={`size-12 rounded-2xl flex items-center justify-center border ${concept.bg} ${concept.border}`}
                >
                  <concept.icon className={`size-6 ${concept.color}`} />
                </div>
                <div
                  className={`px-2.5 py-1 flex items-center gap-1.5 rounded-full text-xs border ${concept.status === "Healthy" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300" : "bg-fuchsia-500/10 border-fuchsia-500/20 text-fuchsia-300"}`}
                >
                  <span
                    className={`size-1.5 rounded-full ${concept.status === "Healthy" ? "bg-emerald-400" : "bg-fuchsia-400"}`}
                  />
                  {concept.status}
                </div>
              </div>

              <h2 className="font-display text-2xl mb-1">{concept.name}</h2>
              <p className="text-sm text-muted-foreground mb-6">Last indexed: Just now</p>

              <div className="grid grid-cols-3 gap-2 mb-6 border-y border-border py-4">
                <div className="text-center">
                  <div className="text-xl font-display">{concept.stats.files}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1 flex items-center justify-center gap-1">
                    <Code2 className="size-3" /> Files
                  </div>
                </div>
                <div className="text-center border-x border-border">
                  <div className="text-xl font-display">{concept.stats.apis}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1 flex items-center justify-center gap-1">
                    <Activity className="size-3" /> APIs
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-display">{concept.stats.models}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1 flex items-center justify-center gap-1">
                    <Database className="size-3" /> Models
                  </div>
                </div>
              </div>

              <div className="text-sm text-muted-foreground flex items-start gap-2">
                <Sparkles className="size-4 shrink-0 mt-0.5 text-cyan-300" />
                <span className="line-clamp-2">Agent Insight: {concept.recent}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
