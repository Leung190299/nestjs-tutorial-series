import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class OrdersController {
  @EventPattern('order_created')
  handleOrder(order: { item: string }) {
    console.log(`📦 Đang xử lý đơn: ${order.item}`);
  }
}
