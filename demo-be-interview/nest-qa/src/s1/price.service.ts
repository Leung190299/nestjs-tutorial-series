import { Injectable } from '@nestjs/common';

// S1 (ep75): provider mặc định là SINGLETON — container tạo 1 lần,
// constructor log đúng 1 dòng dù bao nhiêu route inject.
@Injectable()
export class PriceService {
  constructor() {
    console.log('[S1] PriceService constructor chạy');
  }

  getPrice(): number {
    return 100;
  }
}
