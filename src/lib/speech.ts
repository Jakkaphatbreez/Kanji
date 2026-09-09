// Ported from this project's pre-Next.js prototype (index.html), which used
// this exact approach in production: the browser's own Web Speech API, no
// audio files or backend needed — fits a static-export site with no server.

// Gap (ms) inserted between segments split on "、" — the TTS engine's own
// comma pause is too short/inconsistent, so segments are spoken as separate
// utterances with a real delay between them.
const SPEECH_SEGMENT_GAP_MS = 550;
const SPEECH_RATE = 0.85;

export function splitIntoSpeechSegments(text: string): string[] {
  if (!text) return [];
  if (text.includes('、')) {
    return text
      .split('、')
      .map(s => s.trim())
      .filter(Boolean);
  }
  return [text];
}

export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function speakSequence(texts: string[]): boolean {
  if (texts.length === 0 || !isSpeechSynthesisSupported()) return false;

  try {
    window.speechSynthesis.cancel();
    let index = 0;
    const speakNext = () => {
      if (index >= texts.length) return;
      const segment = texts[index++];
      const utterance = new SpeechSynthesisUtterance(segment);
      utterance.lang = 'ja-JP';
      utterance.rate = SPEECH_RATE;
      if (index < texts.length) {
        utterance.onend = () => setTimeout(speakNext, SPEECH_SEGMENT_GAP_MS);
      }
      window.speechSynthesis.speak(utterance);
    };
    speakNext();
    return true;
  } catch {
    return false;
  }
}

export function speakJapanese(text: string): boolean {
  if (!text) return false;
  return speakSequence(splitIntoSpeechSegments(text));
}

export function stopSpeaking(): void {
  if (isSpeechSynthesisSupported()) window.speechSynthesis.cancel();
}
