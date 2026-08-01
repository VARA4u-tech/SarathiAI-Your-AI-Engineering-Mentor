import { Link } from "@tanstack/react-router";
import { Activity, FileCode2, FileText, Settings, X } from "lucide-react";
import { Logo } from "@/components/Logo";

export function Sidebar({ mobileOpen, onClose }: { mobileOpen: boolean; onClose: () => void }) {
  return (
    <aside
      className={`fixed md:relative inset-y-0 left-0 z-30 flex w-72 md:w-64 border-r border-border flex-col justify-between p-4 glass transition-transform duration-200 print:hidden ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
    >
      <div>
        <div className="flex items-center justify-between mb-10">
          <Link to="/" className="flex items-center gap-3 font-display text-xl px-2">
            <Logo className="w-5 h-5" />
            <span className="hidden md:block">Sarathi.ai</span>
          </Link>
          <button
            onClick={onClose}
            className="md:hidden grid size-10 place-items-center rounded-lg hover:bg-white/10"
            aria-label="Close dashboard navigation"
          >
            <X className="size-5" />
          </button>
        </div>
        <nav className="space-y-2">
          <NavItem icon={Activity} label="Audit Hub" to="/dashboard" />
          <NavItem icon={FileCode2} label="Codebases" to="/repositories" />
        </nav>
      </div>
      <NavItem icon={Settings} label="Settings" to="/settings" />
    </aside>
  );
}

function NavItem({
  icon: Icon,
  label,
  to,
}: {
  icon: React.ElementType;
  label: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition text-left text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
      activeProps={{ className: "!bg-foreground/10 !text-foreground" }}
    >
      <Icon className="size-5" />
      <span className="text-sm font-medium hidden md:block">{label}</span>
    </Link>
  );
}
