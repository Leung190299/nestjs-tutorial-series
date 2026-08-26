import React from 'react';
import {Composition} from 'remotion';
import {Episode, totalDuration} from './Episode';
import {Thumbnail, ThumbnailProps} from './Thumbnail';
import ep00 from './data/ep00.timing.json';
import ep01 from './data/ep01.timing.json';
import ep02 from './data/ep02.timing.json';
import ep03 from './data/ep03.timing.json';
import ep04 from './data/ep04.timing.json';
import ep05 from './data/ep05.timing.json';
import ep06 from './data/ep06.timing.json';
import ep07 from './data/ep07.timing.json';
import ep08 from './data/ep08.timing.json';
import type {EpisodeTiming} from './data/types';

const episodes: {id: string; timing: EpisodeTiming}[] = [
  {id: 'Episode01', timing: ep01 as unknown as EpisodeTiming},
  {id: 'Episode02', timing: ep02 as unknown as EpisodeTiming},
  {id: 'Episode03', timing: ep03 as unknown as EpisodeTiming},
  {id: 'Episode04', timing: ep04 as unknown as EpisodeTiming},
  {id: 'Episode05', timing: ep05 as unknown as EpisodeTiming},
  {id: 'Episode06', timing: ep06 as unknown as EpisodeTiming},
  {id: 'Episode07', timing: ep07 as unknown as EpisodeTiming},
  {id: 'Episode08', timing: ep08 as unknown as EpisodeTiming},
  {id: 'Preview', timing: ep00 as unknown as EpisodeTiming},
];

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
  {
    id: 'Thumb05',
    props: {
      badge: 'NÂNG CAO 1',
      line1: 'CHẶN',
      line2: 'DỮ LIỆU RÁC',
      subtitle: 'Pipes & Validation',
      variant: 'ep5',
    },
  },
  {
    id: 'Thumb06',
    props: {
      badge: 'NÂNG CAO 2',
      line1: 'KHÓA',
      line2: 'ROUTE LẠI',
      subtitle: 'Guards & phân quyền',
      variant: 'ep6',
    },
  },
  {
    id: 'Thumb07',
    props: {
      badge: 'NÂNG CAO 3',
      line1: 'CAN THIỆP',
      line2: 'HAI CHIỀU',
      subtitle: 'Interceptors · log & transform',
      variant: 'ep7',
    },
  },
  {
    id: 'Thumb08',
    props: {
      badge: 'NÂNG CAO 4',
      line1: 'LỖI CŨNG',
      line2: 'PHẢI ĐẸP',
      subtitle: 'Exception Filters',
      variant: 'ep8',
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
    {episodes.map((e) => (
      <Composition
        key={e.id}
        id={e.id}
        component={Episode}
        defaultProps={{timing: e.timing}}
        durationInFrames={totalDuration(e.timing)}
        fps={e.timing.fps}
        width={1920}
        height={1080}
      />
    ))}
  </>
);
