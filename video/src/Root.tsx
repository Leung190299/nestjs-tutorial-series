import React from 'react';
import {Composition} from 'remotion';
import {Episode, totalDuration} from './Episode';
import {Thumbnail, ThumbnailProps} from './Thumbnail';
import ep00 from './data/ep00.timing.json';
import ep01 from './data/ep01.timing.json';
import ep02 from './data/ep02.timing.json';
import ep03 from './data/ep03.timing.json';
import ep04 from './data/ep04.timing.json';
import type {EpisodeTiming} from './data/types';

const t01 = ep01 as unknown as EpisodeTiming;
const t02 = ep02 as unknown as EpisodeTiming;
const t03 = ep03 as unknown as EpisodeTiming;
const t04 = ep04 as unknown as EpisodeTiming;
const t00 = ep00 as unknown as EpisodeTiming;

const thumbnails: {id: string; props: ThumbnailProps}[] = [
  {
    id: 'Thumb01',
    props: {
      badge: 'TẬP 1',
      line1: 'NESTJS',
      line2: 'LÀ GÌ?',
      subtitle: 'API đầu tiên trong 6 phút',
      variant: 'ep1',
    },
  },
  {
    id: 'Thumb02',
    props: {
      badge: 'TẬP 2',
      line1: 'HIỂU NGAY',
      line2: 'MICROSERVICES',
      subtitle: 'Demo thật trong 5 phút',
      variant: 'ep2',
    },
  },
  {
    id: 'Thumb03',
    props: {
      badge: 'TẬP 3',
      line1: 'CHAT',
      line2: 'REALTIME',
      subtitle: 'WebSocket · 20 dòng code',
      variant: 'ep3',
    },
  },
  {
    id: 'Thumb04',
    props: {
      badge: 'TẬP CUỐI',
      line1: 'GHÉP',
      line2: 'TẤT CẢ',
      subtitle: 'App chat hoàn chỉnh 🏁',
      variant: 'ep4',
    },
  },
];

export const RemotionRoot: React.FC = () => (
  <>
    {thumbnails.map((t) => (
      <Composition
        key={t.id}
        id={t.id}
        component={Thumbnail}
        defaultProps={t.props}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />
    ))}
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
      id="Episode02"
      component={Episode}
      defaultProps={{timing: t02}}
      durationInFrames={totalDuration(t02)}
      fps={t02.fps}
      width={1920}
      height={1080}
    />
    <Composition
      id="Episode03"
      component={Episode}
      defaultProps={{timing: t03}}
      durationInFrames={totalDuration(t03)}
      fps={t03.fps}
      width={1920}
      height={1080}
    />
    <Composition
      id="Episode04"
      component={Episode}
      defaultProps={{timing: t04}}
      durationInFrames={totalDuration(t04)}
      fps={t04.fps}
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
