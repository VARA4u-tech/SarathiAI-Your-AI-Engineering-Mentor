import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldAlert, Users, Server, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminConsole,
});

function AdminConsole() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col overflow-hidden">
      <div className="absolute inset-0 noise pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 h-16 border-b border-border flex items-center px-6 glass shrink-0">
        <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition flex items-center gap-2 text-sm font-medium">
          <ArrowRight className="size-4 rotate-180" /> Back to Dashboard
        </Link>
        <div className="h-4 w-px bg-border mx-4" />
        <span className="font-display text-xl flex items-center gap-2 text-orange-400">
          <ShieldAlert className="size-5" />
          Admin Console
        </span>
      </header>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 overflow-y-auto p-6 md:p-10">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="grid md:grid-cols-3 gap-6">
            <StatCard icon={Users} label="Total Users" value="1,248" color="text-cyan-400" />
            <StatCard icon={Server} label="Active Workspaces" value="342" color="text-fuchsia-400" />
            <StatCard icon={AlertTriangle} label="System Alerts" value="2" color="text-orange-400" />
          </div>

          <div className="glass rounded-3xl border border-border overflow-hidden">
            <div className="p-6 border-b border-border">
              <h3 className="font-display text-2xl">Recent User Activity</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-foreground/5 text-xs uppercase tracking-widest text-muted-foreground">
                  <tr>
                    <th className="px-6 py-4 font-medium">User</th>
                    <th className="px-6 py-4 font-medium">Action</th>
                    <th className="px-6 py-4 font-medium">Workspace</th>
                    <th className="px-6 py-4 font-medium">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <ActivityRow user="jane.doe@company.com" action="Generated test suite" ws="ecommerce-v2" time="2m ago" />
                  <ActivityRow user="mark.s@company.com" action="Connected repo" ws="payment-gateway" time="15m ago" />
                  <ActivityRow user="sarah.j@company.com" action="Invited member" ws="mobile-app" time="1h ago" />
                  <ActivityRow user="admin@company.com" action="Updated billing" ws="System" time="3h ago" />
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

function StatCard({ icon: Icon, label, value, color }: any) {
  return (
    <div className="glass rounded-2xl p-6 border border-border border-l-4" style={{ borderLeftColor: `var(--color-${color.split('-')[1]}-400)`}}>
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs text-muted-foreground uppercase tracking-widest">{label}</div>
        <Icon className={`size-5 ${color}`} />
      </div>
      <div className="font-display text-4xl">{value}</div>
    </div>
  );
}

function ActivityRow({ user, action, ws, time }: any) {
  return (
    <tr className="hover:bg-foreground/5 transition">
      <td className="px-6 py-4 font-medium">{user}</td>
      <td className="px-6 py-4 text-muted-foreground">{action}</td>
      <td className="px-6 py-4"><span className="bg-foreground/10 px-2 py-1 rounded text-xs">{ws}</span></td>
      <td className="px-6 py-4 text-muted-foreground text-xs">{time}</td>
    </tr>
  );
}
