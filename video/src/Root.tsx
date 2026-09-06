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
import ep09 from './data/ep09.timing.json';
import ep10 from './data/ep10.timing.json';
import ep11 from './data/ep11.timing.json';
import ep12 from './data/ep12.timing.json';
import ep13 from './data/ep13.timing.json';
import ep14 from './data/ep14.timing.json';
import ep15 from './data/ep15.timing.json';
import ep16 from './data/ep16.timing.json';
import ep17 from './data/ep17.timing.json';
import ep18 from './data/ep18.timing.json';
import ep19 from './data/ep19.timing.json';
import ep20 from './data/ep20.timing.json';
import ep21 from './data/ep21.timing.json';
import ep22 from './data/ep22.timing.json';
import ep23 from './data/ep23.timing.json';
import ep24 from './data/ep24.timing.json';
import ep25 from './data/ep25.timing.json';
import ep26 from './data/ep26.timing.json';
import ep27 from './data/ep27.timing.json';
import ep28 from './data/ep28.timing.json';
import ep29 from './data/ep29.timing.json';
import ep30 from './data/ep30.timing.json';
import ep31 from './data/ep31.timing.json';
import ep32 from './data/ep32.timing.json';
import ep33 from './data/ep33.timing.json';
import ep34 from './data/ep34.timing.json';
import ep35 from './data/ep35.timing.json';
import ep36 from './data/ep36.timing.json';
import ep37 from './data/ep37.timing.json';
import ep38 from './data/ep38.timing.json';
import ep39 from './data/ep39.timing.json';
import ep40 from './data/ep40.timing.json';
import ep41 from './data/ep41.timing.json';
import ep42 from './data/ep42.timing.json';
import ep43 from './data/ep43.timing.json';
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
  {id: 'Episode09', timing: ep09 as unknown as EpisodeTiming},
  {id: 'Episode10', timing: ep10 as unknown as EpisodeTiming},
  {id: 'Episode11', timing: ep11 as unknown as EpisodeTiming},
  {id: 'Episode12', timing: ep12 as unknown as EpisodeTiming},
  {id: 'Episode13', timing: ep13 as unknown as EpisodeTiming},
  {id: 'Episode14', timing: ep14 as unknown as EpisodeTiming},
  {id: 'Episode15', timing: ep15 as unknown as EpisodeTiming},
  {id: 'Episode16', timing: ep16 as unknown as EpisodeTiming},
  {id: 'Episode17', timing: ep17 as unknown as EpisodeTiming},
  {id: 'Episode18', timing: ep18 as unknown as EpisodeTiming},
  {id: 'Episode19', timing: ep19 as unknown as EpisodeTiming},
  {id: 'Episode20', timing: ep20 as unknown as EpisodeTiming},
  {id: 'Episode21', timing: ep21 as unknown as EpisodeTiming},
  {id: 'Episode22', timing: ep22 as unknown as EpisodeTiming},
  {id: 'Episode23', timing: ep23 as unknown as EpisodeTiming},
  {id: 'Episode24', timing: ep24 as unknown as EpisodeTiming},
  {id: 'Episode25', timing: ep25 as unknown as EpisodeTiming},
  {id: 'Episode26', timing: ep26 as unknown as EpisodeTiming},
  {id: 'Episode27', timing: ep27 as unknown as EpisodeTiming},
  {id: 'Episode28', timing: ep28 as unknown as EpisodeTiming},
  {id: 'Episode29', timing: ep29 as unknown as EpisodeTiming},
  {id: 'Episode30', timing: ep30 as unknown as EpisodeTiming},
  {id: 'Episode31', timing: ep31 as unknown as EpisodeTiming},
  {id: 'Episode32', timing: ep32 as unknown as EpisodeTiming},
  {id: 'Episode33', timing: ep33 as unknown as EpisodeTiming},
  {id: 'Episode34', timing: ep34 as unknown as EpisodeTiming},
  {id: 'Episode35', timing: ep35 as unknown as EpisodeTiming},
  {id: 'Episode36', timing: ep36 as unknown as EpisodeTiming},
  {id: 'Episode37', timing: ep37 as unknown as EpisodeTiming},
  {id: 'Episode38', timing: ep38 as unknown as EpisodeTiming},
  {id: 'Episode39', timing: ep39 as unknown as EpisodeTiming},
  {id: 'Episode40', timing: ep40 as unknown as EpisodeTiming},
  {id: 'Episode41', timing: ep41 as unknown as EpisodeTiming},
  {id: 'Episode42', timing: ep42 as unknown as EpisodeTiming},
  {id: 'Episode43', timing: ep43 as unknown as EpisodeTiming},
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
  {
    id: 'Thumb09',
    props: {
      badge: 'TRANSPORTERS 1',
      line1: 'ĐỔI DÂY',
      line2: 'KHÔNG ĐỔI CODE',
      subtitle: 'Redis Pub/Sub · 2 dòng config',
      variant: 'ep9',
    },
  },
  {
    id: 'Thumb10',
    props: {
      badge: 'TRANSPORTERS 2',
      line1: 'TẮT SERVICE',
      line2: 'KHÔNG MẤT ĐƠN',
      subtitle: 'RabbitMQ · Message Queue',
      variant: 'ep10',
    },
  },
  {
    id: 'Thumb11',
    props: {
      badge: 'TRANSPORTERS 3',
      line1: 'SỔ NHẬT KÝ',
      line2: 'TRIỆU SỰ KIỆN',
      subtitle: 'Kafka · Event Streaming',
      variant: 'ep11',
    },
  },
  {
    id: 'Thumb12',
    props: {
      badge: 'BONUS',
      line1: 'NHANH KIỂU',
      line2: 'GOOGLE',
      subtitle: 'gRPC · hợp đồng .proto',
      variant: 'ep12',
    },
  },
  {
    id: 'Thumb13',
    props: {
      badge: 'MOBILE 1',
      line1: 'APP ĐẦU TIÊN',
      line2: 'TRÊN IPHONE',
      subtitle: 'React Native + Expo',
      variant: 'shot',
      image: 'screens/ep13/hello-3taps.png',
      badgeEmoji: '📱',
      seriesTag: 'Super App với React Native 🇻🇳',
    },
  },
  {
    id: 'Thumb14',
    props: {
      badge: 'MOBILE 2',
      line1: 'SUPER APP',
      line2: '4 TAB',
      subtitle: 'expo-router · ViệtSuper',
      variant: 'shot',
      image: 'screens/ep14/tabs.png',
      badgeEmoji: '🛗',
      seriesTag: 'Super App với React Native 🇻🇳',
    },
  },
  {
    id: 'Thumb15',
    props: {
      badge: 'MOBILE 3',
      line1: 'LƯỚI DỊCH VỤ',
      line2: 'KIỂU GRAB',
      subtitle: 'FlatList · numColumns',
      variant: 'shot',
      image: 'screens/ep15/home.png',
      badgeEmoji: '🏠',
      seriesTag: 'Super App với React Native 🇻🇳',
    },
  },
  {
    id: 'Thumb16',
    props: {
      badge: 'MOBILE 4',
      line1: 'GIỎ HÀNG',
      line2: 'TỰ TÍNH TIỀN',
      subtitle: 'useState · reduce',
      variant: 'shot',
      image: 'screens/ep16/food-2mon.png',
      badgeEmoji: '🍜',
      seriesTag: 'Super App với React Native 🇻🇳',
    },
  },
  {
    id: 'Thumb17',
    props: {
      badge: 'MOBILE 5',
      line1: 'TẮT APP',
      line2: 'TIỀN CÒN NGUYÊN',
      subtitle: 'AsyncStorage',
      variant: 'shot',
      image: 'screens/ep17/wallet-persist.png',
      badgeEmoji: '💰',
      seriesTag: 'Super App với React Native 🇻🇳',
    },
  },
  {
    id: 'Thumb18',
    props: {
      badge: 'MOBILE 6 · CUỐI',
      line1: 'APP GẶP',
      line2: 'BACKEND',
      subtitle: 'fetch · NestJS · fullstack',
      variant: 'shot',
      image: 'screens/ep18/promo.png',
      badgeEmoji: '🔌',
      seriesTag: 'Super App với React Native 🇻🇳',
    },
  },
  {
    id: 'Thumb19',
    props: {
      badge: 'MOBILE 7 · THEO YÊU CẦU',
      line1: 'MỖI TÍNH NĂNG',
      line2: '1 APP RIÊNG',
      subtitle: 'Monorepo · mini-app kiểu Grab',
      variant: 'shot',
      image: 'screens/ep19/standalone-1mon.png',
      badgeEmoji: '📦',
      seriesTag: 'Super App với React Native 🇻🇳',
    },
  },
  {
    id: 'Thumb20',
    props: {
      badge: 'MINI-APP 1',
      line1: 'MONOREPO',
      line2: 'TỪ SỐ 0',
      subtitle: 'npm workspaces · 8 dòng',
      variant: 'ep9',
      seriesTag: 'Mini-App từ A đến Z 🇻🇳',
    },
  },
  {
    id: 'Thumb21',
    props: {
      badge: 'MINI-APP 2',
      line1: 'XÂY CĂN HỘ',
      line2: 'MINI-FOOD',
      subtitle: 'package.json · peerDeps · export',
      variant: 'shot',
      image: 'screens/ep19/standalone-0.png',
      badgeEmoji: '🏠',
      seriesTag: 'Mini-App từ A đến Z 🇻🇳',
    },
  },
  {
    id: 'Thumb22',
    props: {
      badge: 'MINI-APP 3',
      line1: 'CHO RA',
      line2: 'Ở RIÊNG',
      subtitle: 'Standalone shell · 19 dòng',
      variant: 'shot',
      image: 'screens/ep19/standalone-1mon.png',
      badgeEmoji: '🚀',
      seriesTag: 'Mini-App từ A đến Z 🇻🇳',
    },
  },
  {
    id: 'Thumb23',
    props: {
      badge: 'MINI-APP 4 · CUỐI',
      line1: 'CÔNG THỨC',
      line2: '4 BƯỚC',
      subtitle: 'Thêm mini-app mới trong vài phút',
      variant: 'shot',
      image: 'screens/ep23/cinema-2ve.png',
      badgeEmoji: '🎬',
      seriesTag: 'Mini-App từ A đến Z 🇻🇳',
    },
  },
  {
    id: 'Thumb24',
    props: {
      badge: 'MINI-APP 5 · CHỮA BÀI',
      line1: 'ĐẶT XE',
      line2: 'KHÔNG CẦN TAB',
      subtitle: 'Stack route · single-select · stepper',
      variant: 'shot',
      image: 'screens/ep24/booking-selected.png',
      badgeEmoji: '🛵',
      seriesTag: 'Mini-App từ A đến Z 🇻🇳',
    },
  },
  {
    id: 'Thumb25',
    props: {
      badge: 'MINI-APP 6 · HOÀN THIỆN',
      line1: 'SÁNG ĐÈN',
      line2: '6/6 Ô',
      subtitle: 'Nạp thẻ · 2 trạng thái giao diện',
      variant: 'shot',
      image: 'screens/ep25/topup-success.png',
      badgeEmoji: '📱',
      seriesTag: 'Mini-App từ A đến Z 🇻🇳',
    },
  },
  {
    id: 'Thumb26',
    props: {
      badge: 'FLUTTER MINI-APP 1',
      line1: 'FLUTTER',
      line2: 'APP THẬT',
      subtitle: 'Module · Engine riêng · MethodChannel',
      variant: 'shot',
      image: 'screens/ep26/standalone-food-cart.png',
      badgeEmoji: '🍜',
      seriesTag: 'Mini-App với Flutter 🇻🇳',
    },
  },
  {
    id: 'Thumb27',
    props: {
      badge: 'FLUTTER MINI-APP 2',
      line1: 'SWIFTUI',
      line2: 'ĐÃ SỐNG',
      subtitle: 'XcodeGen · FlutterEngineGroup · gotcha thật',
      variant: 'shot',
      image: 'screens/ep27/mini-food-embedded.png',
      badgeEmoji: '🏗️',
      seriesTag: 'Mini-App với Flutter 🇻🇳',
    },
  },
  {
    id: 'Thumb28',
    props: {
      badge: 'FLUTTER MINI-APP 3',
      line1: 'GẦN NHƯ',
      line2: 'MIỄN PHÍ',
      subtitle: 'FlutterEngineGroup · thêm mini = 1 dòng Swift',
      variant: 'shot',
      image: 'screens/ep28/mini-wallet-open.png',
      badgeEmoji: '👛',
      seriesTag: 'Mini-App với Flutter 🇻🇳',
    },
  },
  {
    id: 'Thumb29',
    props: {
      badge: 'FLUTTER MINI-APP 4',
      line1: 'MỞ HỘP ĐEN',
      line2: 'METHODCHANNEL',
      subtitle: 'Mini hỏi · Swift trả lời · 1 code 2 bối cảnh',
      variant: 'shot',
      image: 'screens/ep29/mini-wallet-from-host.png',
      badgeEmoji: '📞',
      seriesTag: 'Mini-App với Flutter 🇻🇳',
    },
  },
  {
    id: 'Thumb30',
    props: {
      badge: 'FLUTTER MINI-APP 5',
      line1: 'CÔNG THỨC',
      line2: '4 BƯỚC',
      subtitle: 'Viết phòng · mở cửa · báo lễ tân · rebuild',
      variant: 'shot',
      image: 'screens/ep30/mini-cinema-ticket.png',
      badgeEmoji: '🎬',
      seriesTag: 'Mini-App với Flutter 🇻🇳',
    },
  },
  {
    id: 'Thumb31',
    props: {
      badge: 'FLUTTER MINI-APP 6/6',
      line1: 'TẬP CUỐI',
      line2: 'SO GĂNG RN',
      subtitle: 'Chạy lẻ · bẫy FLUTTER_TARGET · vs React Native',
      variant: 'shot',
      image: 'screens/ep31/host-grid-final.png',
      badgeEmoji: '🏆',
      seriesTag: 'Mini-App với Flutter 🇻🇳',
    },
  },
  {
    id: 'Thumb32',
    props: {
      badge: 'FLUTTER MINI-APP BONUS 1/2',
      line1: 'KOTLIN',
      line2: 'CẮM LẠI',
      subtitle: 'Jetpack Compose · cùng module, khác tòa nhà',
      variant: 'shot',
      image: 'screens/ep32/android-mini-food.png',
      badgeEmoji: '🤖',
      seriesTag: 'Mini-App với Flutter 🇻🇳',
    },
  },
  {
    id: 'Thumb33',
    props: {
      badge: 'FLUTTER MINI-APP BONUS 2/2',
      line1: 'TẬP CUỐI',
      line2: '8 VIDEO',
      subtitle: 'Bug double-tap · kết chùm 8 video',
      variant: 'shot',
      image: 'screens/ep33/android-host-grid-3-cards.png',
      badgeEmoji: '🏁',
      seriesTag: 'Mini-App với Flutter 🇻🇳',
    },
  },
  {
    id: 'Thumb34',
    props: {
      badge: 'FLUTTER THUẦN 1/5',
      line1: 'SỔ ĐỎ',
      line2: 'CHUNG KHU',
      subtitle: 'Pub workspace · từ Dart 3.5',
      variant: 'shot',
      image: 'screens/ep34/host-home-grid.png',
      badgeEmoji: '🧱',
      seriesTag: 'Mini-App Flutter thuần 🇻🇳',
    },
  },
  {
    id: 'Thumb35',
    props: {
      badge: 'FLUTTER THUẦN 2/5',
      line1: 'CĂN HỘ',
      line2: 'ĐẦU TIÊN',
      subtitle: 'mini_news · gắn tab 3 dòng',
      variant: 'shot',
      image: 'screens/ep35/host-tab-news.png',
      badgeEmoji: '📰',
      seriesTag: 'Mini-App Flutter thuần 🇻🇳',
    },
  },
  {
    id: 'Thumb36',
    props: {
      badge: 'FLUTTER THUẦN 3/5',
      line1: 'HAI CỬA',
      line2: 'MỘT MÃ',
      subtitle: 'news_standalone · ra ở riêng',
      variant: 'shot',
      image: 'screens/ep36/standalone-news.png',
      badgeEmoji: '🚪',
      seriesTag: 'Mini-App Flutter thuần 🇻🇳',
    },
  },
  {
    id: 'Thumb37',
    props: {
      badge: 'FLUTTER THUẦN 4/5',
      line1: 'CÔNG THỨC',
      line2: 'LẶP LẠI',
      subtitle: 'mini_topup · công thức lần 2',
      variant: 'shot',
      image: 'screens/ep37/host-tab-topup-success.png',
      badgeEmoji: '📱',
      seriesTag: 'Mini-App Flutter thuần 🇻🇳',
    },
  },
  {
    id: 'Thumb38',
    props: {
      badge: 'FLUTTER THUẦN 5/5',
      line1: 'MẢNH CUỐI',
      line2: 'BỘ BA',
      subtitle: 'mini_ride · cửa đẩy, không tab',
      variant: 'shot',
      image: 'screens/ep38/host-grid-3-on.png',
      badgeEmoji: '🏆',
      seriesTag: 'Mini-App Flutter thuần 🇻🇳',
    },
  },
  {
    id: 'Thumb39',
    props: {
      badge: 'STYLEX 1/6',
      line1: 'STYLEX',
      line2: 'CỦA META',
      subtitle: 'Setup Vite không vấp — style may đo lúc build',
      variant: 'shot',
      image: 'screens/ep39/web-hero-first-style.png',
      badgeEmoji: '🧵',
      seriesTag: 'StyleX từ A đến Z 🇻🇳',
    },
  },
  {
    id: 'Thumb40',
    props: {
      badge: 'STYLEX 2/6',
      line1: 'HOVER &',
      line2: 'MEDIA QUERY',
      subtitle: 'default bắt buộc khi lồng điều kiện',
      variant: 'shot',
      image: 'screens/ep40/web-responsive-desktop.png',
      badgeEmoji: '📐',
      seriesTag: 'StyleX từ A đến Z 🇻🇳',
    },
  },
  {
    id: 'Thumb41',
    props: {
      badge: 'STYLEX 3/6',
      line1: 'AI ĐỨNG SAU',
      line2: 'NGƯỜI ĐÓ THẮNG',
      subtitle: 'props() và luật last-wins',
      variant: 'shot',
      image: 'screens/ep41/web-merge-thumbcrop.png',
      badgeEmoji: '🥇',
      seriesTag: 'StyleX từ A đến Z 🇻🇳',
    },
  },
  {
    id: 'Thumb42',
    props: {
      badge: 'STYLEX 4/6',
      line1: 'STYLE TỪ',
      line2: 'BÊN NGOÀI',
      subtitle: 'cross-file style prop & bảng giá',
      variant: 'shot',
      image: 'screens/ep42/web-pricing.png',
      badgeEmoji: '🎟️',
      seriesTag: 'StyleX từ A đến Z 🇻🇳',
    },
  },
  {
    id: 'Thumb43',
    props: {
      badge: 'STYLEX 5/6',
      line1: 'TOKEN, DARK MODE',
      line2: 'VÀ THEME TẾT',
      subtitle: 'defineVars, createTheme & flat-override',
      variant: 'shot',
      image: 'screens/ep43/web-theme-tet.png',
      badgeEmoji: '🧧',
      seriesTag: 'StyleX từ A đến Z 🇻🇳',
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
