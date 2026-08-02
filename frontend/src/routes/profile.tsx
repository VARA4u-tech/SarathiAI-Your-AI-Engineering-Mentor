import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, User, Mail, Shield, CheckCircle2, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { getToken, signOut } from "@/lib/demo-auth";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate({ to: "/login", replace: true });
      return;
    }
    try {
      const payloadBase64 = token.split(".")[1];
      const payload = JSON.parse(atob(payloadBase64));
      setUser(payload);
    } catch (e) {
      console.error("Failed to decode token", e);
      signOut();
    }
  }, [navigate]);

  if (!user) return null;

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
          <div className="glass rounded-3xl p-8 border border-border flex flex-col sm:flex-row items-center sm:items-start gap-6 relative">
            <div className="size-24 rounded-full bg-gradient-to-br from-fuchsia-400 to-cyan-400 p-1 shrink-0">
              <div className="w-full h-full bg-background rounded-full flex items-center justify-center font-display text-3xl overflow-hidden">
                {user.picture ? (
                  <img src={user.picture} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user.name?.charAt(0) || "U"
                )}
              </div>
            </div>
            <div className="text-center sm:text-left flex-1">
              <h1 className="font-display text-3xl mb-1">{user.name || "Google User"}</h1>
              <p className="text-muted-foreground text-sm flex items-center justify-center sm:justify-start gap-2">
                <Mail className="size-3" /> {user.email}
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-3 mt-4">
                <span className="inline-flex items-center gap-1 text-xs bg-emerald-400/10 text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-400/20">
                  <Shield className="size-3" /> Member Access
                </span>
                <span className="inline-flex items-center gap-1 text-xs bg-cyan-400/10 text-cyan-400 px-3 py-1.5 rounded-full border border-cyan-400/20">
                  <CheckCircle2 className="size-3" /> Google Verified
                </span>
              </div>
            </div>

            <div className="absolute top-8 right-8 hidden sm:block">
              <button
                onClick={signOut}
                className="flex items-center gap-2 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 px-4 py-2 text-sm font-medium hover:bg-rose-500/20 transition-colors"
              >
                <LogOut className="size-4" /> Sign Out
              </button>
            </div>
          </div>

          <div className="sm:hidden flex justify-center">
            <button
              onClick={signOut}
              className="flex items-center justify-center w-full gap-2 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 px-6 py-4 text-sm font-medium hover:bg-rose-500/20 transition-colors"
            >
              <LogOut className="size-4" /> Sign Out
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
