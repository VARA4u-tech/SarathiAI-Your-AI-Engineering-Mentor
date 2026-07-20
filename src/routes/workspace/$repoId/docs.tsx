import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { 
  BookOpen, ArrowRight, Download, FileText, Database, 
  Globe, LayoutGrid, Sparkles 
} from "lucide-react";

export const Route = createFileRoute("/workspace/$repoId/docs")({
  component: DocumentationCenter,
});

function DocumentationCenter() {
  const { repoId } = useParams({ from: "/workspace/$repoId/docs" });

  return (
    <main className="h-screen bg-background text-foreground flex overflow-hidden">
      <div className="absolute inset-0 noise pointer-events-none" />

      {/* Sidebar Navigation */}
      <aside className="relative z-10 w-64 border-r border-border flex flex-col p-4 glass shrink-0">
        <Link to="/workspace/$repoId" params={{ repoId }} className="text-muted-foreground hover:text-foreground transition mb-8 flex items-center gap-2 text-sm font-medium">
          <ArrowRight className="size-4 rotate-180" /> Back to Workspace
        </Link>
        
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground px-2 mb-3">Generated Docs</h2>
        <nav className="space-y-1">
          <NavItem icon={BookOpen} label="Overview (README)" active />
          <NavItem icon={LayoutGrid} label="Architecture Diagram" />
          <NavItem icon={Globe} label="API Endpoints" />
          <NavItem icon={Database} label="Database Schema" />
          <NavItem icon={FileText} label="Component Library" />
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 overflow-y-auto flex flex-col">
        <header className="h-16 border-b border-border flex items-center justify-between px-8 glass shrink-0 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <h1 className="font-display text-xl">Overview (README)</h1>
            <span className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-fuchsia-400 bg-fuchsia-400/10 px-2 py-0.5 rounded-full">
              <Sparkles className="size-3" /> Auto-Generated
            </span>
          </div>
          <button className="flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium border border-border hover:bg-foreground/5 transition">
            <Download className="size-3.5" /> Export PDF
          </button>
        </header>

        <div className="p-8 md:p-12 max-w-4xl mx-auto w-full">
          <div className="prose prose-invert prose-p:text-muted-foreground prose-headings:font-display prose-headings:font-normal max-w-none">
            <h1 className="text-5xl text-gradient mb-6">CodePilot E-Commerce</h1>
            <p className="text-lg">
              A modern, high-performance e-commerce architecture built with React, Node.js, and PostgreSQL. 
              This documentation is automatically maintained and updated by CodePilot AI based on codebase analysis.
            </p>

            <h2 className="text-3xl mt-12 mb-4">Core Architecture</h2>
            <div className="p-6 rounded-3xl glass border border-border not-prose mb-8">
              <div className="flex items-center gap-8 justify-center opacity-80">
                <div className="text-center"><Database className="size-8 mx-auto mb-2 text-fuchsia-400" /> <span className="text-sm">PostgreSQL</span></div>
                <div className="h-px w-16 bg-border" />
                <div className="text-center"><Globe className="size-8 mx-auto mb-2 text-cyan-400" /> <span className="text-sm">Express API</span></div>
                <div className="h-px w-16 bg-border" />
                <div className="text-center"><LayoutGrid className="size-8 mx-auto mb-2 text-emerald-400" /> <span className="text-sm">React App</span></div>
              </div>
            </div>

            <h3 className="text-2xl mt-8 mb-4">Key Features</h3>
            <ul>
              <li><strong>Authentication:</strong> JWT-based auth with refresh token rotation (see <a href="#" className="text-fuchsia-400">Auth Service</a>).</li>
              <li><strong>Payments:</strong> Stripe webhooks handled securely with pessimistic locking.</li>
              <li><strong>Inventory:</strong> Real-time inventory deduction during checkout.</li>
            </ul>

            <h3 className="text-2xl mt-8 mb-4">Getting Started</h3>
            <pre className="bg-background border border-border rounded-xl p-4">
              <code>
<span className="text-muted-foreground"># Install dependencies</span>{"\n"}
pnpm install{"\n\n"}
<span className="text-muted-foreground"># Set up database</span>{"\n"}
pnpm prisma db push{"\n\n"}
<span className="text-muted-foreground"># Run development server</span>{"\n"}
pnpm run dev
              </code>
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
}

function NavItem({ icon: Icon, label, active }: any) {
  return (
    <a href="#" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition ${
      active ? 'bg-foreground/10 text-foreground' : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground'
    }`}>
      <Icon className="size-4" />
      {label}
    </a>
  );
}
