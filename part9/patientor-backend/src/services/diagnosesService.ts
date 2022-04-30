import diagnosesData from '../../data/diagnoses.json';
import { Diagnoses } from '../types';

export const getAllDiagnoses = (): Array<Diagnoses> => diagnosesData;