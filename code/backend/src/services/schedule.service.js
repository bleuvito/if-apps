import express from 'express';
import { verify } from '../models/authentication.js';
import { createSchedule } from '../models/schedule.create.js';
import { listSchedule } from '../models/schedule.list.js';

const ScheduleService = express.Router();

ScheduleService.post(
  '/',
  verify(['DOSEN', 'KALAB', 'KAJUR', 'ADMIN']),
  async (req, res, next) => {
    try {
      const result = await createSchedule(req);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

ScheduleService.get('/', verify('all'), async (req, res, next) => {
  try {
    const result = await listSchedule(req);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default ScheduleService;
