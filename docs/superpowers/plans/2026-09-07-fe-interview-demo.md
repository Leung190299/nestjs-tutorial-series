# Demo FE Interview (react-qa + vue-qa) & Pipeline Shorts dọc — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Xây `demo-fe-interview/` (react-qa: Vite+React 19; vue-qa: Vite+Vue 3.5.42) với 12 trang ví dụ phỏng vấn chạy thật + screenshot ngang/dọc, và bộ 4 scene DỌC 1080×1920 cho Shorts, verified render thử.

**Architecture:** Mỗi câu hỏi 1 trang ví dụ tối giản chọn qua `?q=` (không router package); bẫy phải THẤY ĐƯỢC trên hình. Scene dọc là component MỚI đăng ký thêm vào registry (tiền lệ BrowserScene) + nhánh composition `shorts` 1080×1920 trong Root.tsx; validator generate.py thêm 4 type.

**Tech Stack:** Vite, React 19, Vue 3.5.42 (PIN), Remotion (nhánh dọc), Chrome headless + CDP.

## Global Constraints

- Fact sheet là nguồn sự thật kỹ thuật: `.superpowers/sdd/fe-interview-research.md` + `vue-interview-research.md` — mọi hành vi ví dụ phải khớp.
- Vue PIN `3.5.42` (`npm install vue@3.5.42`); React dùng bản 19 mới nhất Vite kéo về (ghi version thật vào report).
- Cổng: react-qa `5197`, vue-qa `5196` (KHÔNG đụng 3000/5199/5198).
- Chuỗi UI tiếng Việt chuẩn chính tả; mỗi trang có tiêu đề câu hỏi + hướng dẫn thao tác 1 dòng.
- Screenshot: ngang `--window-size=1280,800` Chrome headless; dọc 420×840 qua CDP setDeviceMetricsOverride (Chrome CLI clamp <460px — bài học cũ). Thao tác click qua CDP. Lưu `video/public/screens/feqa/<id>-<state>.png` (id: r1..r6, v1..v6).
- Scene dọc KHÔNG đụng scene/tập ngang hiện có; validator chỉ THÊM type.
- Mỗi task: verify bằng mắt screenshot/frame trước khi commit; commit message tiếng Việt kết thúc `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.

---

### Task 1: Bộ scene DỌC + composition shorts + validator + smoke render

**Files:**
- Create: `video/src/scenes/VTitleScene.tsx`, `VCodeScene.tsx`, `VAnswerScene.tsx`, `VShotScene.tsx`
- Modify: `video/src/scenes/registry.ts` (+4 type: vtitle/vcode/vanswer/vshot), `video/src/Root.tsx` (nhánh `shorts`: composition 1080×1920 data-driven như episodes), `tts/generate.py` (validator 4 type)

**Interfaces:**
- Produces: scene types cho kịch bản Shorts: `vtitle` {question: string, framework: 'react'|'vue'}; `vcode` {filename, language, code (≤40 ký tự/dòng, ≤14 dòng), steps như code ngang}; `vanswer` {title, bullets: [{icon?, text, sentence}], trap?: string}; `vshot` {src, caption?}. Composition id dạng `Short<ID>` (vd ShortR3) đọc `video/src/data/s<id>.timing.json`.

- [ ] **Step 1: Đọc mẫu** — CodeScene/PhoneScene/BrowserScene + registry + Root.tsx (mảng episodes) + validator (khối browser vừa thêm) để đồng bộ type/props thật.

- [ ] **Step 2: Viết 4 scene** (dùng theme hiện có; layout dọc padding ~60px):

`VTitleScene.tsx`:
```tsx
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {theme} from '../components/theme';
import type {SceneProps} from '../data/types';

export type VTitleVisual = {question: string; framework: 'react' | 'vue'};

const FW = {
  react: {label: 'React', emoji: '⚛️', color: '#61dafb'},
  vue: {label: 'Vue', emoji: '💚', color: '#42b883'},
};

