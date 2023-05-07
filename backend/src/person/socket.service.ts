import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Server } from 'socket.io';
import { PersonService } from './person.service';

@Injectable()
export class SocketService {
  private readonly io: Server;

  constructor(private readonly personService: PersonService) {
    // create a new Socket.IO server and attach it to the `io` property
    this.io = new Server(3004, {
      cors: {
        origin: '*', // Adjust this to match your Next.js client's origin
        methods: ['GET', 'POST'],
      },
    });
  }

  // define a cron job to emit data through the socket every minute
  @Cron('*/60 * * * * *')
  async handleCron() {
    const allData = await this.personService.findAll();
    const commonValues = await this.personService.getCommonValues();
    const commonValuesByCountry =
      await this.personService.getCommonValuesByCountry();
    this.io.emit('data', { allData, commonValues, commonValuesByCountry });
  }

  // expose the `io` property for use in other parts of the app
  get server() {
    return this.io;
  }
}
