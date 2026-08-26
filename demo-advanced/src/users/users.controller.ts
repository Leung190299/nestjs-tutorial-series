import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';

@Controller('users')
export class UsersController {
  @Post()
  create(@Body() user: CreateUserDto) {
    return { message: `Đã tạo user ${user.name}`, user };
  }
}
