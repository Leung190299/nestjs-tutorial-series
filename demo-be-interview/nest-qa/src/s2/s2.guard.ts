import { Injectable } from '@nestjs/common';
import type { CanActivate, ExecutionContext } from '@nestjs/common';

// Guard luôn cho qua — chỉ để log vị trí trong chuỗi lifecycle.
// Docs: "Guards are executed after all middleware, but before any
// interceptor or pipe."
@Injectable()
export class S2Guard implements CanActivate {
  canActivate(_context: ExecutionContext): boolean {
    console.log('[2] Guard');
    return true;
  }
}
