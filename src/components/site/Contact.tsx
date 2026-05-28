import { useState } from "react";
import { motion } from "motion/react";
import { z } from "zod";
import { toast } from "sonner";
import orb2 from "@/assets/orb-2.jpg";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(10, "Tell us a little more").max(2000),
});

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (next[i.path[0] as string] = i.message));
      setErrors(next);
      return;
    }
    setErrors({});
    setStatus("loading");
    try {
      const res = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      toast.success("Message sent — we'll be in touch within 24 hours.");
    } catch (err) {
      setStatus("idle");
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <img
        src={orb2}
        alt=""
        loading="lazy"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] max-w-none opacity-40 blur-2xl pointer-events-none"
      />
      <div className="relative mx-auto w-[min(92%,720px)] text-center">
        <h2 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.95] text-gradient">
          Let's make something
          <br />
          <span className="italic text-iridescent">unforgettable.</span>
        </h2>
        <p className="mt-8 text-muted-foreground max-w-md mx-auto">
          Tell us about your project — brand, product, or somewhere in between. We reply within 24 hours.
        </p>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 glass rounded-3xl p-10 text-left"
          >
            <div className="size-12 rounded-full bg-gradient-to-br from-fuchsia-400 to-cyan-400 grid place-items-center mb-4 mx-auto">
              <svg viewBox="0 0 24 24" className="size-6 text-background" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="font-display text-3xl text-center">Message received.</h3>
            <p className="text-muted-foreground mt-3 text-center">
              Thanks — we'll be in touch within 24 hours.
            </p>
            <div className="text-center mt-6">
              <button
                onClick={() => setStatus("idle")}
                className="text-sm text-muted-foreground hover:text-foreground transition"
              >
                Send another →
              </button>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={onSubmit} className="mt-12 glass rounded-3xl p-6 md:p-8 text-left space-y-5">
            <Field
              label="Name"
              error={errors.name}
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              placeholder="Your name"
            />
            <Field
              label="Email"
              type="email"
              error={errors.email}
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              placeholder="you@studio.com"
            />
            <div>
              <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Project
              </label>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us a bit about what you're building…"
                className="w-full bg-transparent border border-border focus:border-foreground/40 rounded-2xl px-4 py-3 text-sm outline-none transition resize-none placeholder:text-muted-foreground/60"
              />
              {errors.message && <p className="text-xs text-red-400 mt-1.5">{errors.message}</p>}
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-full bg-foreground text-background px-8 py-4 text-sm font-medium hover:opacity-90 transition disabled:opacity-50"
            >
              {status === "loading" ? "Sending…" : "Send message →"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({
  label, value, onChange, error, placeholder, type = "text",
}: {
  label: string; value: string; onChange: (v: string) => void;
  error?: string; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent border border-border focus:border-foreground/40 rounded-full px-5 py-3 text-sm outline-none transition placeholder:text-muted-foreground/60"
      />
      {error && <p className="text-xs text-red-400 mt-1.5">{error}</p>}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto w-[min(92%,1200px)] flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 font-display text-lg text-foreground">
          <span className="size-2 rounded-full bg-gradient-to-br from-fuchsia-400 to-cyan-400" />
          fluidic
        </div>
        <p>© {new Date().getFullYear()} Fluidic Studio. All rights reserved.</p>
        <div className="flex gap-5">
          <a href="#" className="hover:text-foreground">Instagram</a>
          <a href="#" className="hover:text-foreground">Twitter</a>
          <a href="#" className="hover:text-foreground">Dribbble</a>
        </div>
      </div>
    </footer>
  );
}
