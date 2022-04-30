import express from 'express';
import { getAllPatients } from '../services/patientsService';

export const router = express.Router();
router.get('/', (_req, res) => res.send(getAllPatients()));