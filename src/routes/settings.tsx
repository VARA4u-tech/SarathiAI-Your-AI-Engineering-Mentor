import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Settings as SettingsIcon,
  Bell,
  Shield,
  Key,
  HardDrive,
  CreditCard,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/settings")({
  component: Settings,
});

function Settings() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <main className="min-h-screen bg-background text-foreground flex overflow-hidden">
      <div className="absolute inset-0 noise pointer-events-none" />

      {/* Global Sidebar (Slim) */}
      <aside className="relative z-10 w-64 border-r border-border flex flex-col p-4 glass shrink-0">
        <Link
          to="/dashboard"
          className="text-muted-foreground hover:text-foreground transition flex items-center gap-2 text-sm font-medium mb-8"
        >
          <ArrowRight className="size-4 rotate-180" /> Back to Dashboard
        </Link>

        <h2 className="font-display text-2xl mb-6 px-2">Settings</h2>

        <nav className="space-y-1">
          <TabButton
            icon={SettingsIcon}
            label="General"
            id="general"
            active={activeTab}
            onClick={setActiveTab}
          />
          <TabButton
            icon={Shield}
            label="Security"
            id="security"
            active={activeTab}
            onClick={setActiveTab}
          />
          <TabButton
            icon={Key}
            label="API Keys"
            id="api"
            active={activeTab}
            onClick={setActiveTab}
          />
          <TabButton
            icon={Bell}
            label="Notifications"
            id="notifications"
            active={activeTab}
            onClick={setActiveTab}
          />
          <TabButton
            icon={HardDrive}
            label="Integrations"
            id="integrations"
            active={activeTab}
            onClick={setActiveTab}
          />
          <TabButton
            icon={CreditCard}
            label="Billing"
            id="billing"
            active={activeTab}
            onClick={setActiveTab}
          />
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 overflow-y-auto p-8 md:p-12">
        <div className="max-w-3xl">
          <h1 className="font-display text-4xl mb-2 capitalize">{activeTab}</h1>
          <p className="text-muted-foreground text-sm mb-10">
            Manage your workspace preferences and configurations.
          </p>

          <div className="space-y-6">
            <div className="glass rounded-3xl p-6 border border-border">
              <h3 className="font-medium mb-4">Workspace Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">
                    Workspace Name
                  </label>
                  <input
                    type="text"
                    defaultValue="CodePilot AI Team"
                    className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-foreground/40 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">
                    Repository Default Branch
                  </label>
                  <input
                    type="text"
                    defaultValue="main"
                    className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-foreground/40 transition"
                  />
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl p-6 border border-border flex items-center justify-between">
              <div>
                <h3 className="font-medium mb-1">AI Context Mode</h3>
                <p className="text-xs text-muted-foreground">
                  Allow AI to read external documentation links automatically.
                </p>
              </div>
              <div className="w-12 h-6 bg-emerald-400 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 bottom-1 w-4 bg-background rounded-full shadow" />
              </div>
            </div>

            <div className="glass rounded-3xl p-6 border border-border flex items-center justify-between">
              <div>
                <h3 className="font-medium mb-1 text-red-400">Delete Workspace</h3>
                <p className="text-xs text-muted-foreground">
                  Permanently remove this workspace and all graph data.
                </p>
              </div>
              <button className="rounded-full bg-red-400/10 text-red-400 border border-red-400/20 px-4 py-2 text-sm font-medium hover:bg-red-400/20 transition">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function TabButton({
  icon: Icon,
  label,
  id,
  active,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  id: string;
  active: boolean;
  onClick: () => void;
}) {
  const isActive = active === id;
  return (
    <button
      onClick={() => onClick(id)}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition ${
        isActive
          ? "bg-foreground/10 text-foreground"
          : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
      }`}
    >
      <Icon className="size-4" />
      {label}
    </button>
  );
}
