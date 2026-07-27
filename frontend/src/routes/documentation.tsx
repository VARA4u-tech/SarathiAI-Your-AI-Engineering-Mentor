import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { runMission, getProjects, saveReadmeDocs } from "@/lib/api";
import { motion } from "motion/react";
import { FileText, Loader2, Sparkles, BookOpen, GitBranch, Copy, CheckCircle2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const Route = createFileRoute("/documentation")({
  component: DocumentationPage,
});

function DocumentationPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [documentation, setDocumentation] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    getProjects()
      .then((data) => setProjects(data))
      .catch((err) => console.error("Failed to load projects", err));
  }, []);

  const currentProject = projects.length > 0 ? projects[0] : null;

  // Load documentation from MongoDB when project changes
  useEffect(() => {
    if (currentProject) {
      if (currentProject.readmeDocs) {
        setDocumentation(currentProject.readmeDocs);
      } else {
        setDocumentation(null);
      }
    }
  }, [currentProject]);

  const handleGenerate = async () => {
    if (!currentProject) return;
    setIsGenerating(true);
    setDocumentation(null);

    try {
      const prompt = `Generate a comprehensive, professional README.md file for the repository: ${currentProject.githubUrl}. Include a high-quality Overview, Tech Stack, installation instructions, usage workflow, Architecture Diagram (using Mermaid), and Core Components.`;
      const res = await runMission(prompt, "architect");
      setDocumentation(res.response);
      
      // Save permanently to MongoDB
      await saveReadmeDocs(currentProject._id, res.response);
    } catch (error) {
      console.error("Failed to generate docs", error);
      setDocumentation("# Error\nFailed to generate documentation. Please check if the AI Engine is running.");
    } finally {
      setIsGenerating(false);
    }
  };

  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
      alert("Failed to copy. Please manually select and copy the text.");
    }

    document.body.removeChild(textArea);
  };

  const handleCopy = () => {
    if (documentation) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(documentation).then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        }).catch((err) => {
          console.error("Clipboard API failed, using fallback.", err);
          fallbackCopyTextToClipboard(documentation);
        });
      } else {
        fallbackCopyTextToClipboard(documentation);
      }
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
                  README.md
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleCopy}
                    className="text-xs text-muted-foreground hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    {isCopied ? <CheckCircle2 className="size-3 text-emerald-400" /> : <Copy className="size-3" />}
                    {isCopied ? "Copied!" : "Copy Markdown"}
                  </button>
                  <button
                    onClick={handleGenerate}
                    className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
                  >
                    <Sparkles className="size-3" /> Regenerate
                  </button>
                </div>
              </div>
              <div className="p-8 md:p-12 max-w-none text-foreground/90 leading-relaxed overflow-x-auto">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({node, ...props}) => <h1 className="text-3xl font-display font-bold mt-8 mb-6 pb-2 border-b border-border/50 text-foreground" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-2xl font-display font-semibold mt-10 mb-4 pb-2 border-b border-border/30 text-emerald-100" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-xl font-medium mt-8 mb-4 text-emerald-200" {...props} />,
                    h4: ({node, ...props}) => <h4 className="text-lg font-medium mt-6 mb-3 text-white" {...props} />,
                    p: ({node, ...props}) => <p className="mb-6 leading-7 text-muted-foreground" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-6 space-y-2 text-muted-foreground marker:text-emerald-500" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-muted-foreground marker:text-emerald-500" {...props} />,
                    li: ({node, ...props}) => <li className="pl-2" {...props} />,
                    a: ({node, ...props}) => <a className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-500/30 transition-colors" {...props} />,
                    strong: ({node, ...props}) => <strong className="font-semibold text-white" {...props} />,
                    blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-emerald-500/50 pl-4 py-1 italic bg-emerald-500/5 my-6 rounded-r-lg" {...props} />,
                    table: ({node, ...props}) => <div className="overflow-x-auto mb-8 rounded-lg border border-border/50"><table className="w-full text-left border-collapse" {...props} /></div>,
                    thead: ({node, ...props}) => <thead className="bg-white/5 border-b border-border/50" {...props} />,
                    th: ({node, ...props}) => <th className="p-4 font-medium text-white" {...props} />,
                    td: ({node, ...props}) => <td className="p-4 border-b border-border/20 text-muted-foreground" {...props} />,
                    code: ({node, inline, ...props}: any) => 
                      inline ? (
                        <code className="bg-white/10 text-emerald-200 px-1.5 py-0.5 rounded font-mono text-sm" {...props} />
                      ) : (
                        <div className="my-6 rounded-xl overflow-hidden border border-border/50 bg-[#0d1117]">
                          <div className="flex items-center px-4 py-2 border-b border-white/5 bg-white/5 text-xs font-mono text-muted-foreground">Code Snippet</div>
                          <pre className="p-4 overflow-x-auto text-sm font-mono text-emerald-100/90" {...props} />
                        </div>
                      ),
                  }}
                >
                  {documentation}
                </ReactMarkdown>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
