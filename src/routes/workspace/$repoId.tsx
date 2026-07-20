import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import {
  FolderGit2,
  Shield,
  Users,
  ShoppingCart,
  CreditCard,
  Package,
  Settings,
  Bell,
  Database,
  Route as RouteIcon,
  Search,
  Terminal,
  Play,
  Bug,
  FileText,
  LayoutTemplate,
  MessageSquare,
  Zap,
  Clock,
  AlertTriangle,
  Layers,
  BrainCircuit,
} from "lucide-react";

export const Route = createFileRoute("/workspace/$repoId")({
  component: Workspace,
});

function Workspace() {
  const { repoId } = useParams({ from: "/workspace/$repoId" });
  const [activeTab, setActiveTab] = useState("Understand");

  return (
    <main className="h-screen bg-background text-foreground flex overflow-hidden">
      <div className="absolute inset-0 noise pointer-events-none" />

      {/* Global Sidebar (Slim) */}
      <aside className="relative z-10 w-16 border-r border-border flex flex-col items-center py-4 glass shrink-0">
        <Link
          to="/dashboard"
          className="size-8 rounded-full bg-gradient-to-br from-fuchsia-400 to-cyan-400 shadow-[0_0_12px_currentColor] mb-8"
        />

        <div className="flex flex-col gap-4">
          <NavIcon
            icon={Search}
            tooltip="Understand"
            active={activeTab === "Understand"}
            onClick={() => setActiveTab("Understand")}
          />
          <NavIcon
            icon={LayoutTemplate}
            tooltip="Planner"
            active={activeTab === "Planner"}
            onClick={() => setActiveTab("Planner")}
          />
          <NavIcon
            icon={Terminal}
            tooltip="Build"
            active={activeTab === "Build"}
            onClick={() => setActiveTab("Build")}
          />
          <NavIcon
            icon={Bug}
            tooltip="Debug"
            active={activeTab === "Debug"}
            onClick={() => setActiveTab("Debug")}
          />
          <NavIcon
            icon={FileText}
            tooltip="Document"
            active={activeTab === "Document"}
            onClick={() => setActiveTab("Document")}
          />
        </div>
      </aside>

      {/* LEFT PANEL: Repository Intelligence */}
      <aside className="relative z-10 w-72 border-r border-border flex flex-col glass shrink-0">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2 mb-1 text-sm font-medium">
            <FolderGit2 className="size-4 text-fuchsia-400" />
            {repoId || "demo-repo"}
          </div>
          <p className="text-xs text-muted-foreground">Main branch • Indexed 2m ago</p>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-6">
          <div>
            <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest px-2 mb-2">
              Business Modules
            </div>
            <div className="space-y-0.5">
              <ModuleItem icon={Shield} label="Authentication" />
              <ModuleItem icon={Users} label="Users & Roles" />
              <ModuleItem icon={ShoppingCart} label="Orders" active />
              <ModuleItem icon={CreditCard} label="Payments" />
              <ModuleItem icon={Package} label="Products" />
            </div>
          </div>

          <div>
            <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest px-2 mb-2">
              System
            </div>
            <div className="space-y-0.5">
              <ModuleItem icon={Database} label="Database Models" />
              <ModuleItem icon={RouteIcon} label="API Routes" />
              <ModuleItem icon={Settings} label="Configurations" />
              <ModuleItem icon={Bell} label="Notifications" />
            </div>
          </div>
        </div>
      </aside>

      {/* CENTER PANEL: AI Engineering Console */}
      <section className="relative z-10 flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-border flex items-center justify-between px-6 glass">
          <div className="flex items-center gap-4">
            <span className="font-display text-lg">{activeTab} Mode</span>
            <div className="h-4 w-px bg-border" />
            <span className="text-xs text-muted-foreground">Orders Module Context</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "Planner" ? <FeaturePlanner /> : <AIChat />}
        </div>
      </section>

      {/* RIGHT PANEL: Context Panel */}
      <aside className="relative z-10 w-80 border-l border-border flex flex-col glass shrink-0">
        <div className="p-4 border-b border-border">
          <h3 className="font-medium text-sm flex items-center gap-2">
            <BrainCircuit className="size-4 text-cyan-400" /> AI Context
          </h3>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
              Selected Files
            </h4>
            <div className="space-y-2">
              <FilePill name="OrderController.ts" />
              <FilePill name="OrderService.ts" />
              <FilePill name="Order.model.ts" />
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
              Architecture Dependencies
            </h4>
            <div className="p-3 rounded-xl bg-foreground/5 border border-border text-xs text-muted-foreground space-y-2">
              <div className="flex justify-between">
                <span>PaymentService</span> <span className="text-foreground">Required</span>
              </div>
              <div className="flex justify-between">
                <span>EmailService</span> <span className="text-foreground">Optional</span>
              </div>
              <div className="flex justify-between">
                <span>InventoryDb</span> <span className="text-foreground">Required</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Memory</h4>
            <p className="text-xs text-muted-foreground leading-relaxed p-3 rounded-xl bg-foreground/5 border border-border">
              "You previously asked to optimize the inventory check query. I've stored that context
              for when we edit OrderService.ts."
            </p>
          </div>
        </div>
      </aside>
    </main>
  );
}

