import { motion } from "motion/react";
import { useState } from "react";
import { CheckCircle2, Mail, MapPin, Send, User, MessageSquare, AlertCircle } from "lucide-react";

export function ContactSection() {
  const [state, setState] = useState<"idle" | "success" | "error">("idle");
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const valid = Boolean(data.get("firstName") && data.get("email") && data.get("message"));
    setState(valid ? "success" : "error");
    if (valid) event.currentTarget.reset();
  };
  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Premium Background Glow */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(192, 38, 211, 0.1) 0%, rgba(192, 38, 211, 0) 60%)",
        }}
      />
      <div
        className="absolute left-0 bottom-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(34, 211, 238, 0.08) 0%, rgba(34, 211, 238, 0) 60%)",
        }}
      />

      <div className="relative mx-auto w-[min(96%,1200px)]">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="font-display text-[clamp(3rem,6vw,5rem)] leading-[0.95] text-gradient mb-6">
              Let's build the <br />
              <span className="italic text-iridescent">future together.</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-md">
              Whether you're looking to 10x your team's output or just want to say hello, our inbox
              is always open.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center size-12 rounded-full glass shrink-0">
                  <Mail className="w-5 h-5 text-fuchsia-400" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">Email Us</h4>
                  <a
                    href="mailto:hello@sarathi.ai"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    hello@sarathi.ai
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center size-12 rounded-full glass shrink-0">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">HQ Location</h4>
                  <p className="text-muted-foreground">
                    100 Innovation Drive
                    <br />
                    San Francisco, CA 94107
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="glass rounded-[2rem] p-8 md:p-12 relative overflow-hidden"
          >
            {/* Subtle Form Highlight */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-b from-fuchsia-500/10 to-transparent blur-3xl pointer-events-none" />

            <form className="relative space-y-6" onSubmit={submit} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2 relative group/input">
                  <label
                    htmlFor="firstName"
                    className="text-xs font-semibold tracking-wider uppercase text-muted-foreground ml-1"
                  >
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within/input:text-fuchsia-500 transition-colors" />
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="Enter Your First Name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-foreground placeholder:text-muted-foreground/50 hover:bg-white/10 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500/50 focus:bg-white/10 transition-all duration-300"
                    />
                  </div>
                </div>
                <div className="space-y-2 relative group/input">
                  <label
                    htmlFor="lastName"
                    className="text-xs font-semibold tracking-wider uppercase text-muted-foreground ml-1"
                  >
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within/input:text-cyan-500 transition-colors" />
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Enter Your Last Name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-foreground placeholder:text-muted-foreground/50 hover:bg-white/10 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 focus:bg-white/10 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2 relative group/input">
                <label
                  htmlFor="email"
                  className="text-xs font-semibold tracking-wider uppercase text-muted-foreground ml-1"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within/input:text-emerald-500 transition-colors" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Your Email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-foreground placeholder:text-muted-foreground/50 hover:bg-white/10 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 focus:bg-white/10 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="space-y-2 relative group/input">
                <label
                  htmlFor="message"
                  className="text-xs font-semibold tracking-wider uppercase text-muted-foreground ml-1"
                >
                  Your Message
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-muted-foreground group-focus-within/input:text-fuchsia-500 transition-colors" />
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us what you're building..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-foreground placeholder:text-muted-foreground/50 hover:bg-white/10 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500/50 focus:bg-white/10 transition-all duration-300 resize-none"
                  />
                </div>
              </div>

              {state !== "idle" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="status"
                  className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm ${state === "success" ? "bg-emerald-400/10 text-emerald-200 border border-emerald-300/20" : "bg-rose-400/10 text-rose-200 border border-rose-300/20"}`}
                >
                  {state === "success" ? (
                    <CheckCircle2 className="size-4" />
                  ) : (
                    <AlertCircle className="size-4" />
                  )}
                  {state === "success"
                    ? "Your note is on its way. We’ll be in touch shortly."
                    : "Please add your name, email, and a short message."}
                </motion.div>
              )}

              <button
                type="submit"
                className="group w-full flex items-center justify-center gap-2 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 text-white rounded-xl px-6 py-4 text-sm font-bold tracking-wide uppercase hover:opacity-90 shadow-[0_0_20px_rgba(192,38,211,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:-translate-y-0.5 transition-all duration-300"
              >
                Send Message
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
