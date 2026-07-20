import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { 
  Activity, Code2, GitMerge, FileText, Bot, 
  TerminalSquare, TestTube2, MessageSquare, HeartPulse, 
  Plus, History, BarChart3, Settings, BookOpen
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <main className="min-h-screen bg-background text-foreground flex overflow-hidden">
      <div className="absolute inset-0 noise" />
      
      {/* Sidebar Navigation */}
      <aside className="relative z-10 w-20 lg:w-64 border-r border-border flex flex-col justify-between p-4 glass">
        <div>
          <div className="flex items-center gap-2 font-display text-xl px-2 mb-10">
            <span className="size-2 rounded-full bg-gradient-to-br from-fuchsia-400 to-cyan-400 shadow-[0_0_12px_currentColor]" />
            <span className="hidden lg:inline">CodePilot AI</span>
          </div>
          <nav className="space-y-2">
            <NavItem icon={Activity} label="Mission Control" active />
            <NavItem icon={Code2} label="Repositories" />
            <NavItem icon={Bot} label="AI Workspaces" />
            <NavItem icon={BookOpen} label="Documentation" />
          </nav>
        </div>
        <div className="space-y-2">
          <NavItem icon={Settings} label="Settings" />
          <div className="mt-4 p-4 glass rounded-2xl hidden lg:block border border-border">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">AI Usage</p>
            <div className="h-1.5 w-full bg-foreground/10 rounded-full overflow-hidden">
              <div className="h-full w-[65%] bg-gradient-to-r from-fuchsia-400 to-cyan-400" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">65% of monthly quota</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="relative z-10 flex-1 overflow-y-auto p-6 md:p-10 space-y-8">
        
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-4xl mb-1">Mission Control</h1>
            <p className="text-muted-foreground text-sm">Welcome back. Your repositories are operating optimally.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/import" className="rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:opacity-90 transition flex items-center gap-2">
              <Plus className="size-4" /> Import Repository
            </Link>
          </div>
        </header>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={HeartPulse} label="Repo Health" value="98%" trend="+2.4%" />
          <StatCard icon={Code2} label="Total Lines" value="1.2M" />
          <StatCard icon={Bot} label="AI Operations" value="842" trend="+12%" />
          <StatCard icon={TestTube2} label="Test Coverage" value="84%" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Dashboard Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass rounded-3xl p-6 md:p-8">
              <h2 className="font-display text-2xl mb-6">Pinned & Recent Projects</h2>
              <div className="space-y-4">
                <ProjectCard name="ecommerce-platform-v2" branch="main" status="Analyzed" time="2 hours ago" />
                <ProjectCard name="authentication-service" branch="feat/oauth" status="Analyzing..." time="Just now" active />
                <ProjectCard name="mobile-app-react-native" branch="staging" status="Analyzed" time="Yesterday" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass rounded-3xl p-6">
                <h3 className="font-display text-xl mb-4 flex items-center gap-2"><MessageSquare className="size-4 text-fuchsia-400" /> Recent Chats</h3>
                <div className="space-y-3">
                  <ActivityItem text="Explain authentication flow" time="1h ago" />
                  <ActivityItem text="Refactor Cart component" time="3h ago" />
                  <ActivityItem text="Debug Redis connection" time="5h ago" />
                </div>
              </div>
              <div className="glass rounded-3xl p-6">
                <h3 className="font-display text-xl mb-4 flex items-center gap-2"><FileText className="size-4 text-cyan-400" /> Documentation</h3>
                <div className="space-y-3">
                  <ActivityItem text="Generated API Routes Doc" time="2h ago" />
                  <ActivityItem text="Updated DB Schema" time="Yesterday" />
                  <ActivityItem text="Component Library PDF" time="2 days ago" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <div className="glass rounded-3xl p-6">
              <h3 className="font-display text-xl mb-4">Project Timeline</h3>
              <div className="relative pl-4 space-y-6 before:absolute before:inset-y-2 before:left-[7px] before:w-px before:bg-border">
                <TimelineItem title="Test Generation Complete" desc="auth-service coverage increased to 92%" time="10:42 AM" />
                <TimelineItem title="Knowledge Graph Updated" desc="ecommerce-platform-v2 re-indexed" time="09:15 AM" />
                <TimelineItem title="New Repository Imported" desc="payment-gateway connected" time="Yesterday" />
              </div>
            </div>

            <div className="glass rounded-3xl p-6">
              <h3 className="font-display text-xl mb-4 flex items-center gap-2"><BarChart3 className="size-4" /> Repository Analytics</h3>
              <div className="space-y-4">
                <ProgressItem label="Architecture Score" val={92} color="bg-emerald-400" />
                <ProgressItem label="Security Score" val={88} color="bg-cyan-400" />
                <ProgressItem label="Code Quality" val={76} color="bg-fuchsia-400" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

function NavItem({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <a href="#" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition ${active ? 'bg-foreground/10 text-foreground' : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground'}`}>
      <Icon className="size-5" />
      <span className="text-sm font-medium hidden lg:block">{label}</span>
    </a>
  );
}

function StatCard({ icon: Icon, label, value, trend }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-5 border border-border">
      <div className="flex items-center justify-between mb-4">
        <Icon className="size-5 text-muted-foreground" />
        {trend && <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">{trend}</span>}
      </div>
      <div className="font-display text-3xl mb-1">{value}</div>
      <div className="text-xs text-muted-foreground uppercase tracking-widest">{label}</div>
    </motion.div>
  );
}

function ProjectCard({ name, branch, status, time, active }: any) {
  return (
    <div className={`flex items-center justify-between p-4 rounded-2xl transition border ${active ? 'bg-foreground/5 border-foreground/20' : 'bg-background/40 border-border hover:bg-foreground/5'}`}>
      <div className="flex items-center gap-4">
        <div className="size-10 rounded-xl glass grid place-items-center">
          <GitMerge className="size-5 text-muted-foreground" />
        </div>
        <div>
          <h4 className="font-medium text-sm">{name}</h4>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
            <span className="flex items-center gap-1"><TerminalSquare className="size-3" /> {branch}</span>
            <span>•</span>
            <span>{time}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className={`text-xs px-2.5 py-1 rounded-full ${active ? 'bg-cyan-400/10 text-cyan-400' : 'bg-foreground/10 text-foreground'}`}>
          {active && <span className="inline-block size-1.5 rounded-full bg-cyan-400 animate-pulse mr-1.5" />}
          {status}
        </span>
        <button className="text-muted-foreground hover:text-foreground">→</button>
      </div>
    </div>
  );
}

function ActivityItem({ text, time }: any) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
      <span className="text-sm">{text}</span>
      <span className="text-xs text-muted-foreground">{time}</span>
    </div>
  );
}

function TimelineItem({ title, desc, time }: any) {
  return (
    <div className="relative">
      <div className="absolute -left-[23px] top-1.5 size-2.5 rounded-full bg-fuchsia-400 shadow-[0_0_8px_oklch(0.65_0.25_320)]" />
      <h4 className="text-sm font-medium">{title}</h4>
      <p className="text-xs text-muted-foreground mt-1">{desc}</p>
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground mt-2 block">{time}</span>
    </div>
  );
}

function ProgressItem({ label, val, color }: any) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1.5">
        <span>{label}</span>
        <span className="text-muted-foreground">{val}/100</span>
      </div>
      <div className="h-1.5 w-full bg-foreground/10 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${val}%` }} />
      </div>
    </div>
  );
}
