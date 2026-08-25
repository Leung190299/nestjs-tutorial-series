import {useCurrentFrame} from 'remotion';
import type {SentenceTiming} from '../data/types';

// Index của câu đang (hoặc vừa) đọc tại frame hiện tại của scene.
export const useSentenceIndex = (sentences: SentenceTiming[]): number => {
  const frame = useCurrentFrame();
  let idx = 0;
  sentences.forEach((s, i) => {
    if (frame >= s.startFrame) idx = i;
  });
  return idx;
};

export const sentenceStart = (sentences: SentenceTiming[], i: number): number =>
  sentences[Math.min(i, Math.max(sentences.length - 1, 0))]?.startFrame ?? 0;
