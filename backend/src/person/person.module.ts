import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CommonValues,
  CommonValuesByCountry,
  CommonValuesByCountrySchema,
  CommonValuesSchema,
  Person,
  PersonSchema,
} from './person';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { SocketService } from './socket.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Person.name, schema: PersonSchema },
      { name: CommonValues.name, schema: CommonValuesSchema },
      { name: CommonValuesByCountry.name, schema: CommonValuesByCountrySchema },
    ]),
  ],
  controllers: [PersonController],
  providers: [PersonService, SocketService],
  exports: [SocketService],
})
export class PersonModule {}
