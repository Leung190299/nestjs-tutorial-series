# Series B — "Microservices nâng cao: Transporters" (Redis, RabbitMQ, Kafka) — Plan

**Goal:** 3 video ep09–ep11 DÀI HƠN series A (~6 phút, ~65–72 câu/tập, giải thích tối đa dễ hiểu), demo broker thật qua Docker (colima), + thumbnail + SEO. Trên video: "NestJS nâng cao · Transporters Tập 1..3".

**Yêu cầu riêng từ người dùng:** dễ hiểu nhất có thể (nhiều ví von đời thường, đi chậm), video dài hơn các tập 3-phút của series A.

**Hạ tầng:** Docker qua colima (đã chạy). Container đặt tên rõ: `tutorial-redis`, `tutorial-rabbitmq`, `tutorial-kafka` — cuối dự án dừng/xóa các container NÀY và `colima stop` (trạng thái máy trước đó: colima tắt). Không đụng container khác của người dùng.

## Tập 1 (ep09) — Redis: đài phát thanh 📻

Ý chính: pub/sub; đổi transport CHỈ Ở CONFIG (giữ đúng lời hứa tập microservices); Redis làm "trạm trung chuyển" — service không cần biết địa chỉ nhau.
Demo `demo-redis/` (gateway + users-service, copy pattern demo-microservices nhưng Transport.REDIS, cả 2 cài thêm `ioredis`):
- users-service main.ts: `transport: Transport.REDIS, options: { host: 'localhost', port: 6379 }`
- gateway app.module: ClientsModule.register REDIS cùng options
- controller 2 bên GIỮ NGUYÊN pattern `{cmd:'get_users'}` → nhấn mạnh: logic không đổi một dòng.
- Broker: `docker run -d --name tutorial-redis -p 6379:6379 redis:7`
- Verify: curl gateway /users trả đúng JSON qua Redis.
Ví von: TCP = gọi điện trực tiếp (phải biết số); Redis = đài phát thanh/bảng tin khu phố: ai quan tâm kênh nào thì dò kênh đó.
Dàn ý (~13 scene): title → recap lời hứa "đổi transport chỉ ở config" → vấn đề của TCP điểm-nối-điểm (phải biết địa chỉ nhau, thêm service là thêm dây) → Redis là gì (kho key-value siêu nhanh + kênh pub/sub) → ví von đài phát thanh → diagram: 2 service ↔ Redis ở giữa → terminal docker run redis → code users-service main.ts → code gateway app.module → concept "logic giữ nguyên" (diff 2 dòng đổi) → terminal chạy + curl → concept khi nào chọn Redis → outro.

## Tập 2 (ep10) — RabbitMQ: bưu điện giữ thư 📮

Ý chính: message queue ≠ pub/sub thoáng qua — hàng đợi GIỮ tin khi người nhận vắng mặt; event-based với emit/@EventPattern (fire-and-forget); durability là siêu năng lực.
Demo `demo-rabbitmq/` (gateway + worker-service, cài `amqplib amqp-connection-manager`):
- gateway: POST /orders → `client.emit('order_created', {...})` trả về ngay "đã nhận đơn"
- worker main.ts: Transport.RMQ, queue 'orders_queue', urls amqp://localhost:5672
- worker controller: `@EventPattern('order_created')` in log "Đang xử lý đơn..."
- Broker: `docker run -d --name tutorial-rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management`
- Verify kịch bản durability: TẮT worker → POST 2 đơn (gateway vẫn trả OK ngay) → BẬT worker → log hiện 2 đơn được xử lý. Đây là demo đinh của tập.
Ví von: bưu điện — người gửi bỏ thư là xong việc; người nhận vắng nhà thì thư nằm chờ ở bưu điện, về là có.
Dàn ý (~13 scene): title → vấn đề: việc nặng làm ngay trong request (email, xuất hóa đơn) bắt khách đứng chờ; service chết là mất tin → khái niệm message queue + ví von bưu điện → phân biệt send/@MessagePattern (hỏi–đáp) vs emit/@EventPattern (gửi thư, không chờ đáp) → diagram gateway → queue → worker → terminal docker run rabbitmq → code gateway (emit) → code worker main (RMQ + queue) → code worker (@EventPattern) → terminal demo durability (tắt worker vẫn nhận đơn!) → concept khi nào chọn RabbitMQ → outro.

## Tập 3 (ep11) — Kafka: sổ nhật ký của cả công ty 📒

Ý chính: event streaming ≠ queue — Kafka là NHẬT KÝ lưu mọi sự kiện theo thứ tự, nhiều bên cùng đọc, đọc lại từ đầu được (replay); dùng cho dữ liệu lớn/analytics.
Demo `demo-kafka/` (gateway + analytics-service, cài `kafkajs`):
- gateway: POST /track → `client.emit('page_view', {...})`
- analytics main.ts: Transport.KAFKA, brokers ['localhost:9092'], consumer groupId 'analytics'
- analytics controller: `@EventPattern('page_view')` đếm & log lượt xem
- Broker: `docker run -d --name tutorial-kafka -p 9092:9092` apache/kafka:3.7.0 (KRaft single node, env chuẩn single-broker localhost)
- Verify: POST vài event → log analytics đếm tăng; (replay giải thích bằng diagram/concept, không demo để khỏi phức tạp).
Ví von: RabbitMQ = bưu điện (thư phát xong là xong); Kafka = sổ nhật ký chung của công ty: mọi việc ghi vào sổ theo dòng thời gian, phòng nào muốn đọc thì tự đọc theo nhịp của mình, nhân viên mới vào đọc lại từ trang đầu.
Dàn ý (~13 scene): title → giới hạn của queue: tin đọc xong là mất, nhiều phòng cùng muốn nghe thì sao → Kafka là gì + ví von sổ nhật ký → topic/partition/consumer group bằng hình ảnh đơn giản (concept, không đào sâu) → diagram producer → topic log → 2 consumer đọc độc lập → terminal docker run kafka → code gateway emit → code analytics main (KAFKA + groupId) → code @EventPattern đếm view → terminal demo → concept chọn gì: TCP/Redis/RabbitMQ/Kafka (bảng tổng kết cả series transporters) → outro chốt: hoàn thành trọn bộ, cảm ơn.

## Quy trình & ràng buộc

Như các phần trước: demo build + verify thật (subagent) → script (controller viết, câu ≤200 ký tự, code khớp byte) → validate + diff code → TTS (cache) → Root compositions Episode09–11 + Thumb09–11 → render + spot-check still → SEO section mới → final review (fable) → merge main + push. Wav/mp4 không commit; trailer Co-Authored-By Claude Fable 5.

Rủi ro: image Kafka cấu hình single-node cần env đúng (ADVERTISED_LISTENERS localhost) — subagent phải curl/emit thử thật; nếu image apache/kafka trục trặc, dùng bitnami/kafka. RabbitMQ cần vài giây khởi động trước khi worker connect.
