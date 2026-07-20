import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import orb2 from "@/assets/orb-2.jpg";

export const Route = createFileRoute("/auth/register")({
  component: Register,
});

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center relative overflow-hidden">
      <img
        src={orb2}
        alt=""
        loading="lazy"
        className="absolute right-1/4 bottom-1/4 translate-x-1/2 translate-y-1/2 w-[800px] max-w-none opacity-30 blur-3xl pointer-events-none"
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

          <h1 className="font-display text-4xl mb-2">Create account.</h1>
          <p className="text-muted-foreground mb-8 text-sm">
            Join the engineering teams building faster.
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full bg-transparent border border-border focus:border-foreground/40 rounded-full px-5 py-3 text-sm outline-none transition placeholder:text-muted-foreground/60"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full bg-transparent border border-border focus:border-foreground/40 rounded-full px-5 py-3 text-sm outline-none transition placeholder:text-muted-foreground/60"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Password
              </label>
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
              Sign Up →
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-foreground hover:underline transition">
              Sign in
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
