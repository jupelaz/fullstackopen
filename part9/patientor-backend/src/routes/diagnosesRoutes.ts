import express from 'express';
import { getAllDiagnoses } from '../services/diagnosesService';

export const router = express.Router();
router.get('/', (_req, res) => res.send(getAllDiagnoses()));