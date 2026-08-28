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

## PHẦN NÂNG CAO — Series "NestJS nâng cao: Request Lifecycle"

> Playlist mới: **"NestJS nâng cao 🇻🇳"**. Đăng sau khi hoàn thành series cơ bản. Code chung repo: https://github.com/Leung190299/nestjs-tutorial-series (thư mục `demo-advanced/`).

### Nâng cao #1 — Pipes (3:15)

**Tiêu đề (chính):**
Pipes trong NestJS: chặn dữ liệu rác không cần viết if | NestJS nâng cao #1

**Tiêu đề (phương án khác):**
- Validation chuẩn NestJS: DTO + class-validator trong 3 phút
- Đừng tin dữ liệu người dùng! Pipes & ValidationPipe | NestJS nâng cao #1

**Mô tả:**
```
Người dùng gửi email sai, tên rỗng, dữ liệu phá hoại? Với Pipes của NestJS, API tự động chặn tất cả — bạn không phải viết một dòng if nào.

Ví von dễ hiểu: Pipe là nhân viên soát vé 🎫 — kiểm tra và chỉnh trang mọi dữ liệu trước khi cho vào ứng dụng.

⏱️ NỘI DUNG:
0:00 Giới thiệu phần nâng cao
0:14 Vấn đề: dữ liệu không đáng tin
0:37 Pipe = nhân viên soát vé
1:00 Pipe đứng ở đâu trong request?
1:21 Cài class-validator + class-transformer
1:32 Viết DTO — luật kiểm tra bằng decorator
1:56 Khai kiểu ở @Body
2:15 Bật ValidationPipe global trong main.ts
2:29 Demo: dữ liệu sạch vào, dữ liệu rác bị chặn 400
2:48 Tóm tắt & hẹn tập Guards

📦 Source code: https://github.com/Leung190299/nestjs-tutorial-series
▶️ Series cơ bản (4 tập): [LINK PLAYLIST CƠ BẢN]
Tập 2 nâng cao (Guards): [LINK NC2]

#nestjs #validation #nodejs #backend #laptrinh
```

**Tags:**
```
nestjs pipes, validation nestjs, class-validator, dto là gì, validationpipe, kiểm tra dữ liệu, nestjs nâng cao, nestjs tiếng việt, học nestjs, backend nodejs, data validation, request lifecycle, nestjs tutorial, nodejs tiếng việt, api an toàn
```

### Nâng cao #2 — Guards (3:06)

**Tiêu đề (chính):**
Guards trong NestJS: phân quyền route trong 10 dòng code | NestJS nâng cao #2

**Tiêu đề (phương án khác):**
- Ai được vào /admin? Guards & CanActivate giải thích dễ hiểu
- Bảo vệ API NestJS: Guards từ A đến Z | NestJS nâng cao #2

**Mô tả:**
```
Trang /admin của bạn đang mở toang cho cả thế giới? Guards — người bảo vệ 💂 của NestJS — sẽ khóa lại chỉ với 10 dòng code, và là nền tảng của mọi hệ thống đăng nhập/phân quyền (JWT, Roles) sau này.

⏱️ NỘI DUNG:
0:00 Giới thiệu
0:12 Vấn đề: cửa nào cũng mở toang
0:32 Guard = bảo vệ khu VIP (khác Pipe thế nào?)
0:56 Guard đứng ở đâu trong request?
1:17 Viết ApiKeyGuard — CanActivate
1:45 Cắt cử bảo vệ bằng @UseGuards
2:04 Demo: 403 tay không, 200 khi có key
2:19 Guard trong dự án thật: JWT, Roles
2:40 Tóm tắt & hẹn tập Interceptors

📦 Source code: https://github.com/Leung190299/nestjs-tutorial-series
Tập 1 nâng cao (Pipes): [LINK NC1] · Tập 3 (Interceptors): [LINK NC3]

#nestjs #authentication #nodejs #backend #laptrinh
```

**Tags:**
```
nestjs guards, canactivate, phân quyền nestjs, useguards, bảo vệ api, authorization, authentication nestjs, api key, nestjs nâng cao, nestjs tiếng việt, học nestjs, backend nodejs, jwt nestjs, roles guard, request lifecycle
```

### Nâng cao #3 — Interceptors (3:16)

**Tiêu đề (chính):**
Interceptors trong NestJS: log + bọc response toàn app trong 1 class | NestJS nâng cao #3

**Tiêu đề (phương án khác):**
- Nhân vật đa tài nhất NestJS: Interceptors giải thích dễ hiểu
- Đo thời gian & chuẩn hóa response mọi API — Interceptors #3

