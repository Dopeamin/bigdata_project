import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  CommonValues,
  CommonValuesByCountry,
  CommonValuesByCountryDTO,
  CommonValuesDTO,
  Person,
  PersonDto,
  toDto,
} from './person';

@Injectable()
export class PersonService {
  constructor(
    @InjectModel(Person.name) private personModal: Model<Person>,
    @InjectModel(CommonValues.name)
    private commonValuesModel: Model<CommonValues>,
    @InjectModel(CommonValuesByCountry.name)
    private commonValuesByCountryModel: Model<CommonValuesByCountry>,
  ) {}

  async findAll(): Promise<PersonDto[]> {
    return (await this.personModal.find().exec()).map((modal) =>
      toDto(modal),
    );
  }

  async getCommonValues(): Promise<CommonValuesDTO[]> {
    return (await this.commonValuesModel
      .find()
      .exec()) as unknown as CommonValuesDTO[];
  }

  async getCommonValuesByCountry(): Promise<CommonValuesByCountryDTO[]> {
    return (await this.commonValuesByCountryModel
      .find()
      .exec()) as unknown as CommonValuesByCountryDTO[];
  }
}
