import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UsersController {
  private users = [
    { id: 1, name: 'Minh' },
    { id: 2, name: 'Lan' },
  ];

  @MessagePattern({ cmd: 'get_users' })
  findAll() {
    return this.users;
  }
}
