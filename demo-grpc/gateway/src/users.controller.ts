import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface UsersGrpcService {
  findAll(request: object): Observable<{ users: { id: number; name: string }[] }>;
}

@Controller('users')
export class UsersController implements OnModuleInit {
  private usersService: UsersGrpcService;

  constructor(@Inject('USERS_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.usersService = this.client.getService<UsersGrpcService>('UsersService');
  }

  @Get()
  findAll() {
    return this.usersService.findAll({});
  }
}