**Mô tả:**
```
Sếp muốn log thời gian xử lý mọi API, frontend muốn mọi response cùng một khuôn {success, data}? Một class Interceptor lo cả hai — không sửa một handler nào.

Ví von: Interceptor là camera an ninh 🎥 + người gói quà 🎁 — nhân vật duy nhất đứng ở CẢ HAI đầu: trước khi xử lý và sau khi có kết quả.

⏱️ NỘI DUNG:
0:00 Giới thiệu
0:12 Vấn đề: việc lặp ở trước VÀ sau handler
0:35 Camera + người gói quà
0:56 Interceptor bọc quanh handler thế nào?
1:19 Viết LoggingInterceptor — next.handle, tap, map
1:50 Gắn bằng @UseInterceptors
2:09 Demo: response bọc khuôn + log ms
2:28 Dùng thật: cache, timeout, ẩn trường nhạy cảm
2:48 Tóm tắt & hẹn tập Exception Filters

📦 Source code: https://github.com/Leung190299/nestjs-tutorial-series
Tập 2 nâng cao (Guards): [LINK NC2] · Tập 4 (Filters): [LINK NC4]

#nestjs #interceptor #rxjs #nodejs #laptrinh
```

**Tags:**
```
nestjs interceptors, useinterceptors, rxjs nestjs, logging nestjs, transform response, middleware nestjs, nestjs nâng cao, nestjs tiếng việt, học nestjs, backend nodejs, đo thời gian api, chuẩn hóa response, request lifecycle, observable, nestjs tutorial
```

### Nâng cao #4 — Exception Filters (3:27)

**Tiêu đề (chính):**
Exception Filters: mọi lỗi API đều đẹp và thống nhất | NestJS nâng cao #4 (cuối)

**Tiêu đề (phương án khác):**
- Xử lý lỗi chuyên nghiệp trong NestJS — Exception Filters
- Đừng để API trả lỗi xấu xí! Exception Filters #4

**Mô tả:**
```
Lỗi là không thể tránh — nhưng TRẢ LỖI thế nào là đẳng cấp của bạn. Exception Filters biến mọi sự cố thành JSON lỗi đẹp, thống nhất, an toàn — như bộ phận chăm sóc khách hàng 🚑 của ứng dụng.

Tập cuối phần nâng cao, kèm tổng kết "bộ tứ vệ sĩ" của một request: Guard → Pipe → Interceptor → Filter.

⏱️ NỘI DUNG:
0:00 Giới thiệu tập cuối
0:13 Vấn đề: lỗi xấu xí, mỗi nơi một kiểu
0:35 Filter = bộ phận chăm sóc khách hàng
1:00 Đường dây nóng sự cố trong request
1:22 Viết HttpExceptionFilter — @Catch
1:50 @UseFilters + ném NotFoundException
2:14 Demo: JSON lỗi đẹp, có giờ xảy ra
2:34 Tổng kết bộ tứ vệ sĩ của request
2:58 Kết phần nâng cao — vote chủ đề tiếp theo!

📦 Source code: https://github.com/Leung190299/nestjs-tutorial-series
Xem từ đầu phần nâng cao: [LINK NC1]
💬 Comment vote phần tiếp theo: Redis / RabbitMQ / Kafka / gRPC!

#nestjs #errorhandling #nodejs #backend #laptrinh
```

**Tags:**
```
nestjs exception filter, xử lý lỗi nestjs, error handling, catch httpexception, usefilters, notfoundexception, nestjs nâng cao, nestjs tiếng việt, học nestjs, backend nodejs, api error format, request lifecycle, nestjs tutorial, nodejs tiếng việt, xử lý lỗi api
```

## PHẦN TRANSPORTERS — Series "Microservices nâng cao: Redis · RabbitMQ · Kafka"

> Thêm vào playlist "NestJS nâng cao 🇻🇳". Demo cần Docker (hướng dẫn trong video). Code: thư mục `demo-redis/`, `demo-rabbitmq/`, `demo-kafka/` trong repo.

### Transporters #1 — Redis (4:33)

**Tiêu đề (chính):**
Redis làm "dây liên lạc" microservices: đổi 2 dòng config, không đổi code | Transporters #1

**Tiêu đề (phương án khác):**
- Redis Pub/Sub với NestJS: hết cảnh service nhớ địa chỉ nhau
- Từ TCP sang Redis trong 2 dòng — NestJS Transporters #1

