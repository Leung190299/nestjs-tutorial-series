# Series riêng — "Mini-App từ A đến Z" (4 tập chi tiết, ep20–ep23) — Plan

**Lý do (feedback người dùng):** ep19 bị chê chung chung; chủ đề lớn phải tách series RIÊNG (số tập riêng, playlist riêng) và đào sâu từng bước. Series này thay thế vai trò "dạy kỹ" — ep19 giữ vai trò trailer/tổng quan.

**Nhận diện:** tên series "Mini-App từ A đến Z", badge "MINI-APP 1..4", seriesTag thumbnail "Mini-App từ A đến Z 🇻🇳", playlist + SEO section riêng. File nội bộ ep20–ep23 (chỉ là số file, không hiện trên video).

**Codebase:** dùng tiếp `demo-miniapps/` (đã có). Tập 4 THÊM mini-cinema mới toanh — được phép sửa host `(tabs)/_layout.tsx`, `index.tsx` (chưa từng lên hình ở code scene nào); TUYỆT ĐỐI không sửa các file đã chiếu: root package.json, mini-food/*, host food.tsx, food-standalone/App.tsx.

**Phong cách "kỹ":** mỗi tập một bước; nhịp chậm; mỗi trường config/mỗi dòng code có câu giải thích riêng; ~60-70 câu/tập (~5-6 phút); lặp lại công thức trên ví dụ mới ở tập 4 để người xem tự làm được.

## Tập 1 (ep20) — Monorepo & workspaces từ con số 0 (~60 câu)

Chỉ tập trung MỘT khái niệm: workspaces là gì và nó nối các package thế nào.
- Vấn đề đa-repo vs monorepo (2 concept scenes, ví von: mỗi tính năng một nhà rải rác khắp phố vs cùng khu chung cư).
- Diagram: root package.json (ban quản lý) → packages/* → apps/*.
- Terminal: tạo từ TRẮNG: mkdir, npm init -y, sửa package.json.
- Code: root package.json — TỪNG TRƯỜNG một câu (name/private vì sao true/workspaces glob nghĩa là gì).
- Terminal: npm install → soi symlink bằng ls -la node_modules/@vietsuper (bằng chứng "ban quản lý nối dây").
- Concept: quy tắc vàng — package nào cũng có thể import package nào bằng TÊN, không đường dẫn tương đối ../../.
- Outro: tập sau viết căn hộ đầu tiên.

## Tập 2 (ep21) — Viết một mini-app hoàn chỉnh: mini-food (~65 câu)

- Concept: một mini-app cần đúng 3 thứ: sổ đỏ (package.json), cửa chính (index.ts), căn phòng (FoodScreen).
- Code package.json mini-food — TỪNG TRƯỜNG: name có scope @vietsuper nghĩa là gì; version; main = cửa chính; peerDependencies GIẢI THÍCH KỸ (vì sao không dependencies: 2 bản React là sập app — ví von căn hộ dùng điện nước tòa nhà, không tự kéo máy phát).
- Code index.ts (1 dòng) — ý nghĩa "chỉ export những gì muốn công khai".
- Code FoodScreen.tsx 2 scenes (data+state / UI) — đi lại logic giỏ hàng nhưng góc nhìn "đóng gói thành sản phẩm".
- Phone: reuse screens ep19 (standalone-0).
- Outro: căn hộ xong — tập sau cho nó RA Ở RIÊNG.

## Tập 3 (ep22) — Chạy mini-app ĐỘC LẬP (~60 câu)

- Concept: vì sao chạy riêng là siêu năng lực (dev loop nhanh, team không chờ nhau, QA từng tính năng).
- Terminal: tạo vỏ food-standalone (create-expo-app blank-typescript trong apps/), npm install ở root nối dây.
- Code App.tsx từng phần: import từ tên package (không ../../), SafeAreaView vì sao cần (tai thỏ), StatusBar.
- Diagram: cùng 1 FoodScreen — 2 cửa ngõ (standalone / host).
- Phone: standalone-0 → standalone-1mon (tap thật) — nhấn mạnh không tab bar.
- Concept: quy trình team thật (dev trên standalone cả ngày, cuối ngày mới mở host).
- Outro: tập sau gộp vào app chủ + công thức trọn gói.

## Tập 4 (ep23) — Gộp vào app chủ + thêm mini-app MỚI từ A-Z (~70 câu)

- Code host food.tsx 3 dòng (ôn nhanh).
- Phần chính: CÔNG THỨC 4 BƯỚC làm mini-app mới, áp dụng làm mini-cinema 🎬 (biến dịch vụ "Xem phim" sắp-ra-mắt thành thật):
  1. Tạo packages/mini-cinema (package.json + index.ts) — code scene.
  2. Viết CinemaScreen: danh sách 3 phim, nút "Đặt vé" toggle, bar tổng vé (lặp pattern food → người xem thấy công thức lặp lại) — code scene.
  3. Cắm vào host: tab mới trong (tabs)/_layout.tsx + cinema.tsx 3 dòng — code scenes.
  4. Bật card "Xem phim" ở home grid (route thêm '/cinema') — code scene (diff nhỏ).
- Screenshots MỚI: host 5 tab + màn cinema (+ home có Xem phim sáng). 
- Outro series: công thức 4 bước tóm tắt + bài tập cinema-standalone.

**Quy trình:** build mini-cinema + sửa host (subagent, verify tsc + expo export) → tôi chụp screenshots tập 4 → viết 4 script (validate + byte-check: file cũ theo repo, file mới theo repo sau build) → TTS → Root Episode20–23 + Thumb20–23 (variant shot, ảnh thật) → render + still checks → SEO section riêng → review fable → merge + push. Ràng buộc cũ giữ nguyên (câu ≤200, trailer commit, wav/mp4 không commit).
