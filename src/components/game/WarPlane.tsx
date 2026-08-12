interface WarPlaneProps {
  className?: string;
}

export function WarPlane({ className }: WarPlaneProps) {
  return (
    <svg viewBox="0 0 120 50" className={className} aria-label="fighter jet" role="img">
      <ellipse cx="55" cy="26" rx="48" ry="6" fill="#52525b" />
      <path d="M103 26 L120 22 L120 30 Z" fill="#3f3f46" />
      <ellipse cx="75" cy="21" rx="7" ry="4" fill="#93c5fd" />
      <path d="M50 30 L70 48 L92 31 Z" fill="#3f3f46" />
      <path d="M20 23 L2 8 L28 21 Z" fill="#3f3f46" />
      <path d="M22 22 L12 2 L30 20 Z" fill="#71717a" />
    </svg>
  );
}
