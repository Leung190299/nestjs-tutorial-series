import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {theme} from './components/theme';
import type {EpisodeTiming, SceneTiming} from './data/types';
import {sceneRegistry} from './scenes/registry';

export const totalDuration = (timing: EpisodeTiming): number =>
  timing.scenes.reduce((sum, s) => sum + s.durationInFrames, 0);

const Scene: React.FC<{scene: SceneTiming}> = ({scene}) => {
  const Comp = sceneRegistry[scene.type];
  if (!Comp) {
    return (
      <AbsoluteFill
        style={{
          backgroundColor: theme.bg,
          color: theme.yellow,
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 60,
          fontFamily: theme.fontSans,
        }}
      >
        Chưa có scene type: {scene.type}
      </AbsoluteFill>
    );
  }
  return <Comp visual={scene.visual} sentences={scene.sentences} />;
};

export const Episode: React.FC<{timing: EpisodeTiming}> = ({timing}) => {
  let from = 0;
  return (
    <AbsoluteFill style={{backgroundColor: theme.bg}}>
      {timing.scenes.map((scene) => {
        const el = (
          <Sequence
            key={scene.id}
            from={from}
            durationInFrames={scene.durationInFrames}
            name={scene.id}
          >
            <Scene scene={scene} />
            {scene.sentences.map((s) =>
              s.file ? (
                <Sequence key={s.file} from={s.startFrame} name={`audio:${s.file}`}>
                  <Audio src={staticFile(s.file)} />
                </Sequence>
              ) : null
            )}
          </Sequence>
        );
        from += scene.durationInFrames;
        return el;
      })}
    </AbsoluteFill>
  );
};