export const VTitleScene: React.FC<SceneProps> = ({visual}) => {
  const v = visual as VTitleVisual;
  const fw = FW[v.framework];
  return (
    <AbsoluteFill style={{backgroundColor: theme.bg, fontFamily: theme.fontSans, padding: 60, justifyContent: 'center'}}>
      <div style={{alignSelf: 'center', backgroundColor: fw.color, color: '#0f172a', borderRadius: 999, padding: '14px 40px', fontSize: 44, fontWeight: 900}}>
        {fw.emoji} PHỎNG VẤN {fw.label.toUpperCase()}
      </div>
      <h1 style={{marginTop: 70, fontSize: 88, fontWeight: 900, color: theme.text, textAlign: 'center', lineHeight: 1.25}}>
        {v.question}
      </h1>
      <div style={{marginTop: 70, alignSelf: 'center', color: theme.accent, fontSize: 40, fontWeight: 800}}>
        ■ Trả lời trong 60 giây
      </div>
    </AbsoluteFill>
  );
};
```

`VCodeScene.tsx` (tái dùng CodeBlock, font cố định 34, khung dọc):
```tsx
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {CodeBlock} from '../components/CodeBlock';
import {theme} from '../components/theme';
import {useSentenceIndex} from '../components/useSentenceIndex';
import type {SceneProps} from '../data/types';

export type VCodeVisual = {
  filename: string;
  language: string;
  code: string;
  steps: {from: number; to: number; sentence: number}[];
};

export const VCodeScene: React.FC<SceneProps> = ({visual, sentences}) => {
  const v = visual as VCodeVisual;
  const idx = useSentenceIndex(sentences);
  const active = v.steps.filter((s) => s.sentence <= idx);
  const cur = active[active.length - 1] ?? v.steps[0];
  const visibleUpTo = Math.max(...active.map((s) => s.to), v.steps[0].to);
  return (
    <AbsoluteFill style={{backgroundColor: theme.bg, fontFamily: theme.fontSans, padding: 50, justifyContent: 'center'}}>
      <CodeBlock
        code={v.code}
        language={v.language}
        filename={v.filename}
        visibleUpTo={visibleUpTo}
        highlight={[cur.from, cur.to]}
        fontSize={34}
      />
    </AbsoluteFill>
  );
};
```
(Đối chiếu props CodeBlock thật — nếu tên prop khác (vd highlight là mảng/kiểu khác), đồng bộ theo CodeScene.tsx và ghi report.)

`VAnswerScene.tsx`:
```tsx
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Appear} from '../components/Appear';
import {theme} from '../components/theme';
import {sentenceStart} from '../components/useSentenceIndex';
import type {SceneProps} from '../data/types';

export type VAnswerVisual = {
  title: string;
  bullets: {icon?: string; text: string; sentence: number}[];
  trap?: string;
};

