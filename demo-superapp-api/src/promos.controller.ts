import { Controller, Get } from '@nestjs/common';

type Promo = { id: number; emoji: string; title: string; detail: string };

@Controller('promos')
export class PromosController {
  private readonly promos: Promo[] = [
    { id: 1, emoji: '🍜', title: 'Giảm 30% đồ ăn', detail: 'Cho đơn đầu tiên trong ngày' },
    { id: 2, emoji: '🛵', title: 'Freeship 0đ', detail: 'Mọi chuyến xe dưới 3km' },
    { id: 3, emoji: '🎬', title: 'Mua 1 tặng 1 vé phim', detail: 'Riêng tối thứ Tư hằng tuần' },
  ];

  @Get()
  findAll(): Promo[] {
    return this.promos;
  }
}
