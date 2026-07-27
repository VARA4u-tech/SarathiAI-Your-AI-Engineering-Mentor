import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import {
  Github,
  UploadCloud,
  FolderGit2,
  CheckCircle2,
  Search,
  Bot,
  Database,
  Activity,
  FileCode2,
  Loader2,
  Check,
} from "lucide-react";
import orb2 from "@/assets/orb-2.jpg";
import { importRepository } from "@/lib/api";

export const Route = createFileRoute("/import")({
  component: ImportRepo,
});

function ImportRepo() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [stats, setStats] = useState<{
    name: string;
    lang: string;
    framework: string;
    files: number | string;
    time: string;
  } | null>(null);

  const [indexingState, setIndexingState] = useState<"idle" | "indexing" | "complete">("idle");
  const [activeAgentIndex, setActiveAgentIndex] = useState(0);

  const agents = [
    { name: "Search Agent", icon: Search, desc: "Cloning repository..." },
    {
      name: "Repository Intelligence",
      icon: Database,
      desc: "Building AST and dependency graph...",
    },
    { name: "Architect Agent", icon: Bot, desc: "Analyzing system architecture..." },
    { name: "Documentation Agent", icon: FileCode2, desc: "Extracting inline docstrings..." },
    { name: "Test Agent", icon: Activity, desc: "Mapping test coverage..." },
  ];

  useEffect(() => {
    if (indexingState === "indexing") {
      if (activeAgentIndex < agents.length) {
        const timer = setTimeout(() => {
          setActiveAgentIndex((prev) => prev + 1);
        }, 1200); // 1.2s per agent
        return () => clearTimeout(timer);
      } else {
        setIndexingState("complete");
        setTimeout(() => {
          navigate({ to: "/dashboard" });
        }, 1500);
      }
    }
  }, [indexingState, activeAgentIndex, navigate, agents.length]);

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setIsValidating(true);

    try {
      const data = await importRepository(url);
      setStats(data);
    } catch (error) {
      console.error("Failed to connect to backend", error);
      // Fallback for demo if backend is not running
      setStats({
        name: url.split("/").pop() || "repository",
        lang: "TypeScript",
        framework: "React / Vite",
        files: 432,
        time: "~2 minutes",
      });
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center relative overflow-hidden p-6">
      <img
        src={orb2}
        alt=""
        loading="lazy"
        className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[800px] max-w-none opacity-20 blur-3xl pointer-events-none"
      />
      <div className="absolute inset-0 noise" />

      <div className="relative z-10 w-full max-w-4xl grid md:grid-cols-2 gap-8 items-start">
        {/* Left Side - Input */}
        <div>
          <div className="flex items-center gap-2 font-display text-xl mb-12">
            <span className="size-2 rounded-full bg-gradient-to-br from-fuchsia-400 to-cyan-400" />
            <Link to="/dashboard">CodePilot AI</Link>
          </div>

          <h1 className="font-display text-4xl md:text-5xl mb-4">Import Repository</h1>
          <p className="text-muted-foreground mb-10 text-sm max-w-sm">
            Connect your codebase. CodePilot AI will ingest, analyze, and build a knowledge graph of
            your architecture.
          </p>

          <form onSubmit={handleValidate} className="space-y-6">
            <div className="glass p-1 rounded-full flex items-center pr-2 border-border focus-within:border-foreground/40 transition">
              <div className="pl-5 pr-3 text-muted-foreground">
                <Github className="size-5" />
              </div>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://github.com/org/repo"
                className="flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground/50"
              />
              <button
                type="submit"
                disabled={!url || isValidating}
                className="bg-foreground text-background px-6 py-2 rounded-full text-sm font-medium hover:opacity-90 disabled:opacity-50 transition"
              >
                {isValidating ? "Validating..." : "Connect"}
              </button>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground uppercase tracking-widest">
              <div className="h-px bg-border flex-1" /> OR <div className="h-px bg-border flex-1" />
            </div>

            <button
              type="button"
              className="w-full glass rounded-2xl p-8 border border-border border-dashed hover:border-foreground/30 transition flex flex-col items-center justify-center gap-3 group"
            >
              <div className="size-12 rounded-full bg-foreground/5 flex items-center justify-center group-hover:bg-foreground/10 transition">
                <UploadCloud className="size-6 text-muted-foreground group-hover:text-foreground transition" />
              </div>
              <span className="text-sm font-medium">Upload ZIP archive</span>
              <span className="text-xs text-muted-foreground">Max file size 500MB</span>
            </button>
          </form>
        </div>

        {/* Right Side - Validation & Stats */}
        <div className="h-full pt-12 md:pt-28">
          {indexingState !== "idle" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-3xl p-8 border border-border"
            >
              <div className="mb-6 pb-6 border-b border-border">
                <h3 className="font-display text-2xl">Initializing Autonomous OS...</h3>
                <p className="text-muted-foreground mt-2 text-sm">
                  Deploying agent workforce to analyze repository structure.
                </p>
              </div>

              <div className="space-y-4">
                {agents.map((agent, idx) => {
                  const isActive = idx === activeAgentIndex;
                  const isDone = idx < activeAgentIndex;

                  return (
                    <motion.div
                      key={agent.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: isActive || isDone ? 1 : 0.4, y: 0 }}
                      className={`flex items-start gap-4 p-4 rounded-xl border transition-colors ${isActive ? "bg-fuchsia-500/10 border-fuchsia-500/30" : isDone ? "bg-white/5 border-white/10" : "border-transparent"}`}
                    >
                      <div
                        className={`mt-0.5 size-8 shrink-0 rounded-lg flex items-center justify-center ${isActive ? "bg-fuchsia-500/20 text-fuchsia-300" : isDone ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-muted-foreground"}`}
                      >
                        {isDone ? (
                          <Check className="size-4" />
                        ) : isActive ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <agent.icon className="size-4" />
                        )}
                      </div>
                      <div>
                        <h4
                          className={`text-sm font-medium ${isActive ? "text-fuchsia-300" : isDone ? "text-foreground" : "text-muted-foreground"}`}
                        >
                          {agent.name}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {isActive ? agent.desc : isDone ? "Complete" : "Waiting in queue..."}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <AnimatePresence>
                {indexingState === "complete" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center gap-2 text-sm font-medium"
                  >
                    <CheckCircle2 className="size-5" /> Knowledge Graph Constructed! Redirecting...
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : stats ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-3xl p-8 border border-border"
            >
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
                <div className="size-12 rounded-xl bg-gradient-to-br from-fuchsia-400 to-cyan-400 p-[1px]">
                  <div className="w-full h-full bg-background rounded-[11px] grid place-items-center">
                    <FolderGit2 className="size-5" />
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl">{stats.name}</h3>
                  <p className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
                    <CheckCircle2 className="size-3" /> Ready for analysis
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <StatRow label="Primary Language" val={stats.lang} />
                <StatRow label="Framework Detected" val={stats.framework} />
                <StatRow label="Total Files" val={stats.files} />
                <StatRow label="Estimated Analysis Time" val={stats.time} highlight />
              </div>

              <button
                onClick={() => setIndexingState("indexing")}
                className="block w-full text-center rounded-full bg-foreground text-background px-6 py-4 text-sm font-medium hover:opacity-90 transition"
              >
                Start Analysis Pipeline →
              </button>
            </motion.div>
          ) : (
            <div className="h-full border border-border border-dashed rounded-3xl flex items-center justify-center p-8 opacity-50">
              <p className="text-sm text-muted-foreground text-center">
                Connect a repository to see validation statistics.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function StatRow({
  label,
  val,
  highlight = false,
}: {
  label: string;
  val: string | number;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={highlight ? "text-fuchsia-400 font-medium" : "text-foreground font-medium"}>
        {val}
      </span>
    </div>
  );
}
