import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, User, Mail, Shield, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

function Profile() {
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
          <User className="size-5 text-cyan-400" />
          My Profile
        </span>
      </header>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 overflow-y-auto p-6 md:p-10">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="glass rounded-3xl p-8 border border-border flex items-center gap-6">
            <div className="size-24 rounded-full bg-gradient-to-br from-fuchsia-400 to-cyan-400 p-1">
              <div className="w-full h-full bg-background rounded-full flex items-center justify-center font-display text-3xl">
                JD
              </div>
            </div>
            <div>
              <h1 className="font-display text-3xl mb-1">Jane Doe</h1>
              <p className="text-muted-foreground text-sm flex items-center gap-2">
                <Mail className="size-3" /> jane.doe@company.com
              </p>
              <span className="inline-flex items-center gap-1 mt-3 text-xs bg-emerald-400/10 text-emerald-400 px-2 py-1 rounded-full border border-emerald-400/20">
                <Shield className="size-3" /> Admin Access
              </span>
            </div>
          </div>

          <form className="glass rounded-3xl p-8 border border-border space-y-6">
            <h2 className="font-display text-2xl mb-4">Personal Information</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  defaultValue="Jane"
                  className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-foreground/40 transition"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  defaultValue="Doe"
                  className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-foreground/40 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Email Address
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="email"
                  defaultValue="jane.doe@company.com"
                  disabled
                  className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm outline-none opacity-50 cursor-not-allowed"
                />
                <span className="flex items-center gap-1 text-xs text-emerald-400 shrink-0">
                  <CheckCircle2 className="size-4" /> Verified
                </span>
              </div>
            </div>

            <div className="pt-6 border-t border-border flex justify-end">
              <button
                type="button"
                className="rounded-full bg-foreground text-background px-6 py-2.5 text-sm font-medium hover:opacity-90 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
