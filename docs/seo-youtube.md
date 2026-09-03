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
⏭️ Bonus 2/2: [LINK-EP33]

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
⏮️ Bonus 1/2: [LINK-EP32]
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

## Thumbnail

Đã render sẵn tại `video/out/thumbs/ep0X-thumb.png` (1280×720, <2MB, chuẩn YouTube). Muốn sửa chữ/bố cục: sửa mảng `thumbnails` trong `video/src/Root.tsx` hoặc component `video/src/Thumbnail.tsx`, rồi chạy `npx remotion still Thumb0X out/thumbs/ep0X-thumb.png`.

## Checklist khi đăng

1. Đăng theo thứ tự 1 → 4, mỗi video cách nhau 2–3 ngày (thuật toán thích đều đặn hơn dồn một lúc).
2. Tạo playlist "NestJS cho người mới bắt đầu 🇻🇳" ngay từ video 1, thêm từng tập vào.
3. Sau khi đăng đủ, quay lại điền toàn bộ `[LINK ...]` chéo giữa các mô tả.
4. Ghim comment đầu tiên ở mỗi video: link source code + mục lục chapters.
5. Bật phụ đề tự động tiếng Việt và rà lại các thuật ngữ (NestJS, Controller...) trong trình sửa phụ đề của YouTube.
6. End screen 20 giây cuối: thẻ "video tiếp theo" trỏ sang tập kế + thẻ subscribe.
