# Demo StyleX (ViệtSuper Web + compare-tailwind) & BrowserScene Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Xây `demo-stylex/vietsuper-web` (Vite+React+TS+StyleX 0.19.x) và `demo-stylex/compare-tailwind` (Vite+React+Tailwind v4, 2 component đối chứng), verified trong browser với screenshot Chrome headless cho 6 tập ep39–ep44; kèm scene type `browser` mới cho pipeline video.

**Architecture:** StyleX compile-time qua `@stylexjs/unplugin` (API `stylex.vite`, đặt TRƯỚC react(), CSS entrypoint thủ công). Theme áp qua URL param `?theme=dark|tet` (đọc `location.search`, áp `stylex.props(theme, styles.page)`) để screenshot headless không cần click. BrowserScene = component mới, không đụng 38 tập cũ.

**Tech Stack:** Node 22, Vite 6, React 18/19, TS, `@stylexjs/stylex@^0.19`, `@stylexjs/unplugin`, Tailwind v4 (`tailwindcss` + `@tailwindcss/vite`), Chrome headless screenshot.

## Global Constraints

- Đọc fact sheet `.superpowers/sdd/stylex-research.md` TRƯỚC khi code — mọi API/gotcha lấy từ đó (nguồn docs chính chủ).
- Màu thương hiệu `#ea2845`; chữ tiếng Việt chuẩn; trang tên "ViệtSuper".
- Screenshot: `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --screenshot=<path> --window-size=1280,800 --hide-scrollbars <url>` → PNG 1280×800 vào `video/public/screens/epNN/`. Dev server chạy nền qua Bash run_in_background KHÔNG sống qua lượt agent → trong MỘT lượt: start server nền → đợi port mở (poll `curl -sf`) → chụp → kill đúng PID của mình. Hoặc dùng `vite preview` sau `vite build` (ổn định hơn dev). KHÔNG chiếm cổng 3000; dùng cổng 5199 (vietsuper-web) và 5198 (compare-tailwind) qua flag `--port`.
- KHÔNG sửa demo cũ; KHÔNG kill process không phải của mình.
- Commit mỗi task, message tiếng Việt, kết thúc `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.
- Mọi giao diện phải verify bằng mắt qua screenshot trước khi commit.

---

### Task 1: BrowserScene — scene type mới cho pipeline

**Files:**
- Create: `video/src/scenes/BrowserScene.tsx`
- Modify: `video/src/scenes/registry.ts` (đăng ký type `browser`)
- Modify: `tts/generate.py` (validator: type `browser`)

**Interfaces:**
- Produces: scene JSON type `"browser"` với visual `{title: string, shots: [{src, sentence, label?}] (1–2 phần tử), bullets?: [{icon?, text, sentence}]}` — 1 shot = cửa sổ lớn bên phải; 2 shots = side-by-side (so găng).

- [ ] **Step 1: Đọc mẫu** — `video/src/scenes/PhoneScene.tsx` (cấu trúc SceneProps/useSentenceIndex/Appear/theme) và phần validate scene `phone` trong `tts/generate.py`.

- [ ] **Step 2: Viết BrowserScene.tsx**

```tsx
import React from 'react';
import {AbsoluteFill, Img, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Appear} from '../components/Appear';
import {theme} from '../components/theme';
import {sentenceStart, useSentenceIndex} from '../components/useSentenceIndex';
import type {SceneProps} from '../data/types';

export type BrowserVisual = {
  title: string;
  // Ảnh chụp browser thật 1280×800; 1 shot = cửa sổ lớn, 2 shots = so găng cạnh nhau
  shots: {src: string; sentence: number; label?: string}[];
  bullets?: {icon?: string; text: string; sentence: number}[];
};

