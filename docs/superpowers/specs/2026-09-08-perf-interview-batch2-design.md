# Series "Phỏng vấn Frontend 🇻🇳" — Lô 2: Hiệu năng load nhiều dữ liệu (React Native & Flutter)

Ngày: 2026-09-08. Trạng thái: đã duyệt ("duyệt — làm luôn").
Fact sheet: `.superpowers/sdd/perf-interview-research.md` (viết ở Task 0 của plan demo — CHƯA tồn tại khi duyệt spec này).

## Mục tiêu

Lô 2 của series phỏng vấn (nối playlist "Phỏng vấn Frontend 🇻🇳" PLYvXt5cUP0yE,
tiếp số công khai **Phỏng vấn FE #13–#24**): 12 câu hỏi hiệu năng khi load NHIỀU
dữ liệu trên mobile — 6 câu React Native + 6 câu Flutter, đối xứng có cặp chéo.
Mỗi câu = 1 video ngang 16:9 2–3 phút (ep57–ep68) + 1 Shorts dọc 9:16 <60s
(sn1–sn6 cho RN, sf1–sf6 cho Flutter). Tổng 24 video.

Công thức 3 nhịp giữ nguyên lô 1: **Câu hỏi → Demo CHẠY THẬT trên iOS Simulator
(bằng chứng nhìn thấy trên hình) → Trả lời chuẩn như đi phỏng vấn** (chốt 2–3 câu
học thuộc được + bẫy). So sánh RN↔Flutter trung lập.

## Danh sách 12 câu (đã duyệt)

| id | ep | Câu hỏi | Cặp chéo |
|---|---|---|---|
| N1 | ep57 | Render 5.000 item: vì sao ScrollView+map đơ? → FlatList virtualization | ↔F1 |
| N2 | ep58 | Tối ưu FlatList: keyExtractor, getItemLayout, windowSize, removeClippedSubviews | |
| N3 | ep59 | 1 item đổi mà cả list re-render — React.memo cho renderItem | |
| N4 | ep60 | Infinite scroll / pagination với onEndReached đúng cách | |
| N5 | ep61 | Ảnh trong list dài: resize + cache (expo-image) | ↔F5 |
| N6 | ep62 | Parse/xử lý data lớn chặn JS thread — đo và tránh | ↔F6 |
| F1 | ep63 | Column trong SingleChildScrollView vs ListView.builder (lazy) | ↔N1 |
| F2 | ep64 | itemExtent/prototypeItem + const widget trong item | |
| F3 | ep65 | setState cả trang vs tách widget nhỏ (thu hẹp phạm vi rebuild) | |
| F4 | ep66 | Infinite scroll với ScrollController + pagination | |
| F5 | ep67 | Ảnh trong list: cacheWidth + cached_network_image | ↔N5 |
| F6 | ep68 | jsonDecode data lớn chặn UI → compute()/Isolate.run | ↔N6 |

Shorts: N1..N6 → sn1..sn6, F1..F6 → sf1..sf6. Cặp chéo nhắc nhau trên video
("bẫy y hệt bên kia — xem video kia của series"), 2 chiều như R3↔V5 lô 1.

## Demo — `demo-perf-interview/`

```
demo-perf-interview/
├── rn-perf/        # Expo + React Native + TS — mỗi câu 1 màn (điều hướng list đơn giản từ màn Home, không router package nếu tránh được; nếu template Expo buộc dùng expo-router thì mỗi câu 1 route)
└── flutter_perf/   # FVM Flutter — mỗi câu 1 trang (Navigator.push từ Home ListView)
```

- Ví dụ phải CHẠY THẬT và cho **bằng chứng nhìn thấy được trên ảnh chụp**, vì
  video chỉ chiếu screenshot tĩnh (PhoneScene/VShotScene). Chuẩn bằng chứng mỗi câu:
  bộ đếm on-screen (số item ĐÃ build/render, số lần re-render của item, ms bị chặn),
  và/hoặc 2 nút "cách chậm / cách nhanh" trên cùng màn cho ảnh trước/sau.
  Ví dụ: N1/F1 hiện "đã build X/5000 item"; N3/F3 hiện render-count trên từng item;
  N6/F6 hiện đồng hồ UI (timer đang chạy) đứng hình khi parse trên main thread.
- Số liệu đọc trong kịch bản phải là số ĐO THẬT trên demo (implementer ghi report),
  không bịa; claim kỹ thuật theo fact sheet có nguồn docs chính chủ
  (reactnative.dev, docs.expo.dev, docs.flutter.dev, api.flutter.dev).
- Data lớn sinh cục bộ (generator 5.000+ bản ghi), KHÔNG gọi mạng ngoài; ảnh cho
  N5/F5 dùng nguồn ảnh bundle cục bộ hoặc server tĩnh localhost để ảnh chụp ổn định.
- Chụp iOS Simulator (UDID B282E25D-806A-4F2D-AD25-F4411158CDF8, hệ số tap ≈ px/2.18),
  cold-launch tránh "◀ App"; ảnh lưu `video/public/screens/perfqa/`.
  Ảnh simulator vốn dọc → dùng thẳng cho vshot Shorts, bản ngang qua PhoneScene.
- RN chạy qua Expo (cổng metro 8081 mặc định — KHÔNG đụng cổng 3000);
  Flutter build `--simulator` + `simctl install/launch` (không `flutter run` nền).
- Tag `perf-qa-batch-2` đóng băng khi demo xong 12 câu.

## Pipeline video (tái dùng nguyên trạng)

Không cần scene type mới: ngang dùng title/concept/code/phone/outro; Shorts dùng
vtitle/vcode/vshot/vanswer (khuôn 4 scene lô 1). Mọi luật tích lũy giữ nguyên:
code scene ≤22 dòng + byte-match tag `perf-qa-batch-2`; vcode ≤40 ký tự/dòng
≤14 dòng được phép rút gọn nhưng không sai kỹ thuật, step đầu sentence:0; step
cuối chạm dòng cuối; PhoneScene title ≤31 ký tự; verify frame gần cuối scene;
Shorts ≤1800 frames; chapters SEO sinh bằng script từ timing JSON (bài học lô 1).
Thumbnail chỉ bản ngang: variant shot ảnh perfqa, ảnh có chữ bằng chứng → compose
dọc PIL 620×1281; badge "PV FE #13".."#24"; seriesTag "Phỏng vấn Frontend 🇻🇳".

## SEO & đăng

`docs/seo-youtube.md` thêm mục "Phỏng vấn FE #13..#24" + bảng Shorts lô 2 (caption
+ link video dài `[LINK-EPXX]`, #shorts). Title public "Phỏng vấn FE #N: <câu hỏi>".
Đăng CHỈ khi có lệnh: 12 ngang nối playlist PLYvXt5cUP0yE (không tạo playlist mới)
+ 12 Shorts, cross-link 2 pha, sanitize `<>` cả ở videos.update (bài học lô 1),
cap 6 upload/lượt chạy script.

## Rủi ro

- Hiệu năng khó "chụp tĩnh" → bắt buộc chuẩn bằng chứng on-screen ngay từ thiết kế
  từng trang demo (bộ đếm/timer/2 nút), render thử PhoneScene sớm.
- Expo template đổi cấu trúc theo SDK → pin SDK tại thời điểm làm, ghi version vào
  fact sheet; Flutter dùng FVM version đã có trên máy.
- Số đo simulator ≠ máy thật → kịch bản nói rõ "trên simulator", tránh claim con số
  tuyệt đối ngoài demo.
- Khối lượng 24 video → dây chuyền subagent như lô 1, tuần tự từng câu, review từng task.
