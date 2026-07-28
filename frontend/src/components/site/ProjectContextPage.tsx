import { Link } from "@tanstack/react-router";
import { ArrowLeft, Construction } from "lucide-react";
import { Logo } from "@/components/Logo";

interface ProjectContextPageProps {
  title: string;
  description: string;
}

export function ProjectContextPage({ title, description }: ProjectContextPageProps) {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[50%] rounded-full bg-emerald-600/10 blur-[120px] pointer-events-none" />

      {/* Nav bar */}
      <nav className="w-full p-6 flex justify-between items-center z-10">
        <Link to="/" className="flex items-center gap-3 font-display text-xl text-white">
          <Logo className="w-6 h-6 text-white" />
          <span>Sarathi.ai</span>
        </Link>
        <Link
          to="/"
          className="text-sm font-medium text-white/50 hover:text-white transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </nav>

      {/* Content */}
      <div className="flex-grow flex flex-col items-center justify-center px-6 z-10">
        <div className="max-w-2xl w-full text-center flex flex-col items-center gap-6 p-12 bg-white/5 border border-white/10 rounded-[2rem] glass shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
            <Construction className="w-8 h-8 text-white/70" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-medium text-white">{title}</h1>
          <p className="text-lg text-white/60 leading-relaxed max-w-lg mx-auto">{description}</p>
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent my-4" />
          <p className="text-sm text-white/40 uppercase tracking-widest font-semibold">
            Hackathon Project Context
          </p>
          <p className="text-white/50 text-sm max-w-md">
            This page is a placeholder. Sarathi.ai was built as a personal portfolio project by a PG
            student to showcase full-stack engineering and AI integration skills.
          </p>

          <a
            href="https://vara-s-portfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center px-8 py-3 bg-white text-black rounded-full font-medium hover:scale-105 transition-transform"
          >
            View Developer Portfolio
          </a>
        </div>
      </div>
    </main>
  );
}
