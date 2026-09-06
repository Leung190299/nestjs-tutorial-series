# demo-stylex — ViệtSuper Web (StyleX) + đối chứng Tailwind

Demo cho series "StyleX từ A đến Z, so găng Tailwind" (ep39–ep44): 2 app Vite
+ React + TypeScript độc lập, cùng dựng lại 1 trang landing "ViệtSuper" —
một bản dùng **StyleX** (compile-time atomic CSS), một bản dùng **Tailwind
CSS v4** (utility-class) — để so sánh trực tiếp cách viết, DOM render ra, và
kích thước CSS bundle.

## Sơ đồ thư mục

```
demo-stylex/
├── vietsuper-web/              # bản chính — StyleX
│   ├── src/
│   │   ├── main.tsx             # import CSS entrypoint + nạp virtual runtime (dev)
│   │   ├── App.tsx              # đọc ?theme= từ URL, ráp các section
│   │   ├── stylex.css           # CSS entrypoint rỗng cho @stylexjs/unplugin
│   │   ├── tokens.stylex.ts     # defineVars — token màu dùng chung (bắt buộc đuôi .stylex.ts)
│   │   ├── themes.ts            # createTheme — theme "Tết" override token
│   │   ├── stylex-virtual.d.ts  # ambient declare cho virtual module (TS)
│   │   └── components/
│   │       ├── Hero.tsx         # banner đầu trang
│   │       ├── ServiceGrid.tsx  # lưới 6 dịch vụ
│   │       ├── Button.tsx       # 3 variant × 2 size, nhận style prop ngoài (merge)
│   │       ├── MergeDemo.tsx    # minh hoạ luật last-wins của stylex.props()
│   │       └── Pricing.tsx      # bảng giá 3 gói
│   └── vite.config.ts           # plugin StyleX (đứng TRƯỚC react())
└── compare-tailwind/            # bản đối chứng — Tailwind v4
    ├── src/
    │   ├── index.css             # @import "tailwindcss"; (v4 zero-config)
    │   ├── App.tsx                # cùng nội dung phần buttons + card dịch vụ
    │   ├── Button.tsx             # cùng 3 variant, viết bằng className ghép chuỗi
    │   └── ServiceCard.tsx
    └── vite.config.ts             # plugin @tailwindcss/vite
```

## Yêu cầu

- **Node 22** (khớp máy quay: `npm create vite@latest` chạy trên Node
  22.21.1).
- Version đã pin thật trong `package.json` (không phải số đoán/tài liệu cũ):
  - `@stylexjs/stylex` **0.19.0** + `@stylexjs/unplugin` **0.19.0** (luôn
    giữ 2 gói StyleX cùng version — API còn 0.x, dễ lệch nếu update lẻ tẻ).
  - `tailwindcss` **4.3.3** + `@tailwindcss/vite` **4.3.3**.
  - `vite` 8.2.2, `@vitejs/plugin-react` 6.1.0, `react`/`react-dom` 19.2.8,
    `typescript` 6.0.2 (bản thân TypeScript đã lên major 6.x, khác hầu hết
    tutorial còn ghi TS5 — cú pháp/behaviour tsconfig có thể khác video cũ).

## Chạy từng app

Mỗi app là 1 project Vite độc lập, cài đặt và chạy riêng.

```bash
# ViệtSuper Web (StyleX) — cổng 5199
cd demo-stylex/vietsuper-web
npm install
npm run dev                     # dev server, mặc định 5173
npm run build                   # build production, kiểm tra không warning StyleX
npm run preview -- --port 5199  # xem bản build production

# Đối chứng Tailwind — cổng 5198
cd demo-stylex/compare-tailwind
npm install
npm run dev
npm run build
npm run preview -- --port 5198
```

Gợi ý dùng 2 cổng khác nhau (5199/5198) khi cần mở song song cả 2 bản để so
sánh trực tiếp trên trình duyệt.

## Setup StyleX với Vite

4 điểm thật cần làm đúng khi gắn `@stylexjs/unplugin` vào 1 project Vite mới
(đã kiểm chứng bằng build thật, không phải đoán theo doc):

