export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none" className={className}>
      <defs>
        <linearGradient id="sarathiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e879f9" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
        <filter id="sarathiGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <circle
        cx="60"
        cy="60"
        r="48"
        stroke="url(#sarathiGrad)"
        strokeWidth="12"
        strokeDasharray="100 40"
        strokeLinecap="round"
        transform="rotate(-30 60 60)"
        opacity="0.9"
      />

      <circle cx="60" cy="60" r="18" fill="url(#sarathiGrad)" filter="url(#sarathiGlow)" />

      <path d="M 60 60 L 95 25" stroke="url(#sarathiGrad)" strokeWidth="10" strokeLinecap="round" />
    </svg>
  );
}
