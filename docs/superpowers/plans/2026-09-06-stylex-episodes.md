# Series "StyleX từ A đến Z — so găng Tailwind" — Plan sản xuất 6 tập (ep39–ep44)

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development. Mỗi tập = 1 task, tuần tự, theo checklist chuẩn + Global Constraints của plan `2026-09-03-flutter-miniapp-episodes.md` (hiệu lực nguyên vẹn) cộng điều chỉnh dưới đây.

**Goal:** 6 video ep39–ep44 series MỚI "StyleX từ A đến Z" (vertical web đầu tiên), playlist mới khi đăng, từ demo `demo-stylex/` đã verified + fact sheet `.superpowers/sdd/stylex-research.md`.

## Điều chỉnh so với Global Constraints cũ

- Tag byte-match: ep39/ep40→`stylex-tap-1`/`tap-2` (cùng commit), ep41/ep42→`tap-3`/`tap-4` (cùng commit), ep43→`tap-5`, ep44→`tap-6`. `git show stylex-tap-N:demo-stylex/<path>`.
- Ngôn ngữ CodeBlock: TSX→`tsx`, TS→`tsx` hoặc `typescript`, CSS→`css`, vite.config→`tsx`.
- Scene MỚI `browser`: visual {title, shots: [{src, sentence, label?, url?}] 1-2 phần tử, bullets? (CHỈ khi 1 shot — 2 shots thì bullets bị ẩn, ĐỪNG khai)}. Ảnh có sẵn tại video/public/screens/ep39–ep44. Shot bản Tailwind PHẢI khai url 'localhost:5198 — Tailwind' (mặc định là 5199 ViệtSuper).
- Series "Tập N/6", tên "StyleX từ A đến Z"; seriesTag thumbnail "StyleX từ A đến Z 🇻🇳"; badge "STYLEX N/6".
- Khán giả: biết React cơ bản, KHÔNG cần biết StyleX/Tailwind trước. NHẤN MẠNH so găng Tailwind: mỗi tập ít nhất 1 nhịp "bên Tailwind viết thế này" (ngắn, trung lập); tập 6 so găng trực diện.
- RÀNG BUỘC KIẾN THỨC (từ fact sheet + demo): StyleX v0.19 CÒN 0.x — nói rõ; atomic CSS COMPILE-TIME (khác styled-components runtime); import `'@stylexjs/unplugin/vite'` (KHÔNG dạy dạng `stylex.vite(...)` của docs — giải thích vì sao, xem mục Bổ sung cuối fact sheet); plugin TRƯỚC react(); luật last-wins THEO THỨ TỰ GỌI không phải specificity; `default` bắt buộc khi lồng; createTheme flat-override thắng cả @media gốc (beat ep43); số liệu so găng (187 ký tự className, 4.41 vs 12.26 kB) LUÔN đóng khung "đo trên demo nhỏ này".
- Ẩn dụ MỚI cho series (nhất quán 6 tập): style = ĐỒNG PHỤC; stylex.create = xưởng may đo (may sẵn lúc build); Tailwind = tủ đồ may sẵn ghép tem; token defineVars = bảng màu thương hiệu; theme = bộ sưu tập theo mùa. Không dùng ẩn dụ chung cư (để dành mini-app).
- Thời lượng: 380–480s/tập (ep44 cho phép 420–540s).
- Ảnh ep43 web-theme-default.png trùng byte ep39 hero — trong ep43 dùng nó làm "trước khi đổi theme" là hợp lệ, narration đừng claim gì khác biệt ở ảnh đó.

## Outline từng tập

### ep39 — Tập 1/6: "StyleX: đồ Meta may đo lúc build — setup Vite không vấp"
Mở series 30s: vertical web đầu tiên của kênh; StyleX là thư viện style của Meta (chạy thật trên facebook/instagram), CSS-in-JS nhưng COMPILE-TIME — khác styled-components (runtime, tốn CPU) và khác Tailwind (string class); v0.19 còn 0.x nói thẳng. Concept: atomic CSS là gì (mỗi rule 1 property, dùng chung — CSS không phình theo số component). Code (tag-1): vite.config.ts (import '@stylexjs/unplugin/vite' — kể GOTCHA THẬT: dạng docs `stylex.vite()` không type-check vì exports map, fix subpath + moduleResolution bundler; plugin TRƯỚC react()), CSS entrypoint (gotcha 2: thiếu là không ra style nào), tokens.stylex.ts nhắc nhẹ (file .stylex.ts — chi tiết để ep43), Hero.tsx trích create/props đầu tiên. Terminal: npm install 2 package. Browser scene: ep39/web-hero-first-style.png. Nhịp TW: "Tailwind cũng atomic — nhưng là string trong className; StyleX là object có TypeScript soi lưng". Outro: tập 2 hover/media query.

### ep40 — Tập 2/6: "create() sâu: hover, media query và luật 'default bắt buộc'"
Code (tag-2): Hero cta backgroundColor {default, ':hover'} — pseudo-class là OBJECT không phải selector; ServiceGrid gridTemplateColumns {default, '@media'} responsive; card boxShadow/transform hover nhấc lên. Luật DEFAULT BẮT BUỘC khi lồng điều kiện (fact sheet — quên là lỗi compile). Browser: ep40/web-responsive-desktop.png + web-responsive-mobile.png (2 ảnh lần lượt, 1 shot mỗi scene hoặc side-by-side 2 shots KHÔNG bullets). Nhịp TW: `hover:bg-…` `md:grid-cols-3` prefix vs object có type. Outro: tập 3 luật quan trọng nhất — last-wins.

