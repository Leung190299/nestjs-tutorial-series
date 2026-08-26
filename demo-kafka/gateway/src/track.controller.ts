import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('track')
export class TrackController {
  constructor(@Inject('ANALYTICS') private client: ClientProxy) {}

  @Post()
  track(@Body() event: { page: string }) {
    this.client.emit('page_view', event);
    return { message: `Đã ghi nhận lượt xem ${event.page}` };
  }
}
