
import patientsData from '../../data/patients.json';
import { PatientPublic, Patient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

export const getAllPatients = (): Array<PatientPublic> => 
  patientsData.map(
    ({id,name,dateOfBirth,gender,occupation}) => 
    ({id,name,dateOfBirth,gender,occupation}));

export const addPatient = (patient: NewPatient):Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  };
  patientsData.push(newPatient);
  return newPatient;
};