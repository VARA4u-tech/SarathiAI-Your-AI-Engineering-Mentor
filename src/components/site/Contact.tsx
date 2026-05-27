import orb2 from "@/assets/orb-2.jpg";

export function Contact() {
  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <img src={orb2} alt="" loading="lazy"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] max-w-none opacity-40 blur-2xl pointer-events-none" />
      <div className="relative mx-auto w-[min(92%,900px)] text-center">
        <h2 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.95] text-gradient">
          Let's make something
          <br />
          <span className="italic text-iridescent">unforgettable.</span>
        </h2>
        <p className="mt-8 text-muted-foreground max-w-md mx-auto">
          Tell us about your project — brand, product, or somewhere in between. We reply within 24 hours.
        </p>
        <a href="mailto:hello@fluidic.studio"
          className="inline-block mt-10 rounded-full bg-foreground text-background px-8 py-4 text-sm font-medium hover:opacity-90 transition">
          hello@fluidic.studio →
        </a>
      </div>
    </section>
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
