import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('demo-advanced (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // main.ts không chạy trong e2e nên bật pipe giống bootstrap
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('POST /users chấp nhận dữ liệu hợp lệ', () =>
    request(app.getHttpServer())
      .post('/users')
      .send({ name: 'Minh', email: 'minh@example.com' })
      .expect(201));

  it('POST /users chặn dữ liệu sai (Pipes)', () =>
    request(app.getHttpServer())
      .post('/users')
      .send({ name: 'M', email: 'sai-roi' })
      .expect(400));

  it('GET /admin chặn khi thiếu API key (Guards)', () =>
    request(app.getHttpServer()).get('/admin').expect(403));

  it('GET /admin mở khi đúng key', () =>
    request(app.getHttpServer())
      .get('/admin')
      .set('x-api-key', 'bi-mat-123')
      .expect(200));

  it('GET /products bọc response (Interceptors)', () =>
    request(app.getHttpServer())
      .get('/products')
      .expect(200)
      .expect({ success: true, data: [{ id: 1, name: 'Bàn phím cơ' }] }));

  it('GET /orders/:id trả lỗi đúng khuôn (Filters)', () =>
    request(app.getHttpServer())
      .get('/orders/99')
      .expect(404)
      .expect((res) => {
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Không tìm thấy đơn hàng 99');
        expect(res.body.time).toBeDefined();
      }));
});
