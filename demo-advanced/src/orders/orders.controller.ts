import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';

@UseFilters(HttpExceptionFilter)
@Controller('orders')
export class OrdersController {
  @Get(':id')
  findOne(@Param('id') id: string) {
    throw new NotFoundException(`Không tìm thấy đơn hàng ${id}`);
  }
}
