import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { RoleGuard } from './role.guard.js';
import { Roles } from './roles.decorator.js';

// Phân nhiệm chuẩn: middleware parse x-token gắn req.user (authentication
// data) — guard so role theo metadata @Roles (authorization).
@Controller('s3')
@UseGuards(RoleGuard)
export class S3Controller {
  // GET /s3/admin — chỉ role admin. Không token → 401 (guard tự ném),
  // sai quyền → 403 (Nest mặc định khi guard trả false), đủ quyền → 200.
  @Get('admin')
  @Roles('admin')
  admin(@Req() req: Request & { user?: { name: string; role: string } }) {
    return { secret: 'doanh thu Q3', user: req.user };
  }

  // GET /s3/public — không @Roles → guard cho qua, ai cũng vào được.
  @Get('public')
  publicRoute() {
    return { ok: true };
  }
}
