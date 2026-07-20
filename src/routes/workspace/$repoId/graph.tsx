import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { motion } from "motion/react";
import { 
  Network, Search, ZoomIn, ZoomOut, Maximize,
  ArrowRight, Shield, Key, FileCode, Database, Terminal
} from "lucide-react";

export const Route = createFileRoute("/workspace/$repoId/graph")({
  component: KnowledgeGraph,
});

function KnowledgeGraph() {
  const { repoId } = useParams({ from: "/workspace/$repoId/graph" });

  return (
    <main className="h-screen bg-background text-foreground flex flex-col overflow-hidden">
      <div className="absolute inset-0 noise pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 h-16 border-b border-border flex items-center justify-between px-6 glass shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/workspace/$repoId" params={{ repoId }} className="text-muted-foreground hover:text-foreground transition">
            <ArrowRight className="size-5 rotate-180" />
          </Link>
          <div className="h-4 w-px bg-border" />
          <span className="font-display text-xl flex items-center gap-2">
            <Network className="size-5 text-fuchsia-400" />
            Knowledge Graph
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center glass rounded-full px-3 py-1.5 border border-border">
            <Search className="size-4 text-muted-foreground mr-2" />
            <input 
              type="text" 
              placeholder="Search nodes..." 
              className="bg-transparent text-sm outline-none w-48 placeholder:text-muted-foreground/50"
            />
          </div>
          <div className="flex items-center gap-1 glass rounded-lg p-1 border border-border">
            <button className="p-1.5 text-muted-foreground hover:text-foreground rounded hover:bg-foreground/5"><ZoomOut className="size-4" /></button>
            <button className="p-1.5 text-muted-foreground hover:text-foreground rounded hover:bg-foreground/5"><ZoomIn className="size-4" /></button>
            <button className="p-1.5 text-muted-foreground hover:text-foreground rounded hover:bg-foreground/5"><Maximize className="size-4" /></button>
          </div>
        </div>
      </header>

      {/* Graph Area */}
      <div className="relative flex-1 bg-background overflow-hidden">
        {/* Dynamic Grid Background */}
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(var(--color-border) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.2
        }} />

        {/* Abstract Visualization (Simulated Graph) */}
        <div className="absolute inset-0 flex items-center justify-center">
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative w-[800px] h-[600px]"
          >
            {/* SVG Connecting Lines with glowing effects */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: "drop-shadow(0 0 8px oklch(0.65 0.25 320 / 0.5))" }}>
              {/* Lines */}
              <motion.path d="M 400 100 L 400 220" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-fuchsia-400/50" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
              <motion.path d="M 400 280 L 250 400" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-cyan-400/50" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
              <motion.path d="M 400 280 L 550 400" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-cyan-400/50" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
              <motion.path d="M 250 460 L 400 550" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-emerald-400/50" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
              <motion.path d="M 550 460 L 400 550" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-emerald-400/50" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
            </svg>

            {/* Nodes */}
            <Node icon={Shield} label="Authentication" x={400} y={100} active />
            <Node icon={Key} label="JWT Strategy" x={400} y={250} />
            <Node icon={Terminal} label="AuthController" x={250} y={430} />
            <Node icon={FileCode} label="AuthService" x={550} y={430} />
            <Node icon={Database} label="UserRepository" x={400} y={550} />
          </motion.div>
        </div>

        {/* Legend / Info panel */}
        <div className="absolute bottom-6 left-6 glass p-4 rounded-2xl border border-border w-64 shadow-2xl">
          <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Node Details</h4>
          <h3 className="font-display text-xl mb-1 text-fuchsia-400">Authentication</h3>
          <p className="text-xs text-muted-foreground mb-4">Core module handling user sessions, OAuth, and JWT lifecycle.</p>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between"><span className="text-muted-foreground">Dependencies</span> <span>4 Modules</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Complexity</span> <span className="text-orange-400">High</span></div>
          </div>
        </div>

      </div>
    </main>
  );
}

function Node({ icon: Icon, label, x, y, active }: any) {
  return (
    <div 
      className="absolute group"
      style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
    >
      <div className={`
        relative size-14 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300
        ${active ? 'bg-fuchsia-400 text-background shadow-[0_0_30px_oklch(0.65_0.25_320_/_0.4)] scale-110' : 'glass border border-border hover:border-foreground/50 hover:bg-foreground/5'}
      `}>
        <Icon className="size-6" />
        
        {/* Glow behind node */}
        {active && <div className="absolute inset-0 rounded-full bg-fuchsia-400 animate-ping opacity-20" />}
      </div>
      <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-medium">
        {label}
      </div>
    </div>
  );
}
