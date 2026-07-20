import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import hero from "@/assets/hero-fluid.jpg";

export const Route = createFileRoute("/auth/forgot")({
  component: ForgotPassword,
});

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center relative overflow-hidden">
      <img
        src={hero}
        alt=""
        loading="lazy"
        className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-[800px] max-w-none opacity-20 blur-3xl pointer-events-none"
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

          <h1 className="font-display text-4xl mb-2">Reset password.</h1>
          <p className="text-muted-foreground mb-8 text-sm">
            We'll send you a link to reset your password.
          </p>

          {submitted ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="p-6 rounded-2xl bg-foreground/5 border border-border mb-6">
                <p className="text-sm">Check your email. We've sent a recovery link to <span className="text-foreground">{email}</span>.</p>
              </div>
              <Link to="/auth/login" className="w-full block text-center rounded-full glass px-8 py-4 text-sm font-medium hover:bg-white/10 transition">
                Return to sign in
              </Link>
            </motion.div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full bg-transparent border border-border focus:border-foreground/40 rounded-full px-5 py-3 text-sm outline-none transition placeholder:text-muted-foreground/60"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-foreground text-background px-8 py-4 text-sm font-medium hover:opacity-90 transition mt-4"
              >
                Send reset link →
              </button>
            </form>
          )}

          {!submitted && (
            <div className="mt-8 text-center text-sm text-muted-foreground">
              Remember your password?{" "}
              <Link to="/auth/login" className="text-foreground hover:underline transition">
                Sign in
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
