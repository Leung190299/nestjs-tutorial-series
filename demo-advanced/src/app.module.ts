import { Module } from '@nestjs/common';
import { AdminController } from './admin/admin.controller';
import { OrdersController } from './orders/orders.controller';
import { ProductsController } from './products/products.controller';
import { UsersController } from './users/users.controller';

@Module({
  imports: [],
  controllers: [
    UsersController,
    AdminController,
    ProductsController,
    OrdersController,
  ],
  providers: [],
})
export class AppModule {}
