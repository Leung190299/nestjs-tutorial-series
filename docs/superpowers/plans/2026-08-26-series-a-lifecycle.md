# Series A — "NestJS nâng cao: Request Lifecycle" (4 tập) — Plan

**Goal:** 4 video nâng cao (Pipes, Guards, Interceptors, Exception filters) + thumbnail + SEO, dùng nguyên pipeline hiện có. Đánh số file ep05–ep08; trên video hiển thị "Nâng cao · Tập 1..4".

**Demo code:** MỘT app `demo-advanced/` (NestJS thuần, thêm class-validator/class-transformer). Mỗi tập sở hữu file riêng để không giẫm nhau (code byte-match từng tập với trạng thái cuối của repo):

- ep05 Pipes: `src/main.ts` (useGlobalPipes ValidationPipe), `src/users/create-user.dto.ts` (IsNotEmpty/MinLength/IsEmail), `src/users/users.controller.ts` (POST /users nhận CreateUserDto). Demo: curl POST hợp lệ → 201; email sai → 400 kèm message.
- ep06 Guards: `src/admin/api-key.guard.ts` (CanActivate, check header x-api-key === 'bi-mat-123'), `src/admin/admin.controller.ts` (@UseGuards, GET /admin). Demo: thiếu key → 403, đúng key → 200.
- ep07 Interceptors: `src/products/logging.interceptor.ts` (tap đo thời gian + map bọc {success, data}), `src/products/products.controller.ts` (@UseInterceptors, GET /products). Demo: response bọc chuẩn + log ms.
- ep08 Exception filters: `src/orders/http-exception.filter.ts` (@Catch(HttpException), JSON lỗi thống nhất kèm time), `src/orders/orders.controller.ts` (@UseFilters, GET /orders/:id ném NotFoundException). Demo: curl /orders/99 → JSON lỗi đẹp.

`app.module.ts` gom 4 controller (không chiếu lên video). Cổng 3000.

**Ví von mỗi tập:** Pipes = nhân viên soát vé kiểm tra trước khi vào; Guards = bảo vệ đứng ở cửa; Interceptors = camera an ninh + người đóng gói quà; Exception filters = bộ phận chăm sóc khách hàng khi có sự cố.

**Cấu trúc mỗi tập (~10 scene, ~50 câu, ~4.5–5.5 phút):** title → vấn đề (concept) → khái niệm + ví von (concept) → diagram vị trí trong request lifecycle → code (2–3 scene) → terminal demo → recap/so sánh (concept) → outro (teaser tập kế; ep08 outro chốt series + trỏ về series cơ bản).

**Diagram lifecycle dùng chung:** boxes Client → Guard 💂 → Pipe 🎫 → Handler 🧑‍🍳 (+ Interceptor 📦 bọc, Filter 🚑 đón lỗi) — mỗi tập highlight nhân vật của mình qua flows.

**Thumbnail:** Thumb05–08 cùng hệ với 4 cái cũ, badge "NÂNG CAO 1..4". SEO: thêm section Series A vào docs/seo-youtube.md (playlist mới "NestJS nâng cao").

**Ràng buộc giữ nguyên:** câu ≤200 ký tự; VOICE Adam; code video khớp byte demo đã chạy thật; wav/mp4 không commit; trailer Co-Authored-By Claude Fable 5.
