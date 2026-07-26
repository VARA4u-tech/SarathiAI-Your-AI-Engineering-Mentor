import { Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { ArrowLeft, Check, Eye, EyeOff, LockKeyhole, Mail, Phone, UserRound } from "lucide-react";
import { signIn } from "@/lib/demo-auth";

type Mode = "login" | "signup" | "forgot" | "reset";

const copy = {
  login: {
    eyebrow: "Private client access",
    title: "Welcome back,\nbeautifully built.",
    intro: "Enter your workspace and continue shaping what comes next.",
  },
  signup: {
    eyebrow: "Join the atelier",
    title: "Build with an\nexceptional team.",
    intro: "Create your private CodePilot workspace in a few considered steps.",
  },
  forgot: {
    eyebrow: "Account recovery",
    title: "Find your way\nback in.",
    intro: "We’ll send a discreet reset link to your inbox.",
  },
  reset: {
    eyebrow: "Set a new password",
    title: "A fresh start,\nsecurely made.",
    intro: "Choose a strong new password for your workspace.",
  },
};

export function AuthExperience({ mode }: { mode: Mode }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accepted, setAccepted] = useState(false);
  const isSignup = mode === "signup";
  const isRecovery = mode === "forgot" || mode === "reset";
  const strength = useMemo(
    () =>
      Math.min(
        4,
        (password.length >= 8 ? 1 : 0) +
          (/[A-Z]/.test(password) ? 1 : 0) +
          (/[0-9]/.test(password) ? 1 : 0) +
          (/[^A-Za-z0-9]/.test(password) ? 1 : 0),
      ),
    [password],
  );

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (isSignup && password !== confirmPassword) return setError("The passwords need to match.");
    if (isSignup && !accepted) return setError("Please accept the terms to create your account.");
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      if (isRecovery) setSubmitted(true);
      else {
        signIn();
        navigate({ to: "/dashboard" });
      }
    }, 700);
  };

  if (submitted)
    return (
      <AuthShell mode={mode}>
        <SuccessCard mode={mode} />
      </AuthShell>
    );

  return (
    <AuthShell mode={mode}>
      <motion.form
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        onSubmit={submit}
        className="space-y-4"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-fuchsia-200">
            {copy[mode].eyebrow}
          </p>
          <h1 className="font-display whitespace-pre-line text-4xl md:text-5xl leading-[0.9] mt-4">
            {copy[mode].title}
          </h1>
          <p className="text-sm leading-6 text-white/55 mt-4 max-w-md">{copy[mode].intro}</p>
        </div>
        {isSignup && (
          <Field label="Full name" icon={UserRound}>
            <input
              required
              autoComplete="name"
              placeholder="Avery Jordan"
              className="premium-input"
            />
          </Field>
        )}
        <Field label={mode === "login" ? "Email or phone number" : "Email address"} icon={Mail}>
          <input
            required
            type="email"
            autoComplete="email"
            placeholder="you@studio.com"
            className="premium-input"
          />
        </Field>
        {isSignup && (
          <Field label="Phone number" icon={Phone}>
            <input
              required
              type="tel"
              autoComplete="tel"
              placeholder="+1 415 000 0000"
              className="premium-input"
            />
          </Field>
        )}
        {mode !== "forgot" && (
          <Field label={mode === "reset" ? "New password" : "Password"} icon={LockKeyhole}>
            <div className="relative">
              <input
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                placeholder="••••••••"
                className="premium-input pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/45 hover:text-white"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </Field>
        )}
        {isSignup && (
          <>
            <div className="-mt-2 flex gap-1">
              {[1, 2, 3, 4].map((bar) => (
                <span
                  key={bar}
                  className={`h-1 flex-1 rounded-full ${bar <= strength ? "bg-fuchsia-300" : "bg-white/10"}`}
                />
              ))}
            </div>
            <p className="-mt-2 text-xs text-white/45">
              {strength < 3 ? "Use 8+ characters, a number, and a symbol." : "A strong password."}
            </p>
            <Field label="Confirm password" icon={LockKeyhole}>
              <input
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="••••••••"
                className="premium-input"
              />
            </Field>
          </>
        )}
        {mode === "login" && (
          <div className="flex justify-between text-xs">
            <label className="flex items-center gap-2 text-white/55">
              <input type="checkbox" className="accent-fuchsia-300" /> Remember me
            </label>
            <Link to="/forgot-password" className="text-fuchsia-200 hover:text-white">
              Forgot password?
            </Link>
          </div>
        )}
        {isSignup && (
          <label className="flex items-start gap-2 text-xs leading-5 text-white/55">
            <input
              required
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              type="checkbox"
              className="mt-1 accent-fuchsia-300"
            />
            I agree to the Terms of Service and Privacy Policy.
          </label>
        )}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-rose-300/25 bg-rose-400/10 px-3 py-2 text-xs text-rose-100"
            role="alert"
          >
            {error}
          </motion.p>
        )}
        <button
          disabled={loading}
          className="w-full rounded-2xl bg-gradient-to-r from-fuchsia-200 via-violet-200 to-cyan-100 px-5 py-3.5 text-sm font-semibold text-[#1a1023] shadow-[0_12px_35px_rgba(232,121,249,.2)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_45px_rgba(232,121,249,.35)] disabled:opacity-70"
        >
          {loading
            ? "Preparing your workspace…"
            : mode === "login"
              ? "Enter CodePilot"
              : mode === "signup"
                ? "Create your account"
                : mode === "forgot"
                  ? "Send reset link"
                  : "Reset password"}
        </button>
        {!isRecovery && (
          <>
            <div className="flex items-center gap-3 text-xs text-white/35">
              <span className="h-px flex-1 bg-white/10" />
              or continue with
              <span className="h-px flex-1 bg-white/10" />
            </div>
            <button
              onClick={() => {
                signIn();
                navigate({ to: "/dashboard" });
              }}
              type="button"
              className="w-full rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm transition hover:bg-white/10"
            >
              Continue with Google
            </button>
          </>
        )}
        <p className="pt-1 text-center text-sm text-white/55">
          {mode === "login" ? (
            <>
              New here?{" "}
              <Link to="/signup" className="text-fuchsia-100 hover:text-white">
                Create an account
              </Link>
            </>
          ) : mode === "signup" ? (
            <>
              Already a member?{" "}
              <Link to="/login" className="text-fuchsia-100 hover:text-white">
                Sign in
              </Link>
            </>
          ) : (
            <Link to="/login" className="text-fuchsia-100 hover:text-white">
              Back to sign in
            </Link>
          )}
        </p>
      </motion.form>
    </AuthShell>
  );
}

