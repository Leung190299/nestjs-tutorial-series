# Bộ SEO YouTube — Series "NestJS cho người mới bắt đầu"

> Cách dùng: copy nguyên khối Tiêu đề / Mô tả / Tags của từng tập vào YouTube Studio. Chỗ có `[LINK ...]` thì thay bằng link thật sau khi đăng (đăng lần lượt tập 1 → 4 rồi quay lại điền link chéo). Playlist gợi ý: **"NestJS cho người mới bắt đầu 🇻🇳"**.

Từ khóa chủ lực toàn series: `nestjs tiếng việt`, `học nestjs`, `nestjs cho người mới`, `backend nodejs`, `microservices tiếng việt`, `websocket tiếng việt`.

---

## Tập 1 — NestJS cơ bản (6:05)

**Tiêu đề (chính):**
NestJS là gì? Tạo API đầu tiên trong 6 phút | NestJS cho người mới #1

**Tiêu đề (phương án khác):**
- Học NestJS từ số 0: Controller, Service, Module giải thích siêu dễ hiểu #1
- NestJS cho người mới bắt đầu — Tập 1: Xây API đầu tiên của bạn

**Mô tả:**
```
Bạn muốn học backend Node.js một cách bài bản? NestJS chính là câu trả lời — và tập này sẽ đưa bạn từ con số 0 đến API đầu tiên chạy được, chỉ trong 6 phút.

Giải thích bằng ví dụ nhà hàng 🍜: Controller là người phục vụ, Service là đầu bếp, Module là khu bếp — bạn sẽ hiểu kiến trúc NestJS mà không cần biết trước bất cứ điều gì.

⏱️ NỘI DUNG:
0:00 Giới thiệu series
0:16 NestJS là gì?
0:46 Vì sao chọn NestJS (so với Express)?
1:23 Ví dụ nhà hàng: Controller, Service, Module
1:49 Một request đi qua NestJS như thế nào?
2:22 Cài đặt & tạo project đầu tiên
2:57 app.module.ts — module gốc
3:31 Viết UsersController (@Controller, @Get)
4:12 Viết UsersService (@Injectable, DI)
4:44 users.module.ts — ghép các mảnh lại
5:11 Chạy thử API GET /users
5:36 Tóm tắt & hẹn tập 2

📦 Source code: https://github.com/Leung190299/nestjs-tutorial-series
▶️ Trọn bộ series: [LINK PLAYLIST]
Tập 2 (Microservices): [LINK TẬP 2]

🔔 Đăng ký kênh để không bỏ lỡ các tập tiếp theo: Microservices, WebSocket và app chat realtime hoàn chỉnh!

#nestjs #nodejs #backend #laptrinh #hoclaptrinh
```

**Tags (copy cả dòng):**
```
nestjs, nestjs tiếng việt, học nestjs, nestjs cho người mới, nestjs tutorial, nestjs là gì, backend nodejs, học backend, nodejs tiếng việt, typescript, api là gì, rest api, controller service module, dependency injection, lập trình backend cho người mới
```

**Thumbnail gợi ý:** Nền tối + logo NestJS đỏ, chữ to: "NESTJS LÀ GÌ?" / phụ: "API đầu tiên trong 6 phút" + badge "Tập 1".

---

## Tập 2 — Microservices (5:07)

**Tiêu đề (chính):**
Microservices là gì? Demo thật với NestJS trong 5 phút | NestJS cho người mới #2

**Tiêu đề (phương án khác):**
- Tách Monolith thành Microservices bằng NestJS — dễ hơn bạn nghĩ #2
- Microservices tiếng Việt: hiểu bằng ví dụ chuỗi cửa hàng | NestJS #2

