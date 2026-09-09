import type { NextFunction, Request, Response } from 'express';

// Middleware AUTHENTICATION — chỉ PARSE, KHÔNG chặn ai.
// Docs: "middleware, by its nature, is context-blind" — nó không biết
// handler nào sẽ chạy sau next(), nên không thể quyết định phân quyền
// theo route. Việc của nó: đọc header x-token dạng "user:<role>",
// gắn req.user rồi cho đi tiếp. Chặn cửa là việc của Guard.
export function s3Middleware(req: Request, _res: Response, next: NextFunction) {
  const token = req.headers['x-token'];
  if (typeof token === 'string' && token.includes(':')) {
    const [name, role] = token.split(':');
    (req as Request & { user?: { name: string; role: string } }).user = {
      name,
      role,
    };
    console.log(`[S3-MW] user=${name} role=${role}`);
  } else {
    console.log('[S3-MW] không có x-token → req.user = undefined');
  }
  next(); // luôn next() — middleware mù ngữ cảnh, không chặn
}