function AuthShell({ mode, children }: { mode: Mode; children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#110d16] text-white p-4 md:p-6">
      <div className="min-h-[calc(100vh-2rem)] overflow-hidden rounded-[2rem] border border-white/10 bg-[#17101d] grid lg:grid-cols-2">
        <section className="relative hidden lg:flex overflow-hidden p-12 flex-col justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(236,72,153,.42),transparent_27%),radial-gradient(circle_at_78%_75%,rgba(103,232,249,.25),transparent_30%),linear-gradient(145deg,#25132a,#0d1823)]" />
          <div className="relative flex items-center gap-2 font-display text-2xl">
            <span className="size-2.5 rounded-full bg-gradient-to-br from-fuchsia-300 to-cyan-200" />
            CodePilot AI
          </div>
          <div className="relative">
            <p className="text-xs uppercase tracking-[0.3em] text-white/55">
              The engineering atelier
            </p>
            <p className="font-display text-6xl leading-[.86] max-w-md mt-5">
              Software, with a sense of <i>craft.</i>
            </p>
          </div>
          <div className="relative flex gap-3 text-xs text-white/60">
            <span className="rounded-full border border-white/20 px-3 py-1">Agentic by design</span>
            <span className="rounded-full border border-white/20 px-3 py-1">Human in control</span>
          </div>
        </section>
        <section className="relative flex items-center justify-center p-6 sm:p-10">
          <div className="absolute inset-0 noise pointer-events-none" />
          <Link
            to="/"
            className="absolute left-6 top-6 inline-flex items-center gap-2 text-xs text-white/55 hover:text-white"
          >
            <ArrowLeft className="size-4" /> Home
          </Link>
          <div className="relative w-full max-w-md py-14 lg:py-4">{children}</div>
        </section>
      </div>
    </main>
  );
}
function Field({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/55">
        <Icon className="size-3.5" />
        {label}
      </span>
      {children}
    </label>
  );
}
function SuccessCard({ mode }: { mode: Mode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-300/15 text-emerald-200">
        <Check className="size-7" />
      </div>
      <h1 className="font-display text-4xl mt-6">Check your inbox.</h1>
      <p className="text-sm leading-6 text-white/55 mt-3">
        Your secure {mode === "forgot" ? "reset link is on its way" : "password has been updated"}.
      </p>
      <Link
        to="/login"
        className="mt-8 inline-flex rounded-2xl bg-white text-[#17101d] px-5 py-3 text-sm font-medium"
      >
        Return to sign in
      </Link>
    </motion.div>
  );
}
