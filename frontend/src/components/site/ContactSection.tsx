import { motion } from "motion/react";
import { useState } from "react";
import { CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

export function ContactSection() {
  const [state, setState] = useState<"idle" | "success" | "error">("idle");
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const valid = Boolean(data.get("name") && data.get("email") && data.get("message"));
    setState(valid ? "success" : "error");
    if (valid) event.currentTarget.reset();
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden border-t border-white/5">
      {/* Very subtle background light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none opacity-50" />

      <div className="relative mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-medium text-white mb-4">
            Get in touch
          </h2>
          <p className="text-base md:text-lg text-white/50 max-w-xl mx-auto">
            Have a project in mind or just want to say hi? We'd love to hear from you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/[0.03] border border-white/[0.08] p-6 md:p-12 rounded-[2rem] backdrop-blur-xl shadow-2xl"
        >
          <form className="space-y-6 md:space-y-8" onSubmit={submit} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-white/70 ml-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 hover:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 transition-all duration-300"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-white/70 ml-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 hover:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 transition-all duration-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-white/70 ml-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="How can we help you?"
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 hover:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 transition-all duration-300 resize-none"
              />
            </div>

            {state !== "idle" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm ${state === "success" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"}`}
              >
                {state === "success" ? (
                  <CheckCircle2 className="size-4" />
                ) : (
                  <AlertCircle className="size-4" />
                )}
                {state === "success"
                  ? "Thanks for reaching out! We'll get back to you soon."
                  : "Please fill in all fields before sending."}
              </motion.div>
            )}

            <div className="pt-2 flex justify-center">
              <button
                type="submit"
                className="group flex items-center justify-center gap-2 w-full md:w-auto md:px-12 py-4 bg-white text-black rounded-xl text-sm font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                Send Message
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
