import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AnalyticsController {
  private views = 0;

  @EventPattern('page_view')
  handleView(@Payload() event: { page: string }) {
    this.views = this.views + 1;
    console.log(`📈 Lượt xem thứ ${this.views}: trang ${event.page}`);
  }
}
