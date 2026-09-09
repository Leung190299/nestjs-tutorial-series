import type { NextFunction, Request, Response } from 'express';

// Middleware chức năng (functional middleware) — lớp ĐẦU TIÊN của lifecycle,
// chạy kiểu Express trước khi Nest biết handler nào sẽ xử lý request.
// Đăng ký qua configure(NestModule) trong AppModule cho path 's2'.
export function s2Middleware(req: Request, res: Response, next: NextFunction) {
  console.log('[1] Middleware');
  next();
}
