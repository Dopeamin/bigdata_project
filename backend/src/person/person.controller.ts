import { Controller, Get } from '@nestjs/common';
import { PersonDto } from './person';
import { PersonService } from './person.service';

@Controller("persons")
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  async getAllBillionaires(): Promise<PersonDto[]> {
    return await this.personService.findAll();
  }
}
