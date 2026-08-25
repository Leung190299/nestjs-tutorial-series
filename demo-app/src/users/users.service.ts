import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'Minh' },
    { id: 2, name: 'Lan' },
  ];

  findAll() {
    return this.users;
  }
}
