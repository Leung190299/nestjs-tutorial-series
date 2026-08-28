import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class UsersController {
  private users = [
    { id: 1, name: 'Minh' },
    { id: 2, name: 'Lan' },
  ];

  @GrpcMethod('UsersService', 'FindAll')
  findAll() {
    return { users: this.users };
  }
}
