import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { LoggingInterceptor } from './logging.interceptor';

@UseInterceptors(LoggingInterceptor)
@Controller('products')
export class ProductsController {
  @Get()
  findAll() {
    return [{ id: 1, name: 'Bàn phím cơ' }];
  }
}
