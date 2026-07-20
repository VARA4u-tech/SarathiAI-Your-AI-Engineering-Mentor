import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart2, TrendingUp, Users, Clock, Activity } from "lucide-react";

export const Route = createFileRoute("/analytics")({
  component: Analytics,
});

function Analytics() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col overflow-hidden">
      <div className="absolute inset-0 noise pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 h-16 border-b border-border flex items-center px-6 glass shrink-0">
        <Link
          to="/dashboard"
          className="text-muted-foreground hover:text-foreground transition flex items-center gap-2 text-sm font-medium"
        >
          <ArrowRight className="size-4 rotate-180" /> Back to Dashboard
        </Link>
        <div className="h-4 w-px bg-border mx-4" />
        <span className="font-display text-xl flex items-center gap-2">
          <BarChart2 className="size-5 text-fuchsia-400" />
          Analytics & Usage
        </span>
      </header>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 overflow-y-auto p-6 md:p-10">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid md:grid-cols-4 gap-6">
            <StatCard
              icon={Activity}
              label="Total AI Operations"
              value="12,482"
              trend="+14%"
              color="text-fuchsia-400"
            />
            <StatCard
              icon={Clock}
              label="Hours Saved"
              value="342h"
              trend="+22%"
              color="text-emerald-400"
            />
            <StatCard
              icon={TrendingUp}
              label="Code Generated"
              value="84K lines"
              trend="+8%"
              color="text-cyan-400"
            />
            <StatCard icon={Users} label="Active Team Members" value="12" color="text-orange-400" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 glass rounded-3xl p-6 border border-border h-[400px] flex flex-col">
              <h3 className="font-display text-xl mb-6">AI Usage Over Time</h3>
              <div className="flex-1 flex items-end gap-2 px-4">
                {[40, 60, 45, 80, 55, 90, 75, 100, 85, 110, 95, 120].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-fuchsia-400/50 to-cyan-400/50 rounded-t-sm"
                    style={{ height: `${(h / 120) * 100}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-4 text-xs text-muted-foreground">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
              </div>
            </div>

            <div className="glass rounded-3xl p-6 border border-border h-[400px] flex flex-col">
              <h3 className="font-display text-xl mb-6">Top Workspaces</h3>
              <div className="space-y-4 flex-1">
                <WorkspaceItem name="ecommerce-v2" ops={4821} />
                <WorkspaceItem name="auth-service" ops={3102} />
                <WorkspaceItem name="mobile-app" ops={2410} />
                <WorkspaceItem name="admin-dashboard" ops={1245} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  trend?: string;
  color: string;
}) {
  return (
    <div className="glass rounded-2xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <Icon className={`size-5 ${color}`} />
        {trend && (
          <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <div className="font-display text-3xl mb-1">{value}</div>
      <div className="text-xs text-muted-foreground uppercase tracking-widest">{label}</div>
    </div>
  );
}

function WorkspaceItem({ name, ops }: { name: string; ops: string | number }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-background/50 border border-border">
      <span className="text-sm font-medium">{name}</span>
      <span className="text-xs font-mono text-muted-foreground">{ops} ops</span>
    </div>
  );
}
