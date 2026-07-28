export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <img
      src="/logo.png"
      alt="CodePilot AI Logo"
      className={className}
      style={{ objectFit: "contain" }}
    />
  );
}
