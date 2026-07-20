import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { Github, UploadCloud, FolderGit2, CheckCircle2 } from "lucide-react";
import orb2 from "@/assets/orb-2.jpg";

export const Route = createFileRoute("/import")({
  component: ImportRepo,
});

function ImportRepo() {
  const [url, setUrl] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [stats, setStats] = useState<any>(null);

  const handleValidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setIsValidating(true);
    // Simulate validation
    setTimeout(() => {
      setIsValidating(false);
      setStats({
        name: url.split("/").pop() || "repository",
        lang: "TypeScript",
        framework: "React / Vite",
        files: 432,
        time: "~2 minutes",
      });
    }, 1500);
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
          {stats ? (
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

              <Link
                to="/processing"
                className="block w-full text-center rounded-full bg-foreground text-background px-6 py-4 text-sm font-medium hover:opacity-90 transition"
              >
                Start Analysis Pipeline →
              </Link>
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
