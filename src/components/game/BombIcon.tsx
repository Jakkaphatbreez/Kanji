import Image from 'next/image';

const BOMB_ASPECT_WIDTH = 408;
const BOMB_ASPECT_HEIGHT = 612;

const BASE_HEIGHT = 136;
const GROWTH_PER_EXTRA_CHAR = 18;
const MAX_HEIGHT = 190;

function heightForLabel(label: string): number {
  const extraChars = Math.max(0, label.length - 1);
  return Math.min(BASE_HEIGHT + extraChars * GROWTH_PER_EXTRA_CHAR, MAX_HEIGHT);
}

function fontSizePxForLabel(label: string, height: number): number {
  if (label.length <= 1) return Math.round(height * 0.17);
  if (label.length === 2) return Math.round(height * 0.1);
  if (label.length === 3) return Math.round(height * 0.068);
  return Math.round(height * 0.05);
}

interface BombIconProps {
  label: string;
}

export function BombIcon({ label }: BombIconProps) {
  const height = heightForLabel(label);
  const width = Math.round((height * BOMB_ASPECT_WIDTH) / BOMB_ASPECT_HEIGHT);
  const fontSize = fontSizePxForLabel(label, height);

  return (
    <div className="relative" style={{ width, height }}>
      <Image
        src="/bomb.png"
        alt={label}
        width={BOMB_ASPECT_WIDTH}
        height={BOMB_ASPECT_HEIGHT}
        unoptimized
        className="h-full w-full object-contain"
      />
      <span
        className="absolute flex items-center justify-center text-center leading-none font-bold text-zinc-800"
        style={{ left: '33%', right: '36%', top: '38%', bottom: '38%', fontSize }}
      >
        {label}
      </span>
    </div>
  );
}
