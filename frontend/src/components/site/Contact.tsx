import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

export function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress relative to the footer container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Smooth parallax translation for the inner content
  const y = useTransform(scrollYProgress, [0, 1], [-100, 0]);
  const opacity = useTransform(scrollYProgress, [0.3, 1], [0, 1]);

  return (
    <footer
      ref={containerRef}
      className="relative h-[950px] md:h-[700px] lg:h-[800px] w-full"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="relative md:fixed bottom-0 w-full h-[950px] md:h-[700px] lg:h-[800px] bg-[#050505] text-white flex flex-col justify-between overflow-hidden">
        
        {/* Animated Background Gradients & Noise */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] rounded-full bg-emerald-600/10 blur-[120px] pointer-events-none" />
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
        />

        <motion.div 
          style={{ y, opacity }}
          className="relative z-10 flex flex-col h-full justify-between pt-24 md:pt-32 pb-8 px-6 md:px-16 max-w-[1600px] mx-auto w-full"
        >
          {/* Top Section: Giant CTA */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 border-b border-white/10 pb-12 lg:pb-16">
            <div className="flex flex-col gap-6 max-w-3xl">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="uppercase tracking-widest text-xs font-semibold text-white/50">Open for new projects</span>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-medium leading-[1.1] tracking-tight">
                Let's build <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">the future.</span>
              </h2>
            </div>
            
            <a 
              href="mailto:hello@sarathi.ai"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 md:py-5 bg-white text-black rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 shrink-0"
            >
              <span className="relative z-10 font-semibold text-base md:text-lg flex items-center gap-2">
                Get in touch <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          {/* Middle Section: Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 py-10 lg:py-16 flex-grow">
            <div className="md:col-span-4 flex flex-col gap-6">
              <span className="text-2xl font-display font-medium text-white">Sarathi.ai</span>
              <p className="text-white/40 max-w-xs leading-relaxed text-sm lg:text-base">
                The ultimate AI Engineering OS. Transform how your team builds, scales, and maintains software.
              </p>
              
              <div className="flex items-center gap-3 mt-4">
                {/* Social Icons */}
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-white hover:text-black hover:border-white transition-all hover:scale-110">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-white hover:text-black hover:border-white transition-all hover:scale-110">
                  <span className="sr-only">GitHub</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-white hover:text-black hover:border-white transition-all hover:scale-110">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </div>
            </div>
            
            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div className="flex flex-col gap-4">
                <h4 className="text-white font-semibold mb-3 uppercase tracking-widest text-xs">Product</h4>
                {["Features", "Pricing", "Integrations", "Changelog"].map(item => (
                  <a key={item} href="#" className="group flex items-center text-white/50 hover:text-white transition-colors w-fit">
                    <span className="relative overflow-hidden pb-1">
                      {item}
                      <span className="absolute left-0 bottom-0 w-full h-[1px] bg-white transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                    </span>
                  </a>
                ))}
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="text-white font-semibold mb-3 uppercase tracking-widest text-xs">Resources</h4>
                {["Documentation", "API Reference", "Blog", "Community"].map(item => (
                  <a key={item} href="#" className="group flex items-center text-white/50 hover:text-white transition-colors w-fit">
                    <span className="relative overflow-hidden pb-1">
                      {item}
                      <span className="absolute left-0 bottom-0 w-full h-[1px] bg-white transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                    </span>
                  </a>
                ))}
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="text-white font-semibold mb-3 uppercase tracking-widest text-xs">Company</h4>
                {["About", "Careers", "Contact", "Legal"].map(item => (
                  <a key={item} href="#" className="group flex items-center text-white/50 hover:text-white transition-colors w-fit">
                    <span className="relative overflow-hidden pb-1">
                      {item}
                      <span className="absolute left-0 bottom-0 w-full h-[1px] bg-white transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Footer Info */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs lg:text-sm text-white/30 pt-6">
            <p>© {new Date().getFullYear()} Sarathi.ai Inc. Crafted with precision.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </motion.div>
        
        {/* Massive Background Text */}
        <div className="absolute bottom-[-18%] left-0 w-full flex justify-center pointer-events-none select-none overflow-hidden opacity-[0.07]">
          <h1 className="text-[27vw] font-display font-bold leading-none tracking-tighter text-white">
            SARATHI
          </h1>
        </div>
      </div>
    </footer>
  );
}