const Window: React.FC<{src: string; label?: string; width: number; p: number}> = ({src, label, width, p}) => (
  <div style={{width, opacity: 0.35 + p * 0.65, transform: `scale(${0.97 + p * 0.03})`}}>
    {label ? (
      <div style={{fontSize: 30, fontWeight: 700, color: theme.text, marginBottom: 12, textAlign: 'center'}}>
        {label}
      </div>
    ) : null}
    <div style={{borderRadius: 18, overflow: 'hidden', border: `3px solid #334155`, boxShadow: '0 24px 60px rgba(0,0,0,0.5)'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', backgroundColor: '#1e293b'}}>
        <span style={{width: 14, height: 14, borderRadius: 7, backgroundColor: '#ff5f57'}} />
        <span style={{width: 14, height: 14, borderRadius: 7, backgroundColor: '#febc2e'}} />
        <span style={{width: 14, height: 14, borderRadius: 7, backgroundColor: '#28c840'}} />
        <div style={{flex: 1, marginLeft: 12, backgroundColor: '#0f172a', borderRadius: 8, padding: '6px 14px', color: '#94a3b8', fontSize: 20, fontFamily: theme.fontMono}}>
          localhost:5199 — ViệtSuper
        </div>
      </div>
      <Img src={staticFile(src)} style={{width: '100%', display: 'block'}} />
    </div>
  </div>
);

export const BrowserScene: React.FC<SceneProps> = ({visual, sentences}) => {
  const v = visual as BrowserVisual;
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const idx = useSentenceIndex(sentences);
  const active = v.shots.filter((s) => s.sentence <= idx);
  const sideBySide = v.shots.length === 2;
  const current = sideBySide ? v.shots : [active[active.length - 1] ?? v.shots[0]];
  const switchedAt = sentenceStart(sentences, (sideBySide ? v.shots[0] : current[0]).sentence);
  const p = spring({frame: frame - switchedAt, fps, config: {damping: 200}});

  return (
    <AbsoluteFill style={{backgroundColor: theme.bg, fontFamily: theme.fontSans, padding: '70px 90px'}}>
      <h2 style={{margin: 0, fontSize: 60, fontWeight: 900, color: theme.text}}>
        <span style={{color: theme.accent}}>■ </span>
        {v.title}
      </h2>
      <div style={{display: 'flex', gap: 40, marginTop: 40, alignItems: 'flex-start'}}>
        {(v.bullets?.length ?? 0) > 0 && !sideBySide ? (
          <div style={{display: 'flex', flexDirection: 'column', gap: 28, width: 560}}>
            {(v.bullets ?? []).map((b, i) => (
              <Appear key={i} at={sentenceStart(sentences, b.sentence)}>
                <div style={{display: 'flex', alignItems: 'center', gap: 20, backgroundColor: theme.panel, border: `2px solid ${theme.panelBorder}`, borderRadius: 18, padding: '20px 26px'}}>
                  <span style={{fontSize: 38}}>{b.icon ?? '👉'}</span>
                  <span style={{fontSize: 30, color: theme.text, lineHeight: 1.4}}>{b.text}</span>
                </div>
              </Appear>
            ))}
          </div>
        ) : null}
        <div style={{display: 'flex', gap: 36, flex: 1, justifyContent: 'center'}}>
          {current.map((s, i) => (
            <Appear key={i} at={sentenceStart(sentences, s.sentence)}>
              <Window src={s.src} label={s.label} width={sideBySide ? 830 : 1120} p={p} />
            </Appear>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
```
(Nếu `theme`/`types` thiếu field nào (fontMono...), đồng bộ theo code thật của repo — ghi report.)

- [ ] **Step 3: Đăng ký** vào `video/src/scenes/registry.ts` theo đúng pattern các scene khác (`browser: BrowserScene`).

- [ ] **Step 4: Validator** — trong `tts/generate.py` thêm nhánh type `browser` cạnh nhánh `phone`: bắt buộc `title` (str), `shots` list 1–2 phần tử {src str, sentence int trong khoảng câu, label optional str}, `bullets` optional như phone. Chạy thử validator với 1 script tạm (python -c) cả case hợp lệ + thiếu shots (phải fail).

- [ ] **Step 5: Smoke render** — tạo ảnh test 1280×800 (Chrome headless chụp https://example.com vào `video/public/screens/_test/test.png`), thêm TẠM composition TestBrowser vào Root.tsx dùng BrowserScene với 1 shot + 2 shots, `npx remotion still TestBrowser out/_test-browser.png` cho cả 2 cấu hình (đổi props), mở xem: khung browser đẹp, không tràn. XÓA composition tạm + thư mục `_test` trước khi commit (giữ BrowserScene + registry + validator).

- [ ] **Step 6: Commit** — `feat: BrowserScene — scene type browser cho series web`.

---

### Task 2: vietsuper-web — scaffold + StyleX + hero + lưới dịch vụ (ep39–ep40)

**Files:**
- Create: `demo-stylex/vietsuper-web/` (npm create vite@latest -- --template react-ts), cài `@stylexjs/stylex` + `-D @stylexjs/unplugin`
- Create/Modify: `vite.config.ts`, `src/stylex.css` (CSS entrypoint), `src/main.tsx`, `src/App.tsx`, `src/tokens.stylex.ts`, `src/components/Hero.tsx`, `src/components/ServiceGrid.tsx`
- Delete: scaffold thừa (App.css, index.css nội dung mặc định, assets logo)

**Interfaces:**
- Produces: `tokens` (defineVars: brand, brandDark, bg, surface, text, textMuted — có biến thể `@media (prefers-color-scheme: dark)` cho bg/surface/text/textMuted); page chạy `npm run dev -- --port 5199`; screenshot ep39/ep40.

- [ ] **Step 1: Scaffold + cài đặt**

```bash
mkdir -p /Users/lee/Project/Apps/tutorial/demo-stylex && cd $_
npm create vite@latest vietsuper-web -- --template react-ts
cd vietsuper-web && npm install && npm install --save @stylexjs/stylex && npm install --save-dev @stylexjs/unplugin
```

`vite.config.ts` (theo fact sheet — plugin TRƯỚC react):
```ts
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import stylex from '@stylexjs/unplugin';

export default defineConfig({
  plugins: [
    stylex.vite({
      useCSSLayers: true,
      dev: process.env.NODE_ENV === 'development',
      runtimeInjection: false,
    }),
    react(), // StyleX phải đứng TRƯỚC react()
  ],
});
```
`src/stylex.css` — CSS entrypoint (nội dung theo hướng dẫn plugin: thường là comment marker `@stylex;` hoặc file rỗng plugin inject — đọc README của @stylexjs/unplugin bằng WebFetch/npm nếu cần, ghi report cách chính xác). Import file này ở `src/main.tsx`. Nếu cần client component load virtual module cho HMR (fact sheet mục 2) thì thêm đúng hướng dẫn, bọc `import.meta.env.DEV`.

- [ ] **Step 2: tokens.stylex.ts**

```ts
import * as stylex from '@stylexjs/stylex';

const DARK = '@media (prefers-color-scheme: dark)';

export const tokens = stylex.defineVars({
  brand: '#ea2845',
  brandDark: '#c81e3a',
  bg: {default: '#fff7f5', [DARK]: '#0f172a'},
  surface: {default: '#ffffff', [DARK]: '#1e293b'},
  text: {default: '#111827', [DARK]: '#f1f5f9'},
  textMuted: {default: '#6b7280', [DARK]: '#94a3b8'},
});
```
(File PHẢI mang đuôi `.stylex.ts` nếu plugin yêu cầu convention đó — kiểm docs defineVars: biến phải ở file riêng; tuân theo, ghi report.)

- [ ] **Step 3: App + Hero + ServiceGrid**

`src/App.tsx`:
```tsx
import * as stylex from '@stylexjs/stylex';
import {Hero} from './components/Hero';
import {ServiceGrid} from './components/ServiceGrid';
import {tokens} from './tokens.stylex';
import {tet} from './themes';

const styles = stylex.create({
  page: {
    minHeight: '100vh',
    backgroundColor: tokens.bg,
    color: tokens.text,
    fontFamily: 'system-ui, sans-serif',
  },
});

export default function App() {
  const themeParam = new URLSearchParams(window.location.search).get('theme');
  return (
    <div {...stylex.props(themeParam === 'tet' && tet, styles.page)}>
      <Hero />
      <ServiceGrid />
    </div>
  );
}
```
(Task này `themes.ts` chỉ export `tet` RỖNG tạm? KHÔNG — YAGNI: Task 2 bỏ import tet, App chưa có theme param; Task 4 mới thêm. App Task 2:)
```tsx
import * as stylex from '@stylexjs/stylex';
import {Hero} from './components/Hero';
import {ServiceGrid} from './components/ServiceGrid';
import {tokens} from './tokens.stylex';

const styles = stylex.create({
  page: {
    minHeight: '100vh',
    backgroundColor: tokens.bg,
    color: tokens.text,
    fontFamily: 'system-ui, sans-serif',
  },
});

export default function App() {
  return (
    <div {...stylex.props(styles.page)}>
      <Hero />
      <ServiceGrid />
    </div>
  );
}
```

`src/components/Hero.tsx` (hover + media query — chất liệu ep40):
```tsx
import * as stylex from '@stylexjs/stylex';
import {tokens} from '../tokens.stylex';

const styles = stylex.create({
  hero: {
    padding: {default: '96px 48px', '@media (max-width: 720px)': '56px 20px'},
    textAlign: 'center',
  },
  title: {
    fontSize: {default: 56, '@media (max-width: 720px)': 36},
    fontWeight: 900,
    margin: 0,
    color: tokens.text,
  },
  brand: {color: tokens.brand},
  tagline: {fontSize: 20, color: tokens.textMuted, marginTop: 16},
  cta: {
    display: 'inline-block',
    marginTop: 32,
    padding: '14px 36px',
    borderRadius: 999,
    fontSize: 18,
    fontWeight: 700,
    color: 'white',
    backgroundColor: {default: tokens.brand, ':hover': tokens.brandDark},
    cursor: 'pointer',
    borderStyle: 'none',
  },
});

export function Hero() {
  return (
    <header {...stylex.props(styles.hero)}>
      <h1 {...stylex.props(styles.title)}>
        Việt<span {...stylex.props(styles.brand)}>Super</span> 🇻🇳
      </h1>
      <p {...stylex.props(styles.tagline)}>Một app, mọi dịch vụ — giờ có mặt trên web.</p>
      <button {...stylex.props(styles.cta)}>Dùng thử miễn phí</button>
    </header>
  );
}
```

`src/components/ServiceGrid.tsx`:
```tsx
import * as stylex from '@stylexjs/stylex';
import {tokens} from '../tokens.stylex';

const services = [
  {emoji: '🍜', name: 'Đồ ăn', desc: 'Giao nhanh 30 phút'},
  {emoji: '👛', name: 'Ví điện tử', desc: 'Thanh toán một chạm'},
  {emoji: '🎬', name: 'Xem phim', desc: 'Đặt vé không xếp hàng'},
  {emoji: '🛵', name: 'Đặt xe', desc: 'Xe đến trong 5 phút'},
  {emoji: '📰', name: 'Tin tức', desc: 'Đọc gì sáng nay?'},
  {emoji: '📱', name: 'Nạp thẻ', desc: 'Mọi nhà mạng'},
];

const styles = stylex.create({
  section: {padding: '24px 48px 96px', maxWidth: 1080, margin: '0 auto'},
  grid: {
    display: 'grid',
    gridTemplateColumns: {default: 'repeat(3, 1fr)', '@media (max-width: 720px)': '1fr'},
    gap: 24,
  },
  card: {
    backgroundColor: tokens.surface,
    borderRadius: 20,
    padding: 28,
    boxShadow: {default: '0 1px 4px rgba(0,0,0,0.08)', ':hover': '0 12px 32px rgba(234,40,69,0.18)'},
    transform: {default: 'translateY(0)', ':hover': 'translateY(-4px)'},
    transitionProperty: 'transform, box-shadow',
    transitionDuration: '200ms',
  },
  emoji: {fontSize: 40},
  name: {fontSize: 22, fontWeight: 800, marginTop: 12, color: tokens.text},
  desc: {fontSize: 16, color: tokens.textMuted, marginTop: 6},
});

export function ServiceGrid() {
  return (
    <section {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.grid)}>
        {services.map((s) => (
          <article key={s.name} {...stylex.props(styles.card)}>
            <div {...stylex.props(styles.emoji)}>{s.emoji}</div>
            <div {...stylex.props(styles.name)}>{s.name}</div>
            <div {...stylex.props(styles.desc)}>{s.desc}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Chạy + verify + screenshot** — `npm run build` (bắt lỗi compile StyleX) rồi `npm run preview -- --port 5199` (nền) → poll curl → Chrome headless chụp:
  - `video/public/screens/ep39/web-hero-first-style.png` (trang đầy đủ 1280×800)
  - `video/public/screens/ep40/web-responsive-desktop.png` (1280×800) và `web-responsive-mobile.png` (`--window-size=420,800`)
  Mở xem từng ảnh: hero đỏ, lưới 3 cột desktop / 1 cột mobile. Kill server của mình.

- [ ] **Step 5: Commit** — `feat: demo-stylex/vietsuper-web — StyleX setup + hero + lưới dịch vụ`.

---

### Task 3: Button variants + last-wins demo + Card/Pricing (ep41–ep42)

**Files:**
- Create: `src/components/Button.tsx`, `src/components/Pricing.tsx`, `src/components/MergeDemo.tsx`
- Modify: `src/App.tsx` (thêm section)

**Interfaces:**
- Produces: `Button({variant: 'primary'|'ghost'|'danger', size?: 'md'|'lg', style?})` — nhận style ngoài qua props (cross-file, ep42); `MergeDemo` — 2 hàng chữ minh họa last-wins (đảo thứ tự props) để screenshot ep41.

- [ ] **Step 1: Button.tsx**

```tsx
import * as stylex from '@stylexjs/stylex';
import type {StyleXStyles} from '@stylexjs/stylex';
import {tokens} from '../tokens.stylex';

const styles = stylex.create({
  base: {
    borderStyle: 'none',
    borderRadius: 12,
    fontWeight: 700,
    cursor: 'pointer',
    transitionProperty: 'background-color, color',
    transitionDuration: '150ms',
  },
  md: {padding: '10px 22px', fontSize: 16},
  lg: {padding: '14px 32px', fontSize: 18},
  primary: {
    color: 'white',
    backgroundColor: {default: tokens.brand, ':hover': tokens.brandDark},
  },
  ghost: {
    color: tokens.brand,
    backgroundColor: {default: 'transparent', ':hover': 'rgba(234,40,69,0.08)'},
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: tokens.brand,
  },
  danger: {
    color: 'white',
    backgroundColor: {default: '#b91c1c', ':hover': '#7f1d1d'},
  },
});

type Props = {
  variant?: 'primary' | 'ghost' | 'danger';
  size?: 'md' | 'lg';
  style?: StyleXStyles;
  children: React.ReactNode;
};

export function Button({variant = 'primary', size = 'md', style, children}: Props) {
  return (
    <button {...stylex.props(styles.base, styles[size], styles[variant], style)}>
      {children}
    </button>
  );
}
```

- [ ] **Step 2: MergeDemo.tsx** (đinh ep41 — cùng 2 style, đảo thứ tự):

```tsx
import * as stylex from '@stylexjs/stylex';
import {tokens} from '../tokens.stylex';

const styles = stylex.create({
  row: {fontSize: 22, fontWeight: 700, padding: '8px 0'},
  grey: {color: '#6b7280'},
  brand: {color: tokens.brand},
});

export function MergeDemo() {
  return (
    <div>
      <p {...stylex.props(styles.row, styles.grey, styles.brand)}>
        props(grey, brand) — brand ĐỨNG SAU nên chữ này màu ĐỎ
      </p>
      <p {...stylex.props(styles.row, styles.brand, styles.grey)}>
        props(brand, grey) — grey ĐỨNG SAU nên chữ này màu XÁM
      </p>
    </div>
  );
}
```

- [ ] **Step 3: Pricing.tsx** — 3 gói (Miễn phí 0đ / Plus 49.000đ / Doanh nghiệp 199.000đ mỗi tháng), gói giữa nổi bật (borderColor brand + Button variant primary lg, 2 gói kia ghost md); dùng Button với `style` prop truyền từ ngoài ở ít nhất 1 chỗ (ví dụ nút gói giữa full-width qua style ngoài) làm chất liệu ep42. Card pricing dùng surface/tokens như ServiceGrid. Code cụ thể do implementer viết theo đúng phong cách 2 component trên (giữ ≤80 dòng, chuỗi tiếng Việt chuẩn).

- [ ] **Step 4: Ghép vào App** (thêm `<section>` demo variants + MergeDemo + Pricing dưới ServiceGrid, có heading nhỏ mỗi phần), build + preview + screenshot:
  - `ep41/web-buttons-variants.png`, `ep41/web-merge-lastwins.png` (zoom cửa sổ 900×500 quanh MergeDemo bằng `--window-size` nhỏ hơn nếu cần)
  - `ep42/web-pricing.png`
  Mở xem xác nhận: 2 dòng MergeDemo đúng ĐỎ trên XÁM dưới. Kill server.

- [ ] **Step 5: Commit** — `feat: vietsuper-web — Button variants, MergeDemo last-wins, Pricing`.

---

### Task 4: Theming — dark tokens + theme Tết + URL param (ep43)

**Files:**
- Create: `src/themes.ts`
- Modify: `src/App.tsx` (đọc `?theme=`, áp theme)

**Interfaces:**
- Produces: `tet = createTheme(tokens, {...})` (nền vàng kem #fff8e1, brand giữ đỏ, surface trắng ngà — sắc Tết); URL `?theme=tet` áp theme; dark mode qua token media (chụp bằng Chrome flag ép dark, xem Step 3).

- [ ] **Step 1: themes.ts**

```ts
import * as stylex from '@stylexjs/stylex';
import {tokens} from './tokens.stylex';

export const tet = stylex.createTheme(tokens, {
  bg: '#fff8e1',
  surface: '#fffdf5',
  brand: '#d4380d',
  brandDark: '#ad2102',
  // text/textMuted không override — fallback về defineVars (điểm dạy ep43)
});
```
(createTheme có thể yêu cầu override đủ shape với media keys — nếu compiler bắt lỗi thiếu key, đồng bộ theo lỗi thật và ghi report — đó là beat video.)

- [ ] **Step 2: App.tsx** thêm:
```tsx
import {tet} from './themes';
// trong App():
const themeParam = new URLSearchParams(window.location.search).get('theme');
// wrapper:
<div {...stylex.props(themeParam === 'tet' && tet, styles.page)}>
```

- [ ] **Step 3: Screenshot ep43** — build + preview: `ep43/web-theme-default.png` (không param), `ep43/web-theme-tet.png` (`?theme=tet`), `ep43/web-dark-tokens.png` — chụp dark bằng Chrome headless thêm flag ép prefers-color-scheme dark: thử lần lượt `--force-dark-mode` rồi kiểm màu nền ảnh; nếu không ép được prefers-color-scheme thật thì chụp bằng cách tạm set trong page (thêm query `?scheme=dark` KHÔNG được — token là media-based)... phương án chốt: dùng `--force-prefers-color-scheme=dark` nếu Chrome hỗ trợ, không thì dùng AppleScript đổi System Appearance tạm rồi trả lại, không thì GHI RÕ report và chụp dark bằng cách thêm class force tạm THÊM một theme `darkPreview = createTheme(tokens, {bg:'#0f172a', ...})` với `?theme=darkPreview` (giá trị y hệt nhánh DARK của token — trung thực, ghi rõ trong video là "giả lập để quay"). Mở xem cả 3 ảnh.

- [ ] **Step 4: Commit** — `feat: vietsuper-web — theming defineVars/createTheme + theme Tết`.

---

### Task 5: compare-tailwind — 2 component đối chứng (ep44)

**Files:**
- Create: `demo-stylex/compare-tailwind/` (Vite react-ts + `tailwindcss @tailwindcss/vite`)
- Create: `src/App.tsx`, `src/Button.tsx`, `src/ServiceCard.tsx` — Button 3 variants + Card dịch vụ GIỐNG HỆT giao diện bên StyleX (màu #ea2845, cùng chữ, cùng bo góc) nhưng viết bằng Tailwind utility classes.

- [ ] **Step 1: Scaffold** — `npm create vite@latest compare-tailwind -- --template react-ts`; cài `tailwindcss @tailwindcss/vite` (Tailwind v4: plugin vite + `@import "tailwindcss";` trong CSS — theo docs v4).
- [ ] **Step 2: Button.tsx + ServiceCard.tsx** bằng className Tailwind (dùng arbitrary value `bg-[#ea2845]` cho brand), App bày 3 nút + 2 card cạnh nhau, heading "Bản Tailwind — đối chứng". Giao diện phải NHÌN GIỐNG bản StyleX (so ảnh).
- [ ] **Step 3: Build + preview --port 5198 + screenshot**: `ep44/web-tailwind-side.png` (1280×800); chụp thêm bên StyleX cùng khung section buttons `ep44/web-stylex-side.png` (server 5199). Mở xem 2 ảnh — giao diện tương đương.
- [ ] **Step 4: Commit** — `feat: demo-stylex/compare-tailwind — Button + Card đối chứng bằng Tailwind v4`.

---

### Task 6: README + regression + chốt

**Files:**
- Create: `demo-stylex/README.md`

- [ ] **Step 1: Regression** — build cả 2 app pass; chạy lại preview, bấm thử hover bằng mắt qua 1 screenshot bất kỳ; xác nhận `npm run build` vietsuper-web KHÔNG warning StyleX.
- [ ] **Step 2: README** — sơ đồ, yêu cầu Node 22, StyleX v0.19.x (ghi version thật từ package.json), lệnh chạy từng app (port 5199/5198), giải thích vite.config (plugin trước react, CSS entrypoint), bảng URL `?theme=`, ghi chú so găng Tailwind, dòng playlist cập nhật sau.
- [ ] **Step 3: Commit** — `feat: demo-stylex hoàn chỉnh — ViệtSuper Web (StyleX) + đối chứng Tailwind`.

---

## Sau plan này

Controller merge + tag `stylex-tap-1..6` (tap-1=Task2, tap-2=Task2, tap-3=Task3, tap-4=Task3, tap-5=Task4, tap-6=Task5+6 — chốt mapping chính xác khi lập plan episodes theo trạng thái commit thật) + push. Giai đoạn 2 (kịch bản ep39–ep44 + TTS + render + SEO) lập plan riêng sau khi demo verified.