**Mô tả:**
```
Hệ thống 30 microservices mà nối dây TCP trực tiếp? Một rừng dây chằng chịt. Tập này thay tất cả bằng một "đài phát thanh" Redis 📻 — và giữ đúng lời hứa của NestJS: đổi transporter chỉ mất 2 dòng config, logic không đổi một chữ.

⏱️ NỘI DUNG:
0:00 Giới thiệu phần Transporters
0:22 Giới hạn của TCP điểm-nối-điểm
0:47 Redis là gì? (cache + tài năng ẩn Pub/Sub)
1:11 Ví von: đài phát thanh khu phố
1:36 Kiến trúc: mọi tin đi qua đài Redis
1:59 Dựng Redis bằng 1 lệnh Docker
2:21 Đổi transport trong main.ts (2 dòng!)
2:44 Đổi phía gateway
3:03 Điều kỳ diệu: logic không đổi
3:21 Demo: chạy thử + tắt service xem sao
3:42 Khi nào chọn Redis?
4:05 Tóm tắt & hẹn tập RabbitMQ

📦 Source code: https://github.com/Leung190299/nestjs-tutorial-series
Tập 2 (RabbitMQ): [LINK T2] · Xem lại Microservices cơ bản: [LINK EP2]

#nestjs #redis #microservices #nodejs #laptrinh
```

**Tags:**
```
redis, redis pub sub, nestjs redis, redis transporter, microservices nestjs, redis là gì, docker redis, nestjs tiếng việt, học nestjs, backend nodejs, message broker, giao tiếp microservices, transport nestjs, nodejs tiếng việt, kiến trúc hệ thống
```

### Transporters #2 — RabbitMQ (5:05)

**Tiêu đề (chính):**
RabbitMQ: tắt hẳn service mà KHÔNG mất một đơn hàng | NestJS Transporters #2

**Tiêu đề (phương án khác):**
- Message Queue giải thích bằng... bưu điện 📮 | RabbitMQ + NestJS
- emit & @EventPattern: xử lý việc nặng không bắt khách chờ

**Mô tả:**
```
Điều gì xảy ra nếu service xử lý đơn hàng CHẾT đúng lúc khách bấm đặt hàng? Với RabbitMQ: không gì cả — đơn nằm an toàn trong hàng đợi, service sống lại là xử lý tiếp. Tập này có màn demo tắt service trực tiếp để chứng minh.

Ví von xuyên suốt: RabbitMQ là bưu điện 📮 — gửi thư xong là xong việc, người nhận vắng nhà thì thư nằm chờ.

⏱️ NỘI DUNG:
0:00 Giới thiệu
0:20 Hai bài toán khó của kiểu hỏi-đáp
0:48 Message Queue = bưu điện
1:10 send/hỏi-đáp 🆚 emit/gửi thư (fire & forget)
1:36 Kiến trúc: Gateway → Queue → Worker
2:02 Dựng RabbitMQ bằng Docker
2:19 Config RMQ + tên queue
2:42 client.emit — bỏ thư vào thùng
3:02 Worker: cùng queue, khớp nhau
3:19 @EventPattern — người xử lý thư
3:39 DEMO ĐINH: tắt worker, đơn vẫn không mất!
4:12 Khi nào chọn RabbitMQ?
4:34 Tóm tắt & hẹn tập Kafka

📦 Source code: https://github.com/Leung190299/nestjs-tutorial-series
Tập 1 (Redis): [LINK T1] · Tập 3 (Kafka): [LINK T3]

#rabbitmq #messagequeue #nestjs #nodejs #laptrinh
```

**Comment ghim gợi ý (chống bắt bẻ từ dân pro):**
```
⚠️ Lưu ý cho production: demo dùng cấu hình mặc định của NestJS RMQ. Để "không mất tin" tuyệt đối cả khi worker crash GIỮA LÚC xử lý hoặc broker restart, bạn cần thêm: queueOptions: { durable: true }, persistent: true khi emit, và noAck: false + tự ack sau khi xử lý xong. Chi tiết trong docs NestJS phần RabbitMQ nhé!
```

**Tags:**
```
rabbitmq, message queue, rabbitmq nestjs, event pattern, hàng đợi tin nhắn, rabbitmq là gì, docker rabbitmq, xử lý bất đồng bộ, background job, nestjs tiếng việt, học nestjs, microservices, fire and forget, emit nestjs, độ tin cậy hệ thống
```

### Transporters #3 — Kafka (5:07)

**Tiêu đề (chính):**
Kafka không đáng sợ: hiểu bằng một cuốn sổ nhật ký | NestJS Transporters #3 (cuối)

**Tiêu đề (phương án khác):**
- Kafka là gì? Event streaming giải thích cho người mới
- Xương sống dữ liệu của Netflix, Uber — tự chạy Kafka trong 5 phút

