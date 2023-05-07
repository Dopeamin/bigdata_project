export interface CommonValuesDTO {
  _id: string;
  country: { value: string; count: number }[];
  finalWorth: { value: string; count: number }[];
  gender: { value: string; count: number }[];
  city: { value: string; count: number }[];
  selfMade: { value: string; count: number }[];
  source: { value: string; count: number }[];
  title: { value: string; count: number }[];
  birthDate: { value: string; count: number }[];
  philanthropyScore: { value: string; count: number }[];
  organization: { value: string; count: number }[];
  state: { value: string; count: number }[];
  category: { value: string; count: number }[];
  age: { value: string; count: number }[];
}
