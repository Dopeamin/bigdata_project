import { Controller, Get } from '@nestjs/common';
import { SocketService } from './person/socket.service';

@Controller('')
export class AppController {
  constructor(private readonly socketService: SocketService) {}

  @Get()
  async getSocket(): Promise<void> {}
}
