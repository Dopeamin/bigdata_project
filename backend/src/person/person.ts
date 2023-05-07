import * as mongoose from 'mongoose';

export const PersonSchema = new mongoose.Schema(
  {
    rank: { type: String, required: true },
    personName: { type: String, required: true },
    age: { type: String, required: true },
    finalWorth: { type: String, required: true },
    category: { type: String, required: true },
    source: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    organization: { type: String, required: true },
    selfMade: { type: String, required: true },
    gender: { type: String, required: true },
    birthDate: { type: String, required: true },
    title: { type: String, required: true },
    philanthropyScore: { type: String, required: true },
    bio: { type: String, required: true },
    about: { type: String, required: true },
  },
  { collection: 'all_data' },
);

export const CommonValuesSchema = new mongoose.Schema(
  {
    rank: { type: Array<String>, required: true },
    personName: { type: Array<String>, required: true },
    age: { type: Array<String>, required: true },
    finalWorth: { type: Array<String>, required: true },
    category: { type: Array<String>, required: true },
    source: { type: Array<String>, required: true },
    country: { type: Array<String>, required: true },
    state: { type: Array<String>, required: true },
    city: { type: Array<String>, required: true },
    organization: { type: Array<String>, required: true },
    selfMade: { type: Array<String>, required: true },
    gender: { type: Array<String>, required: true },
    birthDate: { type: Array<String>, required: true },
    title: { type: Array<String>, required: true },
    philanthropyScore: { type: Array<String>, required: true },
    bio: { type: Array<String>, required: true },
    about: { type: Array<String>, required: true },
  },
  { collection: 'common_values' },
);

export const CommonValuesByCountrySchema = new mongoose.Schema(
  {
    rank: { type: String, required: true },
    personName: { type: String, required: true },
    age: { type: String, required: true },
    finalWorth: { type: String, required: true },
    category: { type: String, required: true },
    source: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    organization: { type: String, required: true },
    selfMade: { type: String, required: true },
    gender: { type: String, required: true },
    birthDate: { type: String, required: true },
    title: { type: String, required: true },
    philanthropyScore: { type: String, required: true },
    bio: { type: String, required: true },
    about: { type: String, required: true },
  },
  { collection: 'common_values_by_country' },
);

export class Person extends mongoose.Document {
  id: string;
  rank: string;
  personName: string;
  age: string;
  finalWorth: string;
  category: string;
  source: string;
  country: string;
  state: string;
  city: string;
  organization: string;
  selfMade: string;
  gender: string;
  birthDate: string;
  title: string;
  philanthropyScore: string;
  bio: string;
  about: string;
}

export function toDto(person: any): PersonDto {
  return {
    id: person.id,
    rank: person.rank,
    personName: person.personName,
    age: parseInt(person.age),
    finalWorth: parseFloat(person.finalWorth),
    category: person.category,
    source: person.source,
    country: person.country,
    state: person.state,
    city: person.city,
    organization: person.organization,
    selfMade: person.selfMade,
    gender: person.gender,
    birthDate: person.birthDate,
    title: person.title,
    philanthropyScore: parseInt(person.philanthropyScore),
    bio: person.bio,
    about: person.about,
  };
}

export interface PersonDto {
  id: string;
  rank: string;
  personName: string;
  age: number;
  finalWorth: number;
  category: string;
  source: string;
  country: string;
  state: string;
  city: string;
  organization: string;
  selfMade: string;
  gender: string;
  birthDate: string;
  title: string;
  philanthropyScore: number;
  bio: string;
  about: string;
}
export class CommonValues extends mongoose.Document {
  _id: string;
  country: string[];
  finalWorth: string[];
  gender: string[];
  city: string[];
  selfMade: string[];
  source: string[];
  title: string[];
  birthDate: string[];
  philanthropyScore: string[];
  organization: string[];
  state: string[];
  category: string[];
  age: string[];
}

export interface CommonValuesDTO {
  _id: string;
  country: string[];
  finalWorth: string[];
  gender: string[];
  city: string[];
  selfMade: string[];
  source: string[];
  title: string[];
  birthDate: string[];
  philanthropyScore: string[];
  organization: string[];
  state: string[];
  category: string[];
  age: string[];
}

export const PersonModel = mongoose.model<Person>('all_data', PersonSchema);
export const CommonValuesModel = mongoose.model<CommonValues>(
  'common_values',
  CommonValuesSchema,
);

export class CommonValuesByCountry extends mongoose.Document {
  _id: string;
  country: string;
  finalWorth: string;
  gender: string;
  city: string;
  selfMade: string;
  source: string;
  title: string;
  birthDate: string;
  philanthropyScore: string;
  organization: string;
  state: string;
  category: string;
  age: string;
}

export interface CommonValuesByCountryDTO {
  _id: string;
  country: string;
  finalWorth: string;
  gender: string;
  city: string;
  selfMade: string;
  source: string;
  title: string;
  birthDate: string;
  philanthropyScore: string;
  organization: string;
  state: string;
  category: string;
  age: string;
}

export const CommonValuesByCountryModel = mongoose.model<CommonValuesByCountry>(
  'common_values_by_country',
  CommonValuesByCountrySchema,
);