**Mô tả:**
```
Microservices — kiến trúc mà mọi công ty lớn đều dùng — thực ra không hề đáng sợ. Trong 5 phút, bạn sẽ hiểu nó bằng ví dụ chuỗi cửa hàng 🏪 và TỰ TAY tách ứng dụng NestJS thành 2 service nói chuyện với nhau qua TCP.

Tiếp nối tập 1, chúng ta biến "nhà hàng" NestJS thành cả một chuỗi: gateway đón khách, users-service phục vụ dữ liệu.

⏱️ NỘI DUNG:
0:00 Giới thiệu
0:16 Vấn đề của Monolith
0:39 Microservices là gì? (ví dụ chuỗi cửa hàng)
1:03 Ưu & nhược điểm — khi nào nên dùng?
1:31 Kiến trúc: Gateway + Users Service
2:00 Tạo 2 project + cài @nestjs/microservices
2:20 createMicroservice + Transport.TCP
2:49 @MessagePattern — nhận tin nhắn giữa các service
3:16 ClientsModule — mở "đường dây nóng"
3:43 client.send — gọi service từ gateway
4:13 Chạy cả hai service + demo
4:36 Tóm tắt & hẹn tập 3

📦 Source code: https://github.com/Leung190299/nestjs-tutorial-series
▶️ Trọn bộ series: [LINK PLAYLIST]
Tập 1 (NestJS cơ bản): [LINK TẬP 1]
Tập 3 (WebSocket): [LINK TẬP 3]

🔔 Đăng ký kênh để xem tập 3: xây server chat realtime với WebSocket!

#nestjs #microservices #nodejs #backend #laptrinh
```

**Tags:**
```
microservices, microservices là gì, microservices tiếng việt, nestjs microservices, nestjs, học nestjs, monolith vs microservices, kiến trúc microservices, message pattern, tcp transport, api gateway, backend nodejs, nodejs tiếng việt, học backend, hệ thống phân tán
```

**Thumbnail gợi ý:** Sơ đồ 3 khối Client → Gateway → Service với mũi tên, chữ to: "MICROSERVICES" / phụ: "hiểu trong 5 phút" + badge "Tập 2".

---

## Tập 3 — WebSocket & Realtime (4:47)

**Tiêu đề (chính):**
WebSocket là gì? Xây server chat realtime với NestJS | NestJS cho người mới #3

**Tiêu đề (phương án khác):**
- Chat realtime trong 20 dòng code — WebSocket + NestJS #3
- HTTP vs WebSocket: vì sao app chat cần realtime? | NestJS #3

**Mô tả:**
```
Vì sao tin nhắn Messenger đến NGAY LẬP TỨC mà không cần bấm tải lại? Câu trả lời là WebSocket — và trong tập này bạn sẽ tự xây một server chat realtime bằng NestJS với chưa đầy 20 dòng code.

Dễ hiểu bằng ví von: HTTP là gửi thư bưu điện ✉️, WebSocket là cuộc gọi điện thoại giữ máy 📞 — server chủ động nói chuyện với bạn bất cứ lúc nào.

⏱️ NỘI DUNG:
0:00 Giới thiệu
0:13 Giới hạn của HTTP (polling là gì?)
0:39 WebSocket là gì? (ví dụ cuộc gọi điện)
1:05 Khi nào dùng WebSocket?
1:25 Mô hình chat realtime
1:52 Cài @nestjs/websockets + platform-ws
2:11 ChatGateway — @SubscribeMessage + broadcast
2:48 WsAdapter trong main.ts
3:12 Khai báo gateway vào module
3:29 Demo: 2 người chat realtime bằng wscat
3:58 So sánh @Get vs @MessagePattern vs @SubscribeMessage
4:18 Tóm tắt & hẹn tập cuối

📦 Source code: https://github.com/Leung190299/nestjs-tutorial-series
▶️ Trọn bộ series: [LINK PLAYLIST]
Tập 2 (Microservices): [LINK TẬP 2]
Tập 4 (Ghép tất cả): [LINK TẬP 4]

🔔 Tập cuối sẽ ghép Microservices + WebSocket thành app chat hoàn chỉnh — đăng ký để không bỏ lỡ!

#websocket #nestjs #realtime #nodejs #laptrinh
```

**Tags:**
```
websocket, websocket là gì, websocket tiếng việt, nestjs websocket, chat realtime, xây app chat, realtime nodejs, socket là gì, http vs websocket, polling là gì, nestjs gateway, subscribemessage, nodejs tiếng việt, học nestjs, backend nodejs
```

