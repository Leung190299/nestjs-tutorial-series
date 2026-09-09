import { Injectable, UnauthorizedException } from '@nestjs/common';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';
import { ROLES_KEY } from './roles.decorator.js';

// Guard AUTHORIZATION — có ExecutionContext nên biết CHÍNH XÁC handler
// sắp chạy, đọc được metadata @Roles của nó (điều middleware không làm nổi).
// Docs: "Guards are executed after all middleware, but before any
// interceptor or pipe."
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Route không gắn @Roles → không yêu cầu quyền, cho qua.
    const required = this.reflector.get<string[] | undefined>(
      ROLES_KEY,
      context.getHandler(),
    );
    if (!required || required.length === 0) return true;

    const req = context
      .switchToHttp()
      .getRequest<Request & { user?: { name: string; role: string } }>();

    // BẪY: guard trả false → Nest ném ForbiddenException (403), KHÔNG phải
    // 401. Muốn 401 "chưa đăng nhập" phải TỰ ném UnauthorizedException.
    if (!req.user) throw new UnauthorizedException('Chưa đăng nhập');

    // Sai quyền → return false: GIỮ hành vi mặc định của Nest
    // ("when a guard returns false, the framework throws a
    // ForbiddenException") để thấy body 403 mặc định.
    return required.includes(req.user.role);
  }
}
