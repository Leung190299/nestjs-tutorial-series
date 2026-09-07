# demo-fe-interview — 12 ví dụ phỏng vấn Frontend (React & Vue)

Demo cho series "Phỏng vấn Frontend 🇻🇳": 2 app Vite độc lập, mỗi app 6 trang
minh họa **hành vi thật** (không phải slide/diagram) cho các câu hỏi phỏng
vấn kinh điển — React (`react-qa`, R1–R6) và Vue (`vue-qa`, V1–V6). Mỗi
trang là 1 component chạy được, có nút bấm để tự tay tạo ra đúng cái bẫy/kết
quả mà câu hỏi đang hỏi, thay vì chỉ nói suông.

## Sơ đồ thư mục

```
demo-fe-interview/
├── react-qa/                    # Vite + React + TypeScript — cổng 5197
│   └── src/
│       ├── main.tsx               # bọc <StrictMode> (ảnh hưởng R5, xem ghi chú bên dưới)
│       ├── App.tsx                # đọc ?q= từ URL, ráp menu 6 câu R1–R6
│       └── questions/
│           ├── index.ts           # mảng {id, title, hint, component} cho r1..r6
│           ├── R1VirtualDom.tsx     # Virtual DOM & reconciliation
│           ├── R2Effects.tsx        # useState vs useEffect (cleanup)
│           ├── R3KeyProp.tsx        # key trong list — bẫy dùng index
│           ├── R4Controlled.tsx     # Controlled vs Uncontrolled
│           ├── R5Memo.tsx           # React.memo với prop object
│           └── R6CustomHook.tsx     # Custom Hook — useDebouncedValue
└── vue-qa/                      # Vite + Vue 3.5.42 (PIN) + TypeScript — cổng 5196
    └── src/
        ├── main.ts
        ├── App.vue                # đọc ?q= từ URL, ráp menu 6 câu V1–V6
        └── questions/
            ├── index.ts           # mảng {id, title, hint, component} cho v1..v6
            ├── V1RefReactive.vue    # ref vs reactive & bẫy destructure
            ├── V2ApiStyles.vue      # Options API vs Composition API
            │   + OptionsCounter.vue   (component con, Options API thuần)
            ├── V3ComputedWatch.vue  # computed vs watch vs watchEffect
            ├── V4IfShow.vue         # v-if vs v-show
            ├── V5KeyVFor.vue        # :key trong v-for — bẫy dùng index
            └── V6PropsEmit.vue      # Props xuống, emit lên
                + NutDatHang.vue        (component con nhận props, emit sự kiện)
```

Ảnh chụp minh họa (27 file, PNG) nằm ở `video/public/screens/feqa/` — dùng
chung cho cả series video (scene `vshot`), không đặt trong từng app.

## Version (pin thật, không phải số tài liệu cũ)

```
react / react-dom     19.2.8
vue                    3.5.42   (pin CHÍNH XÁC trong package.json, không dùng ^)
vite                   8.2.2 (create-vite 9.2.0)
typescript             ~6.0.2
node                   v22.21.1
```

## Chạy từng app

Mỗi app là 1 project Vite độc lập, cài đặt và chạy riêng. Dùng bản
**production preview** (không phải `npm run dev`) khi cần số liệu đúng —
xem ghi chú StrictMode ở câu R5 bên dưới.

```bash
# react-qa — cổng 5197
cd demo-fe-interview/react-qa
npm install
npm run build
npm run preview -- --port 5197

# vue-qa — cổng 5196
cd demo-fe-interview/vue-qa
npm install
npm run build
npm run preview -- --port 5196
```

Mở từng câu qua query param, ví dụ `http://localhost:5197/?q=r3` hoặc
`http://localhost:5196/?q=v5`. Không khớp `?q=` nào → hiện menu 6 câu.

## Bảng 12 câu ↔ `?q=` ↔ bẫy/điểm minh họa ↔ ảnh

