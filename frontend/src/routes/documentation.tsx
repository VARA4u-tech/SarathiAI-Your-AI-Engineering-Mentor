import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { runMission, getProjects } from "@/lib/api";
import { motion, AnimatePresence } from "motion/react";
import { FileText, Loader2, Sparkles, BookOpen, GitBranch, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/documentation")({
  component: DocumentationPage,
});

function DocumentationPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [documentation, setDocumentation] = useState<string | null>(null);

  useEffect(() => {
    getProjects()
      .then((data) => setProjects(data))
      .catch((err) => console.error("Failed to load projects", err));
  }, []);

  const currentProject = projects.length > 0 ? projects[0] : null;

  const handleGenerate = async () => {
    if (!currentProject) return;
    setIsGenerating(true);
    setDocumentation(null);

    try {
      const prompt = `Generate a comprehensive ARCHITECTURE.md file for the repository: ${currentProject.githubUrl}. Include sections for Overview, Tech Stack, Architecture Diagram (mermaid), and Core Components.`;
      const res = await runMission(prompt, "architect");
      setDocumentation(res.response);
    } catch (error) {
      console.error("Failed to generate docs", error);
      setDocumentation("# Error\nFailed to generate documentation. Please check if the AI Engine is running.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex">
      <div className="absolute inset-0 noise pointer-events-none" />
      <Sidebar mobileOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="relative z-10 flex-1 min-w-0 overflow-y-auto p-5 md:p-10">
        <header className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-emerald-300 mb-2 flex items-center gap-2">
              <BookOpen className="size-3" /> Knowledge Base
            </p>
            <h1 className="font-display text-4xl md:text-5xl">Documentation</h1>
            <p className="text-muted-foreground mt-2 max-w-lg">
              Auto-generate comprehensive architecture documentation and diagrams using the Principal Architect AI.
            </p>
          </div>
          {currentProject && (
            <div className="rounded-full glass px-5 py-2.5 text-sm flex items-center gap-2 border border-white/10">
              <GitBranch className="size-4 text-emerald-400" />
              {currentProject.name} / main
            </div>
          )}
        </header>

        <div className="max-w-5xl mx-auto">
          {!documentation && !isGenerating && (
            <div className="glass rounded-3xl p-10 border border-border/50 flex flex-col items-center justify-center text-center min-h-[400px]">
              <div className="size-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
                <FileText className="size-10 text-emerald-400" />
              </div>
              <h2 className="font-display text-2xl mb-3">No Documentation Generated</h2>
              <p className="text-muted-foreground max-w-md mb-8">
                Click the button below to have the Principal Architect analyze the current repository and generate a complete ARCHITECTURE.md file.
              </p>
              <button
                onClick={handleGenerate}
                disabled={!currentProject}
                className="bg-emerald-500 hover:bg-emerald-400 text-black px-8 py-3 rounded-full text-sm font-semibold transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <Sparkles className="size-4" />
                Generate Architecture Docs
              </button>
            </div>
          )}

          {isGenerating && (
            <div className="glass rounded-3xl p-10 border border-border/50 flex flex-col items-center justify-center text-center min-h-[400px]">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="size-24 rounded-full border-b-2 border-l-2 border-emerald-400 mb-8 flex items-center justify-center"
              >
                <Loader2 className="size-8 text-emerald-400 animate-spin" />
              </motion.div>
              <h2 className="font-display text-xl text-emerald-300">Principal Architect is writing...</h2>
              <p className="text-sm text-muted-foreground mt-2">Analyzing repository structure and generating markdown...</p>
            </div>
          )}

          {documentation && !isGenerating && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-3xl overflow-hidden border border-border/50"
            >
              <div className="bg-black/40 border-b border-border/50 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
                  <FileText className="size-4" />
                  ARCHITECTURE.md
                </div>
                <button
                  onClick={handleGenerate}
                  className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
                >
                  <Sparkles className="size-3" /> Regenerate
                </button>
              </div>
              <div className="p-8 md:p-12 prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-sm text-foreground/90 leading-relaxed bg-transparent p-0 m-0 border-none">
                  {documentation}
                </pre>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
