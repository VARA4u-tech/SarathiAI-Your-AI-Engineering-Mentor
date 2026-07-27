import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import {
  Bug,
  ArrowRight,
  UploadCloud,
  Terminal,
  CheckCircle2,
  AlertTriangle,
  Play,
  FileCode,
  Copy,
} from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

export const Route = createFileRoute("/workspace/$repoId/debug")({
  component: DebugCenter,
});

function DebugCenter() {
  const { repoId } = useParams({ from: "/workspace/$repoId/debug" });
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(false);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setResult(true);
    }, 2000);
  };

  return (
    <main className="h-screen bg-background text-foreground flex flex-col overflow-hidden">
      <div className="absolute inset-0 noise pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 h-16 border-b border-border flex items-center px-6 glass shrink-0">
        <Link
          to="/workspace/$repoId"
          params={{ repoId }}
          className="text-muted-foreground hover:text-foreground transition flex items-center gap-2 text-sm font-medium"
        >
          <ArrowRight className="size-4 rotate-180" /> Back
        </Link>
        <div className="h-4 w-px bg-border mx-4" />
        <span className="font-display text-xl flex items-center gap-2">
          <Bug className="size-5 text-orange-400" />
          Debug Center
        </span>
      </header>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 overflow-y-auto p-6 md:p-10">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-3xl mb-2">Identify Issue</h2>
              <p className="text-sm text-muted-foreground">
                Paste error logs, stack traces, or describe the bug.
              </p>
            </div>

            <form onSubmit={handleAnalyze} className="space-y-4">
              <textarea
                rows={10}
                placeholder="TypeError: Cannot read properties of undefined (reading 'id')
    at processOrder (src/services/OrderService.ts:42:15)
    at runMicrotasks (<anonymous>)"
                className="w-full bg-background/50 border border-border focus:border-foreground/40 rounded-2xl px-5 py-4 text-sm font-mono outline-none transition resize-none placeholder:text-muted-foreground/30 shadow-inner"
              />

              <div className="flex gap-4">
                <button
                  type="button"
                  className="flex-1 glass border border-border border-dashed hover:border-foreground/40 rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-sm text-muted-foreground transition"
                >
                  <UploadCloud className="size-5" />
                  Upload Screenshot
                </button>
                <button
                  type="button"
                  className="flex-1 glass border border-border border-dashed hover:border-foreground/40 rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-sm text-muted-foreground transition"
                >
                  <Terminal className="size-5" />
                  Connect Logs
                </button>
              </div>

              <button
                type="submit"
                disabled={analyzing}
                className="w-full rounded-full bg-foreground text-background px-6 py-4 text-sm font-medium hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {analyzing ? (
                  <span className="flex items-center gap-2 animate-pulse">
                    <Bug className="size-4" /> Analyzing Codebase...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Play className="size-4" /> Analyze Bug
                  </span>
                )}
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div className="h-full">
            {!result && !analyzing ? (
              <div className="h-full border border-border border-dashed rounded-3xl flex items-center justify-center p-8 opacity-50 glass">
                <p className="text-sm text-muted-foreground text-center">
                  Awaiting stack trace to analyze root cause.
                </p>
              </div>
            ) : analyzing ? (
              <div className="h-full rounded-3xl flex flex-col items-center justify-center p-8 glass border border-border">
                <div className="size-16 rounded-full border-t-2 border-orange-400 animate-spin mb-4" />
                <p className="text-sm font-medium animate-pulse">Cross-referencing graph...</p>
                <p className="text-xs text-muted-foreground mt-2 text-center max-w-xs">
                  Scanning 432 files to find the exact origin of the null pointer exception.
                </p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="glass rounded-3xl p-6 border border-border shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display text-2xl flex items-center gap-2 text-emerald-400">
                      <CheckCircle2 className="size-6" /> Root Cause Found
                    </h3>
                    <span className="text-xs font-mono bg-foreground/10 px-2 py-1 rounded">
                      Confidence: 98%
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    The <code className="text-foreground bg-background px-1 rounded">user</code>{" "}
                    object returned from{" "}
                    <code className="text-foreground bg-background px-1 rounded">
                      AuthService.validate()
                    </code>{" "}
                    can be undefined if the token has expired, but{" "}
                    <code className="text-foreground bg-background px-1 rounded">
                      OrderService.ts
                    </code>{" "}
                    assumes it is always defined before accessing{" "}
                    <code className="text-foreground bg-background px-1 rounded">user.id</code>.
                  </p>

                  <div className="p-3 bg-background rounded-xl border border-border text-xs font-mono text-muted-foreground mb-4">
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border text-foreground">
                      <FileCode className="size-3" /> src/services/OrderService.ts
                    </div>
                    <div className="line-through opacity-50 text-red-400">
                      - const userId = req.user.id;
                    </div>
                    <div className="text-emerald-400">+ const userId = req.user?.id;</div>
                    <div className="text-emerald-400">
                      + if (!userId) throw new UnauthorizedError();
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6 pt-6 border-t border-border">
                    <button className="flex-1 rounded-full bg-foreground text-background px-4 py-2.5 text-sm font-medium hover:opacity-90 transition">
                      Apply Fix
                    </button>
                    <button className="rounded-full glass px-4 py-2.5 border border-border hover:bg-foreground/5 transition tooltip-trigger">
                      <Copy className="size-4" />
                    </button>
                  </div>
                </div>

                <div className="glass rounded-2xl p-6 border border-border">
                  <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                    <AlertTriangle className="size-3 text-orange-400" /> Related Risk Areas
                  </h4>
                  <ul className="text-sm space-y-2">
                    <li className="flex justify-between items-center">
                      <span className="text-muted-foreground">CartController.ts</span>{" "}
                      <span className="text-orange-400 text-xs">Similar Pattern</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-muted-foreground">ProfileService.ts</span>{" "}
                      <span className="text-emerald-400 text-xs">Safe</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