1. **Import đúng subpath `@stylexjs/unplugin/vite`, không import mặc định
   rồi gọi `.vite(...)`.**
   ```ts
   import stylexVite from '@stylexjs/unplugin/vite'
   ```
   `package.json` của `@stylexjs/unplugin` khai field `"types"` **sau**
   `"import"`/`"require"` trong exports map — với `tsconfig.node.json` chạy
   `module: "nodenext"` (default của `create-vite` bản mới), TS resolve
   nhầm sang type sai và báo "not callable" / "Property 'vite' does not
   exist". Import thẳng subpath `/vite` (có sẵn, chính thức trong README
   gói) + đổi `tsconfig.node.json` sang `moduleResolution: "bundler"` là
   fix đúng gốc, không phải patch tạm.

2. **Plugin StyleX phải đứng TRƯỚC `react()`** trong mảng `plugins`:
   ```ts
   plugins: [
     stylexVite({ useCSSLayers: true, dev: process.env.NODE_ENV === 'development', runtimeInjection: false }),
     react(),
   ]
   ```

3. **CSS entrypoint không cần nội dung đặc biệt** — chỉ cần tồn tại 1 file
   `.css` được `import` trong app (ở đây là `src/stylex.css`, để trống, chỉ
   có comment). Plugin tự "aggregate" toàn bộ CSS compile từ
   `stylex.create()`/`defineVars()` và append vào file `.css` asset đầu
   tiên Vite build ra — không phải marker `@stylex;` như một số tài liệu cũ
   ghi.

4. **Token dùng chung phải nằm trong file đuôi `.stylex.ts`** (hoặc `.js`):
   `tokens.stylex.ts` gọi `stylex.defineVars(...)`. Đây là quy ước bắt buộc
   của `@stylexjs/babel-plugin` — thiếu đúng đuôi này, file nào `import`
   token sẽ lỗi compile ngay ("Could not resolve the path to the imported
   file... Please ensure that the theme file has a .stylex.js or .stylex.ts
   extension").

## Theme qua `?theme=`

`App.tsx` đọc query string để áp `createTheme` override token màu:

| URL                                  | Theme          | Hiệu ứng                                                    |
| ------------------------------------- | -------------- | ------------------------------------------------------------ |
| `http://localhost:5199/`              | Mặc định       | Nền hồng nhạt, brand đỏ (`#ea2845`)                          |
| `http://localhost:5199/?theme=tet`    | Tết            | Nền vàng kem, surface trắng ngà, brand đỏ gạch (`#d4380d`)    |

Ghi chú: theme mặc định có `bg`/`surface`/`text`/`textMuted` khai theo
`@media (prefers-color-scheme: dark)` trong `tokens.stylex.ts`, nên đổi theo
dark mode hệ thống (test bằng DevTools CDP `Emulation.setEmulatedMedia`,
không phải theme riêng). Theme Tết chỉ override `bg`/`surface`/`brand` bằng
giá trị **phẳng** (không khai nhánh dark) — override phẳng thắng tuyệt đối
so với `@media` gốc, nên theme Tết **luôn** vàng kem/trắng ngà bất kể hệ
điều hành đang bật dark mode hay không (hành vi đúng thiết kế, không phải
thiếu sót).

## So găng Tailwind

`compare-tailwind` là bản đối chứng dựng lại đúng phần Button + card dịch vụ
bằng Tailwind CSS v4 (`@tailwindcss/vite`, không cần `tailwind.config.js`)
để so sánh trực tiếp, không thiên vị:

- Cách viết: StyleX tách style ra `stylex.create()`/token riêng rồi gọi
  `stylex.props(...)`; Tailwind ghép className ngay trong JSX theo runtime.
- className dài nhất thực render ra DOM ở bản Tailwind (nút ghost/md):
  **187 ký tự**. Bản StyleX cho cùng 1 nút chỉ ra vài atomic class hash
  ngắn (kiểu `x1yc3n3b x9k58y7 ...`, mỗi class ~8–9 ký tự).
- CSS bundle production cho quy mô demo tương đương: StyleX 4.41 kB,
  Tailwind 12.26 kB.
- Đây là số liệu đo thật trên demo nhỏ này, không phải kết luận tổng quát
  cho mọi project — mục đích là cho người xem tự thấy sự khác biệt, không
  phải chấm điểm thắng/thua.

---

Series video kèm theo: playlist cập nhật sau khi đăng.
