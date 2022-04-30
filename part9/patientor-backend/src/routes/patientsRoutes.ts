import express from 'express';
import { addPatient, getAllPatients } from '../services/patientsService';
import { toNewPatient } from '../utils';

export const router = express.Router();
router.get('/', (_req, res) => res.send(getAllPatients()));

router.post('/', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const newPatient = toNewPatient(req.body);
  addPatient(newPatient);
  res.json(newPatient);

});
