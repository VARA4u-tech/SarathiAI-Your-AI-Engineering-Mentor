import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import orb1 from "@/assets/orb-1.jpg";

export const Route = createFileRoute("/auth/login")({
  component: Login,
});

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center relative overflow-hidden">
      {/* Background aesthetics matching landing page */}
      <img
        src={orb1}
        alt=""
        loading="lazy"
        className="absolute left-1/4 top-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] max-w-none opacity-30 blur-3xl pointer-events-none"
      />
      <div className="absolute inset-0 noise" />

      <div className="relative z-10 w-full max-w-md p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-8 md:p-10 shadow-2xl"
        >
          <div className="flex items-center gap-2 font-display text-2xl mb-8">
            <span className="size-2.5 rounded-full bg-gradient-to-br from-fuchsia-400 to-cyan-400 shadow-[0_0_12px_currentColor]" />
            CodePilot AI
          </div>

          <h1 className="font-display text-4xl mb-2">Welcome back.</h1>
          <p className="text-muted-foreground mb-8 text-sm">
            Sign in to access your engineering workspace.
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full bg-transparent border border-border focus:border-foreground/40 rounded-full px-5 py-3 text-sm outline-none transition placeholder:text-muted-foreground/60"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground">Password</label>
                <Link to="/auth/forgot" className="text-xs text-muted-foreground hover:text-foreground transition">
                  Forgot?
                </Link>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent border border-border focus:border-foreground/40 rounded-full px-5 py-3 text-sm outline-none transition placeholder:text-muted-foreground/60"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-foreground text-background px-8 py-4 text-sm font-medium hover:opacity-90 transition mt-4"
            >
              Sign In →
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/auth/register" className="text-foreground hover:underline transition">
              Request access
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
