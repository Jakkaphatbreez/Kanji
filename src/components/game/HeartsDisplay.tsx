interface HeartsDisplayProps {
  hearts: number;
  maxHearts: number;
}

export function HeartsDisplay({ hearts, maxHearts }: HeartsDisplayProps) {
  return (
    <div className="text-2xl" aria-label={`${hearts} / ${maxHearts} hearts`}>
      {Array.from({ length: maxHearts }, (_, i) => (
        <span key={i}>{i < hearts ? '❤️' : '🖤'}</span>
      ))}
    </div>
  );
}