| # | `?q=` | Câu hỏi | Bẫy / điểm minh họa | Ảnh |
|---|---|---|---|---|
| 1 | `r1` | Virtual DOM & reconciliation | React diff cây cũ/mới rồi chỉ vá đúng phần DOM đổi — ô "Mounted lúc" (DOM node không đổi) đứng im qua nhiều lần re-render, chỉ ô counter động cập nhật | `r1-main.png`, `r1-vert.png` |
| 2 | `r2` | useState vs useEffect (cleanup) | effect chạy SAU render; cleanup chạy TRƯỚC lần effect kế tiếp và khi unmount — log `<pre>` hiện đủ trình tự effect(0)→cleanup(0)+effect(1)→…→cleanup khi tắt component con | `r2-main.png`, `r2-vert.png` |
| 3 | `r3` | key trong list — vì sao không nên dùng index | dùng `key={index}` khi xóa 1 dòng giữa danh sách làm state (ghi chú) của các dòng SAU đó bị lệch sang tên món khác; `key={item}` thì đúng | `r3-before.png` (chưa bug), `r3-bug.png` (lộ bug), `r3-vert.png` |
| 4 | `r4` | Controlled vs Uncontrolled component | nút UPPERCASE chỉ tác động input controlled (state React giữ giá trị); input uncontrolled (đọc qua `ref`) giữ nguyên DOM, không đổi | `r4-main.png`, `r4-vert.png` |
| 5 | `r5` | React.memo với prop object | `memo` so sánh nông props: con nhận object literal mới mỗi render → đếm render tăng theo mọi lần cha render (memo vô dụng); con nhận object qua `useMemo(...,[])` → đếm đứng yên ở 1 | `r5-main.png`, `r5-vert.png` |
| 6 | `r6` | Custom Hook — useDebouncedValue | tách logic debounce (setTimeout + cleanup) ra hook riêng; chụp đúng khoảnh khắc <500ms sau khi gõ để thấy giá trị tức thời đã đổi nhưng giá trị debounce vẫn cũ | `r6-main.png`, `r6-vert.png` |
| 7 | `v1` | ref vs reactive & bẫy destructure | `let {count} = reactive(...)` mất liên kết Proxy → biến destructure không tự trigger re-render. Bấm riêng nút destructure vài lần: UI **đứng im hoàn toàn** (`v1-frozen.png`); rồi bấm nút `reactive.count`: UI re-render vì lý do khác và **lộ ra** giá trị ngầm đã tăng từ trước (`v1-main.png`) | `v1-frozen.png`, `v1-main.png`, `v1-vert.png` |
| 8 | `v2` | Options API vs Composition API | 2 counter độc lập viết 2 kiểu tổ chức code (Options API thuần trong `OptionsCounter.vue` vs `<script setup>` trong `V2ApiStyles.vue`) — cùng hành vi, khác cách viết | `v2-main.png`, `v2-vert.png` |
| 9 | `v3` | computed vs watch vs watchEffect | `computed` có cache — đọc `{{tongTien}}` 3 lần trong template không làm hàm tính lại chạy thêm; `watch(km,...)` chỉ chạy khi km đổi (lazy, có oldValue/newValue); `watchEffect` tự track và chạy ngay khi mount (eager) | `v3-main.png`, `v3-vert.png` |
| 10 | `v4` | v-if vs v-show | `v-if` gỡ hẳn phần tử khỏi DOM — ẩn/hiện lại làm mất chữ đã gõ (unmount thật); `v-show` chỉ đổi CSS `display` — chữ vẫn còn nguyên | `v4-main.png`, `v4-vert.png` |
| 11 | `v5` | `:key` trong `v-for` — vì sao không nên dùng index | y hệt bẫy R3 phía React: `:key="index"` làm ghi chú các dòng sau bị lệch khi xóa 1 dòng giữa danh sách; `:key="item"` thì đúng | `v5-before.png`, `v5-bug.png`, `v5-vert.png` |
| 12 | `v6` | Props xuống, emit lên | component con `NutDatHang` nhận `mon` qua props (một chiều), báo sự kiện đặt hàng lên cha qua `defineEmits` — cha log lại đúng thứ tự đã bấm | `v6-main.png`, `v6-vert.png` |

