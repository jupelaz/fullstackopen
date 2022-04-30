import patientsData from '../../data/patients.json';
import { PatientsPublic } from '../types';

export const getAllPatients = (): Array<PatientsPublic> => 
  patientsData.map(
    ({id,name,dateOfBirth,gender,occupation}) => 
    ({id,name,dateOfBirth,gender,occupation}));