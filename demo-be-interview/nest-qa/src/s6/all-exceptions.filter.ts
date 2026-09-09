import { Catch, HttpException } from '@nestjs/common';
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import type { Request, Response } from 'express';

// @Catch() để TRỐNG = bắt MỌI exception chưa xử lý, bất kể loại
// (docs: "leave the @Catch() decorator's parameter list empty").
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    // CỜ DEMO TỰ CHẾ (không phải tính năng Nest): header `x-raw: 1` → rethrow
    // để lộ hành vi MẶC ĐỊNH của Nest (lỗi lạ → 500 "Internal server error").
    // Chỉ để 1 server show được cả 2 hành vi trước/sau filter — video phải khai rõ.
    if (req.headers['x-raw'] === '1') {
      throw exception;
    }

    const isHttp = exception instanceof HttpException;
    const status = isHttp ? exception.getStatus() : 500;
    // HttpException chủ động ném (404, 400…) giữ nguyên status + message của nó;
    // lỗi thô (Error thường) → code 'INTERNAL' + message AN TOÀN, KHÔNG lộ err.message/stack.
    const code: number | string = isHttp ? status : 'INTERNAL';
    const message = isHttp
      ? exception.message
      : 'Có lỗi phía server, thử lại sau';

    // Stack chỉ log SERVER-SIDE (1 dòng cắt gọn) — client không bao giờ thấy.
    const stack =
      exception instanceof Error ? (exception.stack ?? exception.message) : String(exception);
    console.error('[S6] stack:', stack.split('\n').slice(0, 2).join(' <- ').trim());

    res.status(status).json({
      code,
      message,
      path: req.url,
      timestamp: new Date().toISOString(),
    });
  }
}