## Ghi chú kỹ thuật đáng giá (đọc trước khi viết kịch bản video)

- **V1 — hành vi "đứng im rồi lộ giá trị ngầm" là bản đã fix**, không phải
  bản đầu. Code nguyên văn theo brief ban đầu (1 nút tăng cả 3 biến cùng
  lúc) cho kết quả sai kỳ vọng: vì `broken++` (biến destructure, mất
  reactivity) chạy CHUNG 1 lần gọi hàm với `state.count++`/`counterRef++`
  (có track), nên render function — vốn đọc lại `broken` trực tiếp từ
  closure — "ăn ké" re-render do 2 biến kia kích hoạt, khiến cả 3 số nhìn
  như cùng tăng dù bản chất `broken` không được Vue theo dõi. Bản fix tách
  3 nút riêng: bấm "Tăng bản destructure" một mình → UI đứng im hoàn toàn
  (`v1-frozen.png`, biến ngầm đã tăng nhưng chưa hiện); bấm "Tăng
  reactive.count" ngay sau đó → UI re-render vì lý do khác và lộ luôn giá
  trị ngầm đã tăng từ bước trước (`v1-main.png`). Đây là bẫy thật, tinh vi
  hơn cách mô tả "destructure = 0 mãi mãi" — kịch bản video nên giải thích
  đúng cơ chế này (không nói tắt thành "destructure không bao giờ đổi").

- **R5 chỉ cho số liệu đúng khi chạy qua `npm run preview` (production
  build)**, không phải `npm run dev`. `main.tsx` bọc `<StrictMode>`, và
  React chỉ double-invoke render function trong **development build** để
  bắt side-effect không thuần khiết — `ExpensiveChild` đếm số lần render
  bằng `useRef` nên ở `npm run dev`, số đếm sẽ tăng gấp đôi so với thực tế
  (gây hiểu lầm là memo không hoạt động dù nó hoạt động đúng). Ảnh
  `r5-main.png`/`r5-vert.png` chụp từ `vite preview` (bản production,
  không double-invoke) nên số liệu (6 vs 1) phản ánh đúng hành vi memo
  thật trong sản phẩm chạy thật.

- **Toàn bộ 27 ảnh chụp qua CDP thật** (Chrome DevTools Protocol — driver
  Node dùng `fetch`/`WebSocket` built-in nói chuyện trực tiếp với Chrome
  headless), không dùng cờ `--window-size` của Chrome CLI: cờ này có bug
  clamp layout khi width <460px (phát hiện từ các task trước), nên mọi
  thao tác dựng trạng thái (click, gõ chữ, đổi viewport 1280×800 ↔
  420×840) đều qua lệnh CDP thật (`Input.dispatchMouseEvent`,
  `Input.insertText`, `Emulation.setDeviceMetricsOverride`).

- **`?q=` không khớp id nào** (kể cả rỗng) → cả 2 app hiện menu danh sách 6
  câu kèm `hint` — dùng làm màn hình mở đầu/danh mục trong video nếu cần.

## Regression đã chạy (trước khi viết README này)

- `cd demo-fe-interview/react-qa && npm run build` → PASS (`tsc -b` sạch,
  `vite build` ra `dist/` bình thường).
- `cd demo-fe-interview/vue-qa && npm run build` → PASS (`vue-tsc -b`
  sạch, `vite build` ra `dist/` bình thường).
- `ls video/public/screens/feqa/ | wc -l` → **27** ảnh (13 React + 14 Vue,
  Vue có thêm `v1-frozen.png` so với 13 câu còn lại — ≥ 26 kỳ vọng).
- Spot-check bằng mắt 4 ảnh: `r1-vert.png`, `v1-frozen.png` (UI đứng im,
  cả 3 số = 0), `v4-main.png` (v-if mất chữ vs v-show giữ chữ), `r6-vert.png`
  — tất cả đúng như bảng trên.

## Series video

Series video: playlist cập nhật sau khi đăng.
