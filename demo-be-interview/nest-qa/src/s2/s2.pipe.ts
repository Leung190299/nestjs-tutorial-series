import { Injectable } from '@nestjs/common';
import type { PipeTransform } from '@nestjs/common';

// Pipe pass-through gắn trên @Query('msg') — không đổi giá trị, chỉ log.
// Docs chốt: pipe chạy SAU interceptor-trước, NGAY TRƯỚC handler
// (bước 5 trong danh sách 10 bước của FAQ request-lifecycle).
@Injectable()
export class S2Pipe implements PipeTransform {
  transform(value: unknown): unknown {
    console.log('[4] Pipe');
    return value;
  }
}
