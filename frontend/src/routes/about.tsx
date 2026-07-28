import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Github, Linkedin, Mail, ExternalLink, Code2, Database, BrainCircuit, TerminalSquare } from "lucide-react";
import { Logo } from "@/components/Logo";
import { motion } from "motion/react";

export const Route = createFileRoute("/about")({
  component: AboutResumePage,
});

function AboutResumePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-emerald-500/30">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 bg-[#050505]/80 backdrop-blur-lg border-b border-white/5">
        <Link to="/" className="flex items-center gap-3 font-display text-xl text-white">
          <Logo className="w-6 h-6 text-white" />
          <span>Sarathi.ai</span>
        </Link>
        <Link 
          to="/"
          className="text-sm font-medium text-white/50 hover:text-white transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Project
        </Link>
      </nav>

      {/* Split Layout Container */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 min-h-screen flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
        
        {/* Left Column: Sticky Profile / Intro */}
        <div className="lg:w-[45%] flex flex-col items-start lg:sticky lg:top-32 h-fit">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Available for Opportunities
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-display font-medium leading-[1.1] tracking-tight mb-6">
              Hi, I'm <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">VARA4u-tech</span>.
            </h1>
            
            <h2 className="text-xl lg:text-2xl text-white/70 font-display mb-6">
              Postgraduate Student & Full-Stack AI Engineer
            </h2>
            
            <p className="text-white/40 leading-relaxed mb-10 max-w-md">
              I build scalable, AI-powered applications that solve real engineering problems. Sarathi.ai is my flagship hackathon project, demonstrating full-stack architecture, seamless LLM integration, and modern frontend design.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-12">
              <a 
                href="https://vara-s-portfolio.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium hover:scale-105 transition-transform"
              >
                View Live Portfolio <ExternalLink className="w-4 h-4" />
              </a>
              <a href="https://github.com/VARA4u-tech" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:hello@example.com" className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Scrollable Experience & Skills */}
        <div className="lg:w-[55%] flex flex-col gap-20">
          
          {/* Featured Project */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-sm font-semibold tracking-widest text-white/50 uppercase mb-8 flex items-center gap-4">
              Featured Project <div className="h-[1px] flex-grow bg-white/10" />
            </h3>
            
            <div className="group relative p-8 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-white/20 transition-colors overflow-hidden">
              <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-2xl font-display text-white">Sarathi.ai</h4>
                  <a href="https://github.com/VARA4u-tech/codepilot-ai" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
                <p className="text-white/50 leading-relaxed mb-6">
                  An AI Engineering Operating System. Built during a competitive hackathon to showcase how agentic AI can automate repository understanding, code planning, and documentation generation.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["React", "TypeScript", "TanStack", "Tailwind", "Python", "LLMs"].map(tech => (
                    <span key={tech} className="px-3 py-1 rounded-full bg-white/5 text-xs text-white/70 border border-white/10">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Core Skills */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-sm font-semibold tracking-widest text-white/50 uppercase mb-8 flex items-center gap-4">
              Core Stack <div className="h-[1px] flex-grow bg-white/10" />
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-4">
                <Code2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="font-medium text-white mb-1">Frontend Engineering</h4>
                  <p className="text-sm text-white/40">React, Next.js, TypeScript, Tailwind CSS, Framer Motion.</p>
                </div>
              </div>
              
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-4">
                <Database className="w-6 h-6 text-violet-400 shrink-0" />
                <div>
                  <h4 className="font-medium text-white mb-1">Backend & Systems</h4>
                  <p className="text-sm text-white/40">Python, FastAPI, Node.js, Postgres, Docker.</p>
                </div>
              </div>
              
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-4">
                <BrainCircuit className="w-6 h-6 text-pink-400 shrink-0" />
                <div>
                  <h4 className="font-medium text-white mb-1">AI & LLM Integration</h4>
                  <p className="text-sm text-white/40">OpenAI, LLM, RAG Pipelines, Agentic Frameworks.</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-4">
                <TerminalSquare className="w-6 h-6 text-blue-400 shrink-0" />
                <div>
                  <h4 className="font-medium text-white mb-1">CS Fundamentals</h4>
                  <p className="text-sm text-white/40">Data Structures, Algorithms, Architecture Design, OS Concepts.</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Education */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-sm font-semibold tracking-widest text-white/50 uppercase mb-8 flex items-center gap-4">
              Education <div className="h-[1px] flex-grow bg-white/10" />
            </h3>
            
            <div className="relative pl-6 border-l border-white/10 pb-8">
              <div className="absolute w-3 h-3 bg-emerald-500 rounded-full -left-[6.5px] top-1 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2 gap-2">
                <h4 className="text-lg font-medium text-white">Postgraduate Degree in Computer Science</h4>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">2023 - Present</span>
              </div>
              <p className="text-white/50 text-sm">
                Focusing on advanced computing, software engineering methodologies, and artificial intelligence.
              </p>
            </div>
          </motion.section>

        </div>
      </div>
    </main>
  );
}
