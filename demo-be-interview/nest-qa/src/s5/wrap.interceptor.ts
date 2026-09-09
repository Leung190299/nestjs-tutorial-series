import { Injectable } from '@nestjs/common';
import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs';
import type { Observable } from 'rxjs';

// Interceptor = chỗ DUY NHẤT trong lifecycle ôm trọn 2 đầu handler:
// chạy TRƯỚC (ghi t0), gọi next.handle() nhận Observable của response,
// rồi xử lý tiếp trên đường RA (RxJS map). Middleware chỉ có phía vào.
@Injectable()
export class WrapInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const t0 = Date.now(); // trước khi handler chạy

    // next.handle() trả Observable LAZY — phải return chuỗi pipe này,
    // không thì handler không chạy / response không về.
    return next.handle().pipe(
      map((data) => {
        const tookMs = Date.now() - t0; // sau khi handler trả kết quả
        // X-Response-Time là convention TỰ ĐẶT (không phải header chuẩn Nest).
        context
          .switchToHttp()
          .getResponse()
          .setHeader('X-Response-Time', `${tookMs}ms`);
        // Transform response = chỉ là map(): bọc data thành vỏ thống nhất.
        return { ok: true, data, tookMs };
      }),
    );
  }
}
