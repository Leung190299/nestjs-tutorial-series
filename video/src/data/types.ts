export type SentenceTiming = {
  file: string; // đường dẫn tương đối trong public/, '' = không có audio (fixture)
  startFrame: number;
  durationInFrames: number;
};

export type SceneTiming = {
  id: string;
  type: string;
  visual: Record<string, unknown>;
  sentences: SentenceTiming[];
  durationInFrames: number;
};

export type EpisodeTiming = {fps: number; scenes: SceneTiming[]};

// Props chung mọi scene component; mỗi scene tự cast visual về type riêng của nó.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SceneProps = {visual: any; sentences: SentenceTiming[]};