### ep41 — Tập 3/6: "props() và luật LAST-WINS — thứ tự gọi quyết định tất cả"
Code (tag-3): MergeDemo.tsx NGUYÊN VĂN (2 dòng đảo thứ tự grey/brand) + ảnh ep41/web-merge-lastwins.png làm bằng chứng thị giác (dòng trên ĐỎ dòng dưới XÁM); giải thích: KHÔNG phải specificity, KHÔNG phải thứ tự file CSS — là thứ tự tham số trong props(); conditional && và ternary (props tự bỏ falsy); Button.tsx variants (styles[variant] — object key hợp lệ). Browser: ep41/web-buttons-variants.png. Nhịp TW: ghép chuỗi class điều kiện bằng clsx dễ ra 2 class xung đột cùng lúc — kết quả phụ thuộc thứ tự file CSS Tailwind sinh, khó đoán; StyleX deterministic. Outro: tập 4 component nhận style từ ngoài.

### ep42 — Tập 4/6: "Component mở cửa cho style ngoài — cross-file và bảng giá"
Code (tag-4): Button nhận `style?: StyleXStyles` đứng CUỐI trong props() (người dùng component thắng — chủ đích); Pricing.tsx trích (gói giữa nổi bật, truyền styles.fullWidth vào Button); khái niệm local zero-cost vs cross-file minimal cost (fact sheet mục 3 — nói ngắn). Browser: ep42/web-pricing.png. Nhịp TW: truyền className xuống = người nhận muốn ghi đè gì cũng được không kiểm soát; style prop StyleX có type + last-wins rõ. Outro: tập 5 theming.

### ep43 — Tập 5/6: "Theming: token thương hiệu, dark mode trong token và theme Tết"
Code (tag-5): tokens.stylex.ts TOÀN BỘ (defineVars + DARK media ngay trong token — dark mode không cần viết lại component nào); themes.ts (createTheme Tết — chỉ override 4 biến, text/textMuted FALLBACK về defineVars); App đọc ?theme= áp props(tet, styles.page). BEAT: flat-override thắng cả @media gốc → theme Tết luôn sáng bất kể system dark (chủ đích, giải thích rõ). Browser: 3 ảnh ep43 (default → tet → dark-tokens; ảnh default chính là hero ep39 — narration nói "trang ta vẫn thấy"). Kể trung thực: ảnh dark chụp bằng ép prefers-color-scheme qua devtools protocol — token dark là THẬT. Nhịp TW: `dark:` prefix rải khắp component vs 1 chỗ trong token. Outro: tập cuối — so găng trực diện.

### ep44 — Tập 6/6: "So găng trực diện Tailwind vs StyleX — chọn gì cho dự án của bạn"
Browser 2-SHOTS (không bullets): ep44/web-stylex-side.png (label "StyleX", url mặc định) vs ep44/web-tailwind-side.png (label "Tailwind", url 'localhost:5198 — Tailwind') — cùng Button/Card, nhìn như nhau. Code đối chiếu: Button StyleX (tag-6 vietsuper-web) vs Button Tailwind (tag-6 compare-tailwind) — cùng chức năng; className Tailwind dài nhất 187 ký tự vs object có type; số đo demo này: CSS 4.41kB (StyleX) vs 12.26kB (Tailwind) — ĐÓNG KHUNG "demo nhỏ, không phải kết luận tổng quát; Tailwind v4 có tree-shake tốt, chênh chủ yếu do preflight". Concept so găng đối xứng 3 scene: viết nhanh/ecosystem/không build-step phức tạp → Tailwind; type-safe/codebase lớn/dedup triệt để/theming token → StyleX; cả hai đều atomic — khác nhau ở CÁCH VIẾT và mức kiểm soát compiler. Dynamic style nhắc 1 nhịp (CSS var runtime — fact sheet). Debug className hash (x1e2nbdu — cần devtools). Outro series: repo + tag stylex-tap-1..6, nhắc các series khác trên kênh, CTA vote (Next.js + StyleX? hay chủ đề web khác), cảm ơn.

## Checklist mỗi tập (y cũ)

Đọc outline + fact sheet + code từ tag + ảnh + ghi chú tích lũy (mọi report cũ: ≤22 dòng/scene, step chạm dòng cuối, không "≈", title phone/browser ≤31 ký tự, diagram flow liền kề, thumbnail tránh từ dài, script Python byte-match) → viết tts/scripts/epXX.json → TTS validator → Root.tsx (Thumb 'shot' dùng ảnh browser đẹp của tập, seriesTag "StyleX từ A đến Z 🇻🇳") → render + verify frame → commit.

## Task 7 (sau 6 tập): SEO + chờ lệnh đăng

Mục "StyleX #1..#6" cuối docs/seo-youtube.md (chapters đúng timing; tag stylex-tap-N; cross-link [LINK-EPXX]; tập 1+6 nhắc kênh có 3 series mobile — link 3 playlist; playlist đích mới "StyleX từ A đến Z 🇻🇳" tạo khi đăng; từ khóa: stylex, stylex vs tailwind, css in js, atomic css, meta stylex, tailwind tiếng việt...), README gốc mục series mới. Commit + merge + push. KHÔNG đăng — chờ lệnh.
