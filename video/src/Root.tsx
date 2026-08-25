import React from 'react';
import {Composition} from 'remotion';
import {Episode, totalDuration} from './Episode';
import ep00 from './data/ep00.timing.json';
import ep01 from './data/ep01.timing.json';
import type {EpisodeTiming} from './data/types';

const t01 = ep01 as unknown as EpisodeTiming;
const t00 = ep00 as unknown as EpisodeTiming;

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="Episode01"
      component={Episode}
      defaultProps={{timing: t01}}
      durationInFrames={totalDuration(t01)}
      fps={t01.fps}
      width={1920}
      height={1080}
    />
    <Composition
      id="Preview"
      component={Episode}
      defaultProps={{timing: t00}}
      durationInFrames={totalDuration(t00)}
      fps={t00.fps}
      width={1920}
      height={1080}
    />
  </>
);
