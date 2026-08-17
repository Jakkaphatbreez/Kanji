import Image from 'next/image';

interface WarPlaneProps {
  className?: string;
}

export function WarPlane({ className }: WarPlaneProps) {
  return (
    <Image
      src="/warplane.png"
      alt="fighter jet"
      width={612}
      height={408}
      unoptimized
      className={className}
    />
  );
}