export const VAnswerScene: React.FC<SceneProps> = ({visual, sentences}) => {
  const v = visual as VAnswerVisual;
  return (
    <AbsoluteFill style={{backgroundColor: theme.bg, fontFamily: theme.fontSans, padding: 60, justifyContent: 'center'}}>
      <h2 style={{fontSize: 64, fontWeight: 900, color: theme.text, margin: 0}}>
        <span style={{color: theme.accent}}>■ </span>{v.title}
      </h2>
      <div style={{display: 'flex', flexDirection: 'column', gap: 34, marginTop: 60}}>
        {v.bullets.map((b, i) => (
          <Appear key={i} at={sentenceStart(sentences, b.sentence)}>
            <div style={{display: 'flex', gap: 24, alignItems: 'flex-start', backgroundColor: theme.panel, border: `2px solid ${theme.panelBorder}`, borderRadius: 22, padding: '30px 34px'}}>
              <span style={{fontSize: 48}}>{b.icon ?? '✅'}</span>
              <span style={{fontSize: 42, color: theme.text, lineHeight: 1.4}}>{b.text}</span>
            </div>
          </Appear>
        ))}
      </div>
      {v.trap ? (
        <div style={{marginTop: 60, backgroundColor: 'rgba(234,40,69,0.12)', border: `3px solid ${theme.accent}`, borderRadius: 22, padding: '30px 34px', fontSize: 40, color: theme.text, lineHeight: 1.4}}>
          ⚠️ <b>Bẫy:</b> {v.trap}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
```

`VShotScene.tsx`:
```tsx
import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {theme} from '../components/theme';
import type {SceneProps} from '../data/types';

export type VShotVisual = {src: string; caption?: string};

export const VShotScene: React.FC<SceneProps> = ({visual}) => {
  const v = visual as VShotVisual;
  return (
    <AbsoluteFill style={{backgroundColor: theme.bg, fontFamily: theme.fontSans}}>
      <Img src={staticFile(v.src)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      {v.caption ? (
        <div style={{position: 'absolute', bottom: 90, left: 40, right: 40, backgroundColor: 'rgba(15,23,42,0.92)', borderRadius: 20, padding: '24px 30px', fontSize: 40, fontWeight: 700, color: theme.text, textAlign: 'center'}}>
          {v.caption}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
```

- [ ] **Step 3: Registry + Root** — đăng ký 4 type; Root.tsx thêm mảng `shorts: {id: string; timing: EpisodeTiming}[]` (rỗng lúc này ngoại trừ mục test tạm) render `<Composition width={1080} height={1920} fps={30} ...>` cùng cơ chế totalDuration như episodes.

- [ ] **Step 4: Validator** — generate.py thêm 4 type: vtitle bắt buộc question (str ≤90 ký tự) + framework in {react,vue}; vcode như code (code+steps, thêm check: không dòng nào >40 ký tự, ≤14 dòng — lỗi rõ ràng); vanswer bắt buộc title + bullets (như concept) + trap optional str; vshot bắt buộc src + caption optional. Test python inline: mỗi type 1 case pass + 1 case fail (vcode dòng 41 ký tự phải fail).

- [ ] **Step 5: Smoke render** — script test tạm `tts/scripts/stest.json` (4 scene, narration ngắn) → chạy generate.py stest (TTS thật vài câu) → thêm mục shorts tạm `ShortTEST` → `npx remotion render ShortTEST out/_stest.mp4` + xem 4 frame (1 frame/scene): chữ không tràn khung DỌC, code 34px đọc được. XÓA stest + mục tạm + wav/mp4 test trước khi commit (giữ 4 scene + registry + Root nhánh shorts + validator).

- [ ] **Step 6: Commit** — `feat: pipeline Shorts dọc — 4 scene vtitle/vcode/vanswer/vshot + composition 1080×1920`.

---

### Task 2: react-qa — 6 trang ví dụ R1–R6 + screenshots

**Files:**
- Create: `demo-fe-interview/react-qa/` (npm create vite@latest -- --template react-ts) rồi: `src/App.tsx` (đọc `?q=`, menu mặc định), `src/questions/R1VirtualDom.tsx` … `R6CustomHook.tsx` (mỗi câu 1 file), xóa scaffold thừa.

**Interfaces:**
- Produces: URL `http://localhost:5197/?q=r3` → trang R3...; mỗi trang tự chứa (component + giải thích 1 dòng); screenshots `video/public/screens/feqa/r*-*.png`.

- [ ] **Step 1: Shell** — `App.tsx`:
```tsx
import {questions} from './questions';

export default function App() {
  const q = new URLSearchParams(window.location.search).get('q') ?? '';
  const item = questions.find((x) => x.id === q);
  if (!item) {
    return (
      <main style={{fontFamily: 'system-ui', padding: 32}}>
        <h1>Phỏng vấn React — ví dụ chạy thật</h1>
        <ul>
          {questions.map((x) => (
            <li key={x.id}>
              <a href={`/?q=${x.id}`}>{x.id.toUpperCase()} — {x.title}</a>
            </li>
          ))}
        </ul>
      </main>
    );
  }
  const C = item.component;
  return (
    <main style={{fontFamily: 'system-ui', padding: 32, maxWidth: 720, margin: '0 auto'}}>
      <h1 style={{fontSize: 22}}>{item.id.toUpperCase()} — {item.title}</h1>
      <p style={{color: '#666'}}>{item.hint}</p>
      <C />
    </main>
  );
}
```
`src/questions/index.ts` export mảng `questions: {id, title, hint, component}[]` (r1..r6).

- [ ] **Step 2: Trang mẫu R3 (bẫy key=index) — code đầy đủ, các trang khác theo cùng phong cách:**

`src/questions/R3KeyProp.tsx`:
```tsx
import {useState} from 'react';

const initial = ['Phở bò', 'Bánh mì', 'Cơm tấm'];

function List({useIndex}: {useIndex: boolean}) {
  const [items, setItems] = useState(initial);
  return (
    <div style={{border: '1px solid #ddd', borderRadius: 8, padding: 16, flex: 1}}>
      <b>{useIndex ? 'key={index} — SAI' : 'key={item} — ĐÚNG'}</b>
      {items.map((item, i) => (
        <div key={useIndex ? i : item} style={{display: 'flex', gap: 8, marginTop: 8}}>
          <span style={{width: 90}}>{item}</span>
          <input placeholder="ghi chú..." />
          <button onClick={() => setItems(items.filter((x) => x !== item))}>Xóa</button>
        </div>
      ))}
    </div>
  );
}

export function R3KeyProp() {
  return (
    <div style={{display: 'flex', gap: 16}}>
      <List useIndex />
      <List useIndex={false} />
    </div>
  );
}
```
Bẫy thấy được: gõ ghi chú vào từng dòng, xóa "Phở bò" — bên key=index ghi chú NHẢY SAI dòng, bên key=item đúng.

- [ ] **Step 3: 5 trang còn lại** — cùng phong cách (mỗi file ≤80 dòng, chuỗi tiếng Việt, bẫy/điểm minh họa THẤY được trên hình, đúng fact sheet):
  - **R1VirtualDom**: nút "Re-render" tăng counter; 2 ô: một ô text tĩnh (DOM node không đổi — hiện `performance.now()` gắn lúc mount qua ref để chứng minh không remount), một ô text theo counter; giải thích diff chỉ vá chỗ đổi.
  - **R2Effects**: counter + useEffect log vào một panel `<pre>` trên trang (không chỉ console): effect chạy sau render, cleanup chạy trước lần sau; nút bật/tắt component con để thấy cleanup khi unmount.
  - **R4Controlled**: 2 input cạnh nhau — controlled (value+onChange, hiện state live) vs uncontrolled (defaultValue+ref, chỉ đọc khi bấm "Lấy giá trị"); nút UPPERCASE hoá state chỉ ăn bên controlled.
  - **R5Memo**: component con `<ExpensiveChild>` bọc React.memo nhận prop object — 2 nút: truyền object literal mới mỗi render (memo VÔ DỤNG — đếm render con tăng) vs truyền object đã useMemo (đếm đứng yên); hiển thị số lần render con bằng ref counter.
  - **R6CustomHook**: hook `useDebouncedValue(value, 500)` tự viết trong file; input gõ liên tục, hiện value tức thời vs value debounce — 2 dòng chữ.

- [ ] **Step 4: Verify + screenshots** — `npm run build` pass; `npm run preview -- --port 5197` nền; với TỪNG câu chụp qua CDP (click/gõ khi cần dựng trạng thái bẫy): tối thiểu 2 ảnh ngang 1280×800 (`r3-before.png` trạng thái đã gõ ghi chú, `r3-bug.png` sau khi xóa Phở bò — ghi chú lệch dòng thấy rõ; các câu khác 1-2 ảnh đúng bẫy/điểm minh họa) + 1 ảnh dọc 420×840 (`r3-vert.png` — trạng thái đắt nhất). MỞ XEM đại diện ≥6 ảnh xác nhận bẫy hiện rõ. Kill server mình.

- [ ] **Step 5: Commit** — `feat: demo-fe-interview/react-qa — 6 trang ví dụ phỏng vấn R1–R6`.

---

### Task 3: vue-qa — 6 trang ví dụ V1–V6 + screenshots

**Files:**
- Create: `demo-fe-interview/vue-qa/` (npm create vite@latest -- --template vue-ts; `npm install vue@3.5.42`), `src/App.vue` (đọc ?q= như react-qa, menu), `src/questions/V1RefReactive.vue` … `V6PropsEmit.vue`.

**Interfaces:**
- Produces: `http://localhost:5196/?q=v1` …; screenshots `video/public/screens/feqa/v*-*.png`.

- [ ] **Step 1: Shell App.vue** — tương đương react-qa (mảng questions {id,title,hint,component}, chọn theo location.search, menu mặc định).

- [ ] **Step 2: Trang mẫu V1 (bẫy destructure mất reactivity) — code đầy đủ:**

`src/questions/V1RefReactive.vue`:
```vue
<script setup lang="ts">
import {reactive, ref} from 'vue';

const counterRef = ref(0);
const state = reactive({count: 0});
// BẪY: destructure từ reactive → biến thường, MẤT reactivity
let {count: broken} = state;

function tangCa3() {
  counterRef.value++;
  state.count++;
  broken++; // biến này tăng nhưng UI không bao giờ thấy
}
</script>

<template>
  <button @click="tangCa3">Tăng cả 3 (+1)</button>
  <ul>
    <li>ref: {{ counterRef }}</li>
    <li>reactive.count: {{ state.count }}</li>
    <li>biến destructure: {{ broken }} — đứng yên vì đã MẤT reactivity!</li>
  </ul>
</template>
```

- [ ] **Step 3: 5 trang còn lại** — cùng phong cách (≤80 dòng, đúng fact sheet Vue):
  - **V2ApiStyles**: cùng 1 counter viết 2 kiểu đặt cạnh nhau — Options API (component con `defineComponent({data, methods})`) vs Composition `<script setup>`; chữ chú thích "cùng kết quả, khác cách tổ chức".
  - **V3ComputedWatch**: input số km + giá/km — `computed` tổng tiền (tự tính, có cache — thêm đếm số LẦN TÍNH bằng biến ngoài để chứng minh cache); `watch` ghi log panel khi km đổi; `watchEffect` chạy ngay lần đầu (log thấy được).
  - **V4IfShow**: 2 hộp toggle — `v-if` (unmount thật — bên trong có input, toggle mất chữ đã gõ) vs `v-show` (display:none — chữ còn nguyên); đó là bằng chứng thấy được.
  - **V5KeyVFor**: bản sao logic R3 bằng Vue (2 list key=index vs key=item, input ghi chú, nút xóa) — móc so sánh "bẫy y hệt React".
  - **V6PropsEmit**: component con `NutDatHang` nhận prop `mon` + emit `dat`; cha hiện log đơn hàng; chú thích "props xuống, emit lên — một chiều".

- [ ] **Step 4: Verify + screenshots** — build pass; preview 5196; chụp như Task 2 (mỗi câu 1-2 ảnh ngang trạng thái đắt + 1 ảnh dọc; v1: sau 3 lần bấm — ref=3, reactive=3, destructure=0). MỞ XEM đại diện. Kill server.

- [ ] **Step 5: Commit** — `feat: demo-fe-interview/vue-qa — 6 trang ví dụ phỏng vấn V1–V6 (Vue 3.5.42)`.

---

### Task 4: README + regression + chốt demo

**Files:**
- Create: `demo-fe-interview/README.md`

- [ ] **Step 1: Regression** — build cả 2 app pass; đếm đủ ảnh trong video/public/screens/feqa/ (≥ 12 ngang + 12 dọc); spot-check 4 ảnh bằng mắt.
- [ ] **Step 2: README** — sơ đồ, version thật (React x.y, Vue 3.5.42), lệnh chạy 2 app (port 5197/5196), bảng 12 câu ↔ `?q=` ↔ bẫy minh họa, ghi chú ảnh chụp CDP, dòng "Series video: playlist cập nhật sau khi đăng".
- [ ] **Step 3: Commit** — `feat: demo-fe-interview hoàn chỉnh — 12 ví dụ phỏng vấn React & Vue`.

---

## Sau plan này

Controller merge + tag `fe-qa-batch-1` + push. Giai đoạn 2 (24 kịch bản: 12 ngang ep45+ ~150–180s + 12 Shorts s<id> <60s, TTS, render, SEO, playlist "Phỏng vấn Frontend 🇻🇳") lập plan riêng — kịch bản viết SAU demo verified, đáp án bám fact sheet.
