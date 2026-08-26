import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('orders')
export class OrdersController {
  constructor(@Inject('ORDERS_QUEUE') private client: ClientProxy) {}

  @Post()
  create(@Body() order: { item: string }) {
    this.client.emit('order_created', order);
    return { message: `Đã nhận đơn ${order.item}, đang xử lý!` };
  }
}
