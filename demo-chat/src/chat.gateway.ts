import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'ws';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('chat')
  handleChat(client: any, message: string) {
    this.server.clients.forEach((c) => {
      c.send(JSON.stringify({ event: 'chat', data: message }));
    });
  }
}
