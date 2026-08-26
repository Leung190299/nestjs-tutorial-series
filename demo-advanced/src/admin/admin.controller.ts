import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from './api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('admin')
export class AdminController {
  @Get()
  dashboard() {
    return { secret: 'Chào sếp, đây là khu vực quản trị!' };
  }
}