**Mô tả:**
```
Kafka — xương sống dữ liệu của LinkedIn, Netflix, Uber — nghe đồn rất khó. Nhưng nếu coi nó là một CUỐN SỔ NHẬT KÝ 📒 ghi lại mọi sự kiện của công ty, mọi thứ bỗng dễ hiểu: ghi một lần, bao nhiêu phòng ban đọc cũng được, người mới đọc lại từ đầu.

Tập cuối series Transporters, kèm bảng tổng kết chọn TCP / Redis / RabbitMQ / Kafka cho đúng bài toán.

⏱️ NỘI DUNG:
0:00 Giới thiệu tập cuối
0:20 Ba việc "bưu điện" không làm được
0:44 Kafka = sổ nhật ký chung (event streaming)
1:11 Topic · Consumer Group · Partition — dịch ra tiếng "sổ"
1:39 Kiến trúc: ghi 1 lần, nhiều người đọc
2:07 Dựng Kafka bằng 1 lệnh Docker
2:24 Config KAFKA + brokers
2:42 Ghi sự kiện page_view
3:01 groupId — "tên phòng ban" và cái kẹp sổ
3:24 Đọc sổ + đếm lượt xem
3:44 Demo: 3 lượt xem, đúng thứ tự
4:07 Tổng kết: chọn transporter nào?
4:36 Lời chào cuối series 🧡

📦 Source code trọn bộ: https://github.com/Leung190299/nestjs-tutorial-series
Xem từ đầu phần Transporters: [LINK T1]

#kafka #eventstreaming #nestjs #nodejs #laptrinh
```

**Tags:**
```
kafka, apache kafka, kafka là gì, event streaming, kafka nestjs, consumer group, kafka topic, docker kafka, kafkajs, nestjs tiếng việt, học kafka, big data, xử lý sự kiện, kiến trúc dữ liệu, microservices nâng cao
```

### Transporters BONUS — gRPC (5:17)

**Tiêu đề (chính):**
gRPC: nhanh kiểu Google, không thể hiểu nhầm nhờ hợp đồng .proto | NestJS (bonus)

**Tiêu đề (phương án khác):**
- gRPC là gì? Giải thích bằng... biểu mẫu in sẵn 📋
- Transporter thứ 5 khép bộ sưu tập: gRPC + NestJS trong 5 phút

**Mô tả:**
```
JSON dễ đọc nhưng chậm và không ai đảm bảo cấu trúc — đổi tên một trường là service bên kia sập. gRPC của Google xử cả hai: dữ liệu nhị phân trên HTTP/2 (nhanh) + bản hợp đồng .proto hai bên cùng ký (không thể hiểu nhầm).

Ví von xuyên suốt: JSON là thư viết tay tự do ✍️, gRPC là biểu mẫu in sẵn từng ô đánh số 📋 — tập bonus khép trọn bộ sưu tập 5 transporters.

⏱️ NỘI DUNG:
0:00 Tập bonus theo yêu cầu!
0:20 Hai điểm yếu của JSON
0:47 gRPC là gì? (HTTP/2 + nhị phân + hợp đồng)
1:11 Ví von: biểu mẫu in sẵn
1:36 Kiến trúc: hợp đồng chung, đường dây trực tiếp
2:00 Viết users.proto — ngôi sao của tập
2:30 Transport.GRPC trong main.ts
2:52 @GrpcMethod — người thực hiện hợp đồng
3:12 Gateway: ClientsModule + cùng bản proto
3:32 getService — gọi hàm từ xa như hàm trong nhà
4:00 Demo chạy thật
4:19 Bảng chọn transporter — bản đầy đủ 5 mảnh
4:50 Lời kết + vote series tiếp theo

📦 Source code: https://github.com/Leung190299/nestjs-tutorial-series
Xem trọn playlist Transporters: [LINK PLAYLIST]
💬 Comment vote series tiếp: NestJS + Database / Deploy lên server!

#grpc #nestjs #microservices #nodejs #laptrinh
```

**Tags:**
```
grpc, grpc là gì, grpc nestjs, protobuf, protocol buffers, proto file, http2, grpc vs rest, remote procedure call, nestjs tiếng việt, học nestjs, microservices, backend nodejs, google grpc, giao tiếp service
```

## Thumbnail

Đã render sẵn tại `video/out/thumbs/ep0X-thumb.png` (1280×720, <2MB, chuẩn YouTube). Muốn sửa chữ/bố cục: sửa mảng `thumbnails` trong `video/src/Root.tsx` hoặc component `video/src/Thumbnail.tsx`, rồi chạy `npx remotion still Thumb0X out/thumbs/ep0X-thumb.png`.

## Checklist khi đăng

1. Đăng theo thứ tự 1 → 4, mỗi video cách nhau 2–3 ngày (thuật toán thích đều đặn hơn dồn một lúc).
2. Tạo playlist "NestJS cho người mới bắt đầu 🇻🇳" ngay từ video 1, thêm từng tập vào.
3. Sau khi đăng đủ, quay lại điền toàn bộ `[LINK ...]` chéo giữa các mô tả.
4. Ghim comment đầu tiên ở mỗi video: link source code + mục lục chapters.
5. Bật phụ đề tự động tiếng Việt và rà lại các thuật ngữ (NestJS, Controller...) trong trình sửa phụ đề của YouTube.
6. End screen 20 giây cuối: thẻ "video tiếp theo" trỏ sang tập kế + thẻ subscribe.
