import { Gender, NewPatient } from './types';

type Fields = { 
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation } : Fields): NewPatient => {
  const newEntry: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSSn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation)
  };

  return newEntry;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }
  return date;
};

const parseSSn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const parseGender = (gender:unknown):Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const parseOccupation = (occupation:unknown):string => {
  if (!occupation || !isString(occupation)){
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const isString = (text: unknown): text is string => typeof text === 'string' || text instanceof String;

const isDate = (date: string): boolean => Boolean(Date.parse(date));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any):gender is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(gender);
};