// Subcomponents

function NavIcon({ icon: Icon, active, onClick, tooltip }: any) {
  return (
    <button
      onClick={onClick}
      title={tooltip}
      className={`size-10 rounded-xl flex items-center justify-center transition-all ${
        active
          ? "bg-foreground/10 text-foreground shadow-inner"
          : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
      }`}
    >
      <Icon className="size-5" />
    </button>
  );
}

function ModuleItem({ icon: Icon, label, active }: any) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
        active
          ? "bg-fuchsia-400/10 text-fuchsia-400"
          : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
      }`}
    >
      <Icon className="size-4" />
      {label}
    </button>
  );
}

function FilePill({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-background border border-border text-xs">
      <span className="truncate">{name}</span>
      <button className="text-muted-foreground hover:text-foreground">&times;</button>
    </div>
  );
}

function FeaturePlanner() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="glass p-8 rounded-3xl border border-border">
        <h2 className="font-display text-3xl mb-2">Implement Refund Processing</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Generated implementation plan based on architecture analysis.
        </p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-background border border-border">
            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
              Complexity
            </div>
            <div className="text-lg font-medium text-fuchsia-400">High</div>
          </div>
          <div className="p-4 rounded-2xl bg-background border border-border">
            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
              Est. Time
            </div>
            <div className="text-lg font-medium flex items-center gap-2">
              <Clock className="size-4" /> 4 hours
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-background border border-border">
            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
              Risk Level
            </div>
            <div className="text-lg font-medium text-orange-400 flex items-center gap-2">
              <AlertTriangle className="size-4" /> Medium
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
              <Layers className="size-4 text-cyan-400" /> Affected Systems
            </h3>
            <div className="flex gap-2 flex-wrap text-xs">
              <span className="px-3 py-1 rounded-full bg-foreground/10 border border-border">
                Backend (2 files)
              </span>
              <span className="px-3 py-1 rounded-full bg-foreground/10 border border-border">
                Database (1 migration)
              </span>
              <span className="px-3 py-1 rounded-full bg-foreground/10 border border-border">
                API (1 new route)
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Implementation Steps</h3>
            <div className="space-y-3">
              <div className="p-4 rounded-xl border border-border bg-background/50">
                <div className="text-sm font-medium">1. Update Order Schema</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Add `refundStatus` and `refundAmount` to Order model.
                </div>
              </div>
              <div className="p-4 rounded-xl border border-border bg-background/50">
                <div className="text-sm font-medium">2. Create Stripe Webhook Handler</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Listen for `charge.refunded` events in PaymentService.
                </div>
              </div>
              <div className="p-4 rounded-xl border border-border bg-background/50">
                <div className="text-sm font-medium">3. Implement Refund API Route</div>
                <div className="text-xs text-muted-foreground mt-1">
                  POST `/api/orders/:id/refund` requiring admin privileges.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex justify-end">
          <button className="rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition flex items-center gap-2">
            <Zap className="size-4" /> Generate Implementation
          </button>
        </div>
      </div>
    </div>
  );
}

function AIChat() {
  return (
    <div className="max-w-3xl mx-auto h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex-1 overflow-y-auto space-y-6 pb-6">
        {/* User Message */}
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-foreground/10 px-5 py-3 text-sm border border-border">
            How does the current order checkout flow handle concurrent inventory reductions?
          </div>
        </div>

        {/* AI Message */}
        <div className="flex justify-start">
          <div className="max-w-[90%] rounded-2xl rounded-tl-sm glass px-5 py-4 text-sm border border-border space-y-4 shadow-xl">
            <p>
              Based on my analysis of{" "}
              <span className="font-mono text-xs text-fuchsia-400 bg-fuchsia-400/10 px-1 rounded">
                OrderService.ts
              </span>
              , the current checkout flow uses a pessimistic lock on the database level:
            </p>
            <div className="rounded-lg bg-background p-4 border border-border font-mono text-xs text-muted-foreground overflow-x-auto">
              <div className="text-foreground">
                await prisma.$transaction(async (tx) ={">"} {"{"}
              </div>
              <div className="pl-4">// 1. Lock rows</div>
              <div className="pl-4">
                await tx.$executeRaw`SELECT * FROM Inventory WHERE id IN (...) FOR UPDATE`;
              </div>
              <div className="pl-4 mt-2">// 2. Check quantities</div>
              <div className="pl-4 mt-2">// 3. Deduct if sufficient</div>
              <div>{"}"})</div>
            </div>
            <p>
              This is safe but can cause bottlenecks during high-traffic drops. Would you like me to
              generate a Redis-based optimistic locking approach?
            </p>
          </div>
        </div>
      </div>

      <div className="mt-auto relative">
        <input
          type="text"
          placeholder="Ask CodePilot or type '/' for commands..."
          className="w-full bg-background border border-border focus:border-foreground/40 rounded-full pl-6 pr-12 py-4 text-sm outline-none transition shadow-lg placeholder:text-muted-foreground/60"
        />
        <button className="absolute right-2 top-2 bottom-2 size-10 rounded-full bg-foreground text-background flex items-center justify-center hover:opacity-90 transition">
          <Zap className="size-4" />
        </button>
      </div>
    </div>
  );
}
