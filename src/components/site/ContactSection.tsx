import { motion } from "motion/react";
import { Mail, MapPin, Send } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Premium Background Glow */}
      <div 
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(192, 38, 211, 0.1) 0%, rgba(192, 38, 211, 0) 60%)" 
        }}
      />
      <div 
        className="absolute left-0 bottom-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(34, 211, 238, 0.08) 0%, rgba(34, 211, 238, 0) 60%)" 
        }}
      />

      <div className="relative mx-auto w-[min(96%,1200px)]">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="font-display text-[clamp(3rem,6vw,5rem)] leading-[0.95] text-gradient mb-6">
              Let's build the <br />
              <span className="italic text-iridescent">future together.</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-md">
              Whether you're looking to 10x your team's output or just want to say hello, our inbox is always open.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center size-12 rounded-full glass shrink-0">
                  <Mail className="w-5 h-5 text-fuchsia-400" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">Email Us</h4>
                  <a href="mailto:hello@codepilot.ai" className="text-muted-foreground hover:text-foreground transition-colors">
                    hello@codepilot.ai
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
                    100 Innovation Drive<br />San Francisco, CA 94107
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="glass rounded-[2rem] p-8 md:p-12 relative overflow-hidden"
          >
            {/* Subtle Form Highlight */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-b from-fuchsia-500/10 to-transparent blur-3xl pointer-events-none" />

            <form className="relative space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-muted-foreground ml-1">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    placeholder="Jane"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 focus:border-transparent transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-muted-foreground ml-1">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    placeholder="Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-muted-foreground ml-1">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="jane@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-muted-foreground ml-1">Your Message</label>
                <textarea 
                  id="message" 
                  rows={4}
                  placeholder="Tell us what you're building..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 focus:border-transparent transition-all resize-none"
                />
              </div>

              <button 
                type="submit"
                className="group w-full flex items-center justify-center gap-2 bg-foreground text-background rounded-xl px-6 py-4 text-sm font-medium hover:opacity-90 transition-opacity"
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
