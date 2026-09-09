import { Injectable } from '@nestjs/common';
import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { tap } from 'rxjs';
import type { Observable } from 'rxjs';

// Interceptor — lớp DUY NHẤT chạy cả hai chiều: log trước khi gọi
// next.handle(), rồi tap() log tiếp khi Observable resolve trên đường VỀ
// (sau handler). Nếu handler ném lỗi, nhánh "sau handler" KHÔNG chạy —
// lỗi rơi thẳng xuống exception filter.
@Injectable()
export class S2Interceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {
    console.log('[3] Interceptor (trước handler)');
    return next
      .handle()
      .pipe(tap(() => console.log('[5] Interceptor (sau handler)')));
  }
}
