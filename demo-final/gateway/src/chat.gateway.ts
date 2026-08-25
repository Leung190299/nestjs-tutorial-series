import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { firstValueFrom } from 'rxjs';
import { Server } from 'ws';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(@Inject('CHAT_SERVICE') private client: ClientProxy) {}

  async handleConnection(client: any) {
    const history = await firstValueFrom(
      this.client.send({ cmd: 'get_history' }, {}),
    );
    client.send(JSON.stringify({ event: 'history', data: history }));
  }

  @SubscribeMessage('chat')
  async handleChat(client: any, message: string) {
    await firstValueFrom(this.client.send({ cmd: 'save_message' }, message));
    this.server.clients.forEach((c) => {
      c.send(JSON.stringify({ event: 'chat', data: message }));
    });
  }
}
