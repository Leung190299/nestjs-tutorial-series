import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ChatController {
  private messages: string[] = [];

  @MessagePattern({ cmd: 'save_message' })
  save(message: string) {
    this.messages.push(message);
    return this.messages;
  }

  @MessagePattern({ cmd: 'get_history' })
  history() {
    return this.messages;
  }
}