**Thumbnail gợi ý:** 2 điện thoại nhắn tin với tia sét ⚡ ở giữa, chữ to: "CHAT REALTIME" / phụ: "20 dòng code" + badge "Tập 3".

---

## Tập 4 — Chat Realtime + Microservices (3:54)

**Tiêu đề (chính):**
Xây app chat hoàn chỉnh: WebSocket + Microservices | NestJS cho người mới #4 (Tập cuối)

**Tiêu đề (phương án khác):**
- Ghép tất cả: App chat realtime chạy trên Microservices | NestJS #4
- Từ số 0 đến app chat Microservices — tập cuối series NestJS

**Mô tả:**
```
Tập cuối — ghép TẤT CẢ những gì đã học thành một sản phẩm thật: app chat realtime có lịch sử tin nhắn, chạy trên kiến trúc microservices. Người mới vào phòng thấy ngay tin nhắn cũ, tin mới đến tức thì.

Kiến trúc: Gateway nhận WebSocket từ người dùng, Chat Service lưu trữ tin nhắn qua TCP — mỗi mảnh một nhiệm vụ, đúng tinh thần microservices.

⏱️ NỘI DUNG:
0:00 Giới thiệu tập cuối
0:16 Nhìn lại hành trang 3 tập
0:41 Kiến trúc app chat hoàn chỉnh
1:11 Chat Service — save_message & get_history
1:34 Gateway module — ghép 2 thế giới
1:52 handleConnection — gửi lịch sử cho người mới
2:19 handleChat — lưu trước, phát sau
2:39 Demo: chat 2 người + lịch sử tin nhắn
3:04 Hướng đi tiếp: database, auth, Redis
3:28 Tổng kết series

📦 Source code trọn bộ 4 tập: https://github.com/Leung190299/nestjs-tutorial-series
▶️ Xem lại từ đầu: [LINK PLAYLIST]
Tập 1: [LINK TẬP 1] · Tập 2: [LINK TẬP 2] · Tập 3: [LINK TẬP 3]

🧡 Nếu series giúp ích cho bạn, một like + subscribe là động lực rất lớn để mình làm series tiếp theo. Cảm ơn các bạn đã đồng hành!

#nestjs #microservices #websocket #nodejs #laptrinh
```

**Tags:**
```
nestjs, app chat, xây app chat, chat realtime, websocket, microservices, nestjs project, dự án nodejs, fullstack, backend nodejs, nestjs tiếng việt, học nestjs, nodejs tiếng việt, lập trình dự án thật, portfolio backend
```

**Thumbnail gợi ý:** Mockup khung chat + sơ đồ 2 service phía sau, chữ to: "GHÉP TẤT CẢ" / phụ: "App chat hoàn chỉnh" + badge "Tập cuối 🏁".

---

## Thumbnail

Đã render sẵn tại `video/out/thumbs/ep0X-thumb.png` (1280×720, <2MB, chuẩn YouTube). Muốn sửa chữ/bố cục: sửa mảng `thumbnails` trong `video/src/Root.tsx` hoặc component `video/src/Thumbnail.tsx`, rồi chạy `npx remotion still Thumb0X out/thumbs/ep0X-thumb.png`.

## Checklist khi đăng

1. Đăng theo thứ tự 1 → 4, mỗi video cách nhau 2–3 ngày (thuật toán thích đều đặn hơn dồn một lúc).
2. Tạo playlist "NestJS cho người mới bắt đầu 🇻🇳" ngay từ video 1, thêm từng tập vào.
3. Sau khi đăng đủ, quay lại điền toàn bộ `[LINK ...]` chéo giữa các mô tả.
4. Ghim comment đầu tiên ở mỗi video: link source code + mục lục chapters.
5. Bật phụ đề tự động tiếng Việt và rà lại các thuật ngữ (NestJS, Controller...) trong trình sửa phụ đề của YouTube.
6. End screen 20 giây cuối: thẻ "video tiếp theo" trỏ sang tập kế + thẻ subscribe.
