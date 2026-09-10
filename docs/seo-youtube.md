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

## SERIES SUPER APP — "Super App với React Native + Expo" (ViệtSuper)

> Playlist mới: **"Super App với React Native 🇻🇳"**. Series mobile đầu tiên của kênh — 6 tập xây app ViệtSuper kiểu Grab thu nhỏ, chạy thật trên iPhone Simulator (mọi ảnh trong video là screenshot thật). Code: `demo-hello/`, `demo-superapp/`, `demo-superapp-api/`. Thumbnail dùng ảnh app thật (`video/out/thumbs/ep13-18`).

### Mobile #1 — Expo & app đầu tiên (3:22)

**Tiêu đề:** App iPhone đầu tiên bằng React Native + Expo trong 3 phút | Super App #1
**Phương án khác:** Viết app di động bằng JavaScript? React Native giải thích siêu dễ / Từ web sang mobile: div → View, onClick → onPress

**Mô tả:**
```
Bạn biết JavaScript? Vậy bạn đã đủ đồ nghề viết app iPhone THẬT. Tập mở màn series Super App: hiểu React Native bằng ví von "một công thức nấu hai bếp", tạo app đầu tiên bằng 1 lệnh Expo, và thấy nó chạy trên iPhone.

Series này xây ViệtSuper — siêu ứng dụng kiểu Grab thu nhỏ — và mọi màn hình bạn thấy đều là ảnh chụp thật từ iPhone Simulator.

⏱️ NỘI DUNG:
0:00 Giới thiệu series Super App
0:22 React Native là gì? (1 công thức, 2 căn bếp)
0:46 Expo là gì? (chiếc xe lắp sẵn)
1:08 create-expo-app + expo start
1:30 App.tsx: View, Text, Pressable, useState
1:54 StyleSheet — CSS phiên bản JS
2:15 App chạy thật trên iPhone 📱
2:38 Bảng quy đổi Web → Mobile
2:57 Tóm tắt & hẹn tập 2

📦 Source code: https://github.com/Leung190299/nestjs-tutorial-series
Tập 2 (Navigation): [LINK M2]
#reactnative #expo #mobiledev #laptrinh #hoclaptrinh
```
**Tags:** `react native, react native là gì, expo, học react native, react native tiếng việt, làm app iphone, làm app bằng javascript, mobile developer, app di động, expo tutorial, view text pressable, stylesheet, lập trình mobile cho người mới, super app, việtsuper`

### Mobile #2 — Super app & Navigation (2:53)

**Tiêu đề:** Super app 4 tab với expo-router: file = màn hình | Super App #2
**Mô tả:**
```
Grab, MoMo, WeChat — 1 app chứa cả chục dịch vụ. Tập này dựng bộ khung đó cho ViệtSuper: 4 tab điều hướng bằng expo-router, nơi MỖI FILE là MỘT màn hình (đúng triết lý Next.js).

⏱️ NỘI DUNG:
0:00 Giới thiệu
0:12 Super app = trung tâm thương mại
0:33 expo-router: file = màn hình
0:59 Sơ đồ tòa nhà ViệtSuper
1:18 Cấu trúc thư mục app/(tabs)
1:34 Layout gốc (Stack)
1:48 Tab bar 4 nút + emoji icon
2:10 Chạy thật: 4 tab trên iPhone
2:28 Tóm tắt & hẹn tập 3

📦 Source code: https://github.com/Leung190299/nestjs-tutorial-series
Tập 1: [LINK M1] · Tập 3: [LINK M3]
#reactnative #expo #exporouter #navigation #laptrinh
```
**Tags:** `expo router, react native navigation, tab navigation, file based routing, super app, react native tiếng việt, học react native, expo tabs, app nhiều màn hình, mobile app tutorial, việtsuper, grab clone, làm app như grab, expo tutorial, lập trình mobile`

### Mobile #3 — Màn Home lưới dịch vụ (2:29)

**Tiêu đề:** Lưới dịch vụ kiểu Grab với FlatList | Super App #3
**Mô tả:**
```
Mở Grab lên là thấy gì? Lưới dịch vụ. Tập này xây đúng cái lưới đó: FlatList — "đầu bếp thông minh chỉ nấu phần nhìn thấy", numColumns 3 cột, và Link asChild biến cả tấm card thành nút điều hướng.

⏱️ NỘI DUNG:
0:00 Giới thiệu
0:10 Lưới dịch vụ — bộ mặt super app
0:32 FlatList vs map: đầu bếp thông minh
0:56 Dữ liệu 6 dịch vụ + typed route
1:18 FlatList numColumns + Link asChild
1:46 Trang chủ ViệtSuper chạy thật
2:06 Tóm tắt & hẹn tập 4

📦 Source code: https://github.com/Leung190299/nestjs-tutorial-series
Tập 2: [LINK M2] · Tập 4: [LINK M4]
#reactnative #flatlist #expo #laptrinh #uiux
```
**Tags:** `flatlist, flatlist react native, numcolumns, lưới dịch vụ, grid layout react native, link expo router, react native tiếng việt, học react native, super app ui, grab ui, mobile ui, expo, việtsuper, danh sách hiệu năng cao, render list`

### Mobile #4 — Mini-app Đồ ăn & giỏ hàng (2:11)

**Tiêu đề:** Giỏ hàng tự tính tiền với useState + reduce | Super App #4
**Mô tả:**
```
Mini-app đầu tiên của ViệtSuper khai trương: Đặt đồ ăn! Menu món Việt, nút "+ Thêm", và thanh giỏ hàng tự cộng tiền — tất cả chỉ là một mảng id trong useState và một phép reduce.

⏱️ NỘI DUNG:
0:00 Giới thiệu
0:10 Giải phẫu màn đặt đồ ăn
0:28 Menu 4 món Việt
0:43 State giỏ hàng + reduce tính tổng
1:04 Nút thêm món + thanh giỏ (toLocaleString 'vi')
1:27 Chạy thật: 2 món — 75.000đ
1:48 Tóm tắt & hẹn tập 5

📦 Source code: https://github.com/Leung190299/nestjs-tutorial-series
Tập 3: [LINK M3] · Tập 5: [LINK M5]
#reactnative #usestate #giohang #laptrinh #expo
```
**Tags:** `giỏ hàng react native, usestate, reduce javascript, shopping cart, app đặt đồ ăn, food app, react native tiếng việt, học react native, state management, tolocalestring, format tiền việt, mini app, super app, việtsuper, immutable state`

### Mobile #5 — Ví điện tử & AsyncStorage (2:30)

**Tiêu đề:** Tắt app tiền vẫn còn: AsyncStorage giải thích dễ hiểu | Super App #5
**Mô tả:**
```
useState là trí nhớ NGẮN HẠN — tắt app là quên sạch. Ví tiền mà quên số dư thì khách gọi công an 😅. Tập này học AsyncStorage — "ngăn kéo hồ sơ của điện thoại" — và demo thật: nạp 200k, TẮT HẲN app, mở lại... tiền còn nguyên!

⏱️ NỘI DUNG:
0:00 Giới thiệu
0:10 useState: trí nhớ ngắn hạn
0:29 AsyncStorage = ngăn kéo hồ sơ
0:57 useEffect + getItem: đọc lúc mở app
1:19 topUp: setState + setItem song hành
1:40 DEMO ĐINH: tắt app — tiền còn nguyên 💰
2:05 Tóm tắt & hẹn tập cuối

📦 Source code: https://github.com/Leung190299/nestjs-tutorial-series
Tập 4: [LINK M4] · Tập 6: [LINK M6]
#reactnative #asyncstorage #vidientu #laptrinh #expo
```
**Tags:** `asyncstorage, async storage react native, lưu dữ liệu app, ví điện tử, e-wallet app, useeffect, json stringify parse, react native tiếng việt, học react native, persistence, local storage mobile, super app, việtsuper, momo clone, app không mất dữ liệu`

### Mobile #6 (CUỐI) — Nối app với backend NestJS (3:10)

**Tiêu đề:** Fullstack thật sự: React Native gọi API NestJS | Super App #6 (cuối)
**Mô tả:**
```
Tập cuối — cắm dây mạng cho ViệtSuper: màn Ưu đãi fetch dữ liệu từ server NestJS THẬT viết bằng kiến thức series đầu tiên của kênh. Sửa server, app đổi theo, không cần build lại. Frontend gặp backend — cả hai đều do chính tay bạn viết. Đó là fullstack.

⏱️ NỘI DUNG:
0:00 Giới thiệu tập cuối
0:18 Vì sao app cần backend?
0:40 Ôn NestJS 10 giây: PromosController
1:04 Chạy server + curl thử
1:15 fetch trong useEffect
1:37 Loading state với ActivityIndicator
1:58 Dữ liệu thật từ server thật trên iPhone 🔌
2:23 Nhìn lại hành trình 6 tập + hướng đi tiếp
2:45 Lời kết 18 tập fullstack 🧡

📦 Source code: https://github.com/Leung190299/nestjs-tutorial-series
▶️ Series NestJS từ đầu: [LINK PLAYLIST NESTJS]
💬 Comment chủ đề bạn muốn học tiếp!
#reactnative #nestjs #fullstack #fetch #laptrinh
```
**Tags:** `fetch api react native, gọi api, react native nestjs, fullstack javascript, activityindicator, loading state, kết nối backend, react native tiếng việt, học fullstack, expo fetch, api mobile app, super app, việtsuper, fullstack developer, nói app với server`

### Mobile #7 (THEO YÊU CẦU) — Kiến trúc Mini-App (4:24)

**Tiêu đề:** Mỗi tính năng = 1 app riêng, gộp thành 1 app: kiến trúc mini-app kiểu Grab | Super App #7
**Phương án khác:** Monorepo React Native: tách super app thành các mini-app độc lập / Làm theo yêu cầu khán giả: kiến trúc mini-app thật sự

**Mô tả:**
```
Tập này làm theo ĐÚNG yêu cầu từ khán giả: "muốn app tách ra nhiều tính năng, mỗi tính năng như 1 app riêng biệt, và gộp chung thành 1 app." Đó chính là kiến trúc mini-app mà Grab, WeChat, Shopee vận hành thật.

Giải pháp: monorepo + npm workspaces — ví von "khu chung cư": mỗi mini-app là một căn hộ có sổ đỏ riêng (package.json), app chủ là tòa nhà gắn biển, và căn hộ tách ra ở riêng vẫn sống tốt (demo mini-food chạy MỘT MÌNH trên simulator, không cần app chủ!).

⏱️ NỘI DUNG:
0:00 Yêu cầu từ khán giả
0:20 Vấn đề: mọi tính năng dính chung một khối
0:43 Monorepo = khu chung cư
1:11 Kiến trúc: 3 căn hộ — 1 tòa nhà
1:33 Cây thư mục packages/ + apps/
1:52 workspaces — 8 dòng hạ tầng
2:08 "Sổ đỏ" của mini-food (package.json + peerDeps)
2:35 Tab app chủ chỉ còn 3 DÒNG
2:52 Vỏ chạy riêng: food-standalone
3:12 DEMO: mini-app chạy MỘT MÌNH 🚀
3:37 Đổi đời quy trình: team riêng, test riêng, tái dùng
3:59 Tóm tắt & lời cảm ơn

📦 Source code (demo-miniapps/): https://github.com/Leung190299/nestjs-tutorial-series
Xem từ đầu series Super App: [LINK M1]
💬 Video này ra đời từ comment của khán giả — comment yêu cầu của BẠN ngay!
#reactnative #monorepo #superapp #miniapp #laptrinh
```
**Tags:** `monorepo, npm workspaces, mini app, super app architecture, kiến trúc super app, micro frontend mobile, react native monorepo, expo monorepo, tách module, grab architecture, wechat mini app, react native tiếng việt, học react native, việtsuper, package json workspaces`

## SERIES MINI-APP — "Mini-App từ A đến Z" (4 tập chi tiết)

> Playlist RIÊNG: **"Mini-App từ A đến Z 🇻🇳"** — series độc lập, KHÔNG đánh số theo series Super App (đăng riêng được ngay). Đào sâu kiến trúc mini-app từng bước một; ep19 (Super App #7) đóng vai trailer tổng quan trỏ về playlist này. Code: `demo-miniapps/`.

### Mini-App #1 — Monorepo từ con số 0 (4:12)

**Tiêu đề:** Monorepo & npm workspaces từ số 0: nền móng của mọi super app | Mini-App A-Z #1
**Mô tả:**
```
Trước khi tách app thành các mini-app độc lập, bạn cần hiểu MỘT thứ cho thật chắc: monorepo. Tập này đi từ thư mục trống → npm init → 8 dòng package.json → soi tận mắt symlink mà npm tạo ra để "nối" các package. Mỗi dòng config đều được giải thích tại sao.

Ví von xuyên suốt: monorepo = khu chung cư 🏙️, workspaces = ban quản lý, symlink = lối đi tắt giữa các căn hộ.

⏱️ NỘI DUNG:
0:00 Giới thiệu series mới
0:22 Nỗi khổ của multi-repo
0:48 Monorepo = khu chung cư
1:10 npm workspaces = ban quản lý (có sẵn trong npm!)
1:39 Hai khu: packages (linh kiện) & apps (sản phẩm)
2:02 Dựng từ thư mục trống: mkdir + npm init
2:21 8 dòng package.json — soi TỪNG dòng
2:55 npm install + soi symlink tận mắt
3:26 3 quy tắc vàng của monorepo
3:49 Tóm tắt & hẹn tập 2

📦 Source code (demo-miniapps/): https://github.com/Leung190299/nestjs-tutorial-series
Tập 2: [LINK MA2]
#monorepo #npmworkspaces #reactnative #miniapp #laptrinh
```
**Tags:** `monorepo, npm workspaces, monorepo là gì, workspaces tutorial, symlink node modules, kiến trúc monorepo, mini app, super app, react native monorepo, npm init, package json, học lập trình, mini app tiếng việt, grab architecture, multi repo vs monorepo`

### Mini-App #2 — Xây mini-app đầu tiên (3:44)

**Tiêu đề:** Sổ đỏ, cửa chính, căn phòng: giải phẫu một mini-app đúng chuẩn | Mini-App A-Z #2
**Mô tả:**
```
Một mini-app đúng chuẩn chỉ cần đúng 3 thứ: package.json (sổ đỏ), index.ts (cửa chính), và màn hình (căn phòng). Tập này xây mini-food từng bước — và dành hẳn một phần giải thích peerDependencies: vì sao khai react ở PEER chứ không phải dependencies (sai một chữ = lỗi hooks 2 bản React kinh điển).

⏱️ NỘI DUNG:
0:00 Giới thiệu
0:14 Giải phẫu mini-app: 3 bộ phận
0:35 Sổ đỏ package.json — soi từng trường (scope, main, version)
1:11 peerDependencies: đừng khiêng máy phát điện vào căn hộ!
1:37 Cửa chính index.ts — 1 dòng, triết lý đóng gói
1:58 Căn phòng FoodScreen: data tự túc
2:15 Logic giỏ hàng trong package
2:41 Giao diện: nút Thêm + thanh giỏ
3:00 Căn hộ hoàn thiện (ảnh thật)
3:16 Tóm tắt & hẹn tập 3

📦 Source code: https://github.com/Leung190299/nestjs-tutorial-series
Tập 1: [LINK MA1] · Tập 3: [LINK MA3]
#miniapp #peerdependencies #reactnative #package #laptrinh
```
**Tags:** `peer dependencies, peerdependencies là gì, tạo npm package, package json main, scope npm, mini app, react native package, export index, đóng gói component, monorepo package, two reacts error, invalid hook call, mini app tiếng việt, học react native, kiến trúc mini app`

### Mini-App #3 — Cho mini-app ra ở riêng (3:35)

**Tiêu đề:** Mini-app chạy MỘT MÌNH không cần app chủ: standalone shell | Mini-App A-Z #3
**Mô tả:**
```
Khoảnh khắc định nghĩa kiến trúc mini-app: tính năng Đồ ăn chạy MỘT MÌNH trên iPhone — không tab bar, không app chủ. Bí quyết là "standalone shell": một vỏ Expo 19 dòng import mini-app bằng tên và bật lên toàn màn hình. Đổi lại: dev loop siêu nhanh, team độc lập, tester nhận đúng một app nhỏ.

⏱️ NỘI DUNG:
0:00 Giới thiệu
0:14 Vì sao chạy riêng là siêu năng lực (dev/test/team)
0:42 Standalone shell = cái vỏ cắm điện
1:06 Tạo vỏ trong khu apps + workspaces tự nhận
1:28 App.tsx 19 dòng — soi từng phần (SafeAreaView vì sao cần)
2:01 Một căn hộ — hai cuộc đời
2:22 DEMO: chạy một mình trên iPhone thật 🚀
2:47 Một ngày làm việc của team Đồ ăn
3:10 Tóm tắt & hẹn tập cuối

📦 Source code: https://github.com/Leung190299/nestjs-tutorial-series
Tập 2: [LINK MA2] · Tập 4: [LINK MA4]
#miniapp #standalone #expo #reactnative #laptrinh
```
**Tags:** `standalone app, mini app chạy riêng, expo blank template, safeareaview, dev workflow, team độc lập, micro frontend mobile, react native mini app, app shell, mini app tiếng việt, học react native, kiến trúc grab, chạy độc lập, expo start, mini app từ a đến z`

### Mini-App #4 (CUỐI) — Công thức 4 bước (4:00)

**Tiêu đề:** Thêm mini-app MỚI trong vài phút: công thức 4 bước | Mini-App A-Z #4 (cuối)
**Mô tả:**
```
Tập tốt nghiệp: kiểm chứng công thức bằng cách xây MỚI nguyên mini-app Xem phim 🎬 từ số 0 đến lên hình — tạo căn hộ (package) → viết căn phòng (CinemaScreen với nút Đặt vé biến hình) → cắm tab vào app chủ (3 dòng) → bật card ở trang chủ (2 dòng diff). Card "Xem phim" mờ câm từ series Super App chính thức thành dịch vụ thật, tab bar lên 5 nút.

⏱️ NỘI DUNG:
0:00 Giới thiệu tập cuối
0:19 Ôn: tab app chủ = 3 dòng
0:38 CÔNG THỨC 4 BƯỚC (thuộc lòng là vô địch)
1:02 Bước 1: căn hộ mini-cinema (sổ đỏ + cửa chính)
1:21 Bước 2: CinemaScreen — 3 phim Việt + reduce
1:47 Nút "Đặt vé" biến hình (toggle + style 2 lớp)
2:11 Bước 3a: tab cinema.tsx — 3 dòng
2:28 Bước 3b: treo biển Tabs.Screen lên tab bar
2:44 Bước 4: bật card Xem phim (2 dòng diff)
3:04 NGHIỆM THU: 5 tab, 2 vé 185.000đ trên iPhone thật
3:31 Tốt nghiệp + bài tập mini-booking 🛵

📦 Source code: https://github.com/Leung190299/nestjs-tutorial-series
Xem từ đầu: [LINK MA1]
💬 Comment thành quả mini-booking của bạn!
#miniapp #reactnative #monorepo #superapp #laptrinh
```
**Tags:** `mini app mới, công thức mini app, thêm tính năng app, react native tabs, expo router tab, toggle button, mini app từ a đến z, monorepo workflow, super app architecture, grab mini app, học react native, kiến trúc mobile, mini app tiếng việt, việtsuper, mini cinema`

### Mini-App #5 (CHỮA BÀI) — mini-booking Đặt xe (4:13)

**Tiêu đề:** Chữa bài tốt nghiệp: mini-app Đặt xe KHÔNG cần tab | Mini-App A-Z #5
**Phương án khác:** Màn hình ngoài tab bar với Stack route / Single-select + stepper: 2 kỹ thuật state mới

**Mô tả:**
```
Tập CHỮA BÀI tốt nghiệp của series: xây mini-booking Đặt xe 🛵 — và né cái bẫy lớn nhất của bài tập: KHÔNG thêm tab thứ 6 (tab bar chật!). Thay vào đó: màn hình Stack đẩy lên từ card Trang chủ, có header + nút back tự động — đúng cách Grab tổ chức hàng chục dịch vụ với chỉ vài tab.

Kèm 2 kỹ thuật state mới: chọn-MỘT (string | null — so với chọn-nhiều string[] của tập 4) và stepper quãng đường với clamp Math.max/Math.min.

⏱️ NỘI DUNG:
0:00 Tập chữa bài!
0:21 Cái bẫy: tab thứ 6? KHÔNG
0:47 Push lên — pop về: mô hình Stack
1:06 Công thức cũ, 2 điểm mới
1:25 Single-select: string | null (vs string[])
1:54 Nút chọn-một — đơn giản là đúng
2:12 Stepper km + clamp Math.max/min
2:33 Stack.Screen: header + title + back "tặng sẵn"
2:58 Bật card Đặt xe (2 dòng)
3:14 Nghiệm thu: Ô tô 4 chỗ · 7km = 175.000đ
3:42 5/6 ô sáng — ô cuối Nạp thẻ dành cho BẠN

📦 Source code: https://github.com/Leung190299/nestjs-tutorial-series
💡 Repo có TAG theo từng tập (miniapp-tap-4, miniapp-tap-5...) — checkout tag để xem đúng code của tập đang xem.
💬 Làm xong mini-topup Nạp thẻ? Comment khoe thành quả!
#miniapp #reactnative #exporouter #stack #laptrinh
```
**Tags:** `stack navigation, expo router stack, màn hình ngoài tab, single select, stepper react native, math clamp, headerbacktitle, đặt xe app, grab clone, mini app, react native tiếng việt, học react native, mini app từ a đến z, chữa bài tập, việtsuper`

### Mini-App #6 (HOÀN THIỆN) — mini-topup Nạp thẻ (3:46)

**Tiêu đề:** Sáng đèn 6/6: mini-app cuối cùng + màn "Nạp thành công" | Mini-App A-Z #6
**Phương án khác:** Một màn hình, hai bộ mặt: early return + reset state / Hoàn thiện super app ViệtSuper: khoảnh khắc 6/6

**Mô tả:**
```
Tập HOÀN THIỆN: thắp sáng ô cuối cùng của lưới dịch vụ — mini-topup Nạp thẻ 📱. Công thức 4 bước chạy lần thứ TƯ, kèm kỹ thuật mới đáng giá: MỘT màn hình – HAI trạng thái giao diện (form nạp ↔ màn "Nạp thành công") chỉ bằng một biến boolean + early return, và quy tắc vàng "cái gì suy ra được thì đừng lưu thành state".

Cuối tập: khoảnh khắc cả series chờ đợi — trang chủ ViệtSuper SÁNG ĐỦ 6/6 Ô. 🎆

⏱️ NỘI DUNG:
0:00 Tập hoàn thiện — ô cuối cùng
0:17 Giải phẫu màn nạp thẻ (một màn hình, hai bộ mặt)
0:38 Vòng đời: form → thành công → form
0:58 Dữ liệu: 3 nhà mạng + 6 mệnh giá
1:14 3 state + canPay (biến SUY RA, không phải state!)
1:35 Điểm nhấn: màn cảm ơn bằng early return + reset
2:04 Thanh hành động đổi mặt theo canPay
2:19 Cắm vào app chủ — lần thứ 4, 3 dòng
2:36 KHOẢNH KHẮC 6/6: trang chủ sáng đèn toàn bộ 🎆
3:01 Toàn cảnh vương quốc: 6 căn hộ, 2 mô hình cắm
3:22 Lời kết trọn vẹn series

📦 Source code: https://github.com/Leung190299/nestjs-tutorial-series
💡 Tag miniapp-tap-6 = trạng thái đầy đủ nhất của repo.
💬 Comment đặt tên series tiếp theo!
#miniapp #reactnative #superapp #uistate #laptrinh
```
**Tags:** `nạp thẻ điện thoại app, early return react, ui state, conditional rendering, derived state, reset state, mini app cuối, super app hoàn chỉnh, react native tiếng việt, học react native, mini app từ a đến z, việtsuper, form success screen, một màn hình hai trạng thái, grab clone`

## SERIES MINI-APP VỚI FLUTTER — "Mini-App với Flutter 🇻🇳" (Add-to-app, 6 tập)

> Playlist đích: **"Mini-App với Flutter 🇻🇳"** — sẽ tạo khi đăng tập đầu tiên, thêm dần từng tập vào. Series MỚI, không đánh số theo series Mini-App RN — cấp độ thật hơn: app chủ viết native (SwiftUI), mỗi mini-app viết Flutter, chạy trong FlutterEngine riêng, gộp lúc RUNTIME thay vì lúc build. Code: `demo-flutter-miniapp/` (repo `nestjs-tutorial-series`), mỗi tập có tag riêng `flutter-miniapp-tap-N` — `git checkout flutter-miniapp-tap-N` để xem đúng code của tập đang xem. Ẩn dụ xuyên suốt: app chủ = tòa nhà bê tông, module Flutter = căn hộ lắp ghép, FlutterEngine = đồng hồ điện nước riêng, MethodChannel = đường dây xuống lễ tân.

Từ khóa chủ lực toàn series: `flutter add-to-app`, `flutter tiếng việt`, `học flutter`, `mini app flutter`, `super app flutter`, `flutterenginegroup`, `methodchannel`, `swiftui tiếng việt`.

<!-- Playlist "Mini-App với Flutter 🇻🇳": https://www.youtube.com/playlist?list=PLL5FgtEBrD6g — cả 6 tập đã đăng công khai 2026-09-03 -->

### Flutter Mini-App #1 — Add-to-app: mini-app đúng nghĩa đen (7:11)

**Tiêu đề:** Flutter add-to-app: tạo module & Engine riêng cho mini-app đầu tiên | Tập 1/6

**Mô tả:**
```
Grab, Shopee, các ví điện tử thật ngoài kia không viết lại app từ đầu — họ NHÚNG từng tính năng như một app con vào app native đã có sẵn hàng triệu người dùng. Series MỚI "Mini-App với Flutter" lên một cấp so với series RN cũ: app chủ viết Swift, mỗi mini-app viết Flutter, và mỗi mini chạy trong một ENGINE Dart riêng biệt.

Tập 1: tạo module Flutter bằng flutter create --template=module (không phải app!), đọc kỹ 3 file — main_food.dart (biển @pragma vm:entry-point), food_screen.dart (Set giỏ hàng + fold tính tổng), mini_shell.dart (MethodChannel cài cắm sẵn cho Tập 4) — rồi chạy thử lẻ trên simulator.

Ẩn dụ xuyên suốt series: app chủ = tòa nhà bê tông 🏢, module Flutter = căn hộ lắp ghép 🚪, engine = đồng hồ điện nước riêng 💧.

⏱️ NỘI DUNG:
0:00 Giới thiệu series Mini-App với Flutter
0:43 Module ≠ App: entry point & engine riêng
2:10 Tạo module bằng 1 dòng lệnh
2:36 Đọc code: main_food, food_screen, mini_shell
4:52 Chạy thử mini Đồ ăn (flutter run -t)
5:19 Nghiệm thu trên simulator
5:51 Tổng kết Tập 1
6:34 Lời kết & hẹn Tập 2

📦 Source code (demo-flutter-miniapp/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout flutter-miniapp-tap-1 để xem đúng code tập này.
▶️ Series RN cũ "Mini-App từ A đến Z": https://www.youtube.com/playlist?list=PLY-i2_1YbKi4
⏭️ Tập sau: https://youtu.be/oHk0KPUbOpw

#flutter #addtoapp #miniapp #superapp #laptrinh
```

**Comment ghim gợi ý:**
```
📌 Series MỚI bắt đầu: "Mini-App với Flutter" — add-to-app đúng nghĩa đen, khác hẳn cách gộp workspace của series RN cũ. Bạn đã làm add-to-app trong dự án thật chưa? Comment kể trải nghiệm của bạn nhé!
```

**Thumbnail:** badge "FLUTTER MINI-APP 1" · dòng lớn "FLUTTER" / "APP THẬT" · phụ đề "Module · Engine riêng · MethodChannel" · badge emoji 🍜 · ảnh nền `screens/ep26/standalone-food-cart.png`.

**Tags:** `flutter add-to-app, flutter module, flutter create template module, mini app flutter, super app flutter, flutter engine, entry point flutter, pragma vm entry-point, flutter tiếng việt, học flutter, add to app là gì, methodchannel flutter, flutter cho người mới, kiến trúc mini app, grab shopee kiến trúc, flutter dart, mini app tiếng việt, flutter series`

---

### Flutter Mini-App #2 — Host SwiftUI từ số 0 — cắm căn hộ Flutter đầu tiên (9:39)

**Tiêu đề:** SwiftUI từ số 0 + FlutterEngine: cắm mini-app Flutter đầu tiên | Tập 2/6

**Mô tả:**
```
Tập 1, mini Đồ ăn Flutter đã chạy mượt — nhưng đứng một mình, chưa chạm app nào. Tập 2: xây app chủ ViệtSuper bằng SwiftUI TỪ SỐ 0 (60 giây dịch nhanh: View≈Widget, body≈build(), @State≈setState — không cần biết Swift trước), rồi cắm CĂN HỘ FLUTTER ĐẦU TIÊN bằng FlutterEngineGroup + FlutterViewController thật.

Có cả một gotcha CÓ THẬT từng làm mini trắng trơn ngay lần build đầu: lỗi Dart_LookupLibrary vì kernel debug chỉ đóng gói code reachable từ lib/main.dart — cách bắt lỗi và vá kể chi tiết, không giấu diếm.

⏱️ NỘI DUNG:
0:00 Giới thiệu Tập 2
0:37 SwiftUI trong 60 giây cho người biết Flutter
1:10 Dựng host: XcodeGen → App → ContentView → MiniApp.swift
3:52 Nhúng Flutter thật: Podfile → MiniAppLauncher → MiniAppView
6:01 Gotcha thật: mini trắng trơn & cách vá
7:49 Nghiệm thu: căn hộ đầu tiên đã cắm điện
8:21 Tổng kết Tập 2
9:03 Lời kết & hẹn Tập 3

📦 Source code (demo-flutter-miniapp/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout flutter-miniapp-tap-2 để xem đúng code tập này (kể cả gotcha Dart_LookupLibrary).
⏮️ Tập trước: https://youtu.be/5T2J4RGOXxQ
⏭️ Tập sau: https://youtu.be/XaoXpN8D63s

#flutter #swiftui #flutterengine #addtoapp #laptrinh
```

**Comment ghim gợi ý:**
```
🐛 Gotcha thật trong tập này: kernel debug của Flutter chỉ đóng gói code REACHABLE từ lib/main.dart — quên import 1 entrypoint là màn TRẮNG TRƠN, không lỗi biên dịch nào báo trước. Bạn từng gặp lỗi entry point tương tự chưa? Comment kể lại nhé!
```

**Thumbnail:** badge "FLUTTER MINI-APP 2" · dòng lớn "SWIFTUI" / "ĐÃ SỐNG" · phụ đề "XcodeGen · FlutterEngineGroup · gotcha thật" · badge emoji 🏗️ · ảnh nền `screens/ep27/mini-food-embedded.png`.

**Tags:** `swiftui cho người mới, swiftui là gì, flutterengine ios, flutterviewcontroller, xcodegen tutorial, podfile flutter, add-to-app ios, flutter add to app swift, methodchannel, flutter ios native, swiftui flutter, uiviewcontrollerrepresentable, dart lookuplibrary, flutter debugging, mini app flutter, học swiftui, flutter tiếng việt`

---

### Flutter Mini-App #3 — FlutterEngineGroup: thêm mini gần như miễn phí (6:13)

**Tiêu đề:** FlutterEngineGroup: thêm mini-app thứ hai gần như miễn phí | Tập 3/6

**Mô tả:**
```
Tập 3: cắm căn hộ THỨ HAI — mini Ví — chỉ bằng ĐÚNG MỘT phần tử Swift. Bí quyết là FlutterEngineGroup: một "trạm biến áp" dùng chung khiến engine thứ hai gần như MIỄN PHÍ RAM so với dựng một engine độc lập từ đầu.

Nói ngay để không hiểu lầm: hai mini KHÔNG chạy song song — chúng THAY NHAU chiếm màn hình. Và một câu hỏi treo lơ lửng tới cuối tập: mini Ví hiện tên "Lee", số dư 1.250.000đ — dữ liệu đó Flutter lấy từ đâu, khi không hề định nghĩa user nào? (trả lời ở Tập 4)

⏱️ NỘI DUNG:
0:00 Giới thiệu Tập 3
0:37 FlutterEngineGroup: trạm biến áp dùng chung
2:35 Thêm mini thứ 2: đúng 1 phần tử Swift + rebuild
3:35 Nghiệm thu: 2 card, 1 câu hỏi (Lee?)
4:13 Bên trong wallet_screen: Card số dư
4:49 Tổng kết Tập 3
5:33 Lời kết & hẹn Tập 4

📦 Source code (demo-flutter-miniapp/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout flutter-miniapp-tap-3 để xem đúng code tập này.
⏮️ Tập trước: https://youtu.be/oHk0KPUbOpw
⏭️ Tập sau: https://youtu.be/oKrTFNf8cTU

#flutter #flutterenginegroup #addtoapp #superapp #laptrinh
```

**Comment ghim gợi ý:**
```
❓ Cliffhanger cuối tập: mini Ví hiện "Lee / 1.250.000đ" nhưng module Flutter KHÔNG hề định nghĩa user nào tên Lee — dữ liệu này từ đâu ra? Comment đoán thử, đáp án có ở Tập 4!
```

**Thumbnail:** badge "FLUTTER MINI-APP 3" · dòng lớn "GẦN NHƯ" / "MIỄN PHÍ" · phụ đề "FlutterEngineGroup · thêm mini = 1 dòng Swift" · badge emoji 👛 · ảnh nền `screens/ep28/mini-wallet-open.png`.

**Tags:** `flutterenginegroup, flutter engine group, flutter multiple engines, add-to-app flutter, mini app thứ hai, flutter ram usage, swift array flutter, kiến trúc mini app, flutter ios, methodchannel, super app flutter, flutter tiếng việt, học flutter, wallet app flutter, flutter card widget, mini app flutter tiếng việt`

---

### Flutter Mini-App #4 — MethodChannel: mini hỏi, app chủ trả lời (7:03)

**Tiêu đề:** MethodChannel Flutter ↔ Swift: mini-app hỏi, app chủ trả lời | Tập 4/6

**Mô tả:**
```
Tập 4 trả lời thẳng câu hỏi Tập 3 treo lại: "Lee" và "1.250.000đ" không đến từ Flutter — chúng được HARD-CODE trong result() của Swift, gửi qua MethodChannel. Ẩn dụ: căn hộ muốn biết tên chủ tòa nhà phải gọi điện xuống LỄ TÂN — MethodChannel chính là đường dây đó.

Đọc từng dòng invokeMapMethod bên Dart, setMethodCallHandler bên Swift, và vì sao CÙNG một wallet_screen.dart lại cho ra HAI bối cảnh khác nhau: "Số dư lấy từ app chủ (Swift)" khi nhúng, "Khách chạy lẻ" 500.000đ khi chạy đơn độc.

⏱️ NỘI DUNG:
0:00 Giới thiệu Tập 4
0:36 MethodChannel: đường dây xuống lễ tân
1:23 Dart hỏi: _loadUser + luồng gọi
2:45 Swift trả lời: setMethodCallHandler + vì sao 2 bối cảnh
4:18 Nghiệm thu: 1 code, 2 bối cảnh (nhúng vs chạy lẻ)
4:57 Nút X gọi _close() qua MethodChannel
5:30 Tổng kết Tập 4
6:21 Lời kết & hẹn Tập 5

📦 Source code (demo-flutter-miniapp/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout flutter-miniapp-tap-4 để xem đúng code tập này.
⏮️ Tập trước: https://youtu.be/XaoXpN8D63s
⏭️ Tập sau: https://youtu.be/3xi-JxeG9oM

#flutter #methodchannel #addtoapp #swift #laptrinh
```

**Comment ghim gợi ý:**
```
📞 Hộp đen đã mở: MethodChannel là đường ống 2 chiều thật — invokeMethod GỌI, setMethodCallHandler NGHE, result() TRẢ LỜI. Bạn đoán được vì sao "Khách chạy lẻ" luôn đúng 500.000đ không? Comment thử xem!
```

**Thumbnail:** badge "FLUTTER MINI-APP 4" · dòng lớn "MỞ HỘP ĐEN" / "METHODCHANNEL" · phụ đề "Mini hỏi · Swift trả lời · 1 code 2 bối cảnh" · badge emoji 📞 · ảnh nền `screens/ep29/mini-wallet-from-host.png`.

**Tags:** `methodchannel flutter, flutter swift communication, invokemapmethod, setmethodcallhandler, flutter ios bridge, native bridge flutter, missingpluginexception, flutter fallback data, flutter dart swift, add-to-app flutter, flutter học tiếng việt, ví điện tử app, flutter platform channel, ios swift dart, kiến trúc mini app`

---

### Flutter Mini-App #5 — Công thức 4 bước bản Flutter: mini Xem phim từ A-Z (7:06)

**Tiêu đề:** Công thức 4 bước: xây mini-app Flutter mới từ A-Z (Xem phim) | Tập 5/6

**Mô tả:**
```
Tập tốt nghiệp bản Flutter: kiểm chứng công thức 4 bước bằng cách xây MỚI nguyên mini Xem phim 🎬 từ số 0 — (1) viết căn phòng cinema_screen.dart (3 phim Việt CÙNG dữ liệu với series React Native trước đó), (2) mở cửa vào main_cinema.dart + 1 dòng import, (3) báo lễ tân — thêm ĐÚNG 2 dòng vào MiniApp.swift, (4) rebuild.

Nhấn mạnh: KHÔNG sửa MiniAppLauncher, KHÔNG sửa ContentView — kiến trúc tốt là thêm tính năng mà không đụng lõi đã chạy ổn định.

⏱️ NỘI DUNG:
0:00 Giới thiệu Tập 5
0:33 Công thức 4 bước bản Flutter
1:27 Bước 1: cinema_screen.dart — data + nút biến hình
2:42 Sơ đồ công thức 4 bước
3:15 Bước 2: main_cinema.dart + import main.dart
4:23 Bước 3: báo lễ tân — thêm 2 dòng Swift
5:02 Bước 4: rebuild + nghiệm thu 3 card
6:13 Lời kết & hẹn Tập 6

📦 Source code (demo-flutter-miniapp/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout flutter-miniapp-tap-5 để xem đúng code tập này.
⏮️ Tập trước: https://youtu.be/oKrTFNf8cTU
⏭️ Tập sau: https://youtu.be/lQAknMo0CB4

#flutter #miniapp #addtoapp #flutterdev #laptrinh
```

**Comment ghim gợi ý:**
```
🎬 Mini Xem phim dùng CÙNG dữ liệu 3 phim với series React Native cũ — khán giả cũ chắc nhận ra ngay! Comment nếu bạn đoán được vì sao mình cố tình lặp lại data này nhé.
```

**Thumbnail:** badge "FLUTTER MINI-APP 5" · dòng lớn "CÔNG THỨC" / "4 BƯỚC" · phụ đề "Viết phòng · mở cửa · báo lễ tân · rebuild" · badge emoji 🎬 · ảnh nền `screens/ep30/mini-cinema-ticket.png`.

**Tags:** `flutter mini app từ a đến z, công thức mini app flutter, cinema app flutter, flutter set fold, flutter statefulwidget, add mini app flutter, flutter swift kiến trúc, xem phim app flutter, flutter tiếng việt, học flutter, flutterenginegroup, mini app mới, flutter dart pattern, super app flutter, việtsuper flutter`

---

### Flutter Mini-App #6 (CUỐI) — Chạy lẻ, bẫy FLUTTER_TARGET & so găng React Native (7:21)

**Tiêu đề:** Flutter add-to-app vs React Native: so găng kiến trúc mini-app | Tập 6/6

**Mô tả:**
```
Tập cuối series: chạy lẻ từng mini bằng cờ -t, đối mặt một BẪY THỰC CHIẾN có thật khi làm demo này — build lại app chủ sau khi chạy lẻ khiến Generated.xcconfig ghim cứng FLUTTER_TARGET, các mini khác lỗi Dart_LookupLibrary — và cách vá.

Rồi so găng trực tiếp 2 công thức: series React Native cũ (1 dự án JS, gộp bằng npm workspaces lúc BUILD) và series Flutter add-to-app này (2 dự án tách biệt, gộp lúc RUNTIME qua FlutterEngine) — khi nào chọn gì.

⏱️ NỘI DUNG:
0:00 Giới thiệu Tập 6 — tập cuối
0:30 Ôn 4 mảnh ẩn dụ + 3 việc hôm nay
1:20 Chạy lẻ 3 mini bằng -t + nghiệm thu
2:25 Bẫy thực chiến: FLUTTER_TARGET bị ghim
3:04 Tái hiện bẫy & fix + nghiệm thu
4:05 Tổng kiến trúc: Host → Group → Engine → Mini
4:38 So găng React Native vs Flutter + chọn công thức nào
6:24 Lời kết series 6/6

📦 Source code (demo-flutter-miniapp/): https://github.com/Leung190299/nestjs-tutorial-series
💡 Repo có tag theo từng tập (flutter-miniapp-tap-1 → tap-6) — checkout tag để xem đúng code của tập đang xem.
▶️ Series RN cũ "Mini-App từ A đến Z": https://www.youtube.com/playlist?list=PLY-i2_1YbKi4
⏮️ Tập trước: https://youtu.be/3xi-JxeG9oM
▶️ Xem từ đầu series Flutter: https://youtu.be/5T2J4RGOXxQ
💬 Vote series tiếp theo: bản Kotlin add-to-app hay chủ đề Flutter khác?

#flutter #reactnative #addtoapp #superapp #laptrinh
```

**Comment ghim gợi ý:**
```
🥊 So găng xong: add-to-app (Flutter) mạnh khi ĐÃ có app native triệu người dùng, workspace (React Native) đơn giản hơn khi xây MỚI từ 0. Comment vote: series tiếp theo nên làm bản Kotlin add-to-app (Android) hay chủ đề Flutter khác?
```

**Thumbnail:** badge "FLUTTER MINI-APP 6/6" · dòng lớn "TẬP CUỐI" / "SO GĂNG RN" · phụ đề "Chạy lẻ · bẫy FLUTTER_TARGET · vs React Native" · badge emoji 🏆 · ảnh nền `screens/ep31/host-grid-final.png`.

**Tags:** `flutter vs react native, add-to-app vs workspace, flutter_target xcconfig, flutter generated xcconfig, flutter debugging thực chiến, flutter kiến trúc tổng, react native mini app, flutter add-to-app hoàn chỉnh, so sánh flutter react native, flutter tiếng việt, học flutter, mini app series, super app kiến trúc, flutter dart swift`

---

<!-- 2 tập bonus đã đăng 2026-09-04, nối playlist PLL5FgtEBrD6g; mô tả Tập 6 đã thêm dòng Bonus -->

### Flutter Mini-App Bonus Android #1 — Cùng căn hộ, tòa nhà Android — host Kotlin Compose (7:50)

**Tiêu đề:** Kotlin add-to-app: host Jetpack Compose cắm lại mini Flutter | Bonus 1/2

**Mô tả:**
```
Lời hứa ở outro Tập 6 đã thành sự thật: khán giả vote bản Kotlin, bản Kotlin bắt đầu ngay đây. Bonus Android 1/2 dựng NGUYÊN một tòa nhà Android mới bằng Jetpack Compose — và thông điệp vàng ngay từ 30 giây đầu: module Flutter `mini_flutter` giữ nguyên, không sửa MỘT DÒNG Dart nào, chỉ xây thêm một tòa nhà.

Compose trong 60 giây cho người biết Flutter (@Composable ≈ Widget, cùng triết lý declarative — dễ hơn SwiftUI vì không phải học ngôn ngữ tư duy mới). Code (tag `flutter-miniapp-android-1`): `settings.gradle` cắm dãy Flutter bằng include_flutter.groovy, `gradle.properties` với một GOTCHA CÓ THẬT — Java 25 trên máy quá mới khiến Gradle chết, phải trỏ `org.gradle.java.home` về JDK 21. Rồi `MiniApp.kt` (cùng id/name/emoji/library với bản Swift), `MainActivity.kt` (LazyVerticalGrid ≈ LazyVGrid), `MiniAppLauncher.kt` (DartEntrypoint trỏ đúng `package:mini_flutter/main_food.dart` — địa chỉ căn hộ không đổi, chỉ đổi tòa nhà), và `MiniActivity.kt` (FlutterActivity với cached engine, Back Android tự nhiên nhờ là một Activity riêng).

⏱️ NỘI DUNG:
0:00 Giới thiệu Bonus Android 1/2 & Compose trong 60 giây
1:04 settings.gradle & gradle.properties: gotcha JDK 21
2:17 build.gradle & MiniApp.kt: cùng module, khác tòa nhà
3:22 MainActivity.kt: LazyVerticalGrid ≈ LazyVGrid
4:34 MiniAppLauncher.kt: địa chỉ Dart không đổi
5:22 MiniActivity.kt: Activity riêng, Back tự nhiên
6:08 Build thật & nghiệm thu trên máy
7:06 Tổng kết & hẹn tập cuối

📦 Source code (demo-flutter-miniapp/vietsuper_android/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout flutter-miniapp-android-1 để xem đúng code tập này.
🔗 Playlist "Mini-App với Flutter 🇻🇳": https://www.youtube.com/playlist?list=PLL5FgtEBrD6g
⏮️ Tập trước (Tập 6): https://youtu.be/lQAknMo0CB4
⏭️ Bonus 2/2: https://youtu.be/MzO--hC1pU0

#kotlin #flutter #addtoapp #jetpackcompose #laptrinh
```

**Comment ghim gợi ý:**
```
🤖 Lời hứa outro Tập 6 giữ trọn: bản Kotlin add-to-app đây rồi! Cùng module Flutter, tòa nhà Android cắm bằng Jetpack Compose — không sửa 1 dòng Dart nào. Bonus 2/2 tuần sau: mở hộp lễ tân Kotlin + một bug thật do reviewer bắt được!
```

**Thumbnail:** badge "FLUTTER MINI-APP BONUS 1/2" · dòng lớn "KOTLIN" / "CẮM LẠI" · phụ đề "Jetpack Compose · cùng module, khác tòa nhà" · badge emoji 🤖 · ảnh nền `screens/ep32/android-mini-food.png`.

**Tags:** `kotlin add-to-app, jetpack compose tutorial, jetpack compose cho người mới, flutterenginegroup android, include_flutter groovy, flutter android bridge, lazyverticalgrid compose, gradle java home jdk21, flutter dart entrypoint, android add to app flutter, methodchannel android, mini app kotlin, super app android, flutter tiếng việt, học kotlin, compose vs swiftui, flutter dart android, kotlin tiếng việt`

---

### Flutter Mini-App Bonus Android #2 (KẾT) — Lễ tân Kotlin, bug double-tap và lời chào 8 video (7:04)

**Tiêu đề:** Kotlin vs Swift add-to-app: bug double-tap, lễ tân & kết 8 video | Bonus 2/2

**Mô tả:**
```
Bonus 2/2 khép lại chùm 8 video: mở hộp lễ tân Kotlin (attachHostChannel — setMethodCallHandler switch getUserInfo/close, đối chiếu 1 nhịp với bản Swift: cùng channel, cùng dữ liệu Lee/1.250.000đ), rồi thêm 2 phần tử vào MiniApp.kt — công thức quen: thêm mini = thêm phần tử.

Hai bài học thật không giấu diếm: (1) chip Ví trên Android vẫn ghi "Số dư lấy từ app chủ (Swift)" vì chuỗi hard-code phía Dart — bài học đắt giá: đừng nêu tên nền tảng trong chuỗi UI của mini, mini không biết nó đang ở tòa nhà nào; (2) bug double-tap CÓ THẬT do reviewer bắt được — tap card 2 lần nhanh tạo 2 engine cùng id, engine đầu rò rỉ vĩnh viễn (bản iOS an toàn tự nhiên nhờ fullScreenCover(item:)), fix bằng đúng 2 dòng guard `FlutterEngineCache.contains`. Kết bằng so găng đối xứng Swift vs Kotlin: SwiftUI↔Compose, podhelper↔include_flutter, fullScreenCover↔Activity, cùng module cùng channel — viết mini MỘT lần, cắm HAI tòa nhà.

⏱️ NỘI DUNG:
0:00 Giới thiệu Bonus Android 2/2 — tập cuối
0:38 Mở hộp lễ tân Kotlin: attachHostChannel
2:12 MiniApp.kt thêm 2 phần tử & nghiệm thu 3 card
3:09 Thú nhận thật: chip vẫn ghi (Swift)
3:50 Bug thật double-tap & fix guard 2 dòng
5:09 So găng cuối: Swift vs Kotlin
6:02 Tổng kết 8 video & lời cảm ơn

📦 Source code (demo-flutter-miniapp/vietsuper_android/): https://github.com/Leung190299/nestjs-tutorial-series
💡 Repo có đủ 2 bộ tag: `flutter-miniapp-tap-1..6` (Swift) + `flutter-miniapp-android-1..2` (Kotlin) — git checkout flutter-miniapp-android-2 để xem đúng code tập này.
🔗 Playlist "Mini-App với Flutter 🇻🇳": https://www.youtube.com/playlist?list=PLL5FgtEBrD6g
⏮️ Bonus 1/2: https://youtu.be/7YZZg7yVjYg
▶️ Xem từ đầu series: https://youtu.be/5T2J4RGOXxQ
💬 Vote series tiếp theo: lên store thật, Flutter Web, hay chủ đề khác?

#kotlin #flutter #addtoapp #androiddev #laptrinh
```

**Comment ghim gợi ý:**
```
🏁 8 video khép lại: 1 module Flutter, 2 tòa nhà (Swift + Kotlin), viết mini MỘT lần cắm HAI nơi. Bug double-tap thật ở tập này do chính reviewer bắt được — bạn từng dính bug engine trùng id chưa? Comment vote: series tiếp theo nên lên store thật, làm Flutter Web, hay chủ đề khác?
```

**Thumbnail:** badge "FLUTTER MINI-APP BONUS 2/2" · dòng lớn "TẬP CUỐI" / "8 VIDEO" · phụ đề "Bug double-tap · kết chùm 8 video" · badge emoji 🏁 · ảnh nền `screens/ep33/android-host-grid-3-cards.png`.

**Tags:** `kotlin methodchannel, flutter double tap bug, flutterenginecache contains, flutter android bridge, swiftui vs jetpack compose, add-to-app flutter kotlin, flutter engine leak fix, flutter vs kotlin add-to-app, flutter android methodchannel, flutter tiếng việt, học kotlin, mini app android, super app flutter, flutter dart swift kotlin, flutter debugging thực chiến, kiến trúc mini app, android jetpack compose, kotlin tiếng việt`

---

## SERIES MINI-APP FLUTTER THUẦN — "Mini-App Flutter thuần 🇻🇳" (Pub Workspace, 5 tập)

> Playlist đích: **"Mini-App Flutter thuần 🇻🇳"** — sẽ tạo khi đăng tập đầu tiên, thêm dần từng tập vào. Mảnh cuối cùng của bộ ba cách làm mini-app trên kênh: không một dòng code native, toàn bộ từ trên xuống dưới chỉ MỘT ngôn ngữ Dart, gộp nhiều mini-app bằng **pub workspace** (có từ Dart 3.5) — trái ngược có chủ đích với FlutterEngine runtime của series add-to-app, nhưng cùng triết lý với npm workspaces của series React Native. Code: `demo-flutter-workspace/` (repo `nestjs-tutorial-series`), mỗi tập có tag riêng `flutter-workspace-tap-N` — `git checkout flutter-workspace-tap-N` để xem đúng code của tập đang xem. Ẩn dụ xuyên suốt: khu chung cư THUẦN Flutter — tòa nhà và từng căn hộ CÙNG một chất liệu, cả khu chỉ MỘT đồng hồ tổng (1 Flutter Engine duy nhất, khác hẳn "mỗi căn hộ 1 đồng hồ riêng" của series add-to-app).

Từ khóa chủ lực toàn series: `pub workspace`, `flutter monorepo`, `mini app flutter`, `dart workspace`, `flutter package`, `flutter tiếng việt`, `học flutter`, `super app flutter`.

<!-- Playlist "Mini-App Flutter thuần 🇻🇳" chưa tạo — 5 tập chờ lệnh đăng -->

<!-- 5 tập đã đăng 2026-09-04, playlist "Mini-App Flutter thuần 🇻🇳": https://www.youtube.com/playlist?list=PLOjCSg9O8bRM -->

### Flutter Thuần #1 — Pub workspace: sổ đỏ chung cho cả khu chung cư Flutter (7:22)

**Tiêu đề:** Pub workspace Flutter thuần: sổ đỏ chung cho cả khu mini-app | Tập 1/5

**Mô tả:**
```
Kênh đã có bộ đôi: series React Native dùng npm workspaces, và series Flutter add-to-app nhúng vào app native — hôm nay mở mảnh cuối của bộ ba. Series MỚI "Mini-App Flutter thuần": không một dòng code native, không SwiftUI, không Kotlin — tất cả từ trên xuống dưới chỉ MỘT ngôn ngữ Dart. Ai đã xem series React Native workspace sẽ thấy công thức quen, chỉ đổi chất liệu.

Tập 1: pub workspace là gì — có từ Dart 3.5 (không phải bản mới ra), hiểu đơn giản là "npm workspaces bản Dart", nhiều package chia sẻ đúng MỘT pubspec.lock. Đọc TOÀN BỘ root pubspec.yaml (8 dòng: workspace: — apps/vietsuper) và resolution: workspace trong app con — dòng "xin gia nhập khu". Terminal: flutter create app chủ rồi pub get Ở GỐC, dòng Resolving dependencies in demo-flutter-workspace là bằng chứng resolve cả khu cùng lúc. Dựng home_shell.dart (NavigationBar 3 tab), home_screen.dart (class Service + lưới 4 ô "chờ khai trương" mờ 35%) và under_construction.dart dùng chung cho mọi tab chưa có tính năng thật.

Ẩn dụ xuyên suốt series mới: khu chung cư THUẦN Flutter — tòa nhà và căn hộ CÙNG một chất liệu, cả khu chỉ MỘT đồng hồ tổng, khác hẳn "mỗi căn hộ một đồng hồ riêng" của series add-to-app.

⏱️ NỘI DUNG:
0:00 Giới thiệu series Mini-App Flutter thuần
0:38 Pub workspace là gì — "npm workspaces bản Dart"
1:31 pubspec.yaml gốc & app: workspace + resolution
2:28 Terminal: tạo app chủ + pub get ở gốc
3:04 home_shell.dart & home_screen.dart: 3 tab, lưới 4 ô mờ
5:38 Ẩn dụ: khu THUẦN Flutter — 1 đồng hồ tổng
6:15 Nghiệm thu trên simulator
6:45 Tổng kết Tập 1 & hẹn Tập 2

📦 Source code (demo-flutter-workspace/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout flutter-workspace-tap-1 để xem đúng code tập này.
▶️ Series RN cũ "Mini-App từ A đến Z": https://www.youtube.com/playlist?list=PLY-i2_1YbKi4
▶️ Series Flutter add-to-app "Mini-App với Flutter 🇻🇳": https://www.youtube.com/playlist?list=PLL5FgtEBrD6g
⏭️ Tập sau: https://youtu.be/xj8lQHm53sM

#flutter #pubworkspace #miniapp #dart #laptrinh
```

**Comment ghim gợi ý:**
```
🧱 Sự thật ít ai để ý: pub workspace có từ Dart 3.5, không phải bản mới toanh — chỉ là SDK demo hôm nay ghi 3.10.9 vì đó là bản Dart đi kèm Flutter mới nhất. Bạn đã dùng pub workspace trong dự án thật chưa? Comment kể trải nghiệm nhé!
```

**Thumbnail:** badge "FLUTTER THUẦN 1/5" · dòng lớn "SỔ ĐỎ" / "CHUNG KHU" · phụ đề "Pub workspace · từ Dart 3.5" · badge emoji 🧱 · ảnh nền `screens/ep34/host-home-grid.png`.

**Tags:** `pub workspace, flutter monorepo, dart workspace, mini app flutter, flutter package, resolution workspace, pubspec.lock, flutter create, super app flutter, flutter tiếng việt, học flutter, npm workspaces vs dart, flutter cho người mới, dart 3.5, kiến trúc mini app, flutter dart, mini app tiếng việt`

---

### Flutter Thuần #2 — Căn hộ đầu tiên: mini_news và cú pháp 3 dòng gắn tab (6:54)

**Tiêu đề:** Flutter package mini_news: gắn mini-app vào tab chỉ 3 dòng | Tập 2/5

**Mô tả:**
```
Tập trước ta hứa xây CĂN HỘ ĐẦU TIÊN — đúng lời hứa, hôm nay căn hộ đó tên là mini_news. Một căn hộ Flutter thuần trong pub workspace cần đúng BA thứ: SỔ ĐỎ (pubspec.yaml với resolution: workspace), CỬA CHÍNH (lib/mini_news.dart chỉ export) và CĂN PHÒNG (NewsScreen tự túc data lẫn logic) — công thức quen từ series React Native, chỉ đổi chất liệu.

Đọc TOÀN BỘ pubspec.yaml của mini_news (đúng 10 dòng) — và một điểm reviewer hay bắt lỗi nhất: package KHÔNG khai flutter_test riêng mà test vẫn chạy được, nhờ cả khu dùng CHUNG một pubspec.lock (tách package ra ngoài thì phải tự khai lại). Rồi NewsScreen: class Article, 3 bài báo (một bài tự giới thiệu chính pub workspace, một bài nháy mắt "ViệtSuper sắp mở Đặt xe"), _read Set đánh dấu đã đọc, showModalBottomSheet trượt lên khi bấm vào bài.

Cú pháp ĐINH của tập: gắn vào app chủ chỉ cần dep mini_news: any THEO TÊN — không path, không workspace protocol, pub tự dò trong packages/. So 1 nhịp: bên React Native, package.json phải khai rõ "main" trỏ file; ở Flutter workspace thì không cần.

⏱️ NỘI DUNG:
0:00 Giới thiệu Tập 2 — căn hộ đầu tiên mini_news
0:27 Giải phẫu 1 căn hộ Flutter thuần: sổ đỏ, cửa chính, căn phòng
1:00 pubspec.yaml mini_news — vì sao không cần khai flutter_test
1:45 Cửa chính lib/mini_news.dart — 1 dòng export
2:10 NewsScreen: Article, 3 bài báo, sheet + đánh dấu Đã đọc
4:06 Gắn vào app chủ: mini_news: any + import + tab
5:53 Nghiệm thu trên simulator
6:19 Tổng kết Tập 2 & hẹn Tập 3

📦 Source code (demo-flutter-workspace/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout flutter-workspace-tap-2 để xem đúng code tập này.
⏮️ Tập trước: https://youtu.be/r50_ppA-Mgg
⏭️ Tập sau: https://youtu.be/1LW4a68HrVs

#flutter #dartpackage #miniapp #flutterdev #laptrinh
```

**Comment ghim gợi ý:**
```
🔒 Điểm reviewer hay hỏi nhất tập này: mini_news KHÔNG khai flutter_test riêng nhưng test vẫn chạy — vì cả khu dùng CHUNG một pubspec.lock. Tách package ra khỏi workspace thì phải tự khai lại đấy! Bạn đoán được vì sao trước khi xem chưa? Comment thử nhé.
```

**Thumbnail:** badge "FLUTTER THUẦN 2/5" · dòng lớn "CĂN HỘ" / "ĐẦU TIÊN" · phụ đề "mini_news · gắn tab 3 dòng" · badge emoji 📰 · ảnh nền `screens/ep35/host-tab-news.png`.

**Tags:** `flutter package, mini app flutter, pub workspace, dart export, resolution workspace, flutter_test, showmodalbottomsheet, flutter set, flutter tiếng việt, học flutter, dart workspace, flutter monorepo, flutter cho người mới, mini app tiếng việt, super app flutter, flutter dependency, package pub.dev`

---

### Flutter Thuần #3 — Cùng căn hộ, hai cửa: news_standalone ra ở riêng (5:57)

**Tiêu đề:** Chạy lẻ mini-app Flutter: cùng 1 package, hai cửa ra vào | Tập 3/5

**Mô tả:**
```
Tập trước ta hứa "căn hộ đã có người ở — tập sau cho ra ở riêng" — đúng lời hứa. Hôm nay: CÙNG một căn hộ mini_news, nhưng có HAI CỬA ra vào — cửa tab trong ViệtSuper, và cửa mới toanh: chạy độc lập. Chạy lẻ không phải trò biểu diễn — đó là quyền lợi kiến trúc thật: đội Tin tức không cần khởi động cả ViệtSuper chỉ để sửa một dòng NewsScreen; tốc độ, độc lập giữa các đội, và kiểm thử dễ khoanh vùng hơn.

Đọc TOÀN BỘ main.dart của news_standalone — đúng 21 dòng, một app vỏ Flutter mỏng dính: import package:mini_news/mini_news.dart theo TÊN, MaterialApp + Scaffold riêng, body: const NewsScreen() không sửa một dòng bên trong package. pubspec.yaml app vỏ vẫn resolution: workspace + mini_news: any, root pubspec chỉ thêm một dòng thành viên mới. Chạy fvm flutter run bình thường trong apps/news_standalone — không cờ đặc biệt, không FLUTTER_TARGET.

So 1 nhịp với series React Native: giống hệt triết lý food-standalone (Tập 22 bên đó) — vỏ mỏng, cửa chính theo tên, mọi ruột gan nằm nguyên trong package. Công thức XUYÊN CHẤT LIỆU, đổi ngôn ngữ vẫn dùng lại được nguyên vẹn.

⏱️ NỘI DUNG:
0:00 Giới thiệu Tập 3 — cùng căn hộ, hai cửa
0:25 Vì sao cho mini-app chạy lẻ — quyền lợi kiến trúc
1:04 main.dart news_standalone — toàn bộ 21 dòng
1:56 pubspec.yaml app vỏ + root pubspec thêm thành viên
2:56 Terminal chạy lẻ + sơ đồ một căn hộ hai cửa
4:02 Nghiệm thu: chạy solo trên simulator
4:25 So 1 nhịp với food-standalone (series React Native)
5:12 Tổng kết Tập 3 & hẹn Tập 4

📦 Source code (demo-flutter-workspace/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout flutter-workspace-tap-3 để xem đúng code tập này.
⏮️ Tập trước: https://youtu.be/xj8lQHm53sM
⏭️ Tập sau: https://youtu.be/n3E4QnWu2nk

#flutter #standalone #miniapp #dart #laptrinh
```

**Comment ghim gợi ý:**
```
🚪 Cùng một package mini_news, hai cửa ra vào: tab trong ViệtSuper, hoặc chạy lẻ news_standalone — sửa NewsScreen một lần, cả hai cửa cùng cập nhật. Y hệt triết lý food-standalone bên series React Native (Tập 22) — bạn còn nhớ tập đó không? Comment nhé!
```

**Thumbnail:** badge "FLUTTER THUẦN 3/5" · dòng lớn "HAI CỬA" / "MỘT MÃ" · phụ đề "news_standalone · ra ở riêng" · badge emoji 🚪 · ảnh nền `screens/ep36/standalone-news.png`.

**Tags:** `flutter standalone app, mini app flutter, pub workspace, flutter monorepo, chạy lẻ mini app, dart workspace, flutter run, flutter tiếng việt, học flutter, flutter package, kiến trúc mini app, super app flutter, flutter cho người mới, food standalone, react native vs flutter, flutter dart, mini app tiếng việt`

---

### Flutter Thuần #4 — Công thức lặp lại: mini_topup từ A đến Z (7:01)

**Tiêu đề:** Công thức lặp lại flutter monorepo: mini_topup từ A-Z | Tập 4/5

**Mô tả:**
```
Tập trước ta hứa lặp lại đúng công thức để xây căn hộ THỨ HAI — đúng lời hứa, hôm nay đi lại cả 4 bước một lần nữa. Đây không phải bài học kiến thức mới, đây là bài KIỂM CHỨNG: công thức có thật sự lặp lại được, hay chỉ đúng cho mỗi mini_news? Căn hộ mới: mini_topup — Nạp thẻ điện thoại, ba nhà mạng, ba mệnh giá. Luật chơi riêng của tập: KHÔNG sửa mini_news, KHÔNG sửa HomeShell ngoài đúng một chỗ.

Bước 1: packages/mini_topup — pubspec.yaml y hệt mini_news, chỉ đổi tên. Bước 2: topup_screen.dart — 3 state (_carrier, _amount, _done) và một biến SUY RA _canPay (đúng nguyên tắc derived đã học ở series React Native Tập 25); khối if (_done) early-return chuyển MỘT widget thành HAI bộ mặt: form ChoiceChip và màn cảm ơn, nút "Nạp thêm" reset ĐỦ BA state. Bước 3: tấm biển — thêm dep + 1 phần tử tab, không đụng mini_news. Bước 4: root pub get + chạy.

30 giây cuối: thú thật một hành vi có thật trong demo — chuyển tab rồi quay lại Nạp thẻ, form MẤT TRẮNG vì body: screens[_tab] dựng lại State mỗi lần đổi tab. Giải pháp chỉ tốn 1 dòng: IndexedStack(index: _tab, children: screens) — để bạn tự làm bài tập, KHÔNG sửa sẵn trong demo.

⏱️ NỘI DUNG:
0:00 Giới thiệu Tập 4 — công thức lặp lại
0:37 Bước 1: packages/mini_topup — pubspec y hệt mini_news
1:10 topup_screen.dart: data + 3 state + màn cảm ơn (early return)
2:24 Form: ChoiceChip Nhà mạng + Mệnh giá + nút Nạp thẻ
3:13 Bước 3 & 4: tấm biển dependency + tab + sổ đỏ chung
4:34 Chạy thử + nghiệm thu: 3 ảnh thật
5:26 Bài tập: 1 dòng IndexedStack giữ tab sống
6:12 Tổng kết Tập 4 & hẹn Tập 5

📦 Source code (demo-flutter-workspace/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout flutter-workspace-tap-4 để xem đúng code tập này.
⏮️ Tập trước: https://youtu.be/1LW4a68HrVs
⏭️ Tập sau: https://youtu.be/4jKNpIxPSTY

#flutter #flutterworkspace #miniapp #dart #laptrinh
```

**Comment ghim gợi ý:**
```
🧨 Thú thật ở cuối tập: chuyển tab rồi quay lại Nạp thẻ, form hiện đang MẤT TRẮNG (body: screens[_tab] dựng lại State mỗi lần đổi tab). 1 dòng IndexedStack(index: _tab, children: screens) là lời giải — bạn tự sửa trong home_shell.dart thử chưa? Comment kết quả nhé!
```

**Thumbnail:** badge "FLUTTER THUẦN 4/5" · dòng lớn "CÔNG THỨC" / "LẶP LẠI" · phụ đề "mini_topup · công thức lần 2" · badge emoji 📱 · ảnh nền `screens/ep37/host-tab-topup-success.png`.

**Tags:** `flutter monorepo, mini app flutter, pub workspace, choicechip flutter, flutter derived state, indexedstack flutter, flutter early return, dart workspace, flutter tiếng việt, học flutter, flutter package, super app flutter, flutter cho người mới, flutter statefulwidget, kiến trúc mini app, flutter dart, nạp thẻ app flutter`

---

### Flutter Thuần #5 (CUỐI) — mini_ride màn ngoài tab & tổng kết BỘ BA cách làm mini-app (8:59)

**Tiêu đề:** Mini-app Flutter thuần: cửa đẩy Navigator.push & tổng kết bộ ba | Tập 5/5

**Mô tả:**
```
Tập trước khép lại bằng lời hứa "tập cuối — căn hộ mở bằng CỬA ĐẨY, và một tổng kết lớn: BỘ BA cách làm mini-app trên kênh" — hôm nay trả đúng cả hai. Căn hộ cuối cùng: mini_ride — đặt xe, bảng giá 15.000/25.000/32.000đ mỗi km CÙNG số liệu với series React Native (cố tình lặp lại: công thức đổi, dữ liệu nghiệp vụ không đổi). Khác 3 căn hộ trước, mini_ride không đứng trong NavigationBar — nó mở bằng Navigator.push, một cửa ĐẨY như sảnh phụ trên nóc tòa nhà, có nút back tự nhiên, không cần thêm package router nào.

Đọc packages/mini_ride: class Ride + _selected/_total là biến SUY RA (derived, không phải state), stepper km dùng .clamp(1, 50). Tấm biển: Service.tabIndex giờ nullable — null nghĩa là "mở kiểu màn riêng"; onOpenRide gọi Navigator.of(context).push(MaterialPageRoute(...)) ngay trong HomeScreen, không đụng NavigationBar, không đụng mini_news hay mini_topup.

Rồi TỔNG KẾT BỘ BA cách làm mini-app trên kênh: (1) React Native — npm workspaces, gộp lúc BUILD bằng Metro bundler; (2) Flutter thuần — pub workspace, gộp lúc BUILD bằng Dart compiler, chính là series 5 tập vừa đi qua; (3) Flutter add-to-app — 2 dự án tách biệt, gộp lúc RUNTIME qua FlutterEngine. Xây MỚI hoàn toàn → chọn workspace (đơn giản nhất); đã có app native triệu người dùng → add-to-app.

⏱️ NỘI DUNG:
0:00 Giới thiệu Tập 5 — cửa đẩy & tổng kết bộ ba
0:36 mini_ride: cửa đẩy khác cửa tab, giá trùng series RN
1:18 Data + state: Ride, _selected, _total (derived)
2:51 Stepper km + tổng tiền
3:30 Tấm biển: tabIndex null + Navigator.push
4:38 Chạy thử + nghiệm thu mini_ride
5:36 Sơ đồ tổng khu + tổng kết BỘ BA cách làm mini-app
7:51 Lời kết series 5/5 & cảm ơn

📦 Source code (demo-flutter-workspace/): https://github.com/Leung190299/nestjs-tutorial-series
💡 Repo có tag theo từng tập (flutter-workspace-tap-1 → tap-5) — git checkout flutter-workspace-tap-5 để xem đúng code tập này.
⏮️ Tập trước: https://youtu.be/n3E4QnWu2nk
▶️ Series RN cũ "Mini-App từ A đến Z": https://www.youtube.com/playlist?list=PLY-i2_1YbKi4
▶️ Series Flutter add-to-app "Mini-App với Flutter 🇻🇳": https://www.youtube.com/playlist?list=PLL5FgtEBrD6g
💬 Vote series tiếp theo trong phần bình luận!

#flutter #navigator #miniapp #superapp #laptrinh
```

**Comment ghim gợi ý:**
```
🏆 Bộ ba cách làm mini-app đã trọn: React Native (npm workspaces, gộp lúc build), Flutter thuần (pub workspace, gộp lúc build — 5 tập vừa xong), Flutter add-to-app (2 dự án, gộp lúc runtime). Xây mới hoàn toàn thì chọn workspace, đã có app native thì chọn add-to-app. Comment vote series tiếp theo nên làm gì nhé — cảm ơn đã đi trọn cả 5 tập!
```

**Thumbnail:** badge "FLUTTER THUẦN 5/5" · dòng lớn "MẢNH CUỐI" / "BỘ BA" · phụ đề "mini_ride · cửa đẩy, không tab" · badge emoji 🏆 · ảnh nền `screens/ep38/host-grid-3-on.png`.

**Tags:** `flutter navigator push, materialpageroute, mini app flutter, pub workspace, flutter monorepo, dart workspace, flutter vs react native, flutter add-to-app vs workspace, so sánh mini app, flutter tiếng việt, học flutter, flutter package, super app flutter, flutter cho người mới, flutter derived state, kiến trúc mini app, flutter dart, đặt xe app flutter`

## Thumbnail

Đã render sẵn tại `video/out/thumbs/ep0X-thumb.png` (1280×720, <2MB, chuẩn YouTube). Muốn sửa chữ/bố cục: sửa mảng `thumbnails` trong `video/src/Root.tsx` hoặc component `video/src/Thumbnail.tsx`, rồi chạy `npx remotion still Thumb0X out/thumbs/ep0X-thumb.png`.

## Checklist khi đăng

1. Đăng theo thứ tự 1 → 4, mỗi video cách nhau 2–3 ngày (thuật toán thích đều đặn hơn dồn một lúc).
2. Tạo playlist "NestJS cho người mới bắt đầu 🇻🇳" ngay từ video 1, thêm từng tập vào.
3. Sau khi đăng đủ, quay lại điền toàn bộ `[LINK ...]` chéo giữa các mô tả.
4. Ghim comment đầu tiên ở mỗi video: link source code + mục lục chapters.
5. Bật phụ đề tự động tiếng Việt và rà lại các thuật ngữ (NestJS, Controller...) trong trình sửa phụ đề của YouTube.
6. End screen 20 giây cuối: thẻ "video tiếp theo" trỏ sang tập kế + thẻ subscribe.

## SERIES STYLEX — "StyleX từ A đến Z 🇻🇳" (so găng Tailwind, 6 tập)

> Playlist đích MỚI: **"StyleX từ A đến Z 🇻🇳"** — tạo khi đăng tập đầu tiên, thêm dần từng tập. Series web ĐẦU TIÊN của kênh (vertical), sau khi đã xong 3 series mobile Flutter/React Native. Học StyleX — thư viện style CSS-in-JS COMPILE-TIME của Meta (chạy thật trên facebook.com, Instagram), từ setup tới theming, mỗi tập ĐỀU so găng trực diện với Tailwind CSS. Ẩn dụ xuyên suốt: style = ĐỒNG PHỤC, `stylex.create()` = XƯỞNG MAY ĐO (may sẵn lúc build), Tailwind = TỦ ĐỒ may sẵn ghép tem, `defineVars` = bảng màu thương hiệu, theme = bộ sưu tập theo mùa. Code: `demo-stylex/` (repo `nestjs-tutorial-series`) — `vietsuper-web/` (StyleX) + `compare-tailwind/` (đối chứng Tailwind, dùng ở Tập 6). Mỗi tập có tag riêng `stylex-tap-N` — `git checkout stylex-tap-N` để xem đúng code của tập đang xem. Lưu ý xuyên suốt: bản dùng là StyleX v0.19, còn 0.x trên semver dù Meta đã chạy production quy mô khổng lồ.

<!-- Playlist "StyleX từ A đến Z 🇻🇳" chưa tạo — 6 tập chờ lệnh đăng -->

Từ khóa chủ lực toàn series: `stylex`, `stylex vs tailwind`, `css in js`, `atomic css`, `meta stylex`, `học tailwind`, `react styling`, `stylex tiếng việt`.

<!-- 6 tập đã đăng 2026-09-06, playlist "StyleX từ A đến Z 🇻🇳": https://www.youtube.com/playlist?list=PLONwK58GbR_M -->

### StyleX #1 — StyleX của Meta: may đo lúc build, setup Vite không vấp lỗi exports map (7:54)

**Tiêu đề:** StyleX của Meta: may đo CSS lúc build, setup Vite không vấp lỗi | StyleX từ A đến Z #1/6

**Mô tả:**
```
Kênh vừa xong 3 series mobile Flutter + React Native — hôm nay mở sang một hướng hoàn toàn mới: web, bằng chính thư viện style Meta dùng cho facebook.com và Instagram THẬT, không phải demo. StyleX là CSS-in-JS nhưng biên dịch ngay lúc BUILD — khác hẳn styled-components/Emotion chạy lúc RUNTIME trong trình duyệt. Nói thẳng: bản dùng là v0.19, vẫn 0.x trên semver dù Meta đã chạy production quy mô khổng lồ.

Ẩn dụ mở màn cho cả 6 tập: style là ĐỒNG PHỤC, stylex.create() là XƯỞNG MAY ĐO — may sẵn lúc build, không may tại chỗ; Tailwind là TỦ ĐỒ may sẵn, ghép nhiều tem thành 1 bộ. Setup thật từ Vite + React + TypeScript có sẵn, vấp và vượt qua 2 GOTCHA có thật: (1) làm đúng tài liệu stylex.vite(...) báo lỗi TypeScript vì package exports map sắp sai thứ tự — fix bằng import subpath '@stylexjs/unplugin/vite' + moduleResolution: bundler, StyleX plugin phải đứng TRƯỚC react(); (2) quên CSS entrypoint thủ công là build xong mà KHÔNG RA style nào. Rồi tokens.stylex.ts (nhắc nhẹ, chi tiết dành Tập 5) và Hero.tsx — create() + props() đầu tiên, chạy thật trên trình duyệt.

⏱️ NỘI DUNG:
0:00 Giới thiệu series StyleX từ A đến Z
0:37 StyleX là gì — CSS-in-JS compile-time
1:19 Atomic CSS: 1 rule, 1 thuộc tính
2:02 Cài đặt & GOTCHA 1: exports map sai thứ tự
3:14 Code: vite.config.ts, CSS entrypoint, tokens, Hero.tsx
5:52 Trang đầu tiên chạy StyleX thật
6:23 So găng #2: gõ sai class thì sao?
7:04 Tổng kết Tập 1 & hẹn Tập 2

📦 Source code (demo-stylex/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout stylex-tap-1 để xem đúng code tập này.
⏭️ Tập sau: https://youtu.be/rkWd_UpU7UM
▶️ 3 series mobile khác trên kênh: "Mini-App từ A đến Z" (https://www.youtube.com/playlist?list=PLY-i2_1YbKi4) · "Mini-App với Flutter" (https://www.youtube.com/playlist?list=PLL5FgtEBrD6g) · "Mini-App Flutter thuần" (https://www.youtube.com/playlist?list=PLOjCSg9O8bRM)

#stylex #tailwind #cssinjs #react #laptrinh
```

**Comment ghim gợi ý:**
```
🧵 2 gotcha THẬT đã vấp trong tập này: exports map sai thứ tự làm stylex.vite(...) không type-check (fix: import subpath '/vite' + moduleResolution: bundler), và quên CSS entrypoint là mất trắng style. Bạn dùng StyleX hay Tailwind cho dự án hiện tại? Comment cho mình biết nhé!
```

**Thumbnail:** badge "STYLEX 1/6" · dòng lớn "STYLEX" / "CỦA META" · phụ đề "Setup Vite không vấp — style may đo lúc build" · badge emoji 🧵 · ảnh nền `screens/ep39/web-hero-first-style.png`.

**Tags:** `stylex, stylex tiếng việt, học stylex, css in js, atomic css, meta stylex, stylex vs tailwind, tailwind vs stylex, stylex vite, stylex setup, react styling, css in js compile time, styled components vs stylex, exports map typescript, học tailwind, react tiếng việt, học react, web development tiếng việt`

---

### StyleX #2 — create() sâu: hover, media query và luật 'default' bắt buộc (6:43)

**Tiêu đề:** create() sâu: hover, media query & luật 'default' bắt buộc | StyleX từ A đến Z #2/6

**Mô tả:**
```
Tập 1 hứa hover, media query, và luật 'default bắt buộc' — Tập 2 mở đúng 3 thứ đó, đào sâu stylex.create(). Ẩn dụ vẫn vậy: style là ĐỒNG PHỤC, create() là XƯỞNG MAY ĐO — hôm nay may thêm bản 'khi chạm tay vào' và 'khi phòng đổi kích thước', ngay trong object, không cần file CSS riêng.

Code lấy từ Hero.tsx và ServiceGrid.tsx đã có ở Tập 1: nút CTA đổi backgroundColor {default, ':hover'} — pseudo-class là OBJECT chứ không phải selector viết tay; lưới dịch vụ đổi gridTemplateColumns {default, '@media (max-width: 720px)'} — responsive không viết 1 dòng CSS nào; card dịch vụ nhấc lên 4px lúc hover bằng boxShadow/transform. Luật quan trọng nhất tập: property có nhánh điều kiện BẮT BUỘC có key 'default' — quên là lỗi compile ngay, không đợi chạy thử. So găng: Tailwind dùng PREFIX (hover:bg-…, md:grid-cols-3) — ngắn gọn hơn nhưng gõ sai vẫn im lặng; StyleX object có kiểu, TypeScript báo lỗi ngay lúc gõ.

⏱️ NỘI DUNG:
0:00 Giới thiệu Tập 2
0:33 Pseudo-class: object, không phải selector
1:39 Media query responsive + code ServiceGrid & card hover
3:29 Luật: 'default' bắt buộc khi lồng điều kiện
4:00 So găng #3: prefix vs object có kiểu
4:46 Demo: responsive desktop ↔ mobile
5:19 Tổng kết: responsive không viết CSS
5:55 Tổng kết Tập 2 & hẹn Tập 3

📦 Source code (demo-stylex/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout stylex-tap-2 để xem đúng code tập này.
⏮️ Tập trước: https://youtu.be/J3PNg-rfqJQ
⏭️ Tập sau: https://youtu.be/fe17bxgY4Is

#stylex #tailwind #css #responsive #laptrinh
```

**Comment ghim gợi ý:**
```
📐 Luật dễ quên nhất tập này: property nào có nhánh điều kiện (:hover, @media) đều BẮT BUỘC có key 'default' — quên là StyleX từ chối biên dịch ngay, không đợi chạy thử mới biết. Bạn đã từng quên default khi lồng điều kiện chưa? Comment kể lỗi bạn gặp nhé!
```

**Thumbnail:** badge "STYLEX 2/6" · dòng lớn "HOVER &" / "MEDIA QUERY" · phụ đề "default bắt buộc khi lồng điều kiện" · badge emoji 📐 · ảnh nền `screens/ep40/web-responsive-desktop.png`.

**Tags:** `stylex hover, stylex media query, stylex create, pseudo class object, responsive css in js, stylex vs tailwind, atomic css, css in js, tailwind prefix, stylex default key, meta stylex, học stylex, stylex tiếng việt, react styling, css responsive tiếng việt, học tailwind, học react`

---

### StyleX #3 — props() và luật LAST-WINS: thứ tự gọi quyết định tất cả (6:50)

**Tiêu đề:** props() và luật LAST-WINS: thứ tự gọi quyết định tất cả | StyleX từ A đến Z #3/6

**Mô tả:**
```
Tập 2 kết ở lời hứa: luật quan trọng nhất StyleX là last-wins — tập này giải đúng luật đó bằng bằng chứng THỊ GIÁC. MergeDemo.tsx: cùng 2 style grey/brand, chỉ đảo THỨ TỰ tham số trong props() — dòng trên chữ ĐỎ (brand đứng sau thắng), dòng dưới chữ XÁM (grey đứng sau thắng). Không sửa 1 ký tự CSS, không đổi thứ tự file — chỉ đổi VỊ TRÍ tham số, kết quả đổi hẳn.

Giải thích rõ: đây KHÔNG phải CSS specificity, KHÔNG phải thứ tự file CSS sinh ra — chỉ là thứ tự bạn liệt kê tham số trong props(), style đứng SAU luôn thắng khi trùng property. Rồi conditional && và ternary (props tự bỏ giá trị falsy), và Button.tsx — 3 biến thể primary/ghost/danger tra bằng styles[variant], object key hợp lệ TypeScript. So găng: bên Tailwind ghép class điều kiện bằng clsx dễ ra 2 class xung đột cùng lúc — ai thắng tùy thứ tự Tailwind SINH file CSS, khó đoán; StyleX deterministic, luôn đứng sau trong props() thắng.

⏱️ NỘI DUNG:
0:00 Giới thiệu: luật last-wins
0:29 props(): ghép style, ai thắng? + code MergeDemo
1:37 Demo: đổi màu, đổi thứ tự — bằng chứng sống
2:06 Vì sao KHÔNG phải specificity + conditional && / ternary
3:17 Code: Button.tsx — base, primary, ghost, danger
4:51 Demo: 3 biến thể, 1 hàm Button
5:22 So găng #4: shorthand & clsx
6:02 Tổng kết Tập 3 & hẹn Tập 4

📦 Source code (demo-stylex/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout stylex-tap-3 để xem đúng code tập này.
⏮️ Tập trước: https://youtu.be/rkWd_UpU7UM
⏭️ Tập sau: https://youtu.be/DtyJl4cXgTQ

#stylex #tailwind #cssinjs #reactjs #laptrinh
```

**Comment ghim gợi ý:**
```
🥇 Đố vui last-wins: nếu viết stylex.props(styles.grey, styles.brand, styles.grey) — 3 style, grey xuất hiện CẢ ĐẦU LẪN CUỐI — chữ sẽ ra màu gì? Comment đáp án của bạn trước, đúng luật last-wins mình dạy trong tập là biết ngay ai thắng!
```

**Thumbnail:** badge "STYLEX 3/6" · dòng lớn "AI ĐỨNG SAU" / "NGƯỜI ĐÓ THẮNG" · phụ đề "props() và luật last-wins" · badge emoji 🥇 · ảnh nền `screens/ep41/web-merge-thumbcrop.png`.

**Tags:** `stylex props, last wins css, stylex last-wins, stylex vs tailwind, clsx conflict, css in js, atomic css, deterministic css, stylex button variant, stylex tiếng việt, học stylex, meta stylex, react styling, css specificity, học tailwind, học react, javascript ternary`

---

### StyleX #4 — Component mở cửa cho style ngoài: cross-file và bảng giá (6:39)

**Tiêu đề:** Component mở cửa cho style ngoài: cross-file style prop | StyleX từ A đến Z #4/6

**Mô tả:**
```
Tập 3 khép lại với lời hứa: Button sẽ mở cửa nhận style TỪ NGOÀI qua tham số cuối cùng — Tập 4 giữ đúng lời hứa. Button.tsx nhận prop style?: StyleXStyles — 1 type import thật từ '@stylexjs/stylex', khác hẳn nhận className: string tùy ý của React thường: TypeScript chỉ chấp nhận ĐÚNG kết quả từ stylex.create(), truyền nhầm là báo lỗi ngay lúc gõ code.

Bối cảnh sống: Pricing.tsx — bảng giá 3 gói, gói Ở GIỮA nổi bật cần nút bấm rộng hết cỡ khung. Chỉ 1 dòng style={styles.fullWidth} truyền từ Pricing sang Button — KHÔNG sửa 1 chữ nào trong Button.tsx. style đứng CUỐI trong props() nên style ngoài luôn thắng khi trùng property — thiết kế có chủ đích: người DÙNG component luôn thắng người VIẾT component. Kèm khái niệm local zero-cost (cùng file) vs cross-file minimal-cost (qua prop) của StyleX. So găng: Tailwind mở cửa bằng className: string — bất kỳ chuỗi nào cũng lọt qua, người viết component không kiểm soát được người dùng ghi đè gì; StyleX có TYPE + last-wins rõ ràng theo vị trí.

⏱️ NỘI DUNG:
0:00 Giới thiệu: style prop mở cửa
0:34 style prop: cửa có KHUNG + code type Props
1:42 Vị trí CUỐI = người dùng luôn thắng + code Button/Pricing
3:57 Demo: bảng giá — fullWidth thấy rõ bằng mắt
4:28 Fact: local zero-cost vs cross-file minimal-cost
5:10 So găng #5: className tự do vs style có TYPE
5:48 Tổng kết Tập 4 & hẹn Tập 5

📦 Source code (demo-stylex/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout stylex-tap-4 để xem đúng code tập này.
⏮️ Tập trước: https://youtu.be/fe17bxgY4Is
⏭️ Tập sau: https://youtu.be/7sURhHrKmaQ

#stylex #tailwind #reactcomponent #typescript #laptrinh
```

**Comment ghim gợi ý:**
```
🎟️ Điểm hay nhất tập này: style đứng CUỐI trong props() không phải tình cờ — là thiết kế CHỦ ĐÍCH để người DÙNG component luôn thắng người VIẾT component. Bạn có nghĩ đây là cách hay hơn className string tự do của Tailwind không? Comment quan điểm nhé!
```

**Thumbnail:** badge "STYLEX 4/6" · dòng lớn "STYLE TỪ" / "BÊN NGOÀI" · phụ đề "cross-file style prop & bảng giá" · badge emoji 🎟️ · ảnh nền `screens/ep42/web-pricing.png`.

**Tags:** `stylex style prop, stylexstyles type, cross file styling, stylex vs tailwind classname, css in js component, atomic css, stylex zero cost, react component styling, stylex pricing table, stylex tiếng việt, học stylex, meta stylex, typescript styling, học tailwind, react styling tiếng việt, học react, css architecture`

---

### StyleX #5 — Theming: token thương hiệu, dark mode trong token và theme Tết (7:47)

**Tiêu đề:** Theming StyleX: token thương hiệu, dark mode & theme Tết | StyleX từ A đến Z #5/6

**Mô tả:**
```
Tập 4 khép lại với lời hứa Tập 5 học theming — hôm nay tô màu cho cả cái xưởng, không may thêm áo nào mới. tokens.stylex.ts: defineVars() định nghĩa TOÀN BỘ bảng màu thương hiệu ở đúng 1 chỗ, dark mode nằm SẴN trong token bằng {default, [DARK]} — không cần sửa 1 dòng nào ở Hero, Button hay Pricing để có dark mode. themes.ts: createTheme() tạo theme Tết chỉ override 4 biến (bg vàng kem, brand đỏ gạch...) — text/textMuted KHÔNG override thì tự FALLBACK về giá trị gốc trong defineVars.

BEAT quan trọng nhất tập: override PHẲNG trong theme thắng TUYỆT ĐỐI cả @media gốc trong token — theme Tết LUÔN sáng bất kể hệ điều hành đang dark hay light, đây là hành vi CHỦ ĐÍCH chứ không phải lỗi. 3 ảnh browser đối chiếu: mặc định → ?theme=tet → dark mode thật (chụp qua Chrome DevTools Protocol — Emulation.setEmulatedMedia, không phải ảnh giả lập). So găng: Tailwind rải prefix dark: khắp mọi component; StyleX chỉ khai [DARK] ĐÚNG 1 LẦN trong token, mọi component tự động có dark mode.

⏱️ NỘI DUNG:
0:00 Giới thiệu: theming
0:32 defineVars: bảng màu thương hiệu + code tokens.stylex.ts
1:45 Trang mặc định — điểm xuất phát
2:10 Code: App.tsx đọc theme, theme Tết & fallback
4:33 Demo: ?theme=tet — 1 theme đổi cả trang
5:05 Beat: override phẳng thắng cả @media gốc
5:41 Dark mode thật — chụp qua DevTools Protocol
6:19 So găng #6 & Tổng kết Tập 5

📦 Source code (demo-stylex/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout stylex-tap-5 để xem đúng code tập này.
⏮️ Tập trước: https://youtu.be/DtyJl4cXgTQ
⏭️ Tập sau: https://youtu.be/7Q_YzL-o__8

#stylex #tailwind #darkmode #theming #laptrinh
```

**Comment ghim gợi ý:**
```
🧧 Câu hỏi hay nhất tập này: bật dark mode hệ điều hành trong lúc đang xem theme Tết, trang có đổi tối không? KHÔNG — theme Tết luôn sáng vì override PHẲNG thắng tuyệt đối @media gốc, đây là chủ đích chứ không phải bug. Bạn đoán đúng trước khi xem chưa? Comment nhé!
```

**Thumbnail:** badge "STYLEX 5/6" · dòng lớn "TOKEN, DARK MODE" / "VÀ THEME TẾT" · phụ đề "defineVars, createTheme & flat-override" · badge emoji 🧧 · ảnh nền `screens/ep43/web-theme-tet.png`.

**Tags:** `stylex theming, definevars stylex, createtheme stylex, stylex dark mode, css variables theming, stylex vs tailwind dark, atomic css, stylex tiếng việt, học stylex, meta stylex, dark mode tailwind vs stylex, css in js theme, react dark mode, học tailwind, react styling, theme tet app, học react`

---

### StyleX #6 (CUỐI) — So găng trực diện Tailwind vs StyleX: chọn gì cho dự án của bạn (7:38)

**Tiêu đề:** So găng trực diện Tailwind vs StyleX: 187 ký tự vs object có kiểu | StyleX #6/6

**Mô tả:**
```
Tập cuối: đặt 2 trình duyệt cạnh nhau — trái vietsuper-web (StyleX), phải compare-tailwind (Tailwind CSS v4) — CÙNG một Button, nhìn gần như y hệt nhau. Khác biệt không nằm ở giao diện, nằm ở CÁCH VIẾT: bên StyleX, style có kiểu StyleXStyles, gõ sai variant là đỏ gạch ngay trong editor; bên Tailwind, className chỉ khai kiểu string, gõ sai class vẫn compile bình thường, chỉ lộ ra khi chạy thật.

Đo THẬT trên demo nhỏ này (khung: không phải kết luận tổng quát cho mọi dự án): className dài nhất render ra DOM (nút Ghost) dài 187 ký tự bên Tailwind, còn StyleX chỉ ra vài atomic class hash ngắn ~8-9 ký tự; build production đo được CSS StyleX 4.41 kB vs Tailwind 12.26 kB — chênh chủ yếu do phần preflight CSS reset, Tailwind v4 tree-shake vốn đã rất tốt. Đối xứng 3 nhịp: Tailwind thắng khi cần prototype nhanh, ecosystem khổng lồ, không cần build-step; StyleX thắng khi cần type-safe thật, codebase lớn nhiều người viết, dedup triệt để, theming token built-in. Cả hai đều atomic CSS về bản chất — khác nhau ở cách viết và mức kiểm soát compiler. Kết series: repo đủ 6 tag stylex-tap-1 → stylex-tap-6, cảm ơn đã đi trọn hành trình.

⏱️ NỘI DUNG:
0:00 Giới thiệu: so găng trực diện
0:26 Demo: cùng 1 Button, hai cách viết
1:09 Code: type Props — StyleXStyles vs className string
2:34 Code: 3 variants — object lồng vs ternary chuỗi
3:33 CSS bundle: đo thật 4.41 kB vs 12.26 kB (demo nhỏ)
4:09 Giá trị động (CSS Variable) & debug className hash
5:07 Khi nào chọn Tailwind, khi nào chọn StyleX
6:11 Cả hai đều atomic — lời kết series 6/6

📦 Source code: https://github.com/Leung190299/nestjs-tutorial-series (demo-stylex/vietsuper-web/ + demo-stylex/compare-tailwind/)
💡 Repo có tag theo từng tập (stylex-tap-1 → stylex-tap-6) — git checkout stylex-tap-6 để xem đúng code tập này.
⏮️ Tập trước: https://youtu.be/7sURhHrKmaQ
▶️ Xem từ đầu series: https://youtu.be/J3PNg-rfqJQ
▶️ 3 series mobile khác trên kênh: "Mini-App từ A đến Z" (https://www.youtube.com/playlist?list=PLY-i2_1YbKi4) · "Mini-App với Flutter" (https://www.youtube.com/playlist?list=PLL5FgtEBrD6g) · "Mini-App Flutter thuần" (https://www.youtube.com/playlist?list=PLOjCSg9O8bRM)
💬 Vote series tiếp theo: Next.js kết hợp StyleX cho Server Components, hay một chủ đề web hoàn toàn khác?

#stylex #tailwind #cssinjs #webdev #laptrinh
```

**Comment ghim gợi ý:**
```
🥊 Số đo trên demo nhỏ này: 187 ký tự className (Tailwind) vs vài atomic hash ngắn (StyleX), CSS 4.41 kB vs 12.26 kB — KHÔNG phải kết luận tổng quát, dự án lớn hơn tỉ lệ có thể đổi khác. Series tiếp theo mình làm Next.js + StyleX cho Server Components, hay bạn muốn chủ đề web khác? Comment vote — càng nhiều comment, series mới lên sóng càng nhanh. Cảm ơn đã đi trọn 6 tập!
```

**Thumbnail:** badge "STYLEX 6/6" · dòng lớn "TAILWIND" / "HAY STYLEX" · phụ đề "So găng trực diện + tổng kết series" · badge emoji 🥊 · ảnh nền `screens/ep44/web-stylex-vs-tailwind-thumb.png`.

**Tags:** `stylex vs tailwind, tailwind vs stylex, css bundle size, atomic css comparison, css in js vs tailwind, stylex tailwind so sanh, meta stylex, stylex tiếng việt, học stylex, tailwind tiếng việt, học tailwind, react styling, css architecture, type safe css, web development tiếng việt, học react, so sánh framework css`

## SERIES PHỎNG VẤN FRONTEND — "Phỏng vấn Frontend 🇻🇳" (React & Vue, lô 1: 12 câu + 12 Shorts)

> Playlist: **"Phỏng vấn Frontend 🇻🇳"** — https://www.youtube.com/playlist?list=PLYvXt5cUP0yE (ĐÃ ĐĂNG 2026-09-08, đủ 24 video). Format MỚI hẳn so với các series trước: mỗi tập ngang là ĐÚNG MỘT câu hỏi phỏng vấn Frontend thật (6 câu React R1–R6, 6 câu Vue V1–V6) — nghe câu hỏi như nhà tuyển dụng hỏi, xem demo code chạy thật minh họa đúng bẫy/hành vi, rồi chốt lại cách trả lời 3 câu như đang ngồi trước người phỏng vấn. Code: `demo-fe-interview/` (`react-qa/` cổng 5197, `vue-qa/` cổng 5196), đóng băng ở tag `fe-qa-batch-1`. Mỗi câu ngang có kèm 1 bản Shorts 60 giây song song (bảng caption ở mục phụ cuối phần này). Ẩn dụ series: PHÒNG PHỎNG VẤN — người phỏng vấn hỏi, mình demo rồi chốt câu trả lời mẫu.

Từ khóa chủ lực toàn series: `phỏng vấn frontend`, `phỏng vấn react`, `phỏng vấn vue`, `react interview`, `vue interview`, `câu hỏi phỏng vấn react`, `câu hỏi phỏng vấn vue`, `frontend interview questions`, `học react`, `học vue`.

---

### Phỏng vấn FE #1 — Virtual DOM là gì? (2:40)

**Tiêu đề:** Phỏng vấn FE #1: Virtual DOM và Reconciliation là gì? | React interview

**Mô tả:**
```
Câu hỏi kinh điển nhất mọi buổi phỏng vấn React: Virtual DOM và reconciliation là gì? Video này mở màn series MỚI "Phỏng vấn Frontend" — 12 câu hỏi thật từ vòng phỏng vấn React và Vue, mỗi câu một video demo code chạy thật, không phải đọc slide.

Virtual DOM là bản sao NHẸ của DOM thật, sống hoàn toàn trong bộ nhớ JavaScript. Mỗi lần state đổi, React dựng cây Virtual DOM mới rồi diff với cây cũ — đó chính là reconciliation, thuật toán quyết định node nào giữ nguyên, node nào cần vá, xóa hay thêm mới. Kết quả diff chỉ áp đúng phần THẬT SỰ thay đổi lên DOM thật.

Demo thật bằng component R1VirtualDom.tsx: một ô hiển thị mốc thời gian gắn với `<span ref={staticRef}>` — bấm nút re-render 20 lần, mốc thời gian này KHÔNG NHÍCH, trong khi ô counter bên cạnh vẫn tăng đều theo từng click. Nếu React thật sự hủy và dựng lại toàn bộ DOM mỗi lần re-render, mốc thời gian phải đổi theo — nhưng nó đứng yên, bằng chứng sống của reconciliation.

Bẫy hay gặp: Virtual DOM KHÔNG phải lúc nào cũng nhanh hơn thao tác DOM trực tiếp — đây là CHIẾN LƯỢC tránh thao tác DOM tốn kém không cần thiết, không phải phép màu tốc độ tuyệt đối.

⏱️ NỘI DUNG:
0:00 Giới thiệu series Phỏng vấn Frontend & câu hỏi #1
0:25 Virtual DOM là gì? Reconciliation là gì?
0:51 Code: R1VirtualDom.tsx — mountedAt, useRef
1:23 Demo thật: DOM node tĩnh không remount
1:45 Trả lời như đi phỏng vấn: chốt 3 câu + bẫy
2:14 Tổng kết câu 1 & hẹn câu 2

📦 Source code (demo-fe-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout fe-qa-batch-1 để xem đúng code câu hỏi này.
⏭️ Câu tiếp theo: https://youtu.be/LdTBWvjazsU
📱 Bản Shorts 60 giây: https://youtu.be/h3Q1viZ34z8
▶️ 6 series khác trên kênh: "NestJS cho người mới bắt đầu" · "Super App với React Native" · "Mini-App từ A đến Z" (https://www.youtube.com/playlist?list=PLY-i2_1YbKi4) · "Mini-App với Flutter 🇻🇳" (https://www.youtube.com/playlist?list=PLL5FgtEBrD6g) · "Mini-App Flutter thuần 🇻🇳" (https://www.youtube.com/playlist?list=PLOjCSg9O8bRM) · "StyleX từ A đến Z 🇻🇳" (https://www.youtube.com/playlist?list=PLONwK58GbR_M)

#reactjs #phongvan #frontend #reactinterview #laptrinh
```

**Comment ghim gợi ý:**
```
🎤 Mở màn series Phỏng vấn Frontend: 12 câu hỏi thật từ React & Vue, mỗi câu một video demo chạy thật. Bẫy hay bị hỏi ngược ngay câu 1: Virtual DOM có phải LÚC NÀO CŨNG nhanh hơn thao tác DOM trực tiếp không? KHÔNG — đây là chiến lược tránh thao tác thừa, không phải phép màu tốc độ. Comment câu hỏi phỏng vấn Frontend khó nhất bạn từng gặp nhé!
```

**Thumbnail:** badge "PV FE #1" · dòng lớn "VIRTUAL DOM" / "LÀ GÌ?" · phụ đề "Phỏng vấn Frontend · Câu 1/12" · badge emoji 🎤 · ảnh nền `screens/feqa/r1-thumbcrop.png`.

**Tags:** `virtual dom, reconciliation, react interview, phỏng vấn react, phỏng vấn frontend, virtual dom là gì, react diff algorithm, useref react, react rerender, react tiếng việt, học react, frontend interview questions, câu hỏi phỏng vấn react, javascript interview, react cho người mới, web development tiếng việt`

---

### Phỏng vấn FE #2 — useState và useEffect khác nhau thế nào? (2:37)

**Tiêu đề:** Phỏng vấn FE #2: useState và useEffect khác nhau thế nào? | React interview

**Mô tả:**
```
Câu 2 trong series Phỏng vấn Frontend: useState và useEffect khác nhau thế nào — và vì sao thứ tự chạy của cleanup lại là bẫy hay bị hỏi ngược trong vòng phỏng vấn React.

useState giữ state nội bộ: gọi hàm set là React lên lịch re-render. useEffect đồng bộ với thứ NGOÀI React (fetch, subscribe, log...), luôn chạy SAU khi render xong — KHÔNG dùng để derive giá trị hiển thị. Cleanup (return trong effect) chạy TRƯỚC effect kế tiếp, và khi component unmount.

Demo thật bằng R2Effects.tsx: tăng count, log hiện đúng trình tự "effect chạy — count = 0" rồi ngay sau "cleanup chạy (trước lần sau) — count = 0" — thứ tự luôn là cleanup CŨ trước, effect MỚI sau, không bao giờ chạy trước render. Tắt component con, dòng cleanup cuối xuất hiện đúng lúc unmount.

Bẫy hay gặp: cleanup KHÔNG chỉ chạy khi unmount — nó chạy TRƯỚC MỌI effect kế tiếp, đây là điểm rất nhiều bạn trả lời sai khi bị hỏi ngược trong phỏng vấn.

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 2 & nhắc lại câu 1
0:21 useState vs useEffect là gì?
0:49 Code: R2Effects.tsx
1:19 Demo thật: log effect và cleanup đúng thứ tự
1:41 Trả lời như đi phỏng vấn: chốt 3 câu + bẫy
2:09 Tổng kết câu 2 & hẹn câu 3

📦 Source code (demo-fe-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout fe-qa-batch-1 để xem đúng code câu hỏi này.
⏮️ Câu trước: https://youtu.be/G5bCudY1jSU
⏭️ Câu tiếp theo: https://youtu.be/c325Ox2Ckro
📱 Bản Shorts 60 giây: https://youtu.be/GWwd2Vr51Wg

#reactjs #phongvan #frontend #reacthooks #laptrinh
```

**Comment ghim gợi ý:**
```
🎤 Đố nhỏ hay bị hỏi ngược trong phỏng vấn: cleanup trong useEffect chạy khi nào — CHỈ lúc component unmount, hay còn lúc nào khác? Video vừa chứng minh bằng log thật: cleanup chạy TRƯỚC MỖI effect kế tiếp, không chỉ khi unmount. Comment đáp án của bạn trước khi xem lại video nhé!
```

**Thumbnail:** badge "PV FE #2" · dòng lớn "USESTATE VÀ" / "USEEFFECT" · phụ đề "Phỏng vấn Frontend · Câu 2/12" · badge emoji 🎤 · ảnh nền `screens/feqa/r2-thumbcrop.png`.

**Tags:** `usestate, useeffect, react hooks, cleanup function react, react interview, phỏng vấn react, phỏng vấn frontend, dependency array react, react lifecycle, side effect react, react tiếng việt, học react, câu hỏi phỏng vấn react, frontend interview questions, react cho người mới, javascript interview`

---

### Phỏng vấn FE #3 — Vì sao list cần key? Bẫy key=index (2:34)

**Tiêu đề:** Phỏng vấn FE #3: Vì sao list cần key? Bẫy key=index | React interview

**Mô tả:**
```
Câu 3 trong series Phỏng vấn Frontend: vì sao React yêu cầu key cho mỗi phần tử trong list — và vì sao dùng index làm key lại là một trong những bẫy hay gặp nhất khi phỏng vấn React.

key giống như "chứng minh thư" của phần tử — React so sánh key cũ/mới giữa các lần render để quyết định: giữ nguyên, tạo mới hay xóa DOM node. Vấn đề của key={index}: chứng minh thư này đổi theo VỊ TRÍ trong mảng, chứ không gắn với chính phần tử — hễ list có thêm, xóa hay sắp xếp lại, React sẽ gắn nhầm DOM node và state (như giá trị input) sang phần tử khác.

Demo thật bằng R3KeyProp.tsx: xóa 1 dòng ở giữa danh sách món ăn có ghi chú — với key={index}, "Bánh mì" đột nhiên nhận ghi chú "phở", "Cơm tấm" nhận ghi chú "bánh" — SAI hoàn toàn. Đổi sang key={item} (giá trị ổn định của chính phần tử), xóa dòng y hệt nhưng ghi chú vẫn đi đúng theo món ăn của nó.

Bẫy hay gặp: đừng dùng Math.random() làm key — giá trị đổi mỗi lần render khiến React re-mount toàn bộ list và mất sạch state; key={index} chỉ tạm chấp nhận được khi list TĨNH, không bao giờ thêm/xóa/sắp xếp lại.

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 3
0:14 key là gì, tại sao quan trọng
0:40 Code: R3KeyProp.tsx
1:09 Demo thật: xóa 1 dòng, ghi chú nhảy sai chỗ
1:32 Trả lời như đi phỏng vấn: chốt 3 câu + bẫy
2:02 Tổng kết câu 3 & hẹn câu 4

📦 Source code (demo-fe-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout fe-qa-batch-1 để xem đúng code câu hỏi này.
⏮️ Câu trước: https://youtu.be/LdTBWvjazsU
⏭️ Câu tiếp theo: https://youtu.be/CVXBGZuNBZA
📱 Bản Shorts 60 giây: https://youtu.be/4oT6ToGBxcg
🔁 Bẫy y hệt bên Vue: câu 11 (:key trong v-for) — https://youtu.be/NWk2UURxG9Q

#reactjs #phongvan #frontend #reactkey #laptrinh
```

**Comment ghim gợi ý:**
```
🔑 Bẫy kinh điển nhất: key={index} chỉ AN TOÀN khi nào? Gợi ý: liên quan tới việc list có bao giờ bị thêm, xóa hay sắp xếp lại hay không. Comment câu trả lời của bạn — và nhớ đón câu 11 phần Vue xem bẫy y hệt lặp lại với :key trong v-for!
```

**Thumbnail:** badge "PV FE #3" · dòng lớn "ĐỪNG DÙNG" / "INDEX LÀM KEY" · phụ đề "Phỏng vấn Frontend · Câu 3/12" · badge emoji 🔑 · ảnh nền `screens/feqa/r3-thumbcrop.png`.

**Tags:** `react key prop, list key react, key index bug, reconciliation react, react interview, phỏng vấn react, phỏng vấn frontend, react list rendering, react tiếng việt, học react, câu hỏi phỏng vấn react, frontend interview questions, react cho người mới, javascript interview, react common mistakes`

---

### Phỏng vấn FE #4 — Controlled vs Uncontrolled component (2:52)

**Tiêu đề:** Phỏng vấn FE #4: Controlled vs Uncontrolled component | React interview

**Mô tả:**
```
Câu 4 trong series Phỏng vấn Frontend: Controlled và Uncontrolled component khác nhau ra sao — và vì sao một nút bấm chỉ tác động được MỘT trong hai kiểu input.

Controlled: React state giữ giá trị, input chỉ hiển thị đúng state — value + onChange, mỗi lần gõ là một vòng render, React luôn biết giá trị hiện tại. Uncontrolled: DOM tự giữ giá trị, React không theo dõi từng ký tự gõ — đọc giá trị qua ref khi cần, không tự động đồng bộ theo từng lần gõ.

Demo thật bằng R4Controlled.tsx: bấm nút UPPERCASE, ô controlled đổi ngay thành chữ HOA vì state thay đổi kéo theo re-render; ô uncontrolled đứng yên hoàn toàn vì DOM tự quản, React không hề can thiệp vào giá trị đó.

Bẫy hay gặp: đổi value của input từ undefined sang có giá trị GIỮA CHỪNG sẽ khiến React cảnh báo "chuyển từ uncontrolled sang controlled". Và một ý thực tế: form lớn không cần ép TẤT CẢ input đều controlled — uncontrolled kết hợp FormData lúc submit vẫn là cách hợp lệ, nhẹ hơn.

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 4
0:17 Controlled vs Uncontrolled là gì
0:42 Code: R4Controlled.tsx
1:21 Demo thật: UPPERCASE chỉ ăn một bên
1:50 Trả lời như đi phỏng vấn: chốt 3 câu + bẫy
2:21 Tổng kết câu 4 & hẹn câu 5

📦 Source code (demo-fe-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout fe-qa-batch-1 để xem đúng code câu hỏi này.
⏮️ Câu trước: https://youtu.be/c325Ox2Ckro
⏭️ Câu tiếp theo: https://youtu.be/IOT05xjnJ1g
📱 Bản Shorts 60 giây: https://youtu.be/Ho_w13OlYbQ

#reactjs #phongvan #frontend #reactforms #laptrinh
```

**Comment ghim gợi ý:**
```
🎛️ Câu hỏi ngược hay bị hỏi thêm: một form có 20 input, có BẮT BUỘC phải controlled hết không? Gợi ý: uncontrolled kết hợp FormData lúc submit vẫn là lựa chọn hợp lệ, nhẹ hơn nhiều. Comment quan điểm của bạn — bạn thường chọn kiểu nào cho form thật?
```

**Thumbnail:** badge "PV FE #4" · dòng lớn "CONTROLLED VS" / "UNCONTROLLED" · phụ đề "Phỏng vấn Frontend · Câu 4/12" · badge emoji 🎛️ · ảnh nền `screens/feqa/r4-thumbcrop.png`.

**Tags:** `controlled component, uncontrolled component, react forms, react ref, value onchange react, react interview, phỏng vấn react, phỏng vấn frontend, react form validation, react tiếng việt, học react, câu hỏi phỏng vấn react, frontend interview questions, react cho người mới, javascript interview`

---

### Phỏng vấn FE #5 — React.memo, useMemo, useCallback — khi nào cần? (2:56)

**Tiêu đề:** Phỏng vấn FE #5: React.memo, useMemo, useCallback khi nào cần? | React interview

**Mô tả:**
```
Câu 5 trong series Phỏng vấn Frontend: React.memo, useMemo, useCallback khi nào thật sự cần — và khi nào chỉ tổ làm chậm thêm.

React.memo bỏ qua re-render nếu props không đổi — nhưng chỉ so sánh NÔNG (shallow compare). Object literal viết thẳng trong JSX luôn là object MỚI mỗi render, khiến memo vô dụng. useMemo giữ nguyên reference giá trị qua các lần render miễn dependency không đổi; useCallback chính là useMemo dành cho hàm, hợp khi truyền function cho component đã memo hóa.

Demo thật bằng R5Memo.tsx: khi cha truyền object literal mới mỗi render, con render tới 6 lần (1 lần mount + 5 lần re-render) — memo hoàn toàn vô dụng. Đổi sang truyền object qua useMemo giữ nguyên reference, con chỉ render đúng 1 lần dù cha re-render 5 lần — memo hoạt động thật sự.

Bẫy hay gặp: đừng memo mọi thứ — so sánh props cũng tốn chi phí, lạm dụng có thể chậm hơn không memo. Nguyên tắc vàng: đo bằng Profiler trước khi tối ưu, đừng đoán. Ghi chú 2026: React Compiler đã tự động memo hóa lúc build, nhưng hiểu bản chất shallow compare vẫn rất cần thiết khi phỏng vấn.

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 5
0:21 React.memo / useMemo / useCallback là gì
0:50 Code: R5Memo.tsx
1:24 Demo thật: object literal phá memo, useMemo cứu memo
1:50 Trả lời như đi phỏng vấn: chốt + bẫy + React Compiler 2026
2:27 Tổng kết câu 5 & hẹn câu 6

📦 Source code (demo-fe-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout fe-qa-batch-1 để xem đúng code câu hỏi này.
⏮️ Câu trước: https://youtu.be/CVXBGZuNBZA
⏭️ Câu tiếp theo: https://youtu.be/ci3l-FV3RUA
📱 Bản Shorts 60 giây: https://youtu.be/VdXXu3QaSkc

#reactjs #phongvan #frontend #reactperformance #laptrinh
```

**Comment ghim gợi ý:**
```
🧠 Bẫy dễ sập nhất câu này: React.memo có tự động ăn khi component con nhận PROP LÀ OBJECT không? Video vừa chứng minh bằng con số thật: 6 lần render (object literal) vs 1 lần render (useMemo). Comment bạn đã từng dính bẫy này trong dự án thật chưa!
```

**Thumbnail:** badge "PV FE #5" · dòng lớn "REACT.MEMO" / "CÓ THẬT SỰ ĂN?" · phụ đề "Phỏng vấn Frontend · Câu 5/12" · badge emoji 🧠 · ảnh nền `screens/feqa/r5-thumbcrop.png`.

**Tags:** `react.memo, usememo, usecallback, shallow compare react, react performance, react interview, phỏng vấn react, phỏng vấn frontend, react profiler, react compiler, react tiếng việt, học react, câu hỏi phỏng vấn react, frontend interview questions, react cho người mới, tối ưu react`

---

### Phỏng vấn FE #6 — Custom Hook là gì, viết thế nào? (2:55)

**Tiêu đề:** Phỏng vấn FE #6: Custom Hook là gì, viết thế nào? | React interview

**Mô tả:**
```
Câu 6 — câu cuối cùng phần React trong series Phỏng vấn Frontend: Custom Hook là gì, và làm sao để tách logic tái sử dụng giữa nhiều component.

Custom hook chỉ là một hàm JS thường, với quy ước bắt buộc: tên bắt đầu bằng "use". Bên trong gọi các hook có sẵn (useState, useEffect...) để gói logic stateful, tái dùng ở nhiều nơi. Nó KHÔNG phải component — không trả JSX, chỉ trả data hoặc hàm. Và mỗi component gọi hook đó có state RIÊNG, không phải kho state dùng chung.

Demo thật bằng R6CustomHook.tsx (useDebouncedValue): gõ chữ, giá trị tức thời cập nhật ngay lập tức, nhưng giá trị debounce vẫn giữ nguyên chuỗi cũ vì chưa đủ 500ms kể từ lần gõ cuối — bằng chứng sống rằng custom hook chỉ gói lại logic setTimeout + cleanup, không phải phép màu.

Bẫy hay gặp: custom hook KHÔNG share STATE giữa các component gọi nó — nó chỉ share LOGIC (cách làm). Muốn share state thật giữa nhiều component, phải dùng Context hoặc một store riêng (Zustand, Redux...).

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 6 — khép phần React
0:19 Custom hook là gì
0:45 Code: R6CustomHook.tsx — useDebouncedValue
1:19 Demo thật: giá trị tức thời vs debounce 500ms
1:45 Trả lời như đi phỏng vấn: chốt 3 câu + bẫy
2:20 Tổng kết 6 câu React & chuyển sang phần Vue

📦 Source code (demo-fe-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout fe-qa-batch-1 để xem đúng code câu hỏi này.
⏮️ Câu trước: https://youtu.be/IOT05xjnJ1g
⏭️ Câu tiếp theo (mở đầu phần Vue): https://youtu.be/oaEsQQa45pw
📱 Bản Shorts 60 giây: https://youtu.be/78iuviICHpo

#reactjs #phongvan #frontend #customhook #laptrinh
```

**Comment ghim gợi ý:**
```
🪝 Câu hỏi ngược rất hay bị hỏi thêm: custom hook có SHARE STATE giữa các component gọi nó không? Nhiều bạn trả lời sai câu này khi phỏng vấn — đúng ra nó chỉ share LOGIC (cách làm), không share STATE. Comment đáp án của bạn kèm lý do nhé!
```

**Thumbnail:** badge "PV FE #6" · dòng lớn "CUSTOM HOOK" / "LÀ GÌ?" · phụ đề "Phỏng vấn Frontend · Câu 6/12" · badge emoji 🪝 · ảnh nền `screens/feqa/r6-thumbcrop.png`.

**Tags:** `custom hook react, react hooks, use hook naming convention, usedebouncedvalue, react interview, phỏng vấn react, phỏng vấn frontend, tái sử dụng logic react, react tiếng việt, học react, câu hỏi phỏng vấn react, frontend interview questions, react cho người mới, javascript interview, debounce react`

---

### Phỏng vấn FE #7 — Ref và reactive khác nhau thế nào? (2:59)

**Tiêu đề:** Phỏng vấn FE #7: Ref và reactive khác nhau thế nào? | Vue interview

**Mô tả:**
```
Câu 7 — mở đầu phần Vue trong series Phỏng vấn Frontend: ref và reactive khác nhau thế nào, và vì sao destructure từ reactive lại làm mất reactivity — một bẫy tinh vi bậc nhất của Vue 3.

ref bọc MỌI kiểu giá trị (kể cả primitive) trong object có .value — template tự unwrap nên không cần .value ở đó. reactive chỉ nhận object/array, tạo Proxy SÂU, truy cập trực tiếp property, không có .value. Luật quan trọng: destructure khỏi reactive là LẤY GIÁ TRỊ tại đúng thời điểm đó, MẤT liên kết Proxy — biến local không còn được Vue track nữa.

Demo thật bằng V1RefReactive.vue: bấm "Tăng bản destructure" liên tiếp 3 lần — UI ĐỨNG IM HOÀN TOÀN, cả reactive.count lẫn biến destructure đều hiển thị 0. Nhưng chỉ 1 lần bấm "Tăng reactive.count" ngay sau đó, UI re-render vì lý do khác và LỘ RA giá trị ngầm: biến destructure nhảy thẳng lên 3! Giá trị vẫn tăng thật trong closure suốt 3 lần bấm trước, chỉ là ẩn tới khi có render khác kích hoạt — không hề đứng yên mãi mãi như nhiều người lầm tưởng.

Bẫy hay gặp: muốn destructure an toàn, dùng toRefs(state) để tách từng property thành ref riêng (hoặc storeToRefs(store) nếu dùng Pinia) — giữ nguyên khả năng theo dõi.

⏱️ NỘI DUNG:
0:00 Giới thiệu phần Vue & câu 7
0:23 ref vs reactive là gì
0:55 Code: V1RefReactive.vue (script setup)
1:31 Demo thật: destructure đứng im, reactive lộ giá trị ngầm
2:03 Trả lời như đi phỏng vấn: chốt + toRefs
2:33 Tổng kết câu 7 & hẹn câu 8

📦 Source code (demo-fe-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout fe-qa-batch-1 để xem đúng code câu hỏi này.
⏮️ Câu trước: https://youtu.be/ci3l-FV3RUA
⏭️ Câu tiếp theo: https://youtu.be/iToDJGcGcaE
📱 Bản Shorts 60 giây: https://youtu.be/iO0QsuHiqbw

#vuejs #phongvan #frontend #vuereactivity #laptrinh
```

**Comment ghim gợi ý:**
```
💚 Bẫy tinh vi nhất phần Vue: bấm nút "destructure" liên tiếp 3 lần, UI đứng im — vậy giá trị bên trong có THẬT SỰ không đổi? KHÔNG — nó vẫn tăng NGẦM trong closure, chỉ chờ dịp render khác kích hoạt để lộ ra. Comment bạn đoán đúng cơ chế này trước khi xem hết video chưa!
```

**Thumbnail:** badge "PV FE #7" · dòng lớn "REF VS" / "REACTIVE" · phụ đề "Phỏng vấn Frontend · Câu 7/12" · badge emoji 💚 · ảnh nền `screens/feqa/v1-thumbcrop.png`.

**Tags:** `vue ref vs reactive, reactive proxy vue, torefs vue, destructure reactivity, vue interview, phỏng vấn vue, phỏng vấn frontend, vue 3 composition api, vue reactivity system, vue tiếng việt, học vue, câu hỏi phỏng vấn vue, frontend interview questions, vue cho người mới, javascript interview`

---

### Phỏng vấn FE #8 — Options API và Composition API khác nhau thế nào? (2:55)

**Tiêu đề:** Phỏng vấn FE #8: Options API vs Composition API | Vue interview

**Mô tả:**
```
Câu 8 phần Vue trong series Phỏng vấn Frontend: Options API và Composition API khác nhau thế nào, và khi nào nên dùng cái nào.

Options API tổ chức code theo LOẠI — data()/methods/computed tách khối riêng, quen thuộc với Vue 2. Composition API tổ chức theo TÍNH NĂNG trong <script setup> — dễ tái dùng qua composable, TypeScript tốt hơn. Cùng một counter, cùng hành vi, chỉ khác cách tổ chức code — hoàn toàn KHÔNG khác kết quả.

Demo thật: hai component chạy song song. OptionsCounter.vue viết bằng data()/methods thuần, bên cạnh V2ApiStyles.vue viết bằng <script setup> gộp logic theo feature — bấm +1 (Options) chỉ tăng counter của nó, bấm +1 (Composition) chỉ tăng counter kia, hoàn toàn độc lập nhau trong cùng một trang.

Bẫy hay gặp: nhiều người nghĩ Options API đã lỗi thời — SAI, Vue 3 vẫn hỗ trợ đầy đủ, hai API dùng CHUNG được trong một project. Dự án mới nên ưu tiên Composition API vì composable và TypeScript tốt hơn, nhưng đừng bao giờ trộn hai style trong CÙNG MỘT component.

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 8
0:24 Options API vs Composition API là gì
0:54 Code: OptionsCounter.vue (Options API)
1:13 Code: V2ApiStyles.vue (Composition API, script setup)
1:33 Demo thật: 2 counter chạy song song, độc lập
2:01 Trả lời như đi phỏng vấn: chốt + đừng trộn 2 style
2:29 Tổng kết câu 8 & hẹn câu 9

📦 Source code (demo-fe-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout fe-qa-batch-1 để xem đúng code câu hỏi này.
⏮️ Câu trước: https://youtu.be/oaEsQQa45pw
⏭️ Câu tiếp theo: https://youtu.be/SPCXsjvpS3k
📱 Bản Shorts 60 giây: https://youtu.be/bInrH9l16UA

#vuejs #phongvan #frontend #vuecomposition #laptrinh
```

**Comment ghim gợi ý:**
```
🧩 Câu hỏi hay bị hỏi thêm: Options API có LỖI THỜI không, có nên bỏ hẳn không trong dự án mới? Video vừa chứng minh 2 style chạy y hệt nhau, độc lập, trong cùng một trang. Comment bạn đang theo style nào trong dự án thật — Options hay Composition?
```

**Thumbnail:** badge "PV FE #8" · dòng lớn "OPTIONS VS" / "COMPOSITION" · phụ đề "Phỏng vấn Frontend · Câu 8/12" · badge emoji 🧩 · ảnh nền `screens/feqa/v2-thumbcrop.png`.

**Tags:** `options api vs composition api, vue 3, script setup, vue composable, vue interview, phỏng vấn vue, phỏng vấn frontend, vue component styles, vue tiếng việt, học vue, câu hỏi phỏng vấn vue, frontend interview questions, vue cho người mới, typescript vue, vue migration`

---

### Phỏng vấn FE #9 — computed vs watch vs watchEffect khác nhau thế nào? (2:34)

**Tiêu đề:** Phỏng vấn FE #9: computed vs watch vs watchEffect | Vue interview

**Mô tả:**
```
Câu 9 phần Vue trong series Phỏng vấn Frontend: computed, watch và watchEffect khác nhau thế nào, khi nào dùng cái nào.

computed là giá trị DẪN XUẤT, có CACHE — chỉ tính lại khi dependency đổi, dùng cho giá trị hiển thị. watch theo dõi nguồn CỤ THỂ, LAZY — có oldValue/newValue, hợp cho side-effect có chủ đích (gọi API...). watchEffect tự thu thập mọi dependency, chạy NGAY lần đầu (eager), rồi chạy lại khi có gì đổi.

Demo thật bằng V3ComputedWatch.vue: template đọc {{tongTien}} tới 3 lần liên tiếp nhưng bộ đếm chỉ ghi nhận đã tính lại đúng 5 lần suốt phiên — computed CACHE thật sự, không tính thêm mỗi lần đọc. Song song đó, watchEffect chạy ngay từ km=10 lúc mount (eager), trong khi watch chỉ ghi log SAU khi km thật sự đổi (lazy, có oldValue → newValue rõ ràng).

Bẫy hay gặp: computed PHẢI PURE — đếm số lần tính lại trong demo chỉ để minh họa cơ chế, đừng nhét async hay side-effect thật vào computed. watchEffect chạy ngay từ đầu nên rất dễ gây bất ngờ nếu không lường trước.

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 9
0:16 computed vs watch vs watchEffect là gì
0:47 Code: V3ComputedWatch.vue (script setup)
1:13 Demo thật: computed cache, watch lazy, watchEffect eager
1:43 Trả lời như đi phỏng vấn: chốt + computed phải pure
2:14 Tổng kết câu 9 & hẹn câu 10

📦 Source code (demo-fe-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout fe-qa-batch-1 để xem đúng code câu hỏi này.
⏮️ Câu trước: https://youtu.be/iToDJGcGcaE
⏭️ Câu tiếp theo: https://youtu.be/S8QgWBGQt4w
📱 Bản Shorts 60 giây: https://youtu.be/7FGQlsWoxKw

#vuejs #phongvan #frontend #vuewatch #laptrinh
```

**Comment ghim gợi ý:**
```
🔁 Đố nhỏ trước khi xem: đọc {{tongTien}} 3 lần liên tiếp trong template, computed có TÍNH LẠI 3 lần không? Video vừa đo bằng bộ đếm thật — đáp án nằm ở đúng khái niệm CACHE. Comment dự đoán của bạn trước khi kéo tới đoạn demo nhé!
```

**Thumbnail:** badge "PV FE #9" · dòng lớn "COMPUTED VS" / "WATCH" · phụ đề "Phỏng vấn Frontend · Câu 9/12" · badge emoji 🔁 · ảnh nền `screens/feqa/v3-thumbcrop.png`.

**Tags:** `computed vue, watch vue, watcheffect vue, vue reactivity, vue interview, phỏng vấn vue, phỏng vấn frontend, vue derived state, vue side effect, vue tiếng việt, học vue, câu hỏi phỏng vấn vue, frontend interview questions, vue cho người mới, javascript interview`

---

### Phỏng vấn FE #10 — v-if và v-show khác nhau thế nào? (2:30)

**Tiêu đề:** Phỏng vấn FE #10: v-if và v-show khác nhau thế nào? | Vue interview

**Mô tả:**
```
Câu 10 phần Vue trong series Phỏng vấn Frontend: v-if và v-show khác nhau thế nào, khi nào dùng cái nào.

v-if thêm/xóa HẲN phần tử khỏi DOM — ẩn là unmount thật, mọi state con (như chữ đã gõ trong input) bị hủy sạch. Chi phí TOGGLE của v-if khá cao vì tạo lại mỗi lần, nhưng bù lại lazy và hỗ trợ v-else/v-else-if. v-show thì LUÔN render, tồn tại sẵn trong DOM — toggle chỉ đổi CSS display, state giữ nguyên; render ban đầu tốn hơn chút nhưng TOGGLE mỗi lần cực RẺ.

Demo thật bằng V4IfShow.vue: gõ chữ vào cả hai ô, ẩn rồi hiện lại — ô dùng v-if TRỐNG TRƠN vì phần tử vừa unmount rồi mount lại từ đầu; ô dùng v-show vẫn giữ nguyên nội dung đã gõ, vì phần tử không hề bị hủy, chỉ CSS display:none che đi tạm thời.

Bẫy hay gặp: v-show KHÔNG dùng chung được với v-else, và KHÔNG áp dụng được trên thẻ <template>. Quy tắc chọn: toggle THƯỜNG XUYÊN thì dùng v-show cho rẻ; điều kiện ít đổi hoặc nội dung nặng thì dùng v-if để lazy-init.

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 10
0:16 v-if vs v-show là gì
0:46 Code: V4IfShow.vue (template)
1:12 Demo thật: v-if mất chữ, v-show giữ chữ
1:36 Trả lời như đi phỏng vấn: chốt + quy tắc chọn
2:06 Tổng kết câu 10 & hẹn câu 11

📦 Source code (demo-fe-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout fe-qa-batch-1 để xem đúng code câu hỏi này.
⏮️ Câu trước: https://youtu.be/SPCXsjvpS3k
⏭️ Câu tiếp theo: https://youtu.be/NWk2UURxG9Q
📱 Bản Shorts 60 giây: https://youtu.be/mOfndGObbpk

#vuejs #phongvan #frontend #vueif #laptrinh
```

**Comment ghim gợi ý:**
```
🎭 Câu hỏi ngược hay bị hỏi thêm: v-show có dùng chung được với v-else không? Nhiều bạn trả lời "có" vì tưởng nó giống hệt v-if — thực ra KHÔNG, v-show không hỗ trợ v-else/v-else-if. Comment đáp án đúng của bạn kèm lý do nhé!
```

**Thumbnail:** badge "PV FE #10" · dòng lớn "V-IF VS" / "V-SHOW" · phụ đề "Phỏng vấn Frontend · Câu 10/12" · badge emoji 🎭 · ảnh nền `screens/feqa/v4-thumbcrop.png`.

**Tags:** `v-if vs v-show, vue directive, vue conditional rendering, vue dom, vue interview, phỏng vấn vue, phỏng vấn frontend, vue performance, vue tiếng việt, học vue, câu hỏi phỏng vấn vue, frontend interview questions, vue cho người mới, javascript interview, vue toggle state`

---

### Phỏng vấn FE #11 — :key trong v-for — vì sao không dùng index? (2:43)

**Tiêu đề:** Phỏng vấn FE #11: :key trong v-for, vì sao không dùng index? | Vue interview

**Mô tả:**
```
Câu 11 phần Vue trong series Phỏng vấn Frontend: :key trong v-for là gì, vì sao quan trọng — bẫy y hệt câu 3 phía React (key={index}), giờ lặp lại nguyên vẹn trong thế giới Vue.

:key cũng là "chứng minh thư" của phần tử — Vue diff cây cũ/mới y hệt React. Nếu thiếu key ổn định, Vue sẽ patch theo VỊ TRÍ (in-place), rất dễ nhận nhầm node. :key="index" đổi theo VỊ TRÍ trong mảng — hễ list có thêm, xóa hay sắp xếp lại là gắn nhầm, hậu quả y hệt: DOM node và state con (như giá trị input) bị tái sử dụng SAI chỗ.

Demo thật bằng V5KeyVFor.vue: xóa 1 dòng ở giữa danh sách món ăn có ghi chú — với :key="index", "Bánh mì" đột nhiên nhận ghi chú "phở", y hệt bẫy đã thấy ở câu R3 phía React. Đổi sang :key="item" (giá trị ổn định của chính phần tử), xóa dòng y hệt nhưng ghi chú vẫn đi đúng theo món ăn của nó.

Bẫy hay gặp: cùng MỘT LUẬT cho cả 2 framework — học một lần, dùng được ở cả hai nơi. Đừng dùng index làm key khi list có khả năng thêm, xóa hay sắp xếp lại.

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 11
0:18 :key trong v-for là gì, tại sao quan trọng
0:46 Code: V5KeyVFor.vue (template)
1:13 Demo thật: xóa 1 dòng, ghi chú nhảy sai chỗ — y hệt bẫy R3
1:38 Trả lời như đi phỏng vấn: chốt + cùng luật với React
2:09 Tổng kết câu 11 & hẹn câu 12 — câu cuối lô 1

📦 Source code (demo-fe-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout fe-qa-batch-1 để xem đúng code câu hỏi này.
⏮️ Câu trước: https://youtu.be/S8QgWBGQt4w
⏭️ Câu tiếp theo: https://youtu.be/usOtTYN2KB0
📱 Bản Shorts 60 giây: https://youtu.be/f0LmsVkoAGs
🔁 Bẫy y hệt bên React: câu 3 (key trong list) — https://youtu.be/c325Ox2Ckro

#vuejs #phongvan #frontend #vuekey #laptrinh
```

**Comment ghim gợi ý:**
```
🗝️ Y hệt bẫy R3 bên React ở câu 3 — bạn còn nhớ ghi chú "nhảy sai chỗ" không? :key="index" sập bẫy y hệt khi list bị thêm, xóa hay sắp xếp lại — một luật, áp dụng được cả hai framework. Comment nếu bạn nhận ra ngay từ đầu video là "y hệt câu 3" nhé!
```

**Thumbnail:** badge "PV FE #11" · dòng lớn ":KEY TRONG" / "V-FOR" · phụ đề "Phỏng vấn Frontend · Câu 11/12" · badge emoji 🗝️ · ảnh nền `screens/feqa/v5-thumbcrop.png`.

**Tags:** `vue key v-for, v-for key index bug, vue list rendering, vue reconciliation, vue interview, phỏng vấn vue, phỏng vấn frontend, vue patch algorithm, vue tiếng việt, học vue, câu hỏi phỏng vấn vue, frontend interview questions, vue cho người mới, react vs vue key, javascript interview`

---

### Phỏng vấn FE #12 (CUỐI LÔ 1) — Props xuống, Emit lên hoạt động thế nào? (2:33)

**Tiêu đề:** Phỏng vấn FE #12: Props xuống, Emit lên hoạt động thế nào? | Vue interview

**Mô tả:**
```
Câu 12 — câu cuối cùng khép lại lô 1 series Phỏng vấn Frontend: Props truyền xuống, Emit bắn lên — giao tiếp cha con trong Vue hoạt động thế nào, cùng tinh thần với React.

Props: cha truyền dữ liệu XUỐNG con qua defineProps — con chỉ ĐỌC, không sửa trực tiếp. Emit: con phát sự kiện LÊN cha qua defineEmits + emit(...) — cha tự quyết định xử lý ra sao. Luồng dữ liệu MỘT CHIỀU: props xuống, sự kiện lên, không bao giờ ngược lại.

Demo thật bằng NutDatHang.vue: bấm liên tiếp các nút món ăn ở component con, cha ghi log đúng thứ tự đã bấm — #1 Phở bò, #2 Bánh mì, #3 Bánh mì, #4 Cơm tấm. Component con hoàn toàn không biết đơn hàng tồn tại ở đâu — nó chỉ emit tên món lên, cha tự quyết định ghi log thế nào.

Bẫy hay gặp: mutate prop trực tiếp trong component con sẽ ra warning và làm mất dấu dòng chảy dữ liệu — luồng một chiều rõ ràng chính là thứ giúp debug dễ hơn rất nhiều. Cần giao tiếp 2 chiều thật sự (như input) thì dùng defineModel hoặc v-model, không tự ý sửa prop.

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 12 — khép lô 1
0:17 Props xuống, Emit lên là gì, vì sao quan trọng
0:39 Code: NutDatHang.vue (script setup)
1:08 Demo thật: bấm nút con, cha ghi log đúng thứ tự
1:34 Trả lời như đi phỏng vấn: chốt + defineModel khi cần 2 chiều
2:00 Tổng kết trọn 12 câu lô 1 & CTA lô 2

📦 Source code (demo-fe-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout fe-qa-batch-1 để xem đúng 12 câu code của lô 1 (6 React + 6 Vue).
⏮️ Câu trước: https://youtu.be/NWk2UURxG9Q
▶️ Xem từ đầu series: https://youtu.be/G5bCudY1jSU
📱 Bản Shorts 60 giây: https://youtu.be/xQzzjm_TS0Y
▶️ 6 series khác trên kênh: "NestJS cho người mới bắt đầu" · "Super App với React Native" · "Mini-App từ A đến Z" (https://www.youtube.com/playlist?list=PLY-i2_1YbKi4) · "Mini-App với Flutter 🇻🇳" (https://www.youtube.com/playlist?list=PLL5FgtEBrD6g) · "Mini-App Flutter thuần 🇻🇳" (https://www.youtube.com/playlist?list=PLOjCSg9O8bRM) · "StyleX từ A đến Z 🇻🇳" (https://www.youtube.com/playlist?list=PLONwK58GbR_M)
💬 Đến lượt bạn: comment câu hỏi phỏng vấn Frontend KHÓ NHẤT bạn từng gặp — càng nhiều người góp, lô 2 càng sát thực tế phỏng vấn ngoài kia!

#vuejs #phongvan #frontend #reactvsvue #laptrinh
```

**Comment ghim gợi ý:**
```
📮 Vậy là hết trọn 12 câu lô 1 — 6 câu React, 6 câu Vue, mỗi câu một demo chạy thật thay vì đọc slide. Đến lượt bạn: comment câu hỏi phỏng vấn Frontend KHÓ NHẤT bạn từng gặp (React hoặc Vue đều được) — càng nhiều người góp, lô 2 càng sát thực tế phỏng vấn ngoài kia. Cảm ơn đã theo hết lô 1!
```

**Thumbnail:** badge "PV FE #12" · dòng lớn "PROPS &" / "EMIT" · phụ đề "Phỏng vấn Frontend · Câu 12/12" · badge emoji 📮 · ảnh nền `screens/feqa/v6-thumbcrop.png`.

**Tags:** `vue props emit, defineprops defineemits, vue parent child communication, vue one way data flow, vue interview, phỏng vấn vue, phỏng vấn frontend, definemodel vue, vue component communication, vue tiếng việt, học vue, câu hỏi phỏng vấn vue, frontend interview questions, vue cho người mới, javascript interview`

---

### Shorts lô 1 (12 video)

> Mỗi Short <60 giây, cùng câu hỏi với video ngang tương ứng, rút gọn để ôn nhanh. Đăng cùng lệnh với 12 video ngang — mô tả mỗi Short chỉ cần dòng caption dưới đây + link video đầy đủ.

| id | Tiêu đề Shorts | Caption |
|---|---|---|
| sr1 | Virtual DOM là gì? Trả lời trong 60 giây #shorts | Virtual DOM = bản sao nhẹ, diff rồi vá tối thiểu vào DOM thật.<br>Bẫy: KHÔNG phải lúc nào cũng nhanh hơn — đây là chiến lược tránh thao tác thừa, không phải phép màu tốc độ.<br>Video đầy đủ: https://youtu.be/G5bCudY1jSU<br>#shorts #react #phongvan |
| sr2 | useState vs useEffect: khác nhau thế nào? #shorts | useState giữ state nội bộ; useEffect đồng bộ ngoài React, luôn chạy SAU render.<br>Bẫy: cleanup chạy TRƯỚC mỗi effect kế tiếp, không chỉ khi unmount.<br>Video đầy đủ: https://youtu.be/LdTBWvjazsU<br>#shorts #react #phongvan |
| sr3 | Đừng dùng index làm key trong React! #shorts | key giúp React nhận diện đúng phần tử giữa các lần render.<br>Bẫy: key=index + thêm/xóa/sắp xếp lại danh sách = state đi lạc ngay.<br>Video đầy đủ: https://youtu.be/c325Ox2Ckro<br>#shorts #react #phongvan |
| sr4 | Controlled vs Uncontrolled input — bẫy hay hỏi #shorts | Controlled: state React giữ giá trị qua value+onChange. Uncontrolled: DOM tự giữ, đọc qua ref.<br>Bẫy: đổi value từ rỗng sang có giá trị giữa chừng — React cảnh báo "chuyển sang controlled".<br>Video đầy đủ: https://youtu.be/CVXBGZuNBZA<br>#shorts #react #phongvan |
| sr5 | React.memo có thật sự ăn không? #shorts | React.memo chỉ ăn khi props giữ NGUYÊN reference — object/function mới mỗi render là phá vỡ ngay.<br>Bẫy: đừng memo tràn lan khi chưa đo bằng Profiler.<br>Video đầy đủ: https://youtu.be/IOT05xjnJ1g<br>#shorts #react #phongvan |
| sr6 | Custom Hook là gì? 60 giây hiểu luôn #shorts | Custom hook = hàm bắt đầu bằng "use", gói logic có state để dùng lại nhiều nơi — không trả JSX.<br>Bẫy: custom hook KHÔNG share state giữa components, chỉ share logic.<br>Video đầy đủ: https://youtu.be/ci3l-FV3RUA<br>#shorts #react #phongvan |
| sv1 | Vì sao destructure reactive mất reactivity? #shorts | ref qua .value; reactive là Proxy sâu cho object, truy cập trực tiếp property.<br>Bẫy: destructure khỏi reactive là MẤT liên kết Proxy — dùng toRefs(state) để an toàn.<br>Video đầy đủ: https://youtu.be/oaEsQQa45pw<br>#shorts #vuejs #phongvan |
| sv2 | Options API vs Composition API Vue 3 #shorts | Options API tổ chức theo LOẠI; Composition API tổ chức theo TÍNH NĂNG trong script setup.<br>Bẫy: đừng trộn 2 style trong cùng 1 component — Options KHÔNG hề lỗi thời.<br>Video đầy đủ: https://youtu.be/iToDJGcGcaE<br>#shorts #vuejs #phongvan |
| sv3 | computed vs watch vs watchEffect Vue #shorts | computed có CACHE, chỉ tính lại khi dependency đổi; watch lazy theo nguồn cụ thể; watchEffect eager chạy ngay.<br>Bẫy: computed PHẢI PURE — side-effect thật thì dùng watch.<br>Video đầy đủ: https://youtu.be/SPCXsjvpS3k<br>#shorts #vuejs #phongvan |
| sv4 | v-if vs v-show: khác nhau thế nào? #shorts | v-if unmount thật, mất state con; v-show chỉ toggle CSS display, state giữ nguyên.<br>Bẫy: toggle liên tục dùng v-show cho rẻ; v-show không dùng chung với v-else.<br>Video đầy đủ: https://youtu.be/S8QgWBGQt4w<br>#shorts #vuejs #phongvan |
| sv5 | Đừng dùng index làm :key trong v-for! #shorts | :key giúp Vue nhận diện đúng phần tử — cùng luật với React.<br>Bẫy: :key=index + thêm/xóa/sắp xếp lại = state đi lạc, y hệt bẫy R3 bên React.<br>Video đầy đủ: https://youtu.be/NWk2UURxG9Q<br>#shorts #vuejs #phongvan |
| sv6 | Props xuống, Emit lên hoạt động sao? #shorts | Props xuống một chiều, con chỉ đọc; Emit lên để con báo tin, cha quyết định xử lý.<br>Bẫy: đừng mutate prop trực tiếp — cần 2 chiều thì dùng defineModel.<br>Video đầy đủ: https://youtu.be/usOtTYN2KB0<br>#shorts #vuejs #phongvan |

---

## LÔ 2 SERIES PHỎNG VẤN FRONTEND — Hiệu năng React Native & Flutter (câu #13–#24 + 12 Shorts)

> Lô 2 nối tiếp cùng playlist **"Phỏng vấn Frontend 🇻🇳"** — https://www.youtube.com/playlist?list=PLYvXt5cUP0yE (KHÔNG tạo playlist mới — khi đăng chỉ nối 24 video lô 2 vào playlist sẵn có). CHƯA ĐĂNG — mọi link video là placeholder `https://youtu.be/2yu2FhayLY0`..`https://youtu.be/Jzn5ELGPewk` (bản ngang) và `https://youtu.be/EpTJxDVIJdI`..`https://youtu.be/oYjtEW_Z1UM` (Shorts), điền link thật khi đăng. Chủ đề lô 2: HIỆU NĂNG khi load nhiều dữ liệu — 6 câu React Native (N1–N6 → ep57–ep62) + 6 câu Flutter (F1–F6 → ep63–ep68), mỗi câu có demo đo SỐ THẬT trên simulator (bản debug — kịch bản luôn nói rõ "trên simulator của tôi"). Code: `demo-perf-interview/` (`rn-perf/` + `flutter_perf/`), đóng băng ở tag `perf-qa-batch-2`. Ba cặp xem chéo RN↔Flutter: câu 13↔19 (lazy list), 17↔23 (ảnh), 18↔24 (thread/isolate).

Từ khóa chủ lực lô 2: `phỏng vấn react native`, `phỏng vấn flutter`, `react native performance`, `flutter performance`, `tối ưu hiệu năng app`, `flatlist`, `listview builder`, `câu hỏi phỏng vấn mobile`, `học react native`, `học flutter`.

---

### Phỏng vấn FE #13 — Vì sao FlatList mượt hơn ScrollView? (2:59)

**Tiêu đề:** Phỏng vấn FE #13: Vì sao FlatList mượt hơn? | React Native interview

**Mô tả:**
```
Mở màn lô 2 series Phỏng vấn Frontend — 12 câu hỏi HIỆU NĂNG thật từ vòng phỏng vấn React Native và Flutter. Câu 13: render 5.000 dòng dữ liệu, vì sao ScrollView với map lại đơ, còn FlatList thì không?

ScrollView + items.map render TOÀN BỘ 5.000 component ngay lần dựng đầu tiên — JS thread chạy 5.000 lần render, native giữ 5.000 view trong bộ nhớ. FlatList xây trên VirtualizedList và dùng virtualization: chỉ giữ một render window hữu hạn, item ngoài cửa sổ bị unmount thật và thay bằng khoảng trắng đúng kích thước — chi phí theo kích thước cửa sổ, không theo độ dài danh sách.

Demo thật bằng n1.tsx, đếm render bằng biến renderCount trên simulator của tôi: ScrollView dựng đủ 5.000/5.000 item mất 1.381ms — khựng gần một giây rưỡi; FlatList chỉ render 10/5.000 item (đúng initialNumToRender mặc định), dựng 198ms — nhanh hơn khoảng 7 lần. Bẫy hay gài: FlatList không phải phép màu — render ngoài màn là bất đồng bộ, cuộn quá nhanh sẽ thấy khoảng trắng; virtualization là CHIẾN LƯỢC đánh đổi.

⏱️ NỘI DUNG:
0:00 Giới thiệu lô hiệu năng & câu 13
0:23 Cơ chế: virtualization là gì?
1:00 Code: n1.tsx — ScrollView+map vs FlatList
1:27 Demo thật: 5000 item 1381ms vs 10 item 198ms
1:57 Trả lời như đi phỏng vấn: chốt 3 câu + bẫy
2:36 Tổng kết câu 13 & hẹn câu 14

📦 Source code (demo-perf-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout perf-qa-batch-2 để xem đúng code câu hỏi này.
⏭️ Câu tiếp theo: https://youtu.be/lhaNL9y2Q7M
📱 Bản Shorts 60 giây: https://youtu.be/EpTJxDVIJdI
🔁 Bẫy y hệt bên Flutter: câu 19 (Column vs ListView.builder) — https://youtu.be/JHP-5gZ6cqA
▶️ Playlist series: "Phỏng vấn Frontend 🇻🇳" — https://www.youtube.com/playlist?list=PLYvXt5cUP0yE
▶️ 6 series khác trên kênh: "NestJS cho người mới bắt đầu" · "Super App với React Native" · "Mini-App từ A đến Z" (https://www.youtube.com/playlist?list=PLY-i2_1YbKi4) · "Mini-App với Flutter 🇻🇳" (https://www.youtube.com/playlist?list=PLL5FgtEBrD6g) · "Mini-App Flutter thuần 🇻🇳" (https://www.youtube.com/playlist?list=PLOjCSg9O8bRM) · "StyleX từ A đến Z 🇻🇳" (https://www.youtube.com/playlist?list=PLONwK58GbR_M)

#reactnative #phongvan #frontend #hieunang #laptrinh
```

**Comment ghim gợi ý:**
```
🐢 Mở màn lô 2 — 12 câu hỏi HIỆU NĂNG từ phỏng vấn React Native & Flutter, câu nào cũng đo số thật trên simulator. Đố nhỏ câu 13: FlatList có phải LÚC NÀO cũng thắng ScrollView không? KHÔNG — cuộn quá nhanh vẫn thấy khoảng trắng, vì render ngoài màn là bất đồng bộ. Virtualization là chiến lược đánh đổi, không phải phép màu. Comment câu hỏi hiệu năng khó nhất bạn từng gặp khi phỏng vấn nhé!
```

**Thumbnail:** badge "PV FE #13" · dòng lớn "5000 ITEM" / "ĐƠ 1,4 GIÂY" · phụ đề "Phỏng vấn Frontend · Câu 13/24" · badge emoji 🐢 · variant shot, ảnh dọc `screens/perfqa/n1-scrollview.png` (header đỏ 5000/5000 item · 1381ms).

**Tags:** `flatlist, scrollview, react native flatlist, virtualization react native, react native performance, phỏng vấn react native, phỏng vấn frontend, tối ưu flatlist, react native list dài, initialnumtorender, react native tiếng việt, học react native, câu hỏi phỏng vấn react native, mobile performance, react native interview questions`

---

### Phỏng vấn FE #14 — Tối ưu FlatList: getItemLayout & windowSize (2:59)

**Tiêu đề:** Phỏng vấn FE #14: Tối ưu FlatList thế nào? | React Native interview

**Mô tả:**
```
Câu 14 lô hiệu năng: FlatList đã dùng rồi mà danh sách vẫn giật khi cuộn và không nhảy được tới cuối — tối ưu thế nào? Video có một cú scrollToIndex thất bại thật trên simulator, và một prop tên getItemLayout biến nó thành cú nhảy 49ms.

Khi không biết trước kích thước item, FlatList phải render rồi ĐO chiều cao từng cái bất đồng bộ — muốn nhảy tới item 4999 là nó chịu, docs viết thẳng "Cannot scroll to locations outside the render window" nếu thiếu getItemLayout. getItemLayout đưa trước công thức length và offset cho từng index — FlatList bỏ hẳn bước đo, vị trí mọi item tính bằng số học. windowSize mặc định 21 màn (10 trên, 10 dưới, cộng màn hiện tại) — chỉnh nó là chỉnh trade-off bộ nhớ với khoảng trắng.

Demo thật bằng n2.tsx: chế độ OFF bấm Nhảy tới item 4999 — list đứng yên, banner đỏ scrollToIndex FAIL vì mới đo được tới item #118; bật getItemLayout ON — nhảy tức thì 49ms, Bản ghi #4999 hiện trọn. Hai bẫy hay gài: getItemLayout chỉ dùng khi item CAO CỐ ĐỊNH (khai láo là cuộn sai vị trí), và removeClippedSubviews không tiết kiệm RAM như lời đồn — view chỉ bị detach chứ không deallocate.

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 14 — FlatList vẫn giật
0:19 Cơ chế: đo async vs công thức getItemLayout
0:51 Code: n2.tsx — getItemLayout, windowSize
1:23 Demo thật: scrollToIndex FAIL vs nhảy 49ms
1:54 Trả lời như đi phỏng vấn: chốt 3 câu + 2 bẫy
2:38 Tổng kết câu 14 & hẹn câu 15

📦 Source code (demo-perf-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout perf-qa-batch-2 để xem đúng code câu hỏi này.
⏮️ Câu trước: https://youtu.be/2yu2FhayLY0
⏭️ Câu tiếp theo: https://youtu.be/OLD6KBVCzzc
📱 Bản Shorts 60 giây: https://youtu.be/nDiEq90wqU4
▶️ Playlist series: "Phỏng vấn Frontend 🇻🇳" — https://www.youtube.com/playlist?list=PLYvXt5cUP0yE
▶️ 6 series khác trên kênh: "NestJS cho người mới bắt đầu" · "Super App với React Native" · "Mini-App từ A đến Z" (https://www.youtube.com/playlist?list=PLY-i2_1YbKi4) · "Mini-App với Flutter 🇻🇳" (https://www.youtube.com/playlist?list=PLL5FgtEBrD6g) · "Mini-App Flutter thuần 🇻🇳" (https://www.youtube.com/playlist?list=PLOjCSg9O8bRM) · "StyleX từ A đến Z 🇻🇳" (https://www.youtube.com/playlist?list=PLONwK58GbR_M)

#reactnative #phongvan #frontend #hieunang #laptrinh
```

**Comment ghim gợi ý:**
```
🧮 Đố nhỏ câu 14: vì sao scrollToIndex tới item 4999 lại FAIL dù danh sách có đủ 5.000 item? Vì FlatList phải ĐO chiều cao từng item bất đồng bộ — mới đo tới #118 thì lấy gì nhảy tới 4999. getItemLayout đưa trước công thức là nhảy bằng số học, 49ms. Nhưng nhớ: chỉ dùng khi item cao CỐ ĐỊNH — khai láo là cuộn sai vị trí ngay. Bạn từng dính cú scrollToIndex fail nào chưa?
```

**Thumbnail:** badge "PV FE #14" · dòng lớn "SCROLLTOINDEX" / "FAIL VÌ ĐÂU?" · phụ đề "Phỏng vấn Frontend · Câu 14/24" · badge emoji 🧮 · variant shot, ảnh dọc `screens/perfqa/n2-fail.png` (banner đỏ scrollToIndex FAIL).

**Tags:** `getitemlayout, scrolltoindex, flatlist optimization, windowsize flatlist, keyextractor, react native performance, phỏng vấn react native, phỏng vấn frontend, tối ưu flatlist, removeclippedsubviews, react native tiếng việt, học react native, câu hỏi phỏng vấn react native, react native interview questions, mobile performance`

---

### Phỏng vấn FE #15 — React.memo cho renderItem: chặn render thừa (2:49)

**Tiêu đề:** Phỏng vấn FE #15: React.memo cho renderItem | React Native interview

**Mô tả:**
```
Câu 15 lô hiệu năng: danh sách có MỘT item đổi mà cả nghìn item khác render lại — vì sao, và chặn thế nào? Bằng chứng thật trên simulator: cùng ba lần bấm, một bên MỌI hàng render 4 lần, một bên chỉ đúng hàng số 0.

Khi state đổi, component cha render lại — và mọi Row con là function component thường thì render lại theo, React mặc định không so sánh props. React.memo bọc Row để so shallow từng prop — item giữ nguyên tham chiếu thì skip. Nhưng memo có hai điều kiện sống còn: update phải IMMUTABLE (object không đổi giữ nguyên tham chiếu), và renderItem phải ổn định qua useCallback — hàm mới toanh mỗi render là memo thành vô dụng.

Demo thật bằng n3.tsx, mỗi Row tự đếm số lần render bằng useRef: memo OFF, bấm Đổi item số 0 ba lần — MỌI hàng render 4 lần, kể cả 29 bản ghi không đổi một byte; memo ON — chỉ hàng số 0 render 4 lần (1 mount + 3 bấm), mọi hàng khác đứng nguyên 1 lần. Hai bẫy: memo không miễn phí (list nhỏ ít khi cần bọc), và memo VÔ DỤNG nếu quên useCallback hay lỡ mutate mảng tại chỗ.

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 15 — render không ai cần
0:18 Cơ chế: vì sao cả list render lại
0:48 Code: n3.tsx — memo + useCallback + immutable
1:19 Demo thật: cả list 4 lần vs chỉ hàng 0
1:46 Trả lời như đi phỏng vấn: chốt 3 câu + 2 bẫy
2:28 Tổng kết câu 15 & hẹn câu 16

📦 Source code (demo-perf-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout perf-qa-batch-2 để xem đúng code câu hỏi này.
⏮️ Câu trước: https://youtu.be/lhaNL9y2Q7M
⏭️ Câu tiếp theo: https://youtu.be/oTYFiL8OzB8
📱 Bản Shorts 60 giây: https://youtu.be/QX9aH_HEmd4
▶️ Playlist series: "Phỏng vấn Frontend 🇻🇳" — https://www.youtube.com/playlist?list=PLYvXt5cUP0yE
▶️ 6 series khác trên kênh: "NestJS cho người mới bắt đầu" · "Super App với React Native" · "Mini-App từ A đến Z" (https://www.youtube.com/playlist?list=PLY-i2_1YbKi4) · "Mini-App với Flutter 🇻🇳" (https://www.youtube.com/playlist?list=PLL5FgtEBrD6g) · "Mini-App Flutter thuần 🇻🇳" (https://www.youtube.com/playlist?list=PLOjCSg9O8bRM) · "StyleX từ A đến Z 🇻🇳" (https://www.youtube.com/playlist?list=PLONwK58GbR_M)

#reactnative #phongvan #frontend #hieunang #laptrinh
```

**Comment ghim gợi ý:**
```
🛡️ Đố nhỏ câu 15: bọc React.memo rồi mà list vẫn render lại cả nghìn item — thiếu gì? Hai điều kiện sống còn: update phải IMMUTABLE để object không đổi giữ nguyên tham chiếu, và renderItem phải bọc useCallback — hàm ẩn danh mới mỗi render là memo vô dụng ngay. Trên demo: 4 lần × cả list so với 4 lần × đúng 1 hàng. Bạn đã từng memo mà quên useCallback chưa? Comment chia sẻ nhé!
```

**Thumbnail:** badge "PV FE #15" · dòng lớn "1 ITEM ĐỔI" / "CẢ LIST 4×?" · phụ đề "Phỏng vấn Frontend · Câu 15/24" · badge emoji 🛡️ · variant shot, ảnh dọc `screens/perfqa/n3-memo.png` (badge đếm render từng hàng).

**Tags:** `react.memo, usecallback, renderitem flatlist, react native rerender, immutable update, react native performance, phỏng vấn react native, phỏng vấn frontend, memo react native, shallow compare props, react native tiếng việt, học react native, câu hỏi phỏng vấn react native, react native interview questions, tối ưu render`

---

### Phỏng vấn FE #16 — Infinite scroll: vì sao onEndReached gọi trùng? (2:58)

**Tiêu đề:** Phỏng vấn FE #16: Infinite scroll — vì sao onEndReached gọi trùng? | React Native interview

**Mô tả:**
```
Câu 16 lô hiệu năng: làm infinite scroll với onEndReached, API bị gọi trùng liên tục — vì sao và chặn thế nào? Bằng chứng thật trên simulator: cùng một kiểu kéo, một bên gọi loadMore 6 lần cho 3 trang dữ liệu, một bên đúng 1 lần mỗi nhịp.

onEndReached bắn khi cuộn VÀO ngưỡng onEndReachedThreshold — tính theo chiều dài NHÌN THẤY của list, không phải pixel. Vấn đề nằm ở 800ms chờ API: content chưa dài ra, logical end vẫn ở đó — kéo RA khỏi ngưỡng rồi kéo xuống lại là bắn LẦN NỮA, xin đúng trang đang tải. Framework KHÔNG tự bắn liên tục khi đứng yên — đây là race giữa gesture người dùng và cửa sổ loading.

Demo thật bằng n4.tsx: Guard OFF, kéo giật ra vào trong lúc loading qua 3 đợt đáy — Trang 4, 100 item nhưng loadMore bị gọi 6 lần; Guard ON — Trang 2, 50 item, gọi đúng 1 lần: if loadingRef.current return chặn sạch, cờ đặt TRƯỚC khi fetch. Bẫy đắt nhất: guard bằng STATE thường là hở — setState bất đồng bộ, closure cũ vẫn đọc false và lọt request; phải đọc ref. Và nhớ dedupe theo id khi append cho phòng tuyến thứ hai.

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 16 — API bắn trùng khi cuộn
0:19 Cơ chế: onEndReached bắn khi nào
0:53 Code: n4.tsx — guard bằng loadingRef
1:22 Demo thật: 6 lần vs 1 lần mỗi nhịp load
1:55 Trả lời như đi phỏng vấn: chốt 3 câu + 2 bẫy
2:39 Tổng kết câu 16 & hẹn câu 17

📦 Source code (demo-perf-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout perf-qa-batch-2 để xem đúng code câu hỏi này.
⏮️ Câu trước: https://youtu.be/OLD6KBVCzzc
⏭️ Câu tiếp theo: https://youtu.be/GUXD0Yas9JA
📱 Bản Shorts 60 giây: https://youtu.be/Z6HhBq8xDAI
▶️ Playlist series: "Phỏng vấn Frontend 🇻🇳" — https://www.youtube.com/playlist?list=PLYvXt5cUP0yE
▶️ 6 series khác trên kênh: "NestJS cho người mới bắt đầu" · "Super App với React Native" · "Mini-App từ A đến Z" (https://www.youtube.com/playlist?list=PLY-i2_1YbKi4) · "Mini-App với Flutter 🇻🇳" (https://www.youtube.com/playlist?list=PLL5FgtEBrD6g) · "Mini-App Flutter thuần 🇻🇳" (https://www.youtube.com/playlist?list=PLOjCSg9O8bRM) · "StyleX từ A đến Z 🇻🇳" (https://www.youtube.com/playlist?list=PLONwK58GbR_M)

#reactnative #phongvan #frontend #hieunang #laptrinh
```

**Comment ghim gợi ý:**
```
🔁 Đố nhỏ câu 16: guard loadMore bằng useState có chặn được gọi trùng không? KHÔNG chắc — setState cập nhật bất đồng bộ, closure cũ vẫn đọc false và request vẫn lọt. Phải guard bằng REF: giá trị tức thời, đặt cờ TRƯỚC khi fetch, hạ cờ khi response về — 6 lần về đúng 1 lần trên demo. Bạn từng dính API bắn trùng vì infinite scroll chưa? Kể nghe với!
```

**Thumbnail:** badge "PV FE #16" · dòng lớn "LOADMORE ×6" / "CHO 3 TRANG?" · phụ đề "Phỏng vấn Frontend · Câu 16/24" · badge emoji 🔁 · variant shot, ảnh dọc `screens/perfqa/n4-bug.png` (header vàng Trang 4 · gọi 6 lần).

**Tags:** `onendreached, infinite scroll react native, flatlist load more, onendreachedthreshold, useref guard, react native performance, phỏng vấn react native, phỏng vấn frontend, pagination react native, api gọi trùng, react native tiếng việt, học react native, câu hỏi phỏng vấn react native, react native interview questions, race condition`

---

### Phỏng vấn FE #17 — Ảnh trong list dài: expo-image và cache 2 tầng (2:45)

**Tiêu đề:** Phỏng vấn FE #17: Ảnh trong list dài — expo-image và cache | React Native interview

**Mô tả:**
```
Câu 17 lô hiệu năng: list có hàng trăm ảnh — tối ưu ảnh thế nào để cuộn mượt và không tốn RAM? Bằng chứng là chuỗi ba con số của expo-image trên simulator: 1360ms lần đầu, 153ms khi cache ấm, 368ms sau khi kill app.

Ảnh 2000px hiển thị trong ô 64px vẫn phải decode FULL-SIZE — mỗi bitmap 2000×2000 cỡ 16MB RAM. Hai việc cốt lõi: decode ĐÚNG KÍCH THƯỚC hiển thị (expo-image bật sẵn allowDownscaling theo container), và CACHE hai tầng memory + disk để không decode lại — expo-image chạy trên SDWebImage và Glide, demo dùng cachePolicy memory-disk kèm recyclingKey cho list recycle view.

Demo thật bằng n5.tsx, 120 hàng dùng 12 tấm PNG 2000px: RN Image thường cold lần nào cũng cỡ 215–297ms — không nhớ gì giữa các lần mở app; expo-image lần bấm ĐẦU chậm nhất 1360ms vì phải downscale và GHI cache, từ đó chỉ còn 153–177ms (nhanh hơn khoảng 8 lần), kill app mở lại vẫn chỉ 368ms nhờ disk cache. Điểm ăn điểm khi trả lời: lần đầu CHẬM HƠN là chi phí điền cache — trả một lần, lãi mọi lần sau; demo là ảnh LOCAL nên chênh màn đầu nhỏ, ảnh MẠNG cache mới thật sự toả sáng.

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 17 — ảnh trong list dài
0:18 Cơ chế: decode đúng cỡ + cache 2 tầng
0:52 Code: n5.tsx — RN Image vs expo-image
1:18 Demo thật: 1360 điền cache → 153 warm → 368 sau kill
1:50 Trả lời như đi phỏng vấn: chốt 3 câu + điểm cộng
2:26 Tổng kết câu 17 & hẹn câu 18

📦 Source code (demo-perf-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout perf-qa-batch-2 để xem đúng code câu hỏi này.
⏮️ Câu trước: https://youtu.be/oTYFiL8OzB8
⏭️ Câu tiếp theo: https://youtu.be/zlzQHCex90o
📱 Bản Shorts 60 giây: https://youtu.be/b3WCGHcixVQ
🔁 Bài y hệt bên Flutter: câu 23 (cacheWidth) — https://youtu.be/koAhlIE_vzw
▶️ Playlist series: "Phỏng vấn Frontend 🇻🇳" — https://www.youtube.com/playlist?list=PLYvXt5cUP0yE
▶️ 6 series khác trên kênh: "NestJS cho người mới bắt đầu" · "Super App với React Native" · "Mini-App từ A đến Z" (https://www.youtube.com/playlist?list=PLY-i2_1YbKi4) · "Mini-App với Flutter 🇻🇳" (https://www.youtube.com/playlist?list=PLL5FgtEBrD6g) · "Mini-App Flutter thuần 🇻🇳" (https://www.youtube.com/playlist?list=PLOjCSg9O8bRM) · "StyleX từ A đến Z 🇻🇳" (https://www.youtube.com/playlist?list=PLONwK58GbR_M)

#reactnative #phongvan #frontend #hieunang #laptrinh
```

**Comment ghim gợi ý:**
```
🖼️ Đố nhỏ câu 17: vì sao expo-image lần bấm ĐẦU TIÊN lại CHẬM HƠN RN Image thường (1360ms so với ~300ms)? Vì nó phải downscale và GHI cache — chi phí trả một lần, lãi mọi lần sau: warm còn 153ms, kill app vẫn 368ms nhờ disk cache. Còn RN Image lần nào cũng như lần đầu. Bẫy y hệt bên Flutter với cacheWidth — xem câu 23 của series nhé!
```

**Thumbnail:** badge "PV FE #17" · dòng lớn "ẢNH 2000PX" / "TRONG Ô 64?" · phụ đề "Phỏng vấn Frontend · Câu 17/24" · badge emoji 🖼️ · variant shot, ảnh dọc `screens/perfqa/n5-expo.png` (list ảnh expo-image kèm số ms).

**Tags:** `expo-image, react native image cache, allowdownscaling, cachepolicy memory-disk, recyclingkey, sdwebimage glide, react native performance, phỏng vấn react native, phỏng vấn frontend, tối ưu ảnh react native, react native tiếng việt, học react native, câu hỏi phỏng vấn react native, react native interview questions, image optimization`

---

### Phỏng vấn FE #18 — Data lớn chặn JS thread: đo gap và chia lô (2:46)

**Tiêu đề:** Phỏng vấn FE #18: Data lớn chặn JS thread — đo và né thế nào? | React Native interview

**Mô tả:**
```
Câu 18 — chốt khối React Native của lô hiệu năng: app nhận về 300.000 bản ghi JSON, parse xong thì UI đứng hình. Vì sao, và xử thế nào? Bằng chứng là hai con số trên cùng một đồng hồ: một cục hụt 564ms, chia lô chỉ còn 127ms.

JavaScript trong React Native chạy trên MỘT thread duy nhất — setState, timer, xử lý chạm đều xếp hàng trên đó; một khối đồng bộ dài chiếm event loop là mọi cập nhật UI phải chờ. Cách đo rẻ nhất: setInterval 100ms cập nhật đồng hồ, mỗi tick tính gap so với tick trước — gap phình to là thread vừa bị chiếm. Cách né trong thuần JS: chia việc thành từng lô 5.000, giữa các lô setTimeout 0 nhường event loop cho UI thở.

Demo thật bằng n6.tsx: parse 300k một cục — tick hụt 564ms (mất chừng 5 tick đồng hồ), tổng 513ms; chia lô — tick chỉ hụt 127ms, đồng hồ nhảy đều, nhưng tổng lên 985ms. Bẫy đắt nhất của tập: chia lô KHÔNG mua tốc độ — tổng chậm hơn 2–3 lần; nó mua SỰ PHẢN HỒI, app vẫn sống trong lúc làm việc nặng. Checksum hai nhánh giống hệt 12050890 — cùng khối lượng, chỉ khác cách trải ra. RN thuần JS không có isolate tích hợp — bên Flutter có Isolate.run là parallelism thật, xem câu 24.

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 18 — JS thread và data lớn
0:19 Cơ chế: một thread — đo gap, chia lô
0:47 Code: n6.tsx — runBlocked vs runChunked
1:14 Demo thật: hụt 564ms vs 127ms
1:50 Trả lời như đi phỏng vấn: chốt 3 câu + bẫy đắt nhất
2:27 Tổng kết câu 18 & hẹn khối Flutter

📦 Source code (demo-perf-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout perf-qa-batch-2 để xem đúng code câu hỏi này.
⏮️ Câu trước: https://youtu.be/GUXD0Yas9JA
⏭️ Câu tiếp theo: https://youtu.be/JHP-5gZ6cqA
📱 Bản Shorts 60 giây: https://youtu.be/2ULY6BIFDvw
🔁 Cùng bài bên Flutter: câu 24 (Isolate.run) — https://youtu.be/Jzn5ELGPewk
▶️ Playlist series: "Phỏng vấn Frontend 🇻🇳" — https://www.youtube.com/playlist?list=PLYvXt5cUP0yE
▶️ 6 series khác trên kênh: "NestJS cho người mới bắt đầu" · "Super App với React Native" · "Mini-App từ A đến Z" (https://www.youtube.com/playlist?list=PLY-i2_1YbKi4) · "Mini-App với Flutter 🇻🇳" (https://www.youtube.com/playlist?list=PLL5FgtEBrD6g) · "Mini-App Flutter thuần 🇻🇳" (https://www.youtube.com/playlist?list=PLOjCSg9O8bRM) · "StyleX từ A đến Z 🇻🇳" (https://www.youtube.com/playlist?list=PLONwK58GbR_M)

#reactnative #phongvan #frontend #hieunang #laptrinh
```

**Comment ghim gợi ý:**
```
🧵 Bẫy đắt nhất câu 18: chia lô setTimeout 0 có làm parse NHANH HƠN không? KHÔNG — tổng còn chậm hơn 2–3 lần (985ms so với 513ms trên demo). Cái nó mua là SỰ PHẢN HỒI: maxGap từ 564ms xuống 127ms, app vẫn sống trong lúc làm việc nặng. RN thuần JS không có isolate — bên Flutter có Isolate.run là parallelism thật, xem câu 24 chốt sổ series nhé!
```

**Thumbnail:** badge "PV FE #18" · dòng lớn "PARSE 300K" / "ĐƠ 564MS?" · phụ đề "Phỏng vấn Frontend · Câu 18/24" · badge emoji 🧵 · variant shot, ảnh dọc `screens/perfqa/n6-blocked.png` (box đỏ tick hụt 564ms).

**Tags:** `js thread react native, event loop, settimeout chia lô, parse json lớn, ui đứng hình, react native performance, phỏng vấn react native, phỏng vấn frontend, single thread javascript, đo jank react native, react native tiếng việt, học react native, câu hỏi phỏng vấn react native, react native interview questions, blocking main thread`

---

### Phỏng vấn FE #19 — ListView.builder vs Column: lazy building (2:59)

**Tiêu đề:** Phỏng vấn FE #19: ListView.builder vs Column | Flutter interview

**Mô tả:**
```
Sang nửa Flutter của lô hiệu năng — câu 19: hiển thị 5.000 dòng trong Flutter, vì sao Column trong SingleChildScrollView đơ cả giây, còn ListView.builder thì không? Anh em song sinh với câu ScrollView vs FlatList bên React Native.

Column nhận một List con CỤ THỂ — Flutter phải build cả 5.000 widget ngay khung hình đầu tiên, dù màn hình chỉ hiện khoảng mười lăm cái; docs khuyên thẳng "Avoid using constructors with a concrete List of children". ListView.builder thì lazy — "creates items as they're scrolled onto the screen": chỉ build phần trong viewport cộng vùng đệm cacheExtent.

Demo thật bằng f1_lazy_list.dart trên simulator (bản debug), đếm build bằng BuildCounter: Column build đủ 5.000/5.000, first frame 7.895ms — gần 8 giây đứng hình (số ms dao động vì debug/JIT, cái bất biến là đủ 5.000 lần build); ListView.builder chỉ build 17/5.000 item, first frame 199ms — 17 là khoảng 12 item vừa khít màn cộng cacheExtent, ổn định tuyệt đối qua mọi lần đo. Bẫy hay gài: shrinkWrap true hay lồng ListView trong Column hở chiều cao — viewport mất giới hạn, builder bị ép build HẾT.

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 19 — sang nửa Flutter
0:20 Cơ chế: lazy building của ListView.builder
0:56 Code: f1_lazy_list.dart — Column vs builder
1:26 Demo thật: 5000 build 7895ms vs 17 build 199ms
1:59 Trả lời như đi phỏng vấn: chốt 3 câu + bẫy shrinkWrap
2:36 Tổng kết câu 19 & hẹn câu 20

📦 Source code (demo-perf-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout perf-qa-batch-2 để xem đúng code câu hỏi này.
⏮️ Câu trước: https://youtu.be/zlzQHCex90o
⏭️ Câu tiếp theo: https://youtu.be/1B_MsC6zh_4
📱 Bản Shorts 60 giây: https://youtu.be/FckJ2bI1Y68
🔁 Bẫy y hệt bên React Native: câu 13 (ScrollView vs FlatList) — https://youtu.be/2yu2FhayLY0
▶️ Playlist series: "Phỏng vấn Frontend 🇻🇳" — https://www.youtube.com/playlist?list=PLYvXt5cUP0yE
▶️ 6 series khác trên kênh: "NestJS cho người mới bắt đầu" · "Super App với React Native" · "Mini-App từ A đến Z" (https://www.youtube.com/playlist?list=PLY-i2_1YbKi4) · "Mini-App với Flutter 🇻🇳" (https://www.youtube.com/playlist?list=PLL5FgtEBrD6g) · "Mini-App Flutter thuần 🇻🇳" (https://www.youtube.com/playlist?list=PLOjCSg9O8bRM) · "StyleX từ A đến Z 🇻🇳" (https://www.youtube.com/playlist?list=PLONwK58GbR_M)

#flutter #phongvan #frontend #hieunang #laptrinh
```

**Comment ghim gợi ý:**
```
🧱 Đố nhỏ câu 19: con số 17 trong demo là gì? ListView.builder chỉ build 17/5.000 item — khoảng 12 item vừa khít màn hình cộng vùng đệm cacheExtent — và 17 ổn định tuyệt đối qua mọi lần đo, trong khi Column build đủ 5.000. Nhưng đừng cực đoan: Column vẫn ĐÚNG cho nhóm widget ít, khác loại. Bẫy y hệt bên React Native ở câu 13 — bạn xem cả cặp chưa?
```

**Thumbnail:** badge "PV FE #19" · dòng lớn "COLUMN 5000" / "ĐƠ 8 GIÂY?" · phụ đề "Phỏng vấn Frontend · Câu 19/24" · badge emoji 🧱 · variant shot, ảnh dọc `screens/perfqa/f1-column.png` (header đỏ 5000/5000 build · first frame 7895ms).

**Tags:** `listview.builder, column singlechildscrollview, flutter lazy list, cacheextent, flutter performance, phỏng vấn flutter, phỏng vấn frontend, flutter list dài, shrinkwrap flutter, first frame flutter, flutter tiếng việt, học flutter, câu hỏi phỏng vấn flutter, flutter interview questions, mobile performance`

---

### Phỏng vấn FE #20 — itemExtent: báo trước chiều cao cho ListView (2:58)

**Tiêu đề:** Phỏng vấn FE #20: itemExtent — báo trước chiều cao cho ListView | Flutter interview

**Mô tả:**
```
Câu 20 lô hiệu năng: ListView của bạn biết trước chiều cao từng hàng — tận dụng thế nào để cuộn và nhảy vị trí nhanh hơn? Từ khóa: itemExtent và const.

Không có itemExtent, muốn tới một offset xa, sliver phải build và đo TUẦN TỰ các item dọc đường để cộng dồn chiều cao. Khai itemExtent (hoặc prototypeItem) là đưa trước extent — docs viết "scrolling machinery can make use of the foreknowledge" để save work khi cuộn nhảy xa: vị trí item chỉ còn là số học, index = offset chia 64. Kèm const constructor cho phần khung tĩnh — docs nói const cho phép Flutter "short-circuit most of the rebuild work".

Demo thật bằng f2_item_extent.dart trên simulator (bản debug), khác biệt DUY NHẤT giữa hai chế độ là itemExtent 64 hay null: OFF bấm Nhảy cuối — build thêm 4.987 item dọc đường, mất 1.622ms (warm còn 1.284); ON — build thêm đúng 12 item, 34ms — cách biệt hơn bốn trăm lần số build. Hai bẫy: itemExtent CHỈ dành cho hàng cao đều — khai láo là cuộn sai; và itemExtent với prototypeItem CẤM khai cùng lúc.

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 20 — đào sâu ListView
0:16 Cơ chế: báo trước extent + const
0:48 Code: f2_item_extent.dart — khác đúng 1 dòng
1:21 Demo thật: 4987 build vs 12 build khi jumpTo
2:01 Trả lời như đi phỏng vấn: chốt 3 câu + 2 bẫy
2:39 Tổng kết câu 20 & hẹn câu 21

📦 Source code (demo-perf-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout perf-qa-batch-2 để xem đúng code câu hỏi này.
⏮️ Câu trước: https://youtu.be/JHP-5gZ6cqA
⏭️ Câu tiếp theo: https://youtu.be/PKOBn2a6Rnk
📱 Bản Shorts 60 giây: https://youtu.be/W7QrzdunfJQ
▶️ Playlist series: "Phỏng vấn Frontend 🇻🇳" — https://www.youtube.com/playlist?list=PLYvXt5cUP0yE
▶️ 6 series khác trên kênh: "NestJS cho người mới bắt đầu" · "Super App với React Native" · "Mini-App từ A đến Z" (https://www.youtube.com/playlist?list=PLY-i2_1YbKi4) · "Mini-App với Flutter 🇻🇳" (https://www.youtube.com/playlist?list=PLL5FgtEBrD6g) · "Mini-App Flutter thuần 🇻🇳" (https://www.youtube.com/playlist?list=PLOjCSg9O8bRM) · "StyleX từ A đến Z 🇻🇳" (https://www.youtube.com/playlist?list=PLONwK58GbR_M)

#flutter #phongvan #frontend #hieunang #laptrinh
```

**Comment ghim gợi ý:**
```
📏 Đố nhỏ câu 20: vì sao thiếu itemExtent thì jumpTo xuống đáy 5.000 hàng phải build thêm 4.987 item? Vì sliver phải build và ĐO từng item dọc đường chỉ để cộng dồn chiều cao — biết đủ extent mới biết offset rơi vào item nào. Khai itemExtent 64 là vị trí thành số học: build thêm đúng 12 item, 34ms. Nhớ bẫy: hàng cao KHÔNG đều mà khai láo là cuộn sai vị trí ngay!
```

**Thumbnail:** badge "PV FE #20" · dòng lớn "NHẢY CUỐI" / "BUILD 4987?" · phụ đề "Phỏng vấn Frontend · Câu 20/24" · badge emoji 📏 · variant shot, ảnh dọc `screens/perfqa/f2-off.png` (banner đỏ build thêm 4987 · 1622ms).

**Tags:** `itemextent, prototypeitem, listview jumpto, const constructor flutter, sliver flutter, flutter performance, phỏng vấn flutter, phỏng vấn frontend, maxscrollextent, tối ưu listview, flutter tiếng việt, học flutter, câu hỏi phỏng vấn flutter, flutter interview questions, scroll performance`

---

### Phỏng vấn FE #21 — setState rebuild cả trang: thu hẹp phạm vi (2:53)

**Tiêu đề:** Phỏng vấn FE #21: setState rebuild cả trang — cách thu hẹp phạm vi | Flutter interview

**Mô tả:**
```
Câu 21 lô hiệu năng — chuyện kinh điển nhất của setState trong Flutter: bấm một nút counter mà cả danh sách 40 item build lại. Vì sao, và thu hẹp phạm vi rebuild thế nào?

Docs Flutter nói thẳng: "When setState is called on a State object, all descendent widgets rebuild" — build() của State đó chạy lại, toàn bộ widget con cháu dựng lại theo. Thuốc chữa chính chủ cũng nằm trong docs: "localize the setState call" — đẩy state xuống widget NHỎ NHẤT thực sự cần nó. Đây là bài đối xứng với React.memo ở câu 15 nhưng chiều ngược: React chặn render từ NGOÀI bằng memo từng con, Flutter thu hẹp từ GỐC bằng tách widget.

Demo thật bằng f3_rebuild_scope.dart trên simulator, mỗi item đeo badge số lần build của chính nó: setState cả trang, bấm +1 ba lần — MỌI item nhìn thấy build 4 lần (1 mount + 3 setState của page) dù 40 dòng dữ liệu không đổi; tách _CounterBox thành StatefulWidget riêng giữ _count — cùng ba lần bấm, mọi item build đúng 1 lần vì build() của page không chạy lại. Hai bẫy: tách bằng helper function _buildItem KHÔNG tạo ranh giới rebuild — phải là class widget riêng; và đừng vác Provider/Riverpod ra chỉ để né một setState.

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 21 — setState kinh điển
0:17 Cơ chế: phạm vi rebuild của setState
0:49 Code: f3_rebuild_scope.dart — tách _CounterBox
1:24 Demo thật: mọi item 4 lần vs 1 lần
1:58 Trả lời như đi phỏng vấn: chốt 3 câu + 2 bẫy
2:33 Tổng kết câu 21 & hẹn câu 22

📦 Source code (demo-perf-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout perf-qa-batch-2 để xem đúng code câu hỏi này.
⏮️ Câu trước: https://youtu.be/1B_MsC6zh_4
⏭️ Câu tiếp theo: https://youtu.be/Wc3dkoRP0ig
📱 Bản Shorts 60 giây: https://youtu.be/HrC7B_N0OGo
▶️ Playlist series: "Phỏng vấn Frontend 🇻🇳" — https://www.youtube.com/playlist?list=PLYvXt5cUP0yE
▶️ 6 series khác trên kênh: "NestJS cho người mới bắt đầu" · "Super App với React Native" · "Mini-App từ A đến Z" (https://www.youtube.com/playlist?list=PLY-i2_1YbKi4) · "Mini-App với Flutter 🇻🇳" (https://www.youtube.com/playlist?list=PLL5FgtEBrD6g) · "Mini-App Flutter thuần 🇻🇳" (https://www.youtube.com/playlist?list=PLOjCSg9O8bRM) · "StyleX từ A đến Z 🇻🇳" (https://www.youtube.com/playlist?list=PLONwK58GbR_M)

#flutter #phongvan #frontend #hieunang #laptrinh
```

**Comment ghim gợi ý:**
```
🌳 Đố nhỏ câu 21: tách UI ra helper function _buildItem() có thu hẹp được phạm vi rebuild không? KHÔNG — helper function không tạo ranh giới rebuild, phải là CLASS widget riêng với setState sống bên trong nó. Trên demo: tách _CounterBox đưa mọi item từ build 4 lần về đúng 1 lần. setState không sai — chỉ hay bị đặt sai tầng của cây widget. Bạn hay tách widget hay tách helper?
```

**Thumbnail:** badge "PV FE #21" · dòng lớn "BẤM +1" / "CẢ LIST 4×?" · phụ đề "Phỏng vấn Frontend · Câu 21/24" · badge emoji 🌳 · variant shot, ảnh dọc `screens/perfqa/f3-page.png` (badge đỏ build 4 lần trên từng item).

**Tags:** `setstate flutter, rebuild scope, localize setstate, statefulwidget tách widget, flutter rebuild, flutter performance, phỏng vấn flutter, phỏng vấn frontend, const widget flutter, widget tree, flutter tiếng việt, học flutter, câu hỏi phỏng vấn flutter, flutter interview questions, tối ưu rebuild`

---

### Phỏng vấn FE #22 — Infinite scroll Flutter: guard cho ScrollController (2:55)

**Tiêu đề:** Phỏng vấn FE #22: Infinite scroll Flutter — guard cho ScrollController | Flutter interview

**Mô tả:**
```
Câu 22 lô hiệu năng — infinite scroll phía Flutter: dùng ScrollController mà API bị dội 45 LẦN trong một cú kéo. Vì sao, và chặn thế nào?

Khác biệt căn bản so với onEndReached bên React Native (câu 16): listener của ScrollController là callback MỨC PIXEL — chạy MỖI scroll event, gần như mỗi khung hình khi list đang cuộn hay bounce. Điều kiện pixels > maxScrollExtent − 200 đúng LIÊN TỤC suốt vùng đáy — trang mới chưa về, content chưa dài ra, nên trong 800ms chờ fetch, mỗi scroll event lọt qua là thêm một lần gọi loadMore. Cùng bài đo, RN dội 6 lần — Flutter nghe thẳng pixel nên dội tới 45 lần.

Demo thật bằng f4_infinite_scroll.dart trên simulator: Guard OFF, một cú fling tới đáy rồi kéo tiếp trong lúc loading — Trang 3, 75 item mà loadMore bị gọi 45 lần, tức khoảng 22 lần xin cùng một trang mỗi cửa sổ loading; Guard ON — gọi đúng 1 lần. Điểm sống còn: cờ _loading phải set NGAY TRƯỚC await fetchPage — set sau await là cửa sổ race vẫn mở nguyên suốt thời gian chờ mạng. Bẫy cộng thêm: dedupe theo id khi append là phòng tuyến thứ hai, và đừng quên removeListener + dispose cho controller.

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 22 — infinite scroll Flutter
0:16 Cơ chế: listener bắn theo pixel mỗi scroll event
0:48 Code: f4_infinite_scroll.dart — cờ set trước await
1:26 Demo thật: 45 lần vs 1 lần
1:58 Trả lời như đi phỏng vấn: chốt 3 câu + bẫy dedupe
2:35 Tổng kết câu 22 & hẹn câu 23

📦 Source code (demo-perf-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout perf-qa-batch-2 để xem đúng code câu hỏi này.
⏮️ Câu trước: https://youtu.be/PKOBn2a6Rnk
⏭️ Câu tiếp theo: https://youtu.be/koAhlIE_vzw
📱 Bản Shorts 60 giây: https://youtu.be/n4XWIFkbGXY
▶️ Playlist series: "Phỏng vấn Frontend 🇻🇳" — https://www.youtube.com/playlist?list=PLYvXt5cUP0yE
▶️ 6 series khác trên kênh: "NestJS cho người mới bắt đầu" · "Super App với React Native" · "Mini-App từ A đến Z" (https://www.youtube.com/playlist?list=PLY-i2_1YbKi4) · "Mini-App với Flutter 🇻🇳" (https://www.youtube.com/playlist?list=PLL5FgtEBrD6g) · "Mini-App Flutter thuần 🇻🇳" (https://www.youtube.com/playlist?list=PLOjCSg9O8bRM) · "StyleX từ A đến Z 🇻🇳" (https://www.youtube.com/playlist?list=PLONwK58GbR_M)

#flutter #phongvan #frontend #hieunang #laptrinh
```

**Comment ghim gợi ý:**
```
🔁 Đố nhỏ câu 22: cùng bài đo infinite scroll, vì sao RN chỉ dội 6 lần mà Flutter dội tới 45 lần? Vì onEndReached bắn theo SỰ KIỆN chạm ngưỡng, còn listener của ScrollController nghe thẳng PIXEL — chạy mỗi scroll event, điều kiện vùng đáy đúng liên tục trong lúc chờ fetch. Chốt chặn: if _loading return, và cờ phải set TRƯỚC await — set sau là race vẫn mở nguyên. Bạn đặt cờ chỗ nào?
```

**Thumbnail:** badge "PV FE #22" · dòng lớn "KÉO 1 CÚ" / "GỌI 45 LẦN?" · phụ đề "Phỏng vấn Frontend · Câu 22/24" · badge emoji 🔁 · variant shot, ảnh dọc `screens/perfqa/f4-bug.png` (header vàng Trang 3 · gọi 45 lần).

**Tags:** `scrollcontroller flutter, infinite scroll flutter, loadmore flutter, maxscrollextent, guard loading flag, flutter performance, phỏng vấn flutter, phỏng vấn frontend, pagination flutter, race condition flutter, flutter tiếng việt, học flutter, câu hỏi phỏng vấn flutter, flutter interview questions, scroll listener`

---

### Phỏng vấn FE #23 — cacheWidth: decode ảnh đúng kích thước hiển thị (2:56)

**Tiêu đề:** Phỏng vấn FE #23: cacheWidth — decode ảnh đúng kích thước hiển thị | Flutter interview

**Mô tả:**
```
Câu 23 lô hiệu năng: grid trăm ảnh của bạn ngốn gần 200MB RAM — vì sao, và MỘT dòng code nào cứu được? Demo đo RAM bằng chính imageCache của engine.

Chìa khóa: RAM của ảnh ăn theo kích thước DECODE, không phải kích thước file hay ô hiển thị — bitmap = width × height × 4 byte, nên ảnh 2000px chiếm 15.26MB dù ô grid chỉ rộng 190 điểm. cacheWidth là lời dặn cho engine — docs Flutter viết "decode and store the image at the specified size" — tách cỡ decode khỏi cỡ render; docs tính cho ảnh 4K: hơn 30MB RAM, khai cacheWidth 384 còn khoảng 330KB.

Demo thật bằng f5_images.dart, GridView 2 cột 120 ô đọc số từ imageCache.currentSizeBytes: chế độ gốc decode full 2000px — 152.6MB ngay màn đầu, cuộn đủ 12 nguồn lên 183.1MB, VƯỢT trần imageCache mặc định 100MiB; bật cacheWidth 380 — còn 5.5MB màn đầu, 6.6MB đủ 12 nguồn — giảm 27.7 lần, đúng bình phương 2000/380, mắt thường nhìn không phân biệt nổi. Hai điểm ăn điểm: cacheWidth tính theo pixel VẬT LÝ (ô 190 điểm trên màn 2x là 380 — nhớ nhân devicePixelRatio kẻo ảnh mờ), và ảnh vẫn nằm trong imageCache sau khi rời màn — đó là feature chứ không phải leak.

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 23 — grid trăm ảnh ngốn RAM
0:15 Cơ chế: RAM ăn theo kích thước decode
0:50 Code: f5_images.dart — một tham số cacheWidth
1:23 Demo thật: 152.6MB vs 5.5MB imageCache
1:59 Trả lời như đi phỏng vấn: chốt 3 câu + bẫy pixel vật lý
2:37 Tổng kết câu 23 & hẹn câu chốt sổ

📦 Source code (demo-perf-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout perf-qa-batch-2 để xem đúng code câu hỏi này.
⏮️ Câu trước: https://youtu.be/Wc3dkoRP0ig
⏭️ Câu tiếp theo: https://youtu.be/Jzn5ELGPewk
📱 Bản Shorts 60 giây: https://youtu.be/TZh0OO9O1TA
🔁 Bài y hệt bên React Native: câu 17 (expo-image) — https://youtu.be/GUXD0Yas9JA
▶️ Playlist series: "Phỏng vấn Frontend 🇻🇳" — https://www.youtube.com/playlist?list=PLYvXt5cUP0yE
▶️ 6 series khác trên kênh: "NestJS cho người mới bắt đầu" · "Super App với React Native" · "Mini-App từ A đến Z" (https://www.youtube.com/playlist?list=PLY-i2_1YbKi4) · "Mini-App với Flutter 🇻🇳" (https://www.youtube.com/playlist?list=PLL5FgtEBrD6g) · "Mini-App Flutter thuần 🇻🇳" (https://www.youtube.com/playlist?list=PLOjCSg9O8bRM) · "StyleX từ A đến Z 🇻🇳" (https://www.youtube.com/playlist?list=PLONwK58GbR_M)

#flutter #phongvan #frontend #hieunang #laptrinh
```

**Comment ghim gợi ý:**
```
💾 Đố nhỏ câu 23: ô grid rộng 190 điểm — khai cacheWidth bao nhiêu? 380, không phải 190! cacheWidth tính theo pixel VẬT LÝ — màn 2x phải nhân devicePixelRatio, kẻo ảnh mờ. Trên demo: 183.1MB xuống 6.6MB, giảm 27.7 lần đúng bình phương tỉ lệ decode, mắt thường không phân biệt nổi. Bên React Native thì expo-image tự downscale sẵn — xem câu 17 của series nhé!
```

**Thumbnail:** badge "PV FE #23" · dòng lớn "GRID ẢNH" / "NGỐN 152MB?" · phụ đề "Phỏng vấn Frontend · Câu 23/24" · badge emoji 💾 · variant shot, ảnh dọc `screens/perfqa/f5-plain.png` (banner đỏ imageCache 152.6MB).

**Tags:** `cachewidth flutter, image cache flutter, imagecache currentsizebytes, decode ảnh flutter, devicepixelratio, flutter performance, phỏng vấn flutter, phỏng vấn frontend, gridview builder, cached_network_image, flutter tiếng việt, học flutter, câu hỏi phỏng vấn flutter, flutter interview questions, ram optimization`

---

### Phỏng vấn FE #24 (CUỐI LÔ 2) — Isolate.run: parse data lớn không chặn UI (2:45)

**Tiêu đề:** Phỏng vấn FE #24: Isolate.run — parse data lớn không chặn UI | Flutter interview

**Mô tả:**
```
Câu 24 — câu chốt sổ của series Phỏng vấn Frontend: jsonDecode 200.000 bản ghi làm UI Flutter đứng hình, bạn xử thế nào cho đúng bài? Demo đo frame gap bằng Ticker trên simulator.

Chìa khóa: Dart chạy code ứng dụng trên MỘT luồng — main isolate; khối đồng bộ dài chiếm luồng là không frame nào được vẽ, docs Flutter nói quá 16ms là jank. await KHÔNG cứu — nó không tạo thread. Thoát hiểm chính chủ: Isolate.run — spawn isolate mới, chạy hàm, trả kết quả về rồi tự tắt: parallelism thật, không chia sẻ bộ nhớ, chỉ truyền message. Đối chiếu câu 18 bên React Native: một thread, chia lô chỉ mua sự phản hồi — Flutter dời hẳn việc sang chỗ khác.

Demo thật bằng f6_isolate.dart, chuỗi JSON 18.9MB: chạy trên main — frame gap 235ms, spinner đứng hình (gap lớn hơn cả tổng 223ms: main bị chiếm là không MỘT frame nào); Isolate.run — gap 16ms, đúng MỘT frame 60Hz, spinner quay mượt suốt lúc decode; tổng 320ms so với 223ms — chậm chừng 1,3 lần, giá quá rẻ; checksum hai nhánh giống hệt 7960890. Bẫy chốt sổ: closure trong method của State capture this (có Ticker) là crash "object is unsendable" — helper phải là hàm TOP-LEVEL chỉ nhận String, và trả KẾT QUẢ GỌN về thay vì cả núi object.

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 24 — câu chốt sổ của series
0:18 Cơ chế: main isolate — một luồng, await không cứu
0:45 Code: f6_isolate.dart — Isolate.run + helper top-level
1:17 Demo thật: gap 235ms vs 16ms — đúng 1 frame
1:53 Trả lời như đi phỏng vấn: chốt 3 câu + bẫy unsendable
2:27 Tổng kết trọn 24 câu & lời chào series

📦 Source code (demo-perf-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout perf-qa-batch-2 để xem đúng 12 câu code của lô 2 (6 React Native + 6 Flutter).
⏮️ Câu trước: https://youtu.be/koAhlIE_vzw
▶️ Xem lại từ đầu lô 2: https://youtu.be/2yu2FhayLY0
📱 Bản Shorts 60 giây: https://youtu.be/oYjtEW_Z1UM
🔁 Cùng bài bên React Native: câu 18 (chia lô trên JS thread) — https://youtu.be/zlzQHCex90o
▶️ Playlist series: "Phỏng vấn Frontend 🇻🇳" — https://www.youtube.com/playlist?list=PLYvXt5cUP0yE
▶️ 6 series khác trên kênh: "NestJS cho người mới bắt đầu" · "Super App với React Native" · "Mini-App từ A đến Z" (https://www.youtube.com/playlist?list=PLY-i2_1YbKi4) · "Mini-App với Flutter 🇻🇳" (https://www.youtube.com/playlist?list=PLL5FgtEBrD6g) · "Mini-App Flutter thuần 🇻🇳" (https://www.youtube.com/playlist?list=PLOjCSg9O8bRM) · "StyleX từ A đến Z 🇻🇳" (https://www.youtube.com/playlist?list=PLONwK58GbR_M)
💬 Đủ 24 câu trên playlist — comment câu hỏi phỏng vấn khó nhất bạn từng gặp để series sau càng sát thực tế!

#flutter #phongvan #frontend #hieunang #laptrinh
```

**Comment ghim gợi ý:**
```
🚀 Vậy là đủ 24 câu — 12 câu React & Vue lô 1, 12 câu hiệu năng React Native & Flutter lô 2, câu nào cũng demo đo số thật. Bẫy chốt sổ câu 24: đưa closure trong State vào Isolate.run là crash "object is unsendable" — vì closure capture this có Ticker. Helper phải là hàm TOP-LEVEL chỉ nhận String. Cảm ơn bạn đã luyện cùng — comment câu hỏi khó nhất bạn từng gặp cho series sau nhé!
```

**Thumbnail:** badge "PV FE #24" · dòng lớn "DECODE 200K" / "ĐƠ 235MS?" · phụ đề "Phỏng vấn Frontend · Câu 24/24" · badge emoji 🚀 · variant shot, ảnh dọc `screens/perfqa/f6-blocked.png` (box đỏ frame gap 235ms).

**Tags:** `isolate.run, isolate flutter, jsondecode lớn, main isolate, compute flutter, frame gap jank, flutter performance, phỏng vấn flutter, phỏng vấn frontend, unsendable object, flutter tiếng việt, học flutter, câu hỏi phỏng vấn flutter, flutter interview questions, parse json background`

---

### Shorts lô 2 (12 video)

> Mỗi Short <60 giây, cùng câu hỏi với video ngang tương ứng, rút gọn để ôn nhanh. Đánh số nối tiếp lô 1: sn1..sn6 = Shorts #13..#18 (React Native), sf1..sf6 = Shorts #19..#24 (Flutter). CHƯA ĐĂNG — điền link thật thay placeholder khi đăng; mô tả mỗi Short chỉ cần dòng caption dưới đây + link video đầy đủ.

| id | Tiêu đề Shorts | Caption |
|---|---|---|
| sn1 | Vì sao FlatList mượt hơn ScrollView? 60 giây #shorts | FlatList dùng virtualization: chỉ render trong cửa sổ — 10 item/198ms so với 5.000 item/1381ms của ScrollView+map.<br>Bẫy: cuộn quá nhanh vẫn trắng màn — chiến lược đánh đổi, không phải phép màu.<br>Video đầy đủ: https://youtu.be/2yu2FhayLY0<br>#shorts #reactnative #phongvan |
| sn2 | scrollToIndex FAIL — thiếu đúng một prop #shorts | getItemLayout đưa trước công thức length + offset — FlatList bỏ bước đo, nhảy tới item 4999 tức thì 49ms thay vì FAIL.<br>Bẫy: chỉ dùng khi item cao CỐ ĐỊNH — khai láo là cuộn sai vị trí.<br>Video đầy đủ: https://youtu.be/lhaNL9y2Q7M<br>#shorts #reactnative #phongvan |
| sn3 | 1 item đổi, cả nghìn item render lại? #shorts | React.memo so shallow props — kết hợp update immutable + renderItem bọc useCallback: chỉ hàng đổi mới render.<br>Bẫy: hàm ẩn danh mới mỗi render là memo vô dụng ngay.<br>Video đầy đủ: https://youtu.be/OLD6KBVCzzc<br>#shorts #reactnative #phongvan |
| sn4 | onEndReached gọi trùng API — chặn bằng 1 cái ref #shorts | Guard bằng cờ trong ref: set TRƯỚC fetch, hạ khi response về — 6 lần gọi trùng về đúng 1 lần mỗi nhịp.<br>Bẫy: cờ bằng state là hở vì setState bất đồng bộ — closure cũ vẫn đọc false.<br>Video đầy đủ: https://youtu.be/oTYFiL8OzB8<br>#shorts #reactnative #phongvan |
| sn5 | List trăm ảnh cuộn mượt: expo-image #shorts | expo-image decode đúng cỡ container + cache 2 tầng memory-disk: warm 153ms, kill app vẫn 368ms.<br>Bẫy: lần đầu 1360ms CHẬM HƠN là chi phí điền cache — trả một lần, lãi mọi lần sau.<br>Video đầy đủ: https://youtu.be/GUXD0Yas9JA<br>#shorts #reactnative #phongvan |
| sn6 | Parse 300k bản ghi — UI đứng hình vì sao? #shorts | JS một thread — chia lô 5.000 + setTimeout 0 nhường event loop: maxGap từ 564ms xuống 127ms.<br>Bẫy: chia lô mua PHẢN HỒI chứ không mua tốc độ — tổng chậm hơn 2–3 lần.<br>Video đầy đủ: https://youtu.be/zlzQHCex90o<br>#shorts #reactnative #phongvan |
| sf1 | Column 5000 item đơ 8 giây — vì sao? #shorts | Column build cả 5.000 widget ngay frame đầu; ListView.builder chỉ build 17 item — 199ms.<br>Bẫy: shrinkWrap true hay lồng ListView trong Column hở chiều cao là builder bị ép build HẾT.<br>Video đầy đủ: https://youtu.be/JHP-5gZ6cqA<br>#shorts #flutter #phongvan |
| sf2 | itemExtent — nhảy cuối list 5000 hàng trong 34ms #shorts | Khai itemExtent 64 là vị trí item thành số học: jumpTo xuống đáy chỉ build thêm 12 item thay vì 4.987.<br>Bẫy: chỉ cho hàng cao ĐỀU — và cấm khai cùng lúc với prototypeItem.<br>Video đầy đủ: https://youtu.be/1B_MsC6zh_4<br>#shorts #flutter #phongvan |
| sf3 | Bấm +1 mà 40 item rebuild — sửa thế nào? #shorts | localize setState: đẩy state xuống StatefulWidget nhỏ nhất cần nó — mọi item từ build 4 lần về đúng 1 lần.<br>Bẫy: helper function không tạo ranh giới rebuild — phải là class widget riêng.<br>Video đầy đủ: https://youtu.be/PKOBn2a6Rnk<br>#shorts #flutter #phongvan |
| sf4 | ScrollController dội API 45 lần một cú kéo #shorts | Listener chạy MỖI scroll event — guard if _loading return, cờ set NGAY TRƯỚC await: 45 lần về 1 lần.<br>Bẫy: set cờ sau await là cửa sổ race vẫn mở suốt 800ms chờ mạng.<br>Video đầy đủ: https://youtu.be/Wc3dkoRP0ig<br>#shorts #flutter #phongvan |
| sf5 | Grid ảnh ngốn 183MB RAM — 1 dòng code cứu #shorts | RAM ảnh ăn theo kích thước DECODE — cacheWidth 380 đưa imageCache từ 183.1MB về 6.6MB, giảm 27.7 lần.<br>Bẫy: cacheWidth là pixel VẬT LÝ — ô 190 điểm màn 2x phải khai 380, kẻo ảnh mờ.<br>Video đầy đủ: https://youtu.be/koAhlIE_vzw<br>#shorts #flutter #phongvan |
| sf6 | jsonDecode đứng hình UI — Isolate.run cứu #shorts | Dart một luồng, await không cứu — Isolate.run dời decode sang isolate nền: gap 235ms về đúng 1 frame 16ms.<br>Bẫy: closure capture this là crash unsendable — helper top-level chỉ nhận String.<br>Video đầy đủ: https://youtu.be/Jzn5ELGPewk<br>#shorts #flutter #phongvan |


---

## LÔ 3 SERIES PHỎNG VẤN FRONTEND — Backend Node.js & NestJS (câu #25–#36 + 12 Shorts)

> Lô 3 nối tiếp cùng playlist **"Phỏng vấn Frontend 🇻🇳"** — https://www.youtube.com/playlist?list=PLYvXt5cUP0yE (KHÔNG tạo playlist mới — khi đăng chỉ nối 24 video lô 3 vào playlist sẵn có). CHƯA ĐĂNG — mọi link video là placeholder `https://youtu.be/xn7t2HvIE_A`..`https://youtu.be/Qmm-UDqc49Q` (bản ngang) và `https://youtu.be/B2SO5WuX76o`..`https://youtu.be/KsX-lapue8s` (Shorts), điền link thật khi đăng. Chủ đề lô 3: BACKEND cho dân Frontend đi phỏng vấn Fullstack — 6 câu Node.js core (B1–B6 → ep69–ep74) + 6 câu NestJS (S1–S6 → ep75–ep80), mỗi câu có demo chạy SỐ THẬT trên Node 22 (kịch bản luôn nói rõ "trên máy tôi"). Code: `demo-be-interview/` (`node-qa/` + `nest-qa/`), đóng băng ở tag `be-qa-batch-3`. Cặp chéo: câu 25↔30 (twist microtask ESM ↔ require(esm)), câu 27 nhắc sang câu 18 RN + 24 Flutter (một chiều — video cũ không sửa), câu 32 trỏ playlist series NestJS cũ.

Từ khóa chủ lực lô 3: `phỏng vấn nodejs`, `phỏng vấn nestjs`, `phỏng vấn backend`, `event loop nodejs`, `worker threads`, `stream backpressure`, `promise.all`, `dependency injection nestjs`, `câu hỏi phỏng vấn backend`, `học nodejs`, `học nestjs`.

---

### Phỏng vấn FE #25 — Event loop Node: thứ tự chạy thật (2:58)

**Tiêu đề:** Phỏng vấn FE #25: Event loop Node — thứ tự chạy thật | Node.js interview

**Mô tả:**
```
Mở màn lô 3 series Phỏng vấn Frontend — 12 câu hỏi BACKEND thật mà dân Frontend đi phỏng vấn Fullstack chắc chắn gặp: 6 câu Node.js core + 6 câu NestJS. Câu 25 là câu kinh điển số một của mọi buổi phỏng vấn backend Node: console.log, setTimeout 0, setImmediate, nextTick, promise — đố bạn thứ tự chạy?

Mô hình chuẩn trong docs: code sync chạy hết trước — call stack xả sạch; rồi tới microtask — process.nextTick trước (docs nói thẳng nextTick KHÔNG thuộc event loop, nó xả ngay sau operation hiện tại), xong mới tới Promise callback; hết microtask event loop mới quay vòng qua các phase timers, poll, check.

Demo thật bằng b1.mjs trên Node 22, hàm hit gắn số thứ tự ĐỘNG — và một cú twist rất nhiều sách viết sai: promise.then chạy TRƯỚC nextTick, vì file .mjs là ESM — module được evaluate như một microtask; đối chứng file .cjs thì nextTick lên trước, đúng sách. Còn setTimeout 0 với setImmediate: ngoài I/O cycle thứ tự KHÔNG đảm bảo (5 lần chạy 4 lần đảo trên máy tôi), nhưng đặt trong callback fs.readFile thì immediate thắng 5/5 lần — docs đảm bảo điều này.

⏱️ NỘI DUNG:
0:00 Giới thiệu lô Node.js & câu 25
0:20 Cơ chế: stack → microtask → phase
0:55 Code: b1.mjs — 5 ứng viên xếp hàng
1:19 Demo thật: twist ESM — promise trước nextTick
1:54 Trả lời như đi phỏng vấn: chốt 3 câu + twist ESM
2:37 Tổng kết câu 25 & hẹn câu 26

📦 Source code (demo-be-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout be-qa-batch-3 để xem đúng code câu hỏi này.
⏮️ Câu chốt lô 2: https://youtu.be/Jzn5ELGPewk
⏭️ Câu tiếp theo: https://youtu.be/ju4JxEMByNU
📱 Bản Shorts 60 giây: https://youtu.be/B2SO5WuX76o
🔁 CommonJS vs ESM còn cú twist lớn hơn: câu 30 — require(esm): https://youtu.be/iRWCw8BTdEM
▶️ Playlist series: "Phỏng vấn Frontend 🇻🇳" — https://www.youtube.com/playlist?list=PLYvXt5cUP0yE
▶️ 6 series khác trên kênh: "NestJS cho người mới bắt đầu" · "Super App với React Native" · "Mini-App từ A đến Z" (https://www.youtube.com/playlist?list=PLY-i2_1YbKi4) · "Mini-App với Flutter 🇻🇳" (https://www.youtube.com/playlist?list=PLL5FgtEBrD6g) · "Mini-App Flutter thuần 🇻🇳" (https://www.youtube.com/playlist?list=PLOjCSg9O8bRM) · "StyleX từ A đến Z 🇻🇳" (https://www.youtube.com/playlist?list=PLONwK58GbR_M)

#nodejs #phongvan #backend #laptrinh
```

**Comment ghim gợi ý:**
```
🔁 Mở màn lô 3 — 12 câu hỏi BACKEND từ phòng phỏng vấn Node.js & NestJS, câu nào cũng demo chạy số thật. Đố nhỏ câu 25: trong file .mjs, promise.then hay process.nextTick chạy trước? PROMISE — vì module ESM được evaluate như một microtask, .then nối thẳng vào hàng đang xả; file .cjs thì nextTick lên trước, đúng sách. Nói được twist này là interviewer biết bạn đã tự chạy code. Comment thứ tự bạn đoán trước khi xem nhé!
```

**Thumbnail:** badge "PV FE #25" · dòng lớn "PROMISE TRƯỚC" / "NEXTTICK?!" · phụ đề "Phỏng vấn Frontend · Câu 25/36" · badge emoji 🔁 · variant shot, ảnh dọc `screens/beqa/b1-order.png` (terminal thứ tự thật 5 hàng đợi).

**Tags:** `event loop nodejs, process.nexttick, setimmediate, settimeout 0, microtask nodejs, esm vs commonjs, phỏng vấn nodejs, phỏng vấn backend, nodejs event loop order, node 22, nodejs tiếng việt, học nodejs, câu hỏi phỏng vấn nodejs, nodejs interview questions, phỏng vấn fullstack`

---

### Phỏng vấn FE #26 — Node 1 thread: vì sao vẫn cân nghìn request? (2:58)

**Tiêu đề:** Phỏng vấn FE #26: Node 1 thread — vì sao vẫn cân nghìn request? | Node.js interview

**Mô tả:**
```
Câu 26 lô backend: Node chạy một thread — sao phục vụ được nghìn request cùng lúc? Và khi nào thì KHÔNG? Trả lời bằng một server thật với hai route cùng MỘT khối lượng — chỉ khác một chữ Sync — rồi để autocannon in số ra màn hình.

Bí mật scalability nằm ngay trong docs: Node dùng một số lượng NHỎ thread để phục vụ rất nhiều client — vì thread chính không bao giờ NGỒI CHỜ I/O: gặp việc chờ mạng, chờ đĩa là event loop giao cho hệ thống làm nền rồi quay sang client khác. Việc nặng như crypto, nén, file I/O thì API async đẩy sang Worker Pool của libuv — mặc định 4 thread. Mặt trái: event loop bị giữ quá lâu là MỌI client hiện tại lẫn mới đều không tới lượt.

Demo thật bằng b2-server.mjs: khối lượng là pbkdf2 40.000 vòng — khoảng 8–9ms mỗi hash trên máy tôi. Autocannon bắn 10 kết nối trong 5 giây: route sync (pbkdf2Sync chạy ngay trên event loop) khoảng 104 req/s, latency trung bình 95ms — đúng bằng 10 request xếp hàng nhân 9ms mỗi hash, lat max gần nửa giây; route async 322 req/s, latency 30ms — hơn GẤP BA, cùng một thread JavaScript. Và gấp ba chứ không vô hạn: việc nặng không biến mất, nó RỜI event loop sang threadpool 4 thread — trần song song nằm ở đó, nấc chỉnh tiếp theo là UV_THREADPOOL_SIZE.

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 26 — 1 thread, nghìn request
0:18 Cơ chế: non-blocking I/O & worker pool
0:52 Code: b2-server.mjs — pbkdf2 sync vs async
1:24 Demo thật: 104 vs 322 req/s — gấp 3 lần
2:00 Trả lời như đi phỏng vấn: chốt 3 câu + điểm cộng
2:40 Tổng kết câu 26 & hẹn câu 27

📦 Source code (demo-be-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout be-qa-batch-3 để xem đúng code câu hỏi này.
⏮️ Câu trước: https://youtu.be/xn7t2HvIE_A
⏭️ Câu tiếp theo: https://youtu.be/0nJBSuRLzm4
📱 Bản Shorts 60 giây: https://youtu.be/ny2he0miIG4
▶️ Playlist series: "Phỏng vấn Frontend 🇻🇳" — https://www.youtube.com/playlist?list=PLYvXt5cUP0yE
▶️ 6 series khác trên kênh: "NestJS cho người mới bắt đầu" · "Super App với React Native" · "Mini-App từ A đến Z" (https://www.youtube.com/playlist?list=PLY-i2_1YbKi4) · "Mini-App với Flutter 🇻🇳" (https://www.youtube.com/playlist?list=PLL5FgtEBrD6g) · "Mini-App Flutter thuần 🇻🇳" (https://www.youtube.com/playlist?list=PLOjCSg9O8bRM) · "StyleX từ A đến Z 🇻🇳" (https://www.youtube.com/playlist?list=PLONwK58GbR_M)

#nodejs #phongvan #backend #laptrinh
```

**Comment ghim gợi ý:**
```
🧵 Đố nhỏ câu 26: đổi pbkdf2Sync sang pbkdf2 callback thì MỘT request đơn lẻ có nhanh hơn không? KHÔNG — phép tính vẫn 8–9ms; async chỉ DỜI việc nặng sang threadpool 4 thread của libuv để event loop rảnh đi nhận client khác. Khác biệt chỉ lộ khi nhiều kết nối đồng thời: 104 vs 322 req/s trên demo. Luật số một của Node: đừng chặn event loop. Bạn từng dính API sync nào làm server đơ chưa?
```

**Thumbnail:** badge "PV FE #26" · dòng lớn "1 THREAD" / "322 REQ/S?" · phụ đề "Phỏng vấn Frontend · Câu 26/36" · badge emoji 🧵 · variant shot, ảnh dọc `screens/beqa/b2-bench.png` (bảng autocannon sync vs async).

**Tags:** `non-blocking io, nodejs single thread, libuv threadpool, uv_threadpool_size, autocannon, pbkdf2 nodejs, event loop blocking, phỏng vấn nodejs, phỏng vấn backend, nodejs scalability, nodejs tiếng việt, học nodejs, câu hỏi phỏng vấn nodejs, nodejs interview questions, phỏng vấn fullstack`

---

### Phỏng vấn FE #27 — CPU-bound trên Node: worker_threads cứu server (2:53)

**Tiêu đề:** Phỏng vấn FE #27: CPU-bound trên Node — worker_threads cứu server | Node.js interview

**Mô tả:**
```
Câu 27 lô backend — hệ quả trực tiếp của câu trước: hash password hay nén ảnh trên Node làm cả server đơ, bạn xử lý thế nào? Demo chạy CÙNG một khối hash theo hai cách — trên main thread và qua worker_threads — để đồng hồ tick 100ms làm trọng tài.

JavaScript của Node chạy trên MỘT thread — khối CPU dài chiếm event loop là không timer, không I/O, không request nào được phục vụ. Lời giải chính danh trong docs: worker_threads — "threads that execute JavaScript in parallel" — thread chạy JavaScript song song trong cùng process. Docs khoanh vùng rõ: worker hợp cho tính toán CPU nặng, còn I/O thì KHÔNG giúp mấy. Giao việc qua workerData, worker tính xong postMessage kết quả về — main chỉ việc await.

Demo thật bằng b3.mjs: pbkdf2Sync 40.000 vòng lặp 200 lần chuỗi NỐI (không chia song song được). Nhánh main: maxGap 1.921ms — đồng hồ ĐỨNG HÌNH trọn 1,9 giây, với server thật là 1,9 giây KHÔNG một request nào được phục vụ. Nhánh worker: spawn 45ms, maxGap chỉ 102ms — đúng một tick cộng 2ms jitter. Hai dòng tổng 1.871 vs 1.874ms — NGANG NHAU, hai nhánh in cùng hash khớp từng ký tự: việc chạy chỗ khác chứ không xếp hàng lại, không ai ăn gian. Và nhớ phân biệt: cluster nhân cả PROCESS chia sẻ cổng — scale ngang cả app; task nặng lẻ thì worker_threads.

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 27 — hash làm server đơ
0:16 Cơ chế: worker_threads — JS song song cùng process
0:49 Code: b3.mjs — main vs new Worker
1:21 Demo thật: maxGap 1921ms vs 102ms
1:55 Trả lời như đi phỏng vấn: chốt 3 câu + so 3 nền tảng
2:35 Tổng kết câu 27 & hẹn câu 28

📦 Source code (demo-be-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout be-qa-batch-3 để xem đúng code câu hỏi này.
⏮️ Câu trước: https://youtu.be/ju4JxEMByNU
⏭️ Câu tiếp theo: https://youtu.be/u4xQFMtrBN8
📱 Bản Shorts 60 giây: https://youtu.be/XzjvYPN2-bU
🔁 Cùng bài trên mobile: câu 18 (RN chia lô trên JS thread) — https://youtu.be/zlzQHCex90o · câu 24 (Flutter Isolate.run) — https://youtu.be/Jzn5ELGPewk
▶️ Playlist series: "Phỏng vấn Frontend 🇻🇳" — https://www.youtube.com/playlist?list=PLYvXt5cUP0yE
▶️ 6 series khác trên kênh: "NestJS cho người mới bắt đầu" · "Super App với React Native" · "Mini-App từ A đến Z" (https://www.youtube.com/playlist?list=PLY-i2_1YbKi4) · "Mini-App với Flutter 🇻🇳" (https://www.youtube.com/playlist?list=PLL5FgtEBrD6g) · "Mini-App Flutter thuần 🇻🇳" (https://www.youtube.com/playlist?list=PLOjCSg9O8bRM) · "StyleX từ A đến Z 🇻🇳" (https://www.youtube.com/playlist?list=PLONwK58GbR_M)

#nodejs #phongvan #backend #laptrinh
```

**Comment ghim gợi ý:**
```
👷 Đố nhỏ câu 27: bọc khối hash trong async/await có cứu được server không? KHÔNG — await không tạo thread nào cả, CPU-bound vẫn chiếm event loop 1,9 giây. Phải bê việc sang worker_threads: maxGap từ 1921ms về 102ms, tổng thời gian KHÔNG đổi, hash khớp từng ký tự — việc chạy chỗ khác chứ không ai làm ít đi. Còn cluster là nhân cả process để scale ngang — chuyện khác. Bạn từng nhầm worker_threads với cluster chưa?
```

**Thumbnail:** badge "PV FE #27" · dòng lớn "SERVER ĐƠ 1.9S" / "VÌ 1 CÚ HASH?" · phụ đề "Phỏng vấn Frontend · Câu 27/36" · badge emoji 👷 · variant shot, ảnh dọc `screens/beqa/b3-worker.png` (đồng hồ tick — maxGap hai nhánh).

**Tags:** `worker threads nodejs, worker_threads, cpu bound nodejs, cluster vs worker threads, postmessage workerdata, event loop blocking, hash password nodejs, phỏng vấn nodejs, phỏng vấn backend, nodejs parallel, nodejs tiếng việt, học nodejs, câu hỏi phỏng vấn nodejs, nodejs interview questions, phỏng vấn fullstack`

---

### Phỏng vấn FE #28 — Stream và backpressure: 1GB file, 100MB RAM (2:37)

**Tiêu đề:** Phỏng vấn FE #28: Stream và backpressure — 1GB file, 100MB RAM | Node.js interview

**Mô tả:**
```
Câu 28 lô backend: API cho tải file 1GB — code của bạn có làm server phình 1GB RAM không? Demo đo RSS thật trên CÙNG một file 1GB, đọc theo hai cách: readFile cả cục và stream chảy từng chunk.

readFile tải NGUYÊN file vào RAM rồi mới xử lý — file 1GB là RSS phồng đúng cỡ đó, 10GB là server gục. Stream đọc từng chunk theo highWaterMark — read stream của fs mặc định 64KiB — nên bộ nhớ giữ cố định dù file bao lớn. Backpressure: bên ghi chậm hơn bên đọc thì write() trả false — tín hiệu dừng nguồn, chờ event drain rồi mới bơm tiếp; và pipe tự lo trọn gói — docs nói dòng chảy được "automatically managed".

Demo thật bằng b4.mjs: nhánh readfile — RSS từ 40MB phồng lên đỉnh 1.071MB, đúng nguyên cỡ file (có lần đo 545MB do macOS nén bộ nhớ — số sạch nhất vẫn là cả gigabyte); nhánh stream — đỉnh chỉ 97MB, chênh 11 lần, và highWaterMark thật in đúng 65.536 byte. Trung thực luôn: thời gian hai cách ngang nhau — 203 vs 315ms trên máy tôi — stream mua RAM phẳng, KHÔNG mua tốc độ. Bẫy: đọc file để trả response thì pipe thẳng vào res — đừng await đọc hết rồi res.send.

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 28 — file 1GB, RAM bao nhiêu?
0:14 Cơ chế: readFile cả cục vs stream từng chunk
0:42 Code: b4.mjs — createReadStream + pipe
1:13 Demo thật: RSS đỉnh 1071MB vs 97MB
1:45 Trả lời như đi phỏng vấn: chốt 3 câu + bẫy
2:15 Tổng kết câu 28 & hẹn câu 29

📦 Source code (demo-be-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout be-qa-batch-3 để xem đúng code câu hỏi này.
⏮️ Câu trước: https://youtu.be/0nJBSuRLzm4
⏭️ Câu tiếp theo: https://youtu.be/u9SUvpcqQGA
📱 Bản Shorts 60 giây: https://youtu.be/2zvXeqm7Ckk
▶️ Playlist series: "Phỏng vấn Frontend 🇻🇳" — https://www.youtube.com/playlist?list=PLYvXt5cUP0yE
▶️ 6 series khác trên kênh: "NestJS cho người mới bắt đầu" · "Super App với React Native" · "Mini-App từ A đến Z" (https://www.youtube.com/playlist?list=PLY-i2_1YbKi4) · "Mini-App với Flutter 🇻🇳" (https://www.youtube.com/playlist?list=PLL5FgtEBrD6g) · "Mini-App Flutter thuần 🇻🇳" (https://www.youtube.com/playlist?list=PLOjCSg9O8bRM) · "StyleX từ A đến Z 🇻🇳" (https://www.youtube.com/playlist?list=PLONwK58GbR_M)

#nodejs #phongvan #backend #laptrinh
```

**Comment ghim gợi ý:**
```
🌊 Đố nhỏ câu 28: stream có làm đọc file NHANH hơn readFile không? KHÔNG — 203 vs 315ms, ngang nhau trên demo. Stream mua RAM PHẲNG: đỉnh 97MB thay vì 1071MB cho cùng file 1GB, chênh 11 lần — vì chỉ giữ từng chunk 64KiB trong tay. Còn backpressure? write() trả false là dừng, chờ drain bơm tiếp — mà pipe tự lo hết cho bạn. Bạn từng thấy server ăn RAM theo cỡ file chưa? Kể nghe với!
```

**Thumbnail:** badge "PV FE #28" · dòng lớn "1GB FILE" / "97MB RAM?" · phụ đề "Phỏng vấn Frontend · Câu 28/36" · badge emoji 🌊 · variant shot, ảnh dọc `screens/beqa/b4-rss.png` (RSS đỉnh hai nhánh).

**Tags:** `stream nodejs, backpressure, highwatermark, createreadstream, pipe nodejs, readfile vs stream, rss memory nodejs, phỏng vấn nodejs, phỏng vấn backend, file lớn nodejs, nodejs tiếng việt, học nodejs, câu hỏi phỏng vấn nodejs, nodejs interview questions, phỏng vấn fullstack`

---

### Phỏng vấn FE #29 — Promise.all: 3 API trong 300ms và bẫy fail-fast (2:43)

**Tiêu đề:** Phỏng vấn FE #29: Promise.all — 3 API trong 300ms và bẫy fail-fast | Node.js interview

**Mô tả:**
```
Câu 29 lô backend: trang cần gọi 3 API — code của bạn mất 900 hay 300 mili giây? Và khi một API hỏng thì sao? Demo đo thật: cùng 3 API giả lập 300ms mỗi cái, chạy đủ bốn kiểu — await tuần tự, Promise.all, bẫy fail-fast và allSettled.

Await tuần tự là cộng dồn: mỗi await đợi API trước xong mới bắn cái sau. Promise.all bắn cả ba cùng lúc rồi đợi chung — tổng bằng cái CHẬM NHẤT (MDN: fulfill khi TẤT CẢ promise đầu vào fulfill). Nhưng nó fail-fast: chỉ MỘT cái reject là cả cụm reject NGAY với lỗi đầu tiên — và các promise kia KHÔNG bị hủy, vẫn chạy ngầm. Muốn nhận đủ kết quả từng cái kể cả lỗi thì Promise.allSettled.

Số thật từ b5.mjs trên máy tôi: tuần tự — từng bước 302ms, tổng 907ms; Promise.all — 303ms, chênh đúng 3 lần, bằng số promise. Khối bẫy: orders reject sau 100ms — Promise.all nổ NGAY ở 103ms, không đợi hai cái 300ms; nhưng dòng bằng chứng cho thấy user và promos vẫn âm thầm chạy xong ở 302ms — không ai nhận kết quả. Còn allSettled đợi đủ cả ba, tổng 302ms, không nổ. Bẫy chốt: fail-fast KHÔNG hủy promise còn lại — muốn hủy thật phải truyền tín hiệu kiểu AbortController.

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 29 — 900 hay 300 mili giây?
0:16 Cơ chế: tuần tự cộng dồn vs Promise.all
0:48 Code: b5.mjs — 4 kiểu chạy 3 API
1:18 Demo thật: 907ms vs 303ms + bẫy fail-fast
1:50 Trả lời như đi phỏng vấn: chốt 3 câu + bẫy
2:19 Tổng kết câu 29 & hẹn câu 30

📦 Source code (demo-be-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout be-qa-batch-3 để xem đúng code câu hỏi này.
⏮️ Câu trước: https://youtu.be/u4xQFMtrBN8
⏭️ Câu tiếp theo: https://youtu.be/iRWCw8BTdEM
📱 Bản Shorts 60 giây: https://youtu.be/wTxmINjhbJE
▶️ Playlist series: "Phỏng vấn Frontend 🇻🇳" — https://www.youtube.com/playlist?list=PLYvXt5cUP0yE
▶️ 6 series khác trên kênh: "NestJS cho người mới bắt đầu" · "Super App với React Native" · "Mini-App từ A đến Z" (https://www.youtube.com/playlist?list=PLY-i2_1YbKi4) · "Mini-App với Flutter 🇻🇳" (https://www.youtube.com/playlist?list=PLL5FgtEBrD6g) · "Mini-App Flutter thuần 🇻🇳" (https://www.youtube.com/playlist?list=PLOjCSg9O8bRM) · "StyleX từ A đến Z 🇻🇳" (https://www.youtube.com/playlist?list=PLONwK58GbR_M)

#nodejs #phongvan #backend #laptrinh
```

**Comment ghim gợi ý:**
```
⚡ Đố nhỏ câu 29: Promise.all reject ở giây 103 vì orders hỏng — hai API còn lại có dừng không? KHÔNG — fail-fast chỉ nghĩa là cụm reject ngay với lỗi đầu tiên; user và promos vẫn âm thầm chạy xong ở 302ms, tốn tài nguyên mà không ai nhận kết quả. Muốn hủy thật phải AbortController; muốn đủ báo cáo từng cái kể cả lỗi thì allSettled. Bạn hay dùng all hay allSettled? Comment lý do nhé!
```

**Thumbnail:** badge "PV FE #29" · dòng lớn "3 API" / "907 HAY 303MS?" · phụ đề "Phỏng vấn Frontend · Câu 29/36" · badge emoji ⚡ · variant shot, ảnh dọc `screens/beqa/b5-timing.png` (bảng thời gian 4 kiểu chạy).

**Tags:** `promise.all, promise.allsettled, promise.race, fail fast promise, await tuần tự, async await nodejs, abortcontroller, phỏng vấn nodejs, phỏng vấn javascript, gọi api song song, nodejs tiếng việt, học nodejs, câu hỏi phỏng vấn nodejs, nodejs interview questions, phỏng vấn fullstack`

---

### Phỏng vấn FE #30 — CommonJS vs ESM: require(esm) đã chạy được (2:57)

**Tiêu đề:** Phỏng vấn FE #30: CommonJS vs ESM — require(esm) đã chạy được | Node.js interview

**Mô tả:**
```
Câu 30 lô backend: dự án Node của bạn dùng CommonJS hay ESM — và khác nhau thật sự ở đâu? Trả lời bằng bốn phép thử chạy thật trên cả hai hệ: __dirname, load JSON, top-level await, và load chéo — kèm một cú twist nhiều người chưa cập nhật.

CommonJS là hệ cũ của Node: require với module.exports — load động, đồng bộ; ESM là chuẩn chung của JavaScript: import/export tĩnh. Node chọn hệ theo đuôi file: .mjs luôn là ESM, .cjs luôn là CommonJS, .js theo trường type trong package.json — không khai thì mặc định CommonJS. CJS có sẵn __dirname, require JSON ăn ngay; ESM mất __dirname (thay bằng import.meta.dirname) nhưng có top-level await, và import JSON phải khai with type json.

Demo thật b6.mjs + b6-cjs.cjs trên Node 22: CJS — __dirname OK, require JSON OK, top-level await là SyntaxError ngay lúc parse. Twist ở mục 4: require một file ESM có top-level await nổ ERR_REQUIRE_ASYNC_MODULE, nhưng require file ESM ĐỒNG BỘ thì chạy luôn — không cờ, không warning (require(esm) chính thức từ Node 22.12). Bẫy: bật type module là mọi file .js thành ESM hết — require cũ chết ngay, file cần CommonJS thì đổi đuôi .cjs. Và ESM đổi cả thứ tự microtask — cú twist đã đo ở câu 25.

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 30 — CommonJS hay ESM?
0:14 Cơ chế: hai hệ module — luật chọn theo đuôi file
0:47 Code: b6.mjs — 4 phép thử
1:16 Demo thật: require(esm) chạy — twist Node 22
1:58 Trả lời như đi phỏng vấn: chốt 3 câu + bẫy
2:34 Tổng kết câu 30 — khối Node 6/6 xong

📦 Source code (demo-be-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout be-qa-batch-3 để xem đúng code câu hỏi này.
⏮️ Câu trước: https://youtu.be/u9SUvpcqQGA
⏭️ Câu tiếp theo: https://youtu.be/Dh2IDDTcJBk
📱 Bản Shorts 60 giây: https://youtu.be/wtTN8GntYoM
🔁 Cú twist microtask của ESM đã đo ở câu 25: https://youtu.be/xn7t2HvIE_A
▶️ Playlist series: "Phỏng vấn Frontend 🇻🇳" — https://www.youtube.com/playlist?list=PLYvXt5cUP0yE
▶️ 6 series khác trên kênh: "NestJS cho người mới bắt đầu" · "Super App với React Native" · "Mini-App từ A đến Z" (https://www.youtube.com/playlist?list=PLY-i2_1YbKi4) · "Mini-App với Flutter 🇻🇳" (https://www.youtube.com/playlist?list=PLL5FgtEBrD6g) · "Mini-App Flutter thuần 🇻🇳" (https://www.youtube.com/playlist?list=PLOjCSg9O8bRM) · "StyleX từ A đến Z 🇻🇳" (https://www.youtube.com/playlist?list=PLONwK58GbR_M)

#nodejs #phongvan #backend #laptrinh
```

**Comment ghim gợi ý:**
```
📦 Đố nhỏ câu 30: require một file ESM trong Node — chạy được không? ĐƯỢC RỒI — từ Node 22.12, require(esm) load được ES module đồng bộ, không cờ, không warning; chỉ nổ ERR_REQUIRE_ASYNC_MODULE khi file dính top-level await. Rất nhiều tài liệu cũ vẫn viết "không thể" — nói được câu này là interviewer biết bạn cập nhật. Dự án của bạn đang là CommonJS hay ESM? Comment cho mình biết nhé!
```

**Thumbnail:** badge "PV FE #30" · dòng lớn "REQUIRE(ESM)" / "CHẠY ĐƯỢC RỒI?" · phụ đề "Phỏng vấn Frontend · Câu 30/36" · badge emoji 📦 · variant shot, ảnh dọc `screens/beqa/b6-compare.png` (bảng đối chiếu 4 phép thử CJS vs ESM).

**Tags:** `commonjs vs esm, require esm, import.meta.dirname, top-level await, type module, dirname esm, import json esm, phỏng vấn nodejs, phỏng vấn backend, node 22, nodejs tiếng việt, học nodejs, câu hỏi phỏng vấn nodejs, nodejs interview questions, es modules`

---

### Phỏng vấn FE #31 — DI trong NestJS: vì sao không tự new service? (2:56)

**Tiêu đề:** Phỏng vấn FE #31: DI trong NestJS — vì sao không tự new service? | NestJS interview

**Mô tả:**
```
Câu 31 — mở màn khối NestJS của lô backend: Dependency Injection là gì, và vì sao NestJS bắt bạn dùng nó ngay từ dòng đầu tiên? Demo chạy thật: một service giá 100, một bản mock giá 1 — thay ruột mà không sửa một dòng nào ở chỗ dùng.

IoC — đảo quyền khởi tạo: class KHÔNG tự new dependency, chỉ khai báo mình cần gì ở constructor — container của Nest lo tạo và đưa instance vào. Docs nói thẳng: Nest có built-in IoC container quản quan hệ giữa các provider — foundation of dependency injection; container resolve theo đúng type annotation bạn khai. Provider mặc định là SINGLETON: tạo đúng một lần, ai inject cũng nhận lại chính instance đó.

Demo thật bằng S1MockModule — 12 dòng: providers đăng ký provide PriceService, useValue là object thường chỉ có getPrice trả về 1 — class thật không bao giờ được khởi tạo cho module này. Chạy thật: curl /s1 — service thật trả price 100, và log server in dòng constructor ĐÚNG MỘT LẦN cho cả 7 request — singleton; curl /s1-mock — price còn 1, from là useValue mock, consumer không sửa dòng nào. Bẫy: đừng giữ state theo từng request trong service singleton — muốn per-request phải khai Scope.REQUEST và chấp nhận trả giá hiệu năng; bộ công cụ thay ruột là useValue, useClass, useFactory.

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 31 — mở màn khối NestJS
0:16 Cơ chế: IoC container — trái tim của NestJS
0:51 Code: S1MockModule — useValue thay ruột
1:28 Demo thật: giá 100 vs 1 — constructor chạy đúng 1 lần
1:57 Trả lời như đi phỏng vấn: chốt 3 câu + bẫy
2:33 Tổng kết câu 31 & hẹn câu 32

📦 Source code (demo-be-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout be-qa-batch-3 để xem đúng code câu hỏi này.
⏮️ Câu trước: https://youtu.be/iRWCw8BTdEM
⏭️ Câu tiếp theo: https://youtu.be/LwI2XHhMCOk
📱 Bản Shorts 60 giây: https://youtu.be/M-yfzpkcReo
▶️ Playlist series: "Phỏng vấn Frontend 🇻🇳" — https://www.youtube.com/playlist?list=PLYvXt5cUP0yE
▶️ 6 series khác trên kênh: "NestJS cho người mới bắt đầu" · "Super App với React Native" · "Mini-App từ A đến Z" (https://www.youtube.com/playlist?list=PLY-i2_1YbKi4) · "Mini-App với Flutter 🇻🇳" (https://www.youtube.com/playlist?list=PLL5FgtEBrD6g) · "Mini-App Flutter thuần 🇻🇳" (https://www.youtube.com/playlist?list=PLOjCSg9O8bRM) · "StyleX từ A đến Z 🇻🇳" (https://www.youtube.com/playlist?list=PLONwK58GbR_M)

#nestjs #phongvan #backend #laptrinh
```

**Comment ghim gợi ý:**
```
💉 Đố nhỏ câu 31: PriceService constructor chạy mấy lần cho 7 request? MỘT — provider mặc định là singleton: container tạo đúng một lần lúc boot, ai inject cũng nhận lại chính instance đó. Hệ quả: đừng giữ state theo từng request trong service — muốn per-request phải khai Scope.REQUEST. Còn thay ruột để test? Chỉ đổi provider ở module: useValue, useClass, useFactory — consumer không sửa dòng nào. Bạn đã từng mock service kiểu này chưa?
```

**Thumbnail:** badge "PV FE #31" · dòng lớn "KHÔNG NEW" / "VẪN CÓ SERVICE?" · phụ đề "Phỏng vấn Frontend · Câu 31/36" · badge emoji 💉 · variant shot, ảnh dọc `screens/beqa/s1-di.png` (price 100 vs 1 — hai provider).

**Tags:** `dependency injection nestjs, ioc container, provider nestjs, usevalue useclass usefactory, singleton scope, scope.request, mock service nestjs, phỏng vấn nestjs, phỏng vấn backend, inversion of control, nestjs tiếng việt, học nestjs, câu hỏi phỏng vấn nestjs, nestjs interview questions, phỏng vấn fullstack`

---

### Phỏng vấn FE #32 — Request lifecycle NestJS: 6 lớp theo thứ tự (2:48)

**Tiêu đề:** Phỏng vấn FE #32: Request lifecycle NestJS — 6 lớp theo thứ tự | NestJS interview

**Mô tả:**
```
Câu 32 — câu kinh điển số một của NestJS: một request vào NestJS đi qua những lớp nào, theo thứ tự nào? Demo in log đánh số từng lớp — và một request lỗi, để lộ chỗ mà interceptor chiều về biến mất.

Docs NestJS có hẳn trang FAQ request lifecycle: request chảy qua middleware → guard → interceptor → pipe → handler, rồi quay về qua interceptor. Mỗi lớp một việc: middleware sơ chế kiểu Express, guard quyết cho vào hay không, interceptor bọc trước và sau, pipe validate/transform tham số. Chỗ hay trả lời sai nhất: pipe KHÔNG chạy sớm — nó đứng NGAY TRƯỚC handler, sau cả guard lẫn interceptor chiều đi. Khi có lỗi: exception filter đứng cuối hứng tất.

Demo thật bằng s2.interceptor.ts (18 dòng, dùng tap của RxJS — vì interceptor làm việc với Observable): curl /s2?msg=hello — log đếm đủ [1] middleware, [2] guard, [3] interceptor trước handler, [4] pipe sát handler nhất, [H] handler, [5] interceptor sau handler. Rồi curl /s2/boom — bốn bước đầu y hệt, handler ném Error giữa chừng: dòng [5] BIẾN MẤT — lỗi bỏ qua toàn bộ chiều về của interceptor, rơi thẳng xuống [F] — filter bắt lỗi, tự format response 500. Interceptor là lớp duy nhất chạy cả hai chiều — nhiều interceptor lồng nhau thì chiều về resolve kiểu first-in-last-out.

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 32 — câu kinh điển số một NestJS
0:15 Cơ chế: request lifecycle — chuỗi chuẩn của docs
0:50 Code: s2.interceptor.ts — lớp duy nhất 2 chiều
1:22 Demo thật: chuỗi đủ [1]→[5]
1:38 Demo lỗi: [5] biến mất, rơi xuống [F]
1:51 Trả lời như đi phỏng vấn: chốt 3 câu + bẫy pipe
2:24 Tổng kết câu 32 & hẹn câu 33

📦 Source code (demo-be-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout be-qa-batch-3 để xem đúng code câu hỏi này.
⏮️ Câu trước: https://youtu.be/Dh2IDDTcJBk
⏭️ Câu tiếp theo: https://youtu.be/VCzEj22CAU4
📱 Bản Shorts 60 giây: https://youtu.be/DIH58X1lIJs
🔁 Đào sâu từng lớp — series NestJS trên kênh (mỗi lớp một tập): https://www.youtube.com/playlist?list=PLOTM2LWBjkI0
▶️ Playlist series: "Phỏng vấn Frontend 🇻🇳" — https://www.youtube.com/playlist?list=PLYvXt5cUP0yE
▶️ 6 series khác trên kênh: "NestJS cho người mới bắt đầu" · "Super App với React Native" · "Mini-App từ A đến Z" (https://www.youtube.com/playlist?list=PLY-i2_1YbKi4) · "Mini-App với Flutter 🇻🇳" (https://www.youtube.com/playlist?list=PLL5FgtEBrD6g) · "Mini-App Flutter thuần 🇻🇳" (https://www.youtube.com/playlist?list=PLOjCSg9O8bRM) · "StyleX từ A đến Z 🇻🇳" (https://www.youtube.com/playlist?list=PLONwK58GbR_M)

#nestjs #phongvan #backend #laptrinh
```

**Comment ghim gợi ý:**
```
🚦 Đố nhỏ câu 32: pipe chạy trước hay sau guard? SAU — pipe đứng NGAY TRƯỚC handler, sau cả guard lẫn interceptor chiều đi; đừng nói "validate rồi mới auth". Và beat ít ai biết: handler ném lỗi là dòng [5] — interceptor chiều về — BIẾN MẤT, lỗi rơi thẳng xuống [F] exception filter. Thuộc chuỗi một hơi: middleware, guard, interceptor, pipe, handler, interceptor về. Bạn đọc trúng thứ tự không? Comment thử trước khi xem nhé!
```

**Thumbnail:** badge "PV FE #32" · dòng lớn "REQUEST ĐI QUA" / "MẤY LỚP?" · phụ đề "Phỏng vấn Frontend · Câu 32/36" · badge emoji 🚦 · variant shot, ảnh dọc `screens/beqa/s2-lifecycle.png` (chuỗi log đánh số [1]→[5]).

**Tags:** `request lifecycle nestjs, middleware guard interceptor pipe, nestjs interceptor, exception filter nestjs, thứ tự lifecycle nestjs, rxjs tap, observable nestjs, phỏng vấn nestjs, phỏng vấn backend, nestjs pipeline, nestjs tiếng việt, học nestjs, câu hỏi phỏng vấn nestjs, nestjs interview questions, phỏng vấn fullstack`

---

### Phỏng vấn FE #33 — Guard vs Middleware: auth đặt ở đâu? (2:56)

**Tiêu đề:** Phỏng vấn FE #33: Guard vs Middleware — auth đặt ở đâu? | NestJS interview

**Mô tả:**
```
Câu 33 lô backend: auth trong NestJS — bạn đặt ở middleware hay guard? Vì sao? Demo bốn curl chạy thật: một route admin, hai lớp gác — và cái bẫy 401/403 mà rất nhiều người nhầm.

Middleware chạy ĐẦU TIÊN, kiểu Express — nhưng docs nói thẳng: middleware, by its nature, is context-blind — nó không biết handler nào sẽ chạy sau next(). Nên middleware hợp việc chung: parse token, log, gắn req.user. Guard thì có ExecutionContext — biết CHÍNH XÁC handler sắp chạy, dùng Reflector đọc metadata @Roles gắn trên đúng handler đó — nên phân quyền đặt ở guard. Câu quote ăn điểm: "Guards are executed after all middleware, but before any interceptor or pipe."

Demo thật bằng role.guard.ts: curl route admin không token — guard TỰ ném 401 Unauthorized, message "Chưa đăng nhập" là chuỗi mình truyền vào; token lee/user — có danh tính nhưng sai quyền: guard trả false, Nest tự trả 403 với body MẶC ĐỊNH "Forbidden resource"; đúng role admin — 200 kèm secret doanh thu quý 3; route public không gắn @Roles — ai cũng vào. Và log middleware cho thấy MỌI request — kể cả request 401 — đều đi QUA nó: middleware không chặn ai. Beat trừ điểm kinh điển: guard trả false là Nest ném ForbiddenException 403 — muốn 401 đúng nghĩa PHẢI TỰ ném UnauthorizedException.

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 33 — auth đặt ở đâu?
0:12 Cơ chế: middleware mù ngữ cảnh — guard biết handler
0:44 Code: role.guard.ts — đọc @Roles + tự ném 401
1:19 Demo chặn cửa: 401 tự ném · 403 Nest mặc định
1:42 Demo cho qua: 200 + middleware không chặn ai
1:58 Trả lời như đi phỏng vấn: chốt 3 câu + bẫy 401/403
2:33 Tổng kết câu 33 & hẹn câu 34

📦 Source code (demo-be-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout be-qa-batch-3 để xem đúng code câu hỏi này.
⏮️ Câu trước: https://youtu.be/LwI2XHhMCOk
⏭️ Câu tiếp theo: https://youtu.be/zewSDau0iN8
📱 Bản Shorts 60 giây: https://youtu.be/3rBhT72FPtw
▶️ Playlist series: "Phỏng vấn Frontend 🇻🇳" — https://www.youtube.com/playlist?list=PLYvXt5cUP0yE
▶️ 6 series khác trên kênh: "NestJS cho người mới bắt đầu" · "Super App với React Native" · "Mini-App từ A đến Z" (https://www.youtube.com/playlist?list=PLY-i2_1YbKi4) · "Mini-App với Flutter 🇻🇳" (https://www.youtube.com/playlist?list=PLL5FgtEBrD6g) · "Mini-App Flutter thuần 🇻🇳" (https://www.youtube.com/playlist?list=PLOjCSg9O8bRM) · "StyleX từ A đến Z 🇻🇳" (https://www.youtube.com/playlist?list=PLONwK58GbR_M)

#nestjs #phongvan #backend #laptrinh
```

**Comment ghim gợi ý:**
```
🛡️ Đố nhỏ câu 33: guard trả false thì client nhận 401 hay 403? 403 — Nest tự ném ForbiddenException với body mặc định; muốn 401 đúng nghĩa phải TỰ ném UnauthorizedException. Phân biệt chuẩn: 401 = chưa biết anh là ai (thiếu đăng nhập), 403 = biết rồi nhưng KHÔNG ĐỦ QUYỀN — nói được là ăn điểm ngay. Còn middleware? Mù ngữ cảnh — chỉ parse token gắn req.user, không chặn ai. Bạn từng trả nhầm 403 thành 401 chưa?
```

**Thumbnail:** badge "PV FE #33" · dòng lớn "401 HAY 403" / "BẠN NHẦM CHỖ NÀO?" · phụ đề "Phỏng vấn Frontend · Câu 33/36" · badge emoji 🛡️ · variant shot, ảnh dọc `screens/beqa/s3-auth.png` (4 curl — 401 tự ném, 403 mặc định).

**Tags:** `guard nestjs, middleware vs guard, canactivate, executioncontext, reflector roles, 401 vs 403, unauthorizedexception, forbiddenexception, phỏng vấn nestjs, phỏng vấn backend, auth nestjs, nestjs tiếng việt, học nestjs, câu hỏi phỏng vấn nestjs, nestjs interview questions`

---

### Phỏng vấn FE #34 — ValidationPipe: DTO là hợp đồng chặn body bẩn (2:57)

**Tiêu đề:** Phỏng vấn FE #34: ValidationPipe — DTO là hợp đồng chặn body bẩn | NestJS interview

**Mô tả:**
```
Câu 34 lô backend: API của bạn tin body client gửi lên đến mức nào? Validate ở đâu cho chuẩn NestJS? Demo chạy thật: DTO 3 field cộng một dòng ValidationPipe — body sai dính 400 kèm 3 lỗi, field lạ thì biến mất.

NestJS giải bằng HỢP ĐỒNG: class DTO gắn decorator class-validator — IsString, IsInt, IsEmail; type TypeScript bị xóa lúc runtime, chính decorator mới là thứ pipe đọc. ValidationPipe được chèn NGAY TRƯỚC handler — docs: "Nest interposes a pipe just before a method is invoked". Body sai là pipe ném exception — tự trả 400 kèm mảng message chi tiết, và "no controller method is subsequently executed" — handler không bao giờ chạy. Bật whitelist thì pipe gọt sạch mọi property không có decorator — chặn mass assignment từ ngoài cửa.

Demo thật bằng create-order.dto.ts + s4.controller.ts: gửi body sai cả 3 field (ten là số 123, soLuong bằng 0, email chỉ là "abc") — 400 Bad Request kèm mảng 3 message: ten must be a string; soLuong must not be less than 1; email must be an email — mỗi field sai một câu, tự động, và log server không có một dòng nào từ handler. Body đúng nhưng nhét thêm field hack — 201 Created, và order KHÔNG có hack: whitelist đã gọt field lạ, client không nhét được cột lạ vào DB. Bẫy: whitelist mặc định KHÔNG bật — phải tự bật; muốn trả 400 thay vì lặng lẽ gọt thì thêm forbidNonWhitelisted.

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 34 — tin body đến mức nào?
0:14 Cơ chế: DTO là hợp đồng — pipe gác trước handler
0:49 Code: create-order.dto.ts — 3 điều khoản
1:09 Code: s4.controller.ts — ValidationPipe whitelist
1:28 Demo thật: body sai → 400 kèm 3 lỗi chi tiết
1:50 Demo whitelist: field "hack" biến mất
2:06 Trả lời như đi phỏng vấn: chốt 3 câu + bẫy
2:35 Tổng kết câu 34 & hẹn câu 35

📦 Source code (demo-be-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout be-qa-batch-3 để xem đúng code câu hỏi này.
⏮️ Câu trước: https://youtu.be/VCzEj22CAU4
⏭️ Câu tiếp theo: https://youtu.be/g8hW8u7FKrk
📱 Bản Shorts 60 giây: https://youtu.be/eCrJF4OKrlQ
▶️ Playlist series: "Phỏng vấn Frontend 🇻🇳" — https://www.youtube.com/playlist?list=PLYvXt5cUP0yE
▶️ 6 series khác trên kênh: "NestJS cho người mới bắt đầu" · "Super App với React Native" · "Mini-App từ A đến Z" (https://www.youtube.com/playlist?list=PLY-i2_1YbKi4) · "Mini-App với Flutter 🇻🇳" (https://www.youtube.com/playlist?list=PLL5FgtEBrD6g) · "Mini-App Flutter thuần 🇻🇳" (https://www.youtube.com/playlist?list=PLOjCSg9O8bRM) · "StyleX từ A đến Z 🇻🇳" (https://www.youtube.com/playlist?list=PLONwK58GbR_M)

#nestjs #phongvan #backend #laptrinh
```

**Comment ghim gợi ý:**
```
✂️ Đố nhỏ câu 34: body hợp lệ nhưng nhét thêm "isAdmin": true — có lọt vào app không? CÓ, nếu bạn quên bật whitelist — nó mặc định KHÔNG bật! Bật whitelist là pipe gọt sạch mọi property không có decorator trong DTO — chặn mass assignment từ ngoài cửa; muốn 400 thay vì lặng lẽ gọt thì thêm forbidNonWhitelisted. Và nhớ: type TypeScript bị xóa lúc runtime — pipe chỉ đọc decorator. Bạn đã bật whitelist trong dự án chưa? Kiểm tra ngay nhé!
```

**Thumbnail:** badge "PV FE #34" · dòng lớn "BODY BẨN" / "CHẶN Ở ĐÂU?" · phụ đề "Phỏng vấn Frontend · Câu 34/36" · badge emoji ✂️ · variant shot, ảnh dọc `screens/beqa/s4-validate.png` (400 mảng 3 lỗi · field hack bị strip).

**Tags:** `validationpipe nestjs, dto nestjs, class-validator, whitelist validationpipe, forbidnonwhitelisted, mass assignment, transform dto, validate body nestjs, phỏng vấn nestjs, phỏng vấn backend, isstring isint isemail, nestjs tiếng việt, học nestjs, câu hỏi phỏng vấn nestjs, nestjs interview questions`

---

### Phỏng vấn FE #35 — Interceptor: bọc response, đo giờ mọi API (2:58)

**Tiêu đề:** Phỏng vấn FE #35: Interceptor — bọc response, đo giờ mọi API | NestJS interview

**Mô tả:**
```
Câu 35 lô backend: muốn mọi response của app tự bọc chung một khuôn và tự đo thời gian xử lý — bạn làm ở lớp nào? Demo chạy thật: một interceptor duy nhất — mọi API cùng vỏ ok, data, tookMs kèm header đo giờ; route đối chứng bên cạnh vẫn trần trụi.

Interceptor là lớp lấy cảm hứng từ AOP — chỗ DUY NHẤT trong lifecycle ôm trọn CẢ HAI CHIỀU quanh handler. Bí mật nằm ở next.handle(): nó trả về Observable của response — cầm được stream này thì biến đổi data chỉ còn là một phép RxJS map(), đúng cách docs dạy. Docs kể đủ 5 khả năng: gắn logic trước/sau handler, biến đổi kết quả, biến đổi exception, mở rộng hành vi, override hoàn toàn theo điều kiện.

Demo thật bằng wrap.interceptor.ts: ghi t0 trước khi handler chạy, trong map() tính tookMs rồi set header X-Response-Time (khai rõ: convention TỰ ĐẶT, không phải header chuẩn của Nest). curl /s5 — 200 OK, header X-Response-Time: 121ms, body bọc đúng khuôn ok/data/tookMs; con số đắt: handler delay 120, đo ra 121 trên máy tôi — phép đo ôm TRỌN handler cả hai đầu, middleware chỉ có phía vào, chịu. Còn /s5/raw — cùng handler logic, chỉ thiếu đúng decorator @UseInterceptors: body trần, không header. Bẫy: next.handle() trả Observable LAZY — quên return chuỗi pipe là response treo; muốn cả app cùng khuôn thì khai provider APP_INTERCEPTOR.

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 35 — bọc response, đo giờ
0:16 Cơ chế: interceptor — lớp AOP ôm cả 2 chiều
0:52 Code: wrap.interceptor.ts — map + setHeader
1:30 Demo thật: /s5 bọc + 121ms · /s5/raw trần
2:00 Trả lời như đi phỏng vấn: chốt 3 câu + bẫy lazy
2:36 Tổng kết câu 35 & hẹn câu 36

📦 Source code (demo-be-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout be-qa-batch-3 để xem đúng code câu hỏi này.
⏮️ Câu trước: https://youtu.be/zewSDau0iN8
⏭️ Câu tiếp theo: https://youtu.be/Qmm-UDqc49Q
📱 Bản Shorts 60 giây: https://youtu.be/DvZs7tR43lU
▶️ Playlist series: "Phỏng vấn Frontend 🇻🇳" — https://www.youtube.com/playlist?list=PLYvXt5cUP0yE
▶️ 6 series khác trên kênh: "NestJS cho người mới bắt đầu" · "Super App với React Native" · "Mini-App từ A đến Z" (https://www.youtube.com/playlist?list=PLY-i2_1YbKi4) · "Mini-App với Flutter 🇻🇳" (https://www.youtube.com/playlist?list=PLL5FgtEBrD6g) · "Mini-App Flutter thuần 🇻🇳" (https://www.youtube.com/playlist?list=PLOjCSg9O8bRM) · "StyleX từ A đến Z 🇻🇳" (https://www.youtube.com/playlist?list=PLONwK58GbR_M)

#nestjs #phongvan #backend #laptrinh
```

**Comment ghim gợi ý:**
```
🎁 Đố nhỏ câu 35: viết interceptor mà quên return next.handle().pipe(...) thì sao? Response TREO — next.handle() trả Observable LAZY, không return chuỗi pipe là không ai subscribe. Và nhớ: map() chỉ chạy khi handler THÀNH CÔNG — lỗi là toàn bộ chiều về bị bỏ qua, rơi thẳng xuống exception filter (đúng cảnh dòng [5] biến mất ở câu 32). Muốn cả app một khuôn: APP_INTERCEPTOR — một chỗ khai, mọi route được bọc. App bạn đã có khuôn response chung chưa?
```

**Thumbnail:** badge "PV FE #35" · dòng lớn "MỌI API" / "CHUNG 1 KHUÔN?" · phụ đề "Phỏng vấn Frontend · Câu 35/36" · badge emoji 🎁 · variant shot, ảnh dọc `screens/beqa/s5-intercept.png` (body bọc + header X-Response-Time 121ms).

**Tags:** `interceptor nestjs, nestinterceptor, next.handle observable, rxjs map nestjs, transform response, app_interceptor, x-response-time, aop nestjs, phỏng vấn nestjs, phỏng vấn backend, đo thời gian api, nestjs tiếng việt, học nestjs, câu hỏi phỏng vấn nestjs, nestjs interview questions`

---

### Phỏng vấn FE #36 (CUỐI LÔ 3) — Exception filter: chuẩn hóa lỗi toàn app (2:57)

**Tiêu đề:** Phỏng vấn FE #36: Exception filter — chuẩn hóa lỗi toàn app | NestJS interview

**Mô tả:**
```
Câu 36 — câu chốt sổ của lô backend: service ném lỗi thô ra tận client — bạn chuẩn hóa error toàn app NestJS thế nào? Demo chạy thật: cùng một lỗi "db exploded" — mặc định 500 vô hồn, qua filter thành vỏ thống nhất, an toàn.

Không bắt lỗi thì sao? Nest có sẵn exceptions layer: lỗi lạ — không phải HttpException — thành 500 Internal server error; an toàn nhưng vô hồn, mất sạch ngữ cảnh. Exception filter giành lại quyền đó — docs: filter cho bạn kiểm soát chính xác cả LUỒNG xử lý lẫn NỘI DUNG response. Cách bắt trọn: @Catch() để TRỐNG là bắt mọi exception chưa xử lý — trả vỏ thống nhất 4 trường code, message, path, timestamp; stack chỉ log ở server.

Demo thật bằng all-exceptions.filter.ts: curl /s6/boom kèm cờ demo x-raw (tự chế, để thấy hành vi GỐC) — lỗi thô bị nuốt thành 500 Internal server error vô hồn; bỏ cờ, filter vào việc — vẫn 500 nhưng vỏ thống nhất: code INTERNAL, message an toàn, kèm path và timestamp; chữ "db exploded" KHÔNG lộ ra bất kỳ response nào — chỉ nằm trong log server kèm vị trí ném lỗi. Còn /s6/known ném NotFoundException chủ động: 404 vẫn là 404, giữ nguyên message — KHÔNG bị nuốt thành 500. Muốn cả app một format: khai provider APP_FILTER. Bẫy chốt sổ: filter là chốt chặn CUỐI — không thay cho try/catch nghiệp vụ.

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 36 — câu cuối cùng của lô
0:15 Cơ chế: exception filter giành quyền kiểm soát lỗi
0:49 Code: all-exceptions.filter.ts — @Catch() trống
1:27 Demo thật: 500 vô hồn vs vỏ thống nhất
1:46 Demo log server + 404 giữ nguyên
2:05 Trả lời như đi phỏng vấn: chốt 3 câu + bẫy
2:35 Tổng kết trọn 36 câu & lời chào lô 3

📦 Source code (demo-be-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout be-qa-batch-3 để xem đúng 12 câu code của lô 3 (6 Node.js + 6 NestJS).
⏮️ Câu trước: https://youtu.be/g8hW8u7FKrk
▶️ Xem lại từ đầu lô 3: https://youtu.be/xn7t2HvIE_A
📱 Bản Shorts 60 giây: https://youtu.be/KsX-lapue8s
▶️ Playlist series: "Phỏng vấn Frontend 🇻🇳" — https://www.youtube.com/playlist?list=PLYvXt5cUP0yE
▶️ 6 series khác trên kênh: "NestJS cho người mới bắt đầu" · "Super App với React Native" · "Mini-App từ A đến Z" (https://www.youtube.com/playlist?list=PLY-i2_1YbKi4) · "Mini-App với Flutter 🇻🇳" (https://www.youtube.com/playlist?list=PLL5FgtEBrD6g) · "Mini-App Flutter thuần 🇻🇳" (https://www.youtube.com/playlist?list=PLOjCSg9O8bRM) · "StyleX từ A đến Z 🇻🇳" (https://www.youtube.com/playlist?list=PLONwK58GbR_M)
💬 Đủ 36 câu trên playlist — comment câu hỏi phỏng vấn khó nhất bạn từng gặp để lô sau càng sát thực tế!

#nestjs #phongvan #backend #laptrinh
```

**Comment ghim gợi ý:**
```
🧯 Vậy là đủ 36 câu — 12 câu React & Vue, 12 câu hiệu năng RN & Flutter, và 12 câu backend Node.js & NestJS, câu nào cũng demo chạy số thật. Bẫy chốt sổ câu 36: viết filter @Catch() trống mà quên phân nhánh HttpException là 404 chủ động bị nuốt thành 500 — status của HttpException phải được giữ nguyên; còn stack chỉ log server, client nhận vỏ code/message/path/timestamp sạch. Cảm ơn bạn đã luyện cùng — comment câu hỏi khó nhất bạn từng gặp cho lô sau nhé!
```

**Thumbnail:** badge "PV FE #36" · dòng lớn "LỖI THÔ 500" / "LỘ GÌ RA NGOÀI?" · phụ đề "Phỏng vấn Frontend · Câu 36/36" · badge emoji 🧯 · variant shot, ảnh dọc `screens/beqa/s6-filter.png` (500 vô hồn vs vỏ code INTERNAL).

**Tags:** `exception filter nestjs, catch decorator, httpexception, chuẩn hóa error, app_filter, error handling nestjs, notfoundexception, internal server error, phỏng vấn nestjs, phỏng vấn backend, log stack server, nestjs tiếng việt, học nestjs, câu hỏi phỏng vấn nestjs, nestjs interview questions`

---

### Shorts lô 3 (12 video)

> Mỗi Short <60 giây, cùng câu hỏi với video ngang tương ứng, rút gọn để ôn nhanh. Đánh số nối tiếp lô 2: sb1..sb6 = Shorts #25..#30 (Node.js), ss1..ss6 = Shorts #31..#36 (NestJS). CHƯA ĐĂNG — điền link thật thay placeholder khi đăng; mô tả mỗi Short chỉ cần dòng caption dưới đây + link video đầy đủ.

| id | Tiêu đề Shorts | Caption |
|---|---|---|
| sb1 | Node event loop: promise chạy TRƯỚC nextTick?! #shorts | Twist ESM: file .mjs được evaluate như microtask — promise.then lên trước nextTick, ngược với CommonJS.<br>Bẫy: setTimeout 0 không hề chạy ngay — sớm nhất là phase timers vòng sau, sau toàn bộ microtask.<br>Video đầy đủ: https://youtu.be/xn7t2HvIE_A<br>#shorts #nodejs #phongvan |
| sb2 | Node 1 thread — sao cân nghìn request? 60 giây #shorts | Thread không ngồi chờ I/O: event loop giao việc chờ đi — sync 104 req/s vs async 322, gấp 3 lần.<br>Bẫy: async không nhanh hơn cho 1 request đơn lẻ — nó chỉ DỜI việc nặng sang threadpool 4 thread.<br>Video đầy đủ: https://youtu.be/ju4JxEMByNU<br>#shorts #nodejs #phongvan |
| sb3 | Hash làm Node đơ 1,9 giây — worker_threads cứu #shorts | Worker chạy JS song song cùng process: maxGap từ 1921ms về 102ms, tổng ngang nhau, hash khớp từng ký tự.<br>Bẫy: async/await KHÔNG cứu CPU-bound — await không tạo thread nào cả.<br>Video đầy đủ: https://youtu.be/0nJBSuRLzm4<br>#shorts #nodejs #phongvan |
| sb4 | File 1GB — server phình 1GB RAM? Stream cứu #shorts | readFile nuốt cả file: RSS đỉnh 1071MB; stream + pipe chảy chunk 64KiB — đỉnh 97MB, chênh 11 lần.<br>Bẫy: stream mua RAM phẳng, KHÔNG mua tốc độ — và trả file cho client thì pipe thẳng vào res.<br>Video đầy đủ: https://youtu.be/u4xQFMtrBN8<br>#shorts #nodejs #phongvan |
| sb5 | 3 API — mất 900ms hay 300ms? Promise.all #shorts | Task độc lập thì Promise.all: 907ms về 303ms — tổng bằng cái chậm nhất, chênh đúng 3 lần.<br>Bẫy: fail-fast không hủy promise còn lại — vẫn chạy ngầm; muốn hủy thật phải AbortController.<br>Video đầy đủ: https://youtu.be/u9SUvpcqQGA<br>#shorts #nodejs #phongvan |
| sb6 | require(esm) đã chạy được — CJS vs ESM 60 giây #shorts | .mjs là ESM, .cjs là CJS, .js theo trường type; từ Node 22.12 require load được ESM đồng bộ — không cờ.<br>Bẫy: bật type module là mọi file .js thành ESM hết — file cần CommonJS đổi đuôi .cjs.<br>Video đầy đủ: https://youtu.be/iRWCw8BTdEM<br>#shorts #nodejs #phongvan |
| ss1 | NestJS: vì sao KHÔNG tự new service? #shorts | DI = container new giùm bạn: khai type ở constructor, thay ruột chỉ đổi provider — giá 100 vs 1, không sửa consumer.<br>Bẫy: provider mặc định singleton — đừng giữ state theo request; per-request phải Scope.REQUEST.<br>Video đầy đủ: https://youtu.be/Dh2IDDTcJBk<br>#shorts #nestjs #phongvan |
| ss2 | Request vào NestJS đi qua mấy lớp? #shorts | Thuộc một hơi: middleware → guard → interceptor → pipe → handler → interceptor chiều về — filter khi lỗi.<br>Bẫy: handler ném lỗi là interceptor chiều về KHÔNG chạy — dòng [5] biến mất, rơi xuống [F].<br>Video đầy đủ: https://youtu.be/LwI2XHhMCOk<br>#shorts #nestjs #phongvan |
| ss3 | Auth NestJS: middleware hay guard? 401 vs 403 #shorts | Middleware mù ngữ cảnh chỉ gắn req.user; guard đọc @Roles của đúng handler — phân quyền đặt ở guard.<br>Bẫy: guard trả false là Nest trả 403 — muốn 401 đúng nghĩa phải TỰ ném UnauthorizedException.<br>Video đầy đủ: https://youtu.be/VCzEj22CAU4<br>#shorts #nestjs #phongvan |
| ss4 | Body bẩn — ValidationPipe + DTO chặn từ cửa #shorts | DTO + decorator là hợp đồng: body sai dính 400 kèm mảng lỗi chi tiết — handler không hề chạy.<br>Bẫy: whitelist mặc định KHÔNG bật — quên là field lạ kiểu isAdmin true vẫn lọt vào object.<br>Video đầy đủ: https://youtu.be/zewSDau0iN8<br>#shorts #nestjs #phongvan |
| ss5 | Bọc mọi response + đo giờ — 1 interceptor #shorts | next.handle() trả Observable — transform chỉ là một phép map: vỏ ok/data/tookMs + header X-Response-Time.<br>Bẫy: map chỉ chạy khi handler thành công — lỗi bỏ qua chiều về, rơi thẳng xuống filter.<br>Video đầy đủ: https://youtu.be/g8hW8u7FKrk<br>#shorts #nestjs #phongvan |
| ss6 | Lỗi thô 500 — exception filter chuẩn hóa #shorts | @Catch() để trống bắt mọi lỗi: client nhận vỏ code/message/path/timestamp, stack chỉ log server.<br>Bẫy: nhớ phân nhánh HttpException — đừng nuốt 404 chủ động thành 500.<br>Video đầy đủ: https://youtu.be/Qmm-UDqc49Q<br>#shorts #nestjs #phongvan |

## LÔ 4 SERIES PHỎNG VẤN FRONTEND — Database & SQL (câu #37–#48 + 12 Shorts)

> Lô 4 nối tiếp cùng playlist **"Phỏng vấn Frontend 🇻🇳"** — https://www.youtube.com/playlist?list=PLYvXt5cUP0yE (KHÔNG tạo playlist mới — khi đăng chỉ nối 24 video lô 4 vào playlist sẵn có). CHƯA ĐĂNG — mọi link video lô 4 là placeholder `https://youtu.be/VuqlwliTDeA`..`https://youtu.be/b1Y9Yi2O3e0` (bản ngang) và `https://youtu.be/4jSPtKXXPtA`..`https://youtu.be/NAMJXcYnqjU` (Shorts), điền link thật khi đăng. Chủ đề lô 4: DATABASE cho dân Frontend đi phỏng vấn Fullstack — 6 câu SQL/PostgreSQL (D1–D6 → ep81–ep86) + 6 câu Prisma (P1–P6 → ep87–ep92), mỗi câu có demo chạy SỐ THẬT trên **PostgreSQL 17.11** + **Prisma 6.19.3** (kịch bản luôn nói rõ "trên máy tôi"). Code: `demo-db-interview/` (`sql-qa/` + `prisma-qa/`), đóng băng ở tag `db-qa-batch-4`. Cặp chéo 2 chiều: câu 37↔48 (index bị planner bỏ qua) và câu 39↔43 (N+1 ở tầng SQL ↔ tầng ORM).

Từ khóa chủ lực lô 4: `phỏng vấn database`, `phỏng vấn sql`, `phỏng vấn postgresql`, `phỏng vấn prisma`, `explain analyze`, `index postgresql`, `n+1 query`, `isolation level`, `deadlock postgres`, `connection pool prisma`, `câu hỏi phỏng vấn database`, `học sql`, `học prisma`.

---

### Phỏng vấn FE #37 — Index làm gì? Seq Scan vs Index Scan (2:52)

**Tiêu đề:** Phỏng vấn FE #37: Index làm gì? Seq Scan vs Index Scan | PostgreSQL interview

**Mô tả:**
```
Mở màn lô 4 series Phỏng vấn Frontend — 12 câu hỏi DATABASE mà dân Frontend đi phỏng vấn Fullstack chắc chắn gặp: 6 câu SQL/PostgreSQL + 6 câu Prisma. Câu 37 là câu mở màn kinh điển của mọi buổi phỏng vấn database: index trong database làm gì, và cứ tạo index là query nhanh hơn à?

Cơ chế: không index thì docs Postgres nói thẳng — hệ thống phải quét toàn bộ bảng, từng dòng một, lọc rồi vứt gần hết; index là cấu trúc phụ nằm cạnh bảng để đi vài tầng cây rồi nhảy thẳng tới dòng cần. Chỗ đa số trả lời hụt: Postgres có nhiều kiểu quét — Seq Scan, Bitmap Heap Scan, Index Scan — và planner CHỌN theo chi phí, nên tạo index xong vẫn phải ANALYZE để thống kê tươi.

Demo thật trên PostgreSQL 17.11, bảng orders 500.000 dòng, cùng một câu EXPLAIN (ANALYZE, BUFFERS) chạy hai lần, không sửa một chữ. Chưa index: plan không phải Seq Scan trơn mà là Gather → Parallel Seq Scan, mỗi worker vứt 166.646 dòng để lấy đúng 61 dòng, chạm 3604 trang. Có index: 8.5ms → 0.65ms, buffers 3604 → 63 — và twist thứ hai, node KHÔNG phải Index Scan mà là Bitmap Heap Scan, vì 61 dòng khớp nằm rải trên 60 trang. Bẫy vàng: lọc customer_id < 4000 — 80% bảng — thì Postgres BỎ index, quay lại Seq Scan, và thế là ĐÚNG.

⏱️ NỘI DUNG:
0:00 Giới thiệu lô Database & câu 37
0:17 Cơ chế: index làm gì — ai quyết định dùng nó
0:46 Code: d1.sql — EXPLAIN, CREATE INDEX, chạy lại
1:14 Demo thật: [A] chưa index — Parallel Seq Scan
1:28 Demo thật: [B] có index — Bitmap Heap Scan
1:59 Trả lời như đi phỏng vấn: 3 câu + bẫy 80% bảng
2:34 Tổng kết câu 37 & hẹn câu 38

📦 Source code (demo-db-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout db-qa-batch-4 để xem đúng code câu hỏi này.
⏮️ Câu chốt lô 3: https://youtu.be/Qmm-UDqc49Q
⏭️ Câu tiếp theo: https://youtu.be/TUJtkU6mWQc
📱 Bản Shorts 60 giây: https://youtu.be/4jSPtKXXPtA
🔁 Cùng bài học ở tầng ORM — câu #48: index sai cột thì planner không thèm dùng: https://youtu.be/b1Y9Yi2O3e0
▶️ Playlist series: "Phỏng vấn Frontend 🇻🇳" — https://www.youtube.com/playlist?list=PLYvXt5cUP0yE
▶️ 6 series khác trên kênh: "NestJS cho người mới bắt đầu" · "Super App với React Native" · "Mini-App từ A đến Z" (https://www.youtube.com/playlist?list=PLY-i2_1YbKi4) · "Mini-App với Flutter 🇻🇳" (https://www.youtube.com/playlist?list=PLL5FgtEBrD6g) · "Mini-App Flutter thuần 🇻🇳" (https://www.youtube.com/playlist?list=PLOjCSg9O8bRM) · "StyleX từ A đến Z 🇻🇳" (https://www.youtube.com/playlist?list=PLONwK58GbR_M)

#postgresql #sql #phongvan #backend
```

**Comment ghim gợi ý:**
```
🐘 Mở màn lô 4 — 12 câu hỏi DATABASE từ phòng phỏng vấn: 6 câu SQL/PostgreSQL + 6 câu Prisma, câu nào cũng demo chạy số thật trên PostgreSQL 17.11. Đố nhỏ câu 37: có index rồi mà lọc 80% bảng thì Postgres dùng index không? KHÔNG — nó quay lại Seq Scan, vì lấy phần lớn bảng thì đọc tuần tự rẻ hơn nhảy ngẫu nhiên. Và twist thứ hai: 61 dòng khớp nằm rải trên 60 trang nên plan ra Bitmap Heap Scan chứ không phải Index Scan trơn. Comment xem bạn đã từng tạo index mà query vẫn chậm chưa nhé!
```

**Thumbnail:** badge "PV FE #37" · dòng lớn "TẠO INDEX" / "LÀ NHANH?" · phụ đề "Phỏng vấn Frontend · Câu 37/48" · badge emoji 🐘 · variant shot, ảnh dọc `screens/dbqa/d1-index.png` (plan chưa index vs có index).

**Tags:** `index postgresql, seq scan vs index scan, bitmap heap scan, explain analyze buffers, create index, analyze postgres, phỏng vấn database, phỏng vấn sql, câu hỏi phỏng vấn database, postgresql 17, sql tiếng việt, học sql, học postgresql, database interview questions, phỏng vấn fullstack`

---

### Phỏng vấn FE #38 — Đọc EXPLAIN ANALYZE: cost, rows, buffers (2:45)

**Tiêu đề:** Phỏng vấn FE #38: Đọc EXPLAIN ANALYZE — cost, rows, buffers | PostgreSQL interview

**Mô tả:**
```
Câu 38 là câu phân loại ứng viên nhanh nhất mảng Database: đưa bạn một cái EXPLAIN ANALYZE — bạn đọc từ đâu, nhìn con số nào trước? Video mổ một plan THẬT 5 tầng node, và có một con số lệch 1677 lần khiến rất nhiều người trả lời sai.

Bốn con số phải đọc: plan là một CÂY, node tầng đáy là node quét nên đọc từ trong ra ngoài; cost=x..y là ước lượng của planner theo đơn vị quy ước, KHÔNG phải mili giây; actual time mới là ms thật, có được vì ANALYZE thực sự CHẠY query; rows là số dòng node PHÁT RA sau khi lọc, và loops > 1 thì phải NHÂN.

Demo thật trên PostgreSQL 17.11 (orders 500.000 dòng, customers 5.000): cùng một node có cost=7948.36..7950.70 nhưng actual time=18.553..18.618 ms — hai đại lượng khác nhau hoàn toàn. loops=3 tại Parallel Seq Scan nghĩa là 55366 × 3 = 166.098 dòng thật sự đi qua; Buffers shared hit=3876 read=0 là chạm 3876 trang, không đụng đĩa; Planning Time 0.440 ms vs Execution Time 18.653 ms.

Và mục làm rớt nhiều người nhất: Gather Merge ước 33538 dòng mà thật ra chỉ phát ra 20 — lệch 1677x. ĐỪNG vội kêu thống kê cũ: đó là LIMIT 20 dừng sớm, node không chạy hết. Bằng chứng nằm ngay dưới — node QUÉT chỉ lệch 1.3x, thống kê còn tươi nguyên.

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 38
0:17 Cơ chế: plan là một CÂY & 4 con số phải đọc
0:41 Code: d2.sql — câu JOIN trang danh sách + LIMIT 20
1:03 Demo thật: cây, cost vs actual, rows
1:22 Demo thật: loops, buffers, Planning vs Execution
1:42 Demo thật: lệch 1677x — LIMIT hay thống kê cũ?
2:02 Trả lời như đi phỏng vấn: 3 câu + bẫy
2:32 Tổng kết câu 38 & hẹn câu 39

📦 Source code (demo-db-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout db-qa-batch-4 để xem đúng code câu hỏi này.
⏮️ Câu trước: https://youtu.be/VuqlwliTDeA
⏭️ Câu tiếp theo: https://youtu.be/iwKKqupLWdg
📱 Bản Shorts 60 giây: https://youtu.be/8Dh0JrhenV4
▶️ Playlist series: "Phỏng vấn Frontend 🇻🇳" — https://www.youtube.com/playlist?list=PLYvXt5cUP0yE
▶️ 6 series khác trên kênh: "NestJS cho người mới bắt đầu" · "Super App với React Native" · "Mini-App từ A đến Z" (https://www.youtube.com/playlist?list=PLY-i2_1YbKi4) · "Mini-App với Flutter 🇻🇳" (https://www.youtube.com/playlist?list=PLL5FgtEBrD6g) · "Mini-App Flutter thuần 🇻🇳" (https://www.youtube.com/playlist?list=PLOjCSg9O8bRM) · "StyleX từ A đến Z 🇻🇳" (https://www.youtube.com/playlist?list=PLONwK58GbR_M)

#postgresql #sql #phongvan #backend
```

**Comment ghim gợi ý:**
```
🔍 Bẫy đắt nhất câu 38: thấy rows ước 33538 mà thật 20 (lệch 1677x) là nhiều người kêu ngay "thống kê cũ, chạy ANALYZE đi". Sai — đó là LIMIT 20 dừng sớm nên node không chạy hết; muốn biết thống kê có cũ hay không thì soi node LÁ (node quét), ở đây chỉ lệch 1.3x là còn tươi. Và nhớ nhân loops: loops=3 thì 55366 × 3 = 166.098 dòng mới là số thật. Comment con số nào trong plan bạn nhìn đầu tiên nhé!
```

**Thumbnail:** badge "PV FE #38" · dòng lớn "COST 7948" / "THẬT 18MS?" · phụ đề "Phỏng vấn Frontend · Câu 38/48" · badge emoji 🔍 · variant shot, ảnh dọc `screens/dbqa/d2-explain.png` (9 mục đọc plan trích từ plan thật).

**Tags:** `explain analyze, đọc explain postgres, cost vs actual time, rows loops buffers, shared hit read, planning time execution time, gather merge, phỏng vấn database, phỏng vấn sql, tối ưu query postgres, postgresql 17, sql tiếng việt, học postgresql, database interview questions, phỏng vấn fullstack`

---

### Phỏng vấn FE #39 — N+1 query: 51 câu hay 1 câu JOIN? (2:42)

**Tiêu đề:** Phỏng vấn FE #39: N+1 query — 51 câu hay 1 câu JOIN? | PostgreSQL interview

**Mô tả:**
```
Câu 39 là câu ai làm màn hình danh sách cũng gặp: lấy 50 khách kèm đơn của họ — bạn viết 51 câu query hay một câu JOIN, và khác nhau ở đâu? N+1 là hình dạng 1 câu lấy danh sách cha + N câu lấy chi tiết, chi phí tăng TUYẾN TÍNH: 5.000 khách là 5.001 query.

Demo thật trên PostgreSQL 17.11, bảng orders 500.000 dòng, số query được ĐẾM chứ không hardcode — mọi câu gửi xuống Postgres đều qua một bộ đếm. Nhánh N+1: 51 query, tổng 25.82 ms (câu danh sách 0.52 ms, 50 câu nhỏ trung bình 0.51 ms). Nhánh JOIN: đúng 1 query, 16.38 ms. Checksum tính TRONG JavaScript — 4881 dòng đơn, tổng total 12244954433 — khớp từng chữ số ở cả hai bên, hai cách viết một tập dữ liệu.

Nói thẳng con số: chỉ chênh 1.6 lần vì đo trên localhost, round-trip gần như miễn phí — qua mạng thật thì 51 lần nhân độ trễ còn tệ hơn nhiều. Beat vàng: ép planner dùng index cho chính câu JOIN đó thì plan ra Nested Loop + Bitmap Index Scan với loops=50, chỉ 1.79 ms — Postgres cũng tra index đúng 50 lần, nhưng BÊN TRONG database chứ không phải 50 lượt đi–về.

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 39
0:14 Cơ chế: N+1 = 1 câu danh sách + N câu chi tiết
0:38 Code: d3.sql — vòng for 50 câu vs 1 câu JOIN
0:56 Demo thật: 51 query vs 1 query
1:12 Demo thật: checksum JS — cùng dữ liệu không?
1:28 Demo thật: bảng so sánh & sự thật localhost
1:47 Trả lời như đi phỏng vấn: 3 câu + beat loops=50
2:25 Tổng kết câu 39 & hẹn câu 40

📦 Source code (demo-db-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout db-qa-batch-4 để xem đúng code câu hỏi này.
⏮️ Câu trước: https://youtu.be/TUJtkU6mWQc
⏭️ Câu tiếp theo: https://youtu.be/gCL6V8t3QgE
📱 Bản Shorts 60 giây: https://youtu.be/N4au_wZsW7Y
🔁 Cùng bệnh ở tầng ORM — câu #43: N+1 trong Prisma, nhưng vô hình: https://youtu.be/x0eo-tic-fE
▶️ Playlist series: "Phỏng vấn Frontend 🇻🇳" — https://www.youtube.com/playlist?list=PLYvXt5cUP0yE
▶️ 6 series khác trên kênh: "NestJS cho người mới bắt đầu" · "Super App với React Native" · "Mini-App từ A đến Z" (https://www.youtube.com/playlist?list=PLY-i2_1YbKi4) · "Mini-App với Flutter 🇻🇳" (https://www.youtube.com/playlist?list=PLL5FgtEBrD6g) · "Mini-App Flutter thuần 🇻🇳" (https://www.youtube.com/playlist?list=PLOjCSg9O8bRM) · "StyleX từ A đến Z 🇻🇳" (https://www.youtube.com/playlist?list=PLONwK58GbR_M)

#postgresql #sql #phongvan #backend
```

**Comment ghim gợi ý:**
```
🔁 Beat vàng câu 39: ép câu JOIN dùng index thì plan ra loops=50 — Postgres CŨNG tra index 50 lần, nhưng bên trong database, tốn 1.79 ms; còn N+1 là 51 lượt đi–về từ app xuống DB. Nên thước đo không phải "câu nào nhanh" mà là SỐ QUERY gửi đi (hoặc loops=N trong EXPLAIN ANALYZE). Demo chỉ chênh 1.6x vì chạy localhost — qua mạng thật, 51 lần nhân độ trễ mới là hóa đơn thật. Comment xem bạn phát hiện N+1 bằng cách nào nhé!
```

**Thumbnail:** badge "PV FE #39" · dòng lớn "51 QUERY" / "HAY 1 CÂU?" · phụ đề "Phỏng vấn Frontend · Câu 39/48" · badge emoji 🔁 · variant shot, ảnh dọc `screens/dbqa/d3-nplus1.png` (51 query 25.82 ms vs 1 query 16.38 ms).

**Tags:** `n+1 query, join vs n+1, nested loop postgres, loops explain analyze, tối ưu query danh sách, đếm số query, bitmap index scan, phỏng vấn database, phỏng vấn sql, câu hỏi phỏng vấn sql, postgresql 17, sql tiếng việt, học sql, database interview questions, phỏng vấn fullstack`

---

### Phỏng vấn FE #40 — Isolation level: READ COMMITTED vs REPEATABLE READ (2:57)

**Tiêu đề:** Phỏng vấn FE #40: Isolation level — READ COMMITTED vs REPEATABLE READ | PostgreSQL interview

**Mô tả:**
```
Câu 40 làm rơi nhiều ứng viên tự tin: cùng một câu SELECT, trong cùng một transaction, chạy hai lần ra hai kết quả — chuyện gì xảy ra? Transaction không chỉ là tất-cả-hoặc-không-gì; nó còn quyết định bạn THẤY GÌ khi người khác commit giữa chừng.

READ COMMITTED — mặc định của Postgres — chụp ảnh ở MỖI CÂU LỆNH, nên đọc hai lần trong một transaction có thể ra hai kết quả (non-repeatable read). REPEATABLE READ chụp ảnh MỘT LẦN, ở câu lệnh đầu tiên của transaction, và mọi câu sau đều nhìn đúng ảnh đó.

Demo thật trên PostgreSQL 17.11 với hai phiên là hai pg.Client RIÊNG (dùng pool chung thì transaction tan luôn). Vòng 1 read committed: A đọc 4518520, B cộng 1000 rồi COMMIT, A đọc lại ra 4519520 — ĐỔI. Vòng 2 chỉ thêm mấy chữ vào câu BEGIN, ISOLATION LEVEL REPEATABLE READ: A đọc 4519520, B commit thành 4520520, A đọc lại VẪN 4519520 — beat vàng ở đây, A đang đọc một giá trị KHÔNG CÒN TỒN TẠI trong bảng. Đó chính là snapshot, nhìn thấy bằng mắt.

Giá phải trả: A mà tự UPDATE đúng dòng B vừa đổi thì Postgres ném 40001 could not serialize access due to concurrent update — ứng dụng PHẢI retry. Bẫy hay gặp: trong Postgres READ UNCOMMITTED chạy y hệt READ COMMITTED, còn REPEATABLE READ của Postgres chặt hơn chuẩn SQL — không có phantom read.

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 40
0:13 Cơ chế: BEGIN có đóng băng dữ liệu bạn đọc không?
0:38 Code: d4.mjs — 2 phiên là 2 client RIÊNG
1:03 Demo thật: vòng 1 READ COMMITTED — ĐỔI
1:26 Demo thật: vòng 2 REPEATABLE READ — GIỮ
1:56 Trả lời như đi phỏng vấn: 3 câu + bẫy 40001
2:43 Tổng kết câu 40 & hẹn câu 41

📦 Source code (demo-db-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout db-qa-batch-4 để xem đúng code câu hỏi này.
⏮️ Câu trước: https://youtu.be/iwKKqupLWdg
⏭️ Câu tiếp theo: https://youtu.be/KZuN9inSumE
📱 Bản Shorts 60 giây: https://youtu.be/pHNkeaLmAkM
▶️ Playlist series: "Phỏng vấn Frontend 🇻🇳" — https://www.youtube.com/playlist?list=PLYvXt5cUP0yE
▶️ 6 series khác trên kênh: "NestJS cho người mới bắt đầu" · "Super App với React Native" · "Mini-App từ A đến Z" (https://www.youtube.com/playlist?list=PLY-i2_1YbKi4) · "Mini-App với Flutter 🇻🇳" (https://www.youtube.com/playlist?list=PLL5FgtEBrD6g) · "Mini-App Flutter thuần 🇻🇳" (https://www.youtube.com/playlist?list=PLOjCSg9O8bRM) · "StyleX từ A đến Z 🇻🇳" (https://www.youtube.com/playlist?list=PLONwK58GbR_M)

#postgresql #sql #phongvan #backend
```

**Comment ghim gợi ý:**
```
📸 Khoảnh khắc đáng giá nhất câu 40: ở REPEATABLE READ, phiên A đọc lại ra 4519520 trong khi bảng thật đã là 4520520 — A đang đọc một giá trị KHÔNG CÒN TỒN TẠI. Đó là snapshot, thấy bằng mắt chứ không cần lý thuyết. Nhưng nó không miễn phí: A tự UPDATE đúng dòng B vừa đổi là ăn 40001 could not serialize, app phải RETRY. Chọn isolation theo nghiệp vụ — càng cao KHÔNG phải càng tốt. Comment xem bạn đã từng gặp non-repeatable read trên production chưa!
```

**Thumbnail:** badge "PV FE #40" · dòng lớn "1 SELECT" / "2 KẾT QUẢ?" · phụ đề "Phỏng vấn Frontend · Câu 40/48" · badge emoji 📸 · variant shot, ảnh dọc `screens/dbqa/d4-isolation.png` (2 vòng ĐỔI vs GIỮ).

**Tags:** `isolation level, read committed, repeatable read, non-repeatable read, snapshot postgres, could not serialize 40001, transaction postgres, mvcc, phỏng vấn database, phỏng vấn sql, postgresql 17, sql tiếng việt, học postgresql, database interview questions, phỏng vấn fullstack`

---

### Phỏng vấn FE #41 — Deadlock: Postgres tự hủy một phiên sau 1 giây (2:46)

**Tiêu đề:** Phỏng vấn FE #41: Deadlock — Postgres tự phát hiện và hủy một phiên | PostgreSQL interview

**Mô tả:**
```
Câu 41: deadlock trong database là gì, bạn từng gặp chưa và xử thế nào? Hai transaction khóa chéo nhau — Postgres KHÔNG treo, nó tự phát hiện và hủy một phiên. Không cần SELECT FOR UPDATE mới có khóa: một câu UPDATE đã tự khóa dòng đó tới hết transaction.

Demo thật trên PostgreSQL 17.11: A khóa dòng id=1, B khóa dòng id=2, rồi A đòi dòng 2 (t=0ms) và B đòi dòng 1 (t=202ms) — vòng chờ khép kín. Mẹo dựng được deadlock nằm ở chỗ hai câu bị chặn được gửi đi mà KHÔNG await; nạn nhân cũng không hardcode, nó sinh ra từ promise nào bị reject. Sau 1008ms — đúng bằng deadlock_timeout mặc định 1s, đo bằng SHOW ngay trong demo — Postgres dò đồ thị chờ, thấy chu trình và hủy MỘT nạn nhân.

Message chép nguyên văn: code 40P01, message vỏn vẹn "deadlock detected" (không tiền tố ERROR, không tên bảng), detail hai dòng mỗi chiều một dòng (Process ... waits for ShareLock on transaction ...; blocked by process ...), hint "See server log for query details." — PID đổi mỗi lần chạy. Beat vàng: sau deadlock CẢ HAI dòng đều +1, vì phiên bị hủy rollback nhả khóa, câu UPDATE đang chờ của phiên kia chạy tiếp và nó commit trọn cả hai câu. Và hint kia nói thật: client chỉ thấy PID, câu SQL thủ phạm nằm ở log server.

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 41
0:16 Cơ chế: khóa dòng & vòng chờ chéo
0:46 Code: d5.mjs — gửi UPDATE mà KHÔNG await
1:06 Demo thật: dựng vòng chờ chéo
1:30 Demo thật: 40P01 deadlock detected
2:01 Trả lời như đi phỏng vấn: 3 câu + beat cả 2 dòng +1
2:32 Tổng kết câu 41 & hẹn câu 42

📦 Source code (demo-db-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout db-qa-batch-4 để xem đúng code câu hỏi này.
⏮️ Câu trước: https://youtu.be/gCL6V8t3QgE
⏭️ Câu tiếp theo: https://youtu.be/U4dD5kwJyYY
📱 Bản Shorts 60 giây: https://youtu.be/l1k1Nmssvt0
▶️ Playlist series: "Phỏng vấn Frontend 🇻🇳" — https://www.youtube.com/playlist?list=PLYvXt5cUP0yE
▶️ 6 series khác trên kênh: "NestJS cho người mới bắt đầu" · "Super App với React Native" · "Mini-App từ A đến Z" (https://www.youtube.com/playlist?list=PLY-i2_1YbKi4) · "Mini-App với Flutter 🇻🇳" (https://www.youtube.com/playlist?list=PLL5FgtEBrD6g) · "Mini-App Flutter thuần 🇻🇳" (https://www.youtube.com/playlist?list=PLOjCSg9O8bRM) · "StyleX từ A đến Z 🇻🇳" (https://www.youtube.com/playlist?list=PLONwK58GbR_M)

#postgresql #sql #phongvan #backend
```

**Comment ghim gợi ý:**
```
🔒 Hai chi tiết ăn điểm ở câu 41: (1) sau deadlock CẢ HAI dòng đều +1 — phiên bị hủy rollback nhả khóa, phiên còn lại nhận khóa rồi commit trọn cả hai câu, nên đừng nói "deadlock là mất dữ liệu"; (2) Postgres không dò ngay mà chờ hết deadlock_timeout (mặc định 1s — demo đo được 1008ms), vì đa số lần chờ khóa sẽ tự hết. Cách chữa: khóa mọi nơi theo CÙNG một thứ tự, transaction ngắn, và RETRY khi gặp 40P01 — tăng timeout không sửa gì. Comment lần bạn gặp deadlock gần nhất nhé!
```

**Thumbnail:** badge "PV FE #41" · dòng lớn "DEADLOCK" / "AI BỊ HỦY?" · phụ đề "Phỏng vấn Frontend · Câu 41/48" · badge emoji 🔒 · variant shot, ảnh dọc `screens/dbqa/d5-deadlock.png` (40P01 nguyên văn + detail 2 chiều).

**Tags:** `deadlock postgres, 40p01, deadlock detected, deadlock_timeout, row lock postgres, sharelock, retry deadlock, transaction postgres, phỏng vấn database, phỏng vấn sql, postgresql 17, sql tiếng việt, học postgresql, database interview questions, phỏng vấn fullstack`

---

### Phỏng vấn FE #42 — Phân trang OFFSET vs cursor: vì sao trang cuối chậm (2:43)

**Tiêu đề:** Phỏng vấn FE #42: Phân trang OFFSET vs cursor — vì sao trang cuối chậm | PostgreSQL interview

**Mô tả:**
```
Câu 42: phân trang tới trang thứ 25.000 thì API chậm hẳn — vì sao và sửa thế nào? Câu trả lời KHÔNG phải "thiếu index": hai cách trong video dùng CHUNG một index mà lệch nhau 52–68 lần. Docs Postgres nói thẳng — dòng bị OFFSET bỏ qua VẪN phải được tính bên trong server, nên OFFSET lớn có thể rất kém hiệu quả.

Demo thật trên PostgreSQL 17.11, orders 500.000 dòng. Nhánh OFFSET 499980: node Limit trả rows=20, nhưng node con Index Scan using orders_pkey báo rows=500000 — Postgres sinh đủ 500.000 dòng rồi VỨT BỎ 499.980, buffers hit=4974, query 21.6 ms. Nhánh cursor WHERE id > lastId: quét 20 dòng, VỨT BỎ 0, hit=4, 0.35 ms. Beat vàng: CÙNG một node Index Scan using orders_pkey, khác đúng MỘT dòng — Index Cond.

Đường cong mới là thứ khiến bug này khó thấy: OFFSET 0 và 1000 đều ~0.38 ms (trang đầu nhanh, test thấy ổn), 100000 lên 4.49 ms, 499980 lên 21.52 ms — tuyến tính theo N; còn cột cursor phẳng lì 0.34–0.37 ms ở MỌI mốc. Bẫy: cột sắp xếp phải ỔN ĐỊNH và UNIQUE — created_at trùng nhau là lệch trang, phải ghép thêm id; và cursor chỉ tiến/lùi nên UI phải là "tải thêm"/infinite scroll.

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 42
0:16 Cơ chế: OFFSET không hề "nhảy" tới dòng thứ N
0:38 Code: d6.sql — OFFSET vs cursor cùng 20 dòng
0:54 Demo thật: [A] OFFSET 499980
1:16 Demo thật: [B] cursor + checksum
1:37 Demo thật: càng sâu càng chậm
1:56 Trả lời như đi phỏng vấn: 3 câu + bẫy cột sắp xếp
2:25 Tổng kết câu 42 & hết khối SQL

📦 Source code (demo-db-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout db-qa-batch-4 để xem đúng code câu hỏi này.
⏮️ Câu trước: https://youtu.be/KZuN9inSumE
⏭️ Câu tiếp theo: https://youtu.be/x0eo-tic-fE
📱 Bản Shorts 60 giây: https://youtu.be/n5VI8770wKc
▶️ Playlist series: "Phỏng vấn Frontend 🇻🇳" — https://www.youtube.com/playlist?list=PLYvXt5cUP0yE
▶️ 6 series khác trên kênh: "NestJS cho người mới bắt đầu" · "Super App với React Native" · "Mini-App từ A đến Z" (https://www.youtube.com/playlist?list=PLY-i2_1YbKi4) · "Mini-App với Flutter 🇻🇳" (https://www.youtube.com/playlist?list=PLL5FgtEBrD6g) · "Mini-App Flutter thuần 🇻🇳" (https://www.youtube.com/playlist?list=PLOjCSg9O8bRM) · "StyleX từ A đến Z 🇻🇳" (https://www.youtube.com/playlist?list=PLONwK58GbR_M)

#postgresql #sql #phongvan #backend
```

**Comment ghim gợi ý:**
```
📄 Chốt khối SQL của lô 4: OFFSET 499980 và cursor DÙNG CHUNG một index, cùng node Index Scan using orders_pkey — khác đúng MỘT dòng Index Cond, mà lệch 52–68 lần (21.6 ms vs 0.35 ms). Lý do: OFFSET N không "nhảy", server vẫn TÍNH rồi VỨT đủ N dòng — nên trang đầu 0.37 ms, trang cuối 21.5 ms, tuyến tính theo độ sâu. Bẫy khi đổi sang cursor: cột sắp xếp phải ỔN ĐỊNH & UNIQUE, created_at trùng thì ghép (created_at, id). Comment app của bạn đang phân trang kiểu nào nhé!
```

**Thumbnail:** badge "PV FE #42" · dòng lớn "OFFSET 499980" / "QUÉT BAO NHIÊU?" · phụ đề "Phỏng vấn Frontend · Câu 42/48" · badge emoji 📄 · variant shot, ảnh dọc `screens/dbqa/d6-pagination.png` (21.6ms vs 0.35ms, cùng 20 dòng).

**Tags:** `offset vs cursor, keyset pagination, phân trang postgres, limit offset chậm, index cond, orders_pkey index scan, infinite scroll api, phỏng vấn database, phỏng vấn sql, tối ưu phân trang, postgresql 17, sql tiếng việt, học postgresql, database interview questions, phỏng vấn fullstack`

---

### Phỏng vấn FE #43 — N+1 trong ORM: bật log Prisma là thấy (2:48)

**Tiêu đề:** Phỏng vấn FE #43: N+1 trong ORM — bật log Prisma là thấy | Prisma interview

**Mô tả:**
```
Mở khối Prisma của lô 4. Câu 43: ORM giấu SQL đi — làm sao bạn biết code mình đang bắn 21 câu query? Docs Prisma v6 nói rõ kết quả trả về gồm mọi trường vô hướng và KHÔNG có quan hệ nào, nên người ta lấy 20 khách rồi lặp gọi thêm 20 lần cho đơn hàng — đúng bệnh N+1, mà đọc code thì không thấy vì nó nấp trong resolver, trong getter, trong Promise.all.

Demo thật trên Prisma 6.19.3 + PostgreSQL 17.11, đếm bằng log dạng sự kiện và $on(query) — trung thực trước: 24 query warm-up bị LOẠI khỏi phép đếm. Vòng for: SỐ QUERY THẬT 21. Thêm đúng một dòng include: { orders: true }: đúng 2 query. Bất biến 3/3 lần chạy. Thời gian chỉ 21.20 ms vs 19.70 ms — chênh ~1.3x và còn dao động, nên đừng bán N+1 bằng tốc độ localhost: con số biết nói là SỐ QUERY.

Beat vàng nằm ở SQL thật: câu con của include là WHERE customer_id IN ($1..$20) — include KHÔNG PHẢI JOIN. Prisma 6 gom 20 câu thành một câu IN rồi ghép cha–con ở tầng ứng dụng, nên ra 2 query CỐ ĐỊNH (200 khách vẫn 2). Bẫy version rất đắt: docs mới nhất nói "join là mặc định, 1 query" — đó là Prisma 7/8, ở v6 nó còn là Preview (relationJoins). Bẫy nữa: Promise.all KHÔNG chữa N+1 — vẫn 20 query và dễ cạn pool; và e.duration của Prisma làm tròn số nguyên ms nên phải đo bằng performance.now().

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 43 — mở khối Prisma
0:15 Cơ chế: ORM không TẠO ra N+1, nó GIẤU N+1
0:37 Code: p1.mjs — $on(query) để ĐẾM thật
0:54 Demo thật: ĐẾM query — 21 vs 2
1:22 Demo thật: SQL Prisma sinh ra + checksum JS
1:46 Trả lời như đi phỏng vấn: 3 câu
2:09 Bẫy & cách đo cho đúng
2:32 Tổng kết câu 43 & hẹn câu 44

📦 Source code (demo-db-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout db-qa-batch-4 để xem đúng code câu hỏi này.
⏮️ Câu trước: https://youtu.be/U4dD5kwJyYY
⏭️ Câu tiếp theo: https://youtu.be/jcKVYdXE5tw
📱 Bản Shorts 60 giây: https://youtu.be/YAV7HREFuf4
🔁 Cùng bệnh ở tầng SQL — câu #39: 51 query vs 1 câu JOIN: https://youtu.be/iwKKqupLWdg
▶️ Playlist series: "Phỏng vấn Frontend 🇻🇳" — https://www.youtube.com/playlist?list=PLYvXt5cUP0yE
▶️ 6 series khác trên kênh: "NestJS cho người mới bắt đầu" · "Super App với React Native" · "Mini-App từ A đến Z" (https://www.youtube.com/playlist?list=PLY-i2_1YbKi4) · "Mini-App với Flutter 🇻🇳" (https://www.youtube.com/playlist?list=PLL5FgtEBrD6g) · "Mini-App Flutter thuần 🇻🇳" (https://www.youtube.com/playlist?list=PLOjCSg9O8bRM) · "StyleX từ A đến Z 🇻🇳" (https://www.youtube.com/playlist?list=PLONwK58GbR_M)

#prisma #orm #phongvan #backend
```

**Comment ghim gợi ý:**
```
🔺 Beat vàng câu 43: include KHÔNG phải JOIN. Ở Prisma 6, include sinh 1 query cha + 1 query con WHERE customer_id IN ($1..$20) rồi ghép ở tầng app — nên kết quả là 2 query CỐ ĐỊNH, không phải 1. Cái docs mới nói "join là mặc định, 1 query" là Prisma 7/8, ở v6 vẫn là preview relationJoins. Và đừng dùng Promise.all để "chữa" N+1: vẫn 20 query, còn dễ cạn connection pool. Thước đo là số query đếm được trong log, không phải ms trên localhost. Comment bạn từng thấy bao nhiêu query trong 1 request nhé!
```

**Thumbnail:** badge "PV FE #43" · dòng lớn "ORM GIẤU" / "21 CÂU QUERY?" · phụ đề "Phỏng vấn Frontend · Câu 43/48" · badge emoji 🔺 · variant shot, ảnh dọc `screens/dbqa/p1-nplus1.png` (21 query → 2 query, chỉ đổi 1 dòng).

**Tags:** `prisma n+1, prisma include, relationjoins prisma, đếm query prisma, prisma log query, $on query prisma, orm n+1, prisma 6, phỏng vấn prisma, phỏng vấn backend, prisma tiếng việt, học prisma, câu hỏi phỏng vấn orm, prisma interview questions, phỏng vấn fullstack`

---

### Phỏng vấn FE #44 — select đúng cột: payload 98KB xuống 26KB (2:52)

**Tiêu đề:** Phỏng vấn FE #44: select đúng cột — payload 98KB xuống 26KB | Prisma interview

**Mô tả:**
```
Câu 44: API trả về JSON nặng gấp bốn lần cần thiết — bạn cắt ở đâu? Docs Prisma v6 nói thẳng kết quả gồm TẤT CẢ trường vô hướng; không khai gì thì nhận hết. Cái giá trả ở ba tầng: database gửi, mạng chở về, rồi Node dựng object và JSON.stringify.

Demo thật trên Prisma 6.19.3, lấy 1000 đơn đầu, hai nhánh khác nhau đúng một tham số. findMany mặc định: SỐ CỘT THẬT 5 (id, customerId, total, status, createdAt), 97.9 KB, 4.29 ms. Thêm select: { id: true, total: true }: 2 cột, 26.1 KB, 3.83 ms. Giảm 73.4%, bất biến 3/3 lần chạy vì payload đo bằng Buffer.byteLength của JSON.stringify chứ không ước lượng. Checksum tính TRONG JavaScript: 1000 dòng cả hai bên, tổng total 2513527232 khớp từng chữ số. Vì sao -73% chứ không -60% như tỉ lệ cột? createdAt là chuỗi ISO nặng ~40 byte mỗi dòng — một mình nó bằng cả object nhánh select.

BEAT VÀNG ít kênh chịu nói: chạy EXPLAIN trên chính hai câu SQL Prisma vừa gửi thì hai kế hoạch GIỐNG HỆT — cùng Index Scan using orders_pkey, cùng cost 0.42..33.63, cùng Buffers shared hit=14; đổi đúng một thứ: width 25 → 8. Postgres là row-store, một trang chứa cả dòng nên vẫn đọc bấy nhiêu trang. select KHÔNG làm query nhanh hơn — nó cắt byte chở về, cắt RAM Node, cắt JSON. Muốn giữ mặc định mà chỉ giấu passwordHash thì dùng omit — đã kiểm, omit cũng cắt cột ngay trong câu SQL.

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 44
0:16 Cơ chế: mặc định của ORM là hào phóng
0:37 Code: p2.mjs — findMany vs select 2 cột
0:59 Demo thật: đếm CỘT + đo KB payload
1:24 Demo thật: checksum JS + bảng so sánh
1:48 BEAT VÀNG: select KHÔNG đổi PLAN
2:13 Trả lời như đi phỏng vấn + bẫy
2:38 Tổng kết câu 44 & hẹn câu 45

📦 Source code (demo-db-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout db-qa-batch-4 để xem đúng code câu hỏi này.
⏮️ Câu trước: https://youtu.be/x0eo-tic-fE
⏭️ Câu tiếp theo: https://youtu.be/2e35Hdkslkk
📱 Bản Shorts 60 giây: https://youtu.be/NFsv-LdE2eI
▶️ Playlist series: "Phỏng vấn Frontend 🇻🇳" — https://www.youtube.com/playlist?list=PLYvXt5cUP0yE
▶️ 6 series khác trên kênh: "NestJS cho người mới bắt đầu" · "Super App với React Native" · "Mini-App từ A đến Z" (https://www.youtube.com/playlist?list=PLY-i2_1YbKi4) · "Mini-App với Flutter 🇻🇳" (https://www.youtube.com/playlist?list=PLL5FgtEBrD6g) · "Mini-App Flutter thuần 🇻🇳" (https://www.youtube.com/playlist?list=PLOjCSg9O8bRM) · "StyleX từ A đến Z 🇻🇳" (https://www.youtube.com/playlist?list=PLONwK58GbR_M)

#prisma #orm #phongvan #backend
```

**Comment ghim gợi ý:**
```
✂️ BEAT VÀNG câu 44: chạy EXPLAIN trên chính hai câu SQL Prisma sinh ra thì plan GIỐNG HỆT nhau — cùng Index Scan using orders_pkey, cùng cost, cùng Buffers shared hit=14; đổi đúng một thứ là width 25 → 8. Postgres là row-store, một trang chứa cả dòng nên select KHÔNG làm query nhanh hơn. Cái nó cắt là byte chở về (97.9 KB → 26.1 KB, -73.4%), RAM Node và JSON. Đừng đi phỏng vấn mà hứa "select làm DB nhanh hơn" — trừ khi cột TEXT/JSONB lớn hoặc có covering index. Comment payload API của bạn đang bao nhiêu KB nhé!
```

**Thumbnail:** badge "PV FE #44" · dòng lớn "98KB" / "HAY 26KB?" · phụ đề "Phỏng vấn Frontend · Câu 44/48" · badge emoji ✂️ · variant shot, ảnh dọc `screens/dbqa/p2-select.png` (5 cột 97.9 KB vs 2 cột 26.1 KB).

**Tags:** `prisma select, prisma omit, payload api nặng, json stringify size, prisma findmany, select đúng cột, width explain postgres, row store postgres, prisma 6, phỏng vấn prisma, phỏng vấn backend, prisma tiếng việt, học prisma, prisma interview questions, phỏng vấn fullstack`

---

### Phỏng vấn FE #45 — $transaction: tất cả hoặc không gì cả (2:57)

**Tiêu đề:** Phỏng vấn FE #45: $transaction — tất cả hoặc không gì cả | Prisma interview

**Mô tả:**
```
Câu 45: tạo khách rồi tạo đơn — bước hai lỗi, dữ liệu của bạn giờ ra sao? Họ không hỏi lý thuyết ACID, họ hỏi bạn đã từng thấy một hàng dữ liệu NỬA VỜI trong bảng của mình chưa. Điểm dễ sai nhất: gói hai lệnh vào chung một hàm KHÔNG biến chúng thành transaction — hàm là chuyện JavaScript, transaction là chuyện database.

Demo thật trên Prisma 6.19.3: cùng một hàm nghiệp vụ, hai cái vỏ. Nhánh 2 lệnh rời: customers TRƯỚC 5000, bước 1 tạo id=5011, bước 2 FAIL, đếm lại 5001 — TĂNG 1, một khách có thật mà không có nổi một đơn: KHÁCH MỒ CÔI. Nhánh $transaction(async tx => ...) interactive: bước 2 vẫn FAIL y hệt, nhưng đếm lại 5001 → 5001, KHÔNG ĐỔI. Bằng chứng tận mắt trong log query: nhánh rời chỉ có INSERT rồi INSERT, nhánh transaction có BEGIN ở đầu và ROLLBACK ở cuối. Lỗi thì Y HỆT ở cả hai nhánh — transaction đổi HẬU QUẢ, không đổi lỗi.

Chi tiết tinh tế nhất: rollback KHÔNG trả lại sequence — sau 3 lần chạy last_value là 5016 còn max(id) chỉ 5000. Đó là đúng thiết kế Postgres, sequence không mang tính transaction, id nhảy cóc là bình thường. Bẫy nữa: lỗi ConversionError trong demo bị chặn ngay ở tầng driver nên code là undefined, Postgres CHƯA HỀ nhận câu INSERT — lỗi do chính database ném mới có mã dạng P2003. Và transaction interactive mặc định maxWait 2s, timeout 5s: đừng gọi HTTP bên trong, transaction dài giữ khóa lâu là đường tới deadlock ở câu #41.

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 45
0:16 Cơ chế: transaction là một ĐƠN VỊ, không phải một cái hàm
0:38 Code: p3.mjs — cùng hàm, khác cái vỏ
1:00 Demo thật: đếm TRƯỚC/SAU ở 2 nhánh
1:22 Demo thật: lỗi nguyên văn + log BEGIN/ROLLBACK
1:50 Trả lời như đi phỏng vấn: 3 câu
2:12 Bẫy & chi tiết tinh tế: sequence không rollback
2:43 Tổng kết câu 45 & hẹn câu 46

📦 Source code (demo-db-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout db-qa-batch-4 để xem đúng code câu hỏi này.
⏮️ Câu trước: https://youtu.be/jcKVYdXE5tw
⏭️ Câu tiếp theo: https://youtu.be/Jyz-uHawyzU
📱 Bản Shorts 60 giây: https://youtu.be/gQz8_ajwFL4
▶️ Playlist series: "Phỏng vấn Frontend 🇻🇳" — https://www.youtube.com/playlist?list=PLYvXt5cUP0yE
▶️ 6 series khác trên kênh: "NestJS cho người mới bắt đầu" · "Super App với React Native" · "Mini-App từ A đến Z" (https://www.youtube.com/playlist?list=PLY-i2_1YbKi4) · "Mini-App với Flutter 🇻🇳" (https://www.youtube.com/playlist?list=PLL5FgtEBrD6g) · "Mini-App Flutter thuần 🇻🇳" (https://www.youtube.com/playlist?list=PLOjCSg9O8bRM) · "StyleX từ A đến Z 🇻🇳" (https://www.youtube.com/playlist?list=PLONwK58GbR_M)

#prisma #orm #phongvan #backend
```

**Comment ghim gợi ý:**
```
⚛️ Chi tiết tinh tế nhất câu 45: ROLLBACK không trả lại sequence — sau 3 lần chạy, last_value là 5016 mà max(id) chỉ 5000. Đúng thiết kế Postgres (sequence không transaction-safe), nên id nhảy cóc là bình thường, đừng đi hoảng. Và nhớ: gói 2 lệnh vào 1 hàm KHÔNG phải transaction, Promise.all càng không — bằng chứng nằm trong log query, chỉ nhánh $transaction mới có BEGIN … ROLLBACK. Comment lần bạn phải đi dọn dữ liệu nửa vời nhé!
```

**Thumbnail:** badge "PV FE #45" · dòng lớn "BƯỚC 2 LỖI" / "DỮ LIỆU NỬA VỜI?" · phụ đề "Phỏng vấn Frontend · Câu 45/48" · badge emoji ⚛️ · variant shot, ảnh dọc `screens/dbqa/p3-transaction.png` (5000 → 5001 khách mồ côi vs 5001 → 5001).

**Tags:** `prisma transaction, $transaction interactive, rollback prisma, atomic transaction, acid database, sequence không rollback, prisma log query, dữ liệu nửa vời, prisma 6, phỏng vấn prisma, phỏng vấn backend, prisma tiếng việt, học prisma, prisma interview questions, phỏng vấn fullstack`

---

### Phỏng vấn FE #46 — Migration an toàn: thêm cột NOT NULL vào bảng có data (2:54)

**Tiêu đề:** Phỏng vấn FE #46: Migration an toàn — thêm cột NOT NULL vào bảng có data | Prisma interview

**Mô tả:**
```
Câu 46: thêm một cột bắt buộc vào bảng đang có 1000 dòng — bạn migrate thế nào? Bảng rỗng thì thêm cột NOT NULL nào cũng qua, vì thế bug này chỉ nổ trên production. Nhớ một câu: prisma migrate dev sinh SQL từ DIFF giữa schema cũ và schema mới, nó KHÔNG đoán dữ liệu.

Demo thật trên Prisma 6.19.3, bảng notes 1000 dòng. Làm một phát: migrate dev in nguyên văn "We found changes that cannot be executed" — Step 0 Added the required column channel ... "There are 1000 rows in this table, it is not possible to execute this step.", exit code 1, KHÔNG file migration nào được sinh, cột chưa tồn tại và KHÔNG có prompt hỏi reset. Prisma chặn TRƯỚC khi chạy câu SQL nào — nó còn từ chối SINH RA file.

Cách đúng là 3 bước theo mẫu expand–migrate–contract: (1) schema để channel String? → Prisma sinh ADD COLUMN channel TEXT; (2) --create-only sinh migration RỖNG, mình VIẾT TAY UPDATE notes SET channel = 'web' (bảng chục triệu dòng thì backfill theo lô); (3) schema trả channel về bắt buộc → Prisma sinh ALTER COLUMN channel SET NOT NULL. Đọc từ information_schema: is_nullable = NO, 1000/1000 dòng mang giá trị web, không NULL. Beat ăn điểm: bước 3 cũng có rủi ro NULL nhưng Prisma chỉ ghi WARNING vào TRONG file và vẫn sinh file; còn pha 1 là ERROR, từ chối sinh file — vì bước 3 Prisma BIẾT viết SQL gì, pha 1 thì không. Bẫy lớn nhất: backfill PHẢI nằm trong migration, vì production chạy migrate deploy chỉ thi hành file trong migrations — script tay không có ở đó, deploy nhảy từ bước 1 sang bước 3 và chết.

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 46
0:13 Cơ chế: migrate dev sinh SQL từ DIFF schema
0:36 Code: 3 file migration.sql của 3 bước
0:54 Demo thật: PHA 1 (SAI) — 1000 rows, KHÔNG sinh file
1:19 Demo thật: PHA 2 (ĐÚNG) 3 bước + kết quả cuối
1:45 Trả lời như đi phỏng vấn + beat ERROR vs WARNING
2:13 Bẫy phải tránh khi migrate
2:42 Tổng kết câu 46 & hẹn câu 47

📦 Source code (demo-db-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout db-qa-batch-4 để xem đúng code câu hỏi này.
⏮️ Câu trước: https://youtu.be/2e35Hdkslkk
⏭️ Câu tiếp theo: https://youtu.be/t16QnQDJ1fA
📱 Bản Shorts 60 giây: https://youtu.be/qmGiyPQmNtM
▶️ Playlist series: "Phỏng vấn Frontend 🇻🇳" — https://www.youtube.com/playlist?list=PLYvXt5cUP0yE
▶️ 6 series khác trên kênh: "NestJS cho người mới bắt đầu" · "Super App với React Native" · "Mini-App từ A đến Z" (https://www.youtube.com/playlist?list=PLY-i2_1YbKi4) · "Mini-App với Flutter 🇻🇳" (https://www.youtube.com/playlist?list=PLL5FgtEBrD6g) · "Mini-App Flutter thuần 🇻🇳" (https://www.youtube.com/playlist?list=PLOjCSg9O8bRM) · "StyleX từ A đến Z 🇻🇳" (https://www.youtube.com/playlist?list=PLONwK58GbR_M)

#prisma #orm #phongvan #backend
```

**Comment ghim gợi ý:**
```
🚧 Beat ăn điểm câu 46: cùng chuyện "cột có thể còn NULL" mà Prisma xử hai kiểu khác nhau — pha làm-một-phát là ERROR, từ chối SINH RA cả file migration ("There are 1000 rows in this table"); còn bước 3 SET NOT NULL chỉ là WARNING nằm TRONG file, vẫn sinh file vẫn chạy. Lý do: bước 3 Prisma BIẾT phải viết SQL gì, pha 1 thì không. Bẫy chí tử: backfill phải là MỘT MIGRATION — để script tay là production (migrate deploy) nhảy từ bước 1 sang bước 3 rồi chết. Comment lần migration của bạn suýt xóa data nhé!
```

**Thumbnail:** badge "PV FE #46" · dòng lớn "CỘT NOT NULL" / "1000 DÒNG CŨ?" · phụ đề "Phỏng vấn Frontend · Câu 46/48" · badge emoji 🚧 · variant shot, ảnh dọc `screens/dbqa/p4-migration.png` (3 bước nullable → backfill → NOT NULL).

**Tags:** `prisma migrate, prisma migration, add column not null, backfill migration, expand migrate contract, prisma create-only, migrate deploy production, prisma db push, prisma 6, phỏng vấn prisma, phỏng vấn backend, prisma tiếng việt, học prisma, prisma interview questions, phỏng vấn fullstack`

---

### Phỏng vấn FE #47 — Connection pool: P2024 và giới hạn kết nối (2:51)

**Tiêu đề:** Phỏng vấn FE #47: Connection pool — P2024 và giới hạn kết nối | Prisma interview

**Mô tả:**
```
Câu 47: traffic tăng, app bắt đầu ném lỗi timeout khi lấy connection — chuyện gì đang xảy ra? Cái bẫy nằm ở chữ "song song": 20 query song song KHÔNG phải 20 kết nối. Prisma giữ một pool — số kết nối tối đa cộng hàng đợi phía trước — khai ngay trên URL bằng connection_limit và pool_timeout; mặc định pool = num_physical_cpus × 2 + 1, pool_timeout 10s, và tầng dưới Postgres còn trần max_connections (demo đo được 100).

Demo thật trên Prisma 6.19.3, ba client cùng một tải 20 query × pg_sleep(0.3s), bắn bằng Promise.allSettled để đếm được cả lỗi. connection_limit=2: 3048 ms, cao điểm 2 kết nối, 0 lỗi — 20 query chia 10 lượt, pool nhỏ biến song song thành tuần tự. connection_limit=20: 357 ms, cùng việc y hệt, nhanh hơn ~8,5 lần. Cao điểm đo từ pg_stat_activity ĐÚNG BẰNG connection_limit ở cả ba nhánh.

Nhánh connection_limit=1 pool_timeout=1: OK 4 query, 16 query ăn P2024 — nguyên văn "Timed out fetching a new connection from the connection pool", và phần đắt nhất nằm trong ngoặc: (Current connection pool timeout: 1, connection limit: 1) — Prisma in thẳng hai tham số bạn vừa đặt. Beat ăn điểm: pool_timeout là timeout XIN kết nối, KHÔNG phải timeout query; số học chứng minh với pool 1 thì query thứ k bắt đầu ở 0,3×(k−1) giây nên đúng 4 query chờ dưới 1 giây ⇒ 4 OK / 16 P2024. Bẫy: tăng pool KHÔNG miễn phí (10 instance × pool 20 = 200 > max_connections 100, serverless bắt buộc pooler ngoài như PgBouncer); và khi tự đo, pg_sleep trơn qua queryRaw ném P2010 deserialize column of type void — lỗi kiểu dữ liệu, rất dễ nhầm là lỗi pool.

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 47
0:15 Cơ chế: pool = số kết nối tối đa + hàng đợi
0:41 Code: p5.mjs — 3 client, cùng 20 query song song
0:59 Demo thật: pool 2 vs pool 20
1:21 Demo thật: pool 1 + pool_timeout 1s → P2024
1:42 Trả lời như đi phỏng vấn + beat pool_timeout
2:11 Bẫy phải tránh khi nói về pool
2:38 Tổng kết câu 47 & hẹn câu 48

📦 Source code (demo-db-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout db-qa-batch-4 để xem đúng code câu hỏi này.
⏮️ Câu trước: https://youtu.be/Jyz-uHawyzU
⏭️ Câu tiếp theo: https://youtu.be/b1Y9Yi2O3e0
📱 Bản Shorts 60 giây: https://youtu.be/9vBmTjHtfLE
▶️ Playlist series: "Phỏng vấn Frontend 🇻🇳" — https://www.youtube.com/playlist?list=PLYvXt5cUP0yE
▶️ 6 series khác trên kênh: "NestJS cho người mới bắt đầu" · "Super App với React Native" · "Mini-App từ A đến Z" (https://www.youtube.com/playlist?list=PLY-i2_1YbKi4) · "Mini-App với Flutter 🇻🇳" (https://www.youtube.com/playlist?list=PLL5FgtEBrD6g) · "Mini-App Flutter thuần 🇻🇳" (https://www.youtube.com/playlist?list=PLOjCSg9O8bRM) · "StyleX từ A đến Z 🇻🇳" (https://www.youtube.com/playlist?list=PLONwK58GbR_M)

#prisma #orm #phongvan #backend
```

**Comment ghim gợi ý:**
```
🏊 Beat ăn điểm câu 47: pool_timeout là timeout XIN kết nối, KHÔNG phải timeout query. Chứng minh bằng số học: pool 1, mỗi query 0,3s thì query thứ k bắt đầu ở 0,3×(k−1) giây — đúng 4 query đầu chờ dưới 1 giây, nên kết quả là 4 OK / 16 lỗi P2024, khớp y hệt demo. Và P2024 nghĩa là app thiếu kết nối hoặc giữ quá lâu, KHÔNG phải DB chậm — nhìn cả hai phía trước khi tăng pool, vì trần thật là max_connections=100. Comment pool size dự án bạn đang set bao nhiêu nhé!
```

**Thumbnail:** badge "PV FE #47" · dòng lớn "POOL CẠN" / "16 QUERY CHẾT?" · phụ đề "Phỏng vấn Frontend · Câu 47/48" · badge emoji 🏊 · variant shot, ảnh dọc `screens/dbqa/p5-pool.png` (pool 2: 3s · pool 20: 0.37s · pool 1: P2024).

**Tags:** `connection pool prisma, p2024 prisma, connection_limit, pool_timeout, max_connections postgres, pgbouncer, prisma serverless pool, pg_stat_activity, prisma 6, phỏng vấn prisma, phỏng vấn backend, prisma tiếng việt, học prisma, prisma interview questions, phỏng vấn fullstack`

---

### Phỏng vấn FE #48 (CUỐI LÔ 4) — Query chậm: từ log tới index đúng (2:58)

**Tiêu đề:** Phỏng vấn FE #48: Query chậm — từ log tới index đúng | Prisma interview

**Mô tả:**
```
Câu 48 — câu chốt sổ lô Database: một API chậm, bạn có 10 phút, quy trình của bạn là gì? Đáp án là 3 bước, không phải mẹo vặt: (1) NHÌN, đừng đoán — bật log query Prisma, $on(query), lấy ĐÚNG BYTE SQL; (2) EXPLAIN (ANALYZE, BUFFERS) CHÍNH câu đó, tìm node chạm nhiều dòng nhất chứ không phải node bạn NGHĨ là chậm; (3) index khớp hình dạng query — cột lọc đứng trước, cột sắp xếp đứng sau và đúng chiều — rồi ANALYZE và ĐO LẠI.

Demo thật trên Prisma 6.19.3 + PostgreSQL 17.11, query nghiệp vụ là 20 đơn paid mới nhất của khách ở Da Nang. Prisma sinh MỘT câu duy nhất có LEFT JOIN customers (lọc theo quan hệ luôn thành JOIN, khác include ở câu #43), cuối câu là ORDER BY created_at DESC LIMIT 20 — chính hình dạng mà index phải khớp. EXPLAIN câu đó: Parallel Seq Scan on orders, 166.098 dòng, và một Sort trong plan.

Bốn trạng thái index, không phải hai: chưa index 15.58 ms / 166.098 dòng; index đơn orders(status) 15.96 ms / 166.098 dòng — BEAT VÀNG: index TẠO RA MÀ PLANNER KHÔNG THÈM DÙNG, plan không đổi một chữ, vì paid chiếm 33% bảng; index ghép orders(status, created_at DESC) 0.74 ms / 93 dòng, Index Scan using idx_orders_status_created và Sort BIẾN MẤT; thêm customers(city) thì plan y hệt nên script tự DROP nó. Bất biến 6/6 lần chạy: 16ms → 0,7ms (21–26x), 166.098 → 93 dòng (1786x), buffers 3876 → 373. Bẫy: đừng ĐOÁN index (CREATE INDEX(status) tốn 115–150ms mà thu về không), index thừa tốn ghi + dung lượng, và một lần client đo gần 6ms mà Postgres báo 0,2ms là Prisma replan chứ không phải DB chậm.

⏱️ NỘI DUNG:
0:00 Giới thiệu câu 48 — câu cuối lô Database
0:18 Cơ chế: quy trình 3 bước, không phải mẹo vặt
0:43 Code: p6.mjs — log query, EXPLAIN, tạo index
1:03 Demo thật: [1] SQL thật → [2] EXPLAIN câu đó
1:24 Demo thật: [3] 4 trạng thái index
1:53 Trả lời như đi phỏng vấn + beat index bị bỏ qua
2:20 Bẫy phải tránh khi tối ưu query
2:43 Tổng kết trọn 48 câu & lời chào lô 4

📦 Source code (demo-db-interview/): https://github.com/Leung190299/nestjs-tutorial-series
💡 git checkout db-qa-batch-4 để xem đúng 12 câu code của lô 4 (6 SQL + 6 Prisma).
⏮️ Câu trước: https://youtu.be/t16QnQDJ1fA
▶️ Xem lại từ đầu lô 4: https://youtu.be/VuqlwliTDeA
📱 Bản Shorts 60 giây: https://youtu.be/NAMJXcYnqjU
🔁 Cùng bài học ở tầng SQL — câu #37: lọc 80% bảng thì PG bỏ index: https://youtu.be/VuqlwliTDeA
▶️ Playlist series: "Phỏng vấn Frontend 🇻🇳" — https://www.youtube.com/playlist?list=PLYvXt5cUP0yE
▶️ 6 series khác trên kênh: "NestJS cho người mới bắt đầu" · "Super App với React Native" · "Mini-App từ A đến Z" (https://www.youtube.com/playlist?list=PLY-i2_1YbKi4) · "Mini-App với Flutter 🇻🇳" (https://www.youtube.com/playlist?list=PLL5FgtEBrD6g) · "Mini-App Flutter thuần 🇻🇳" (https://www.youtube.com/playlist?list=PLOjCSg9O8bRM) · "StyleX từ A đến Z 🇻🇳" (https://www.youtube.com/playlist?list=PLONwK58GbR_M)
💬 Đủ 48 câu trên playlist — comment câu hỏi phỏng vấn khó nhất bạn từng gặp để lô sau càng sát thực tế!

#prisma #orm #phongvan #backend
```

**Comment ghim gợi ý:**
```
🎯 Vậy là đủ 48 câu — 12 câu React & Vue, 12 câu hiệu năng RN & Flutter, 12 câu backend Node.js & NestJS, và 12 câu Database & SQL, câu nào cũng demo chạy số thật. BEAT VÀNG chốt sổ câu 48: index trên orders(status) TẠO RA MÀ PLANNER KHÔNG THÈM DÙNG — plan không đổi một chữ, vẫn 15.96 ms, vì paid chiếm 33% bảng; phải là orders(status, created_at DESC) khớp CẢ lọc lẫn sắp xếp thì mới xuống 0,74 ms và Sort biến mất. Đừng đoán index — lấy SQL thật từ log, EXPLAIN chính câu đó, rồi mới tạo. Cảm ơn bạn đã luyện cùng — comment câu hỏi phỏng vấn khó nhất bạn từng gặp cho lô sau nhé!
```

**Thumbnail:** badge "PV FE #48" · dòng lớn "INDEX ĐÚNG" / "16MS → 0.7MS" · phụ đề "Phỏng vấn Frontend · Câu 48/48" · badge emoji 🎯 · variant shot, ảnh dọc `screens/dbqa/p6-optimize.png` (4 trạng thái index, [B] bị bỏ qua).

**Tags:** `tối ưu query chậm, prisma log query, explain analyze buffers, composite index, index status created_at, index bị bỏ qua, planner postgres, slow query production, prisma 6, phỏng vấn prisma, phỏng vấn database, prisma tiếng việt, học prisma, prisma interview questions, phỏng vấn fullstack`

---

### Shorts lô 4 (12 video)

> Mỗi Short <60 giây, cùng câu hỏi với video ngang tương ứng, rút gọn để ôn nhanh. Đánh số nối tiếp lô 3: sd1..sd6 = Shorts #37..#42 (SQL/PostgreSQL), sp1..sp6 = Shorts #43..#48 (Prisma). CHƯA ĐĂNG — điền link thật thay placeholder khi đăng; mô tả mỗi Short chỉ cần dòng caption dưới đây + link video đầy đủ.

| id | Tiêu đề Shorts | Caption |
|---|---|---|
| sd1 | Cứ tạo index là query nhanh hơn? 60 giây #shorts | Chưa index: Gather → Parallel Seq Scan, vứt ~500k dòng để lấy 61 dòng; có index: 8.5ms → 0.65ms, buffers 3604 → 63.<br>Bẫy: lọc 80% bảng thì PG BỎ index, quay lại Seq Scan — và thế là đúng.<br>Video đầy đủ: https://youtu.be/VuqlwliTDeA<br>#shorts #postgresql #phongvan |
| sd2 | Đọc EXPLAIN ANALYZE: nhìn con số nào trước? #shorts | cost là ước lượng của planner, actual time mới là ms thật; loops=3 nghĩa là 55366 × 3 = 166.098 dòng đi qua.<br>Bẫy: lệch 1677x KHÔNG phải thống kê cũ — đó là LIMIT dừng sớm, node quét chỉ lệch 1.3x.<br>Video đầy đủ: https://youtu.be/TUJtkU6mWQc<br>#shorts #postgresql #phongvan |
| sd3 | 50 khách + đơn: 51 query hay 1 JOIN? #shorts | 51 query 25.82 ms vs 1 câu JOIN 16.38 ms — checksum JS khớp từng số, cùng 4881 dòng đơn.<br>Bẫy: mỗi query nhỏ chỉ 0.51 ms — phải NHÂN với 51 lượt đi–về; ép index thì loops=50 nằm BÊN TRONG DB.<br>Video đầy đủ: https://youtu.be/iwKKqupLWdg<br>#shorts #postgresql #phongvan |
| sd4 | 1 câu SELECT, 2 kết quả trong 1 transaction?! #shorts | READ COMMITTED chụp ảnh MỖI CÂU LỆNH nên đọc lại thấy 4519520; REPEATABLE READ chốt 1 ảnh từ câu đầu.<br>Bẫy: A đọc giá trị KHÔNG CÒN TỒN TẠI là đúng snapshot — nhưng 40001 could not serialize thì phải RETRY.<br>Video đầy đủ: https://youtu.be/gCL6V8t3QgE<br>#shorts #postgresql #phongvan |
| sd5 | 2 transaction khóa chéo — ai bị hủy? #shorts | UPDATE tự khóa dòng tới hết transaction; sau 1008ms ≈ deadlock_timeout 1s, PG hủy 1 nạn nhân với 40P01.<br>Bẫy: sau deadlock CẢ HAI dòng đều +1 — và câu SQL thủ phạm chỉ nằm ở log server.<br>Video đầy đủ: https://youtu.be/KZuN9inSumE<br>#shorts #postgresql #phongvan |
| sd6 | OFFSET 499980: vì sao trang cuối chậm 60x? #shorts | OFFSET không "nhảy": quét 500.000 dòng rồi VỨT 499.980 · 21.6 ms; cursor WHERE id > lastId chỉ 20 dòng · 0.35 ms.<br>Bẫy: cùng node Index Scan orders_pkey, khác đúng 1 dòng Index Cond — cột sắp xếp phải ỔN ĐỊNH & UNIQUE.<br>Video đầy đủ: https://youtu.be/U4dD5kwJyYY<br>#shorts #postgresql #phongvan |
| sp1 | Prisma: vòng for findMany = 21 query?! #shorts | Bật log rồi ĐẾM: vòng for 21 query, include 2 query — bất biến, 200 khách vẫn 2.<br>Bẫy: include KHÔNG phải JOIN (WHERE customer_id IN $1..$20) · Promise.all vẫn 20 query.<br>Video đầy đủ: https://youtu.be/x0eo-tic-fE<br>#shorts #prisma #phongvan |
| sp2 | findMany trả 98KB — select còn 26KB #shorts | 5 cột 97.9 KB → 2 cột 26.1 KB (-73.4%), đo bằng JSON.stringify, bất biến 3/3 lần chạy.<br>Bẫy: select KHÔNG đổi PLAN — cùng Index Scan, cùng buffers hit=14, chỉ width 25 → 8.<br>Video đầy đủ: https://youtu.be/jcKVYdXE5tw<br>#shorts #prisma #phongvan |
| sp3 | Bước 2 lỗi — khách vừa tạo có ở lại? #shorts | 2 lệnh rời: customers 5000 → 5001, khách mồ côi; bọc $transaction: 5001 → 5001, log có BEGIN … ROLLBACK.<br>Bẫy: 2 lệnh trong 1 hàm KHÔNG phải transaction · rollback không trả lại sequence.<br>Video đầy đủ: https://youtu.be/2e35Hdkslkk<br>#shorts #prisma #phongvan |
| sp4 | Thêm cột NOT NULL vào bảng 1000 dòng? #shorts | migrate dev từ chối SINH cả file: "There are 1000 rows in this table"; cách đúng là 3 bước nullable → backfill → SET NOT NULL.<br>Bẫy: backfill PHẢI là migration — production dùng migrate deploy sẽ nhảy bước 1 → 3 rồi chết.<br>Video đầy đủ: https://youtu.be/Jyz-uHawyzU<br>#shorts #prisma #phongvan |
| sp5 | 20 query song song, pool 2 kết nối thì sao? #shorts | pool 2: 3048ms · pool 20: 357ms — cao điểm kết nối ĐÚNG BẰNG connection_limit; pool 1 + timeout 1s: OK 4 / 16 lỗi P2024.<br>Bẫy: pool_timeout là timeout XIN kết nối, không phải timeout query — trần thật là max_connections=100.<br>Video đầy đủ: https://youtu.be/t16QnQDJ1fA<br>#shorts #prisma #phongvan |
| sp6 | Tạo index rồi mà query vẫn chậm y cũ? #shorts | orders(status) 15.96ms — plan KHÔNG ĐỔI một chữ vì paid = 33% bảng; orders(status, created_at DESC) 0.74ms, Sort biến mất.<br>Bẫy: đừng ĐOÁN index — lấy SQL thật từ log, EXPLAIN chính câu đó rồi mới tạo.<br>Video đầy đủ: https://youtu.be/b1Y9Yi2O3e0<br>#shorts #prisma #phongvan |

