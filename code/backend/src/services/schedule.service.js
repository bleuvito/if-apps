import express from 'express';
import { verify } from '../models/authentication.js';
import { createSchedule } from '../models/schedule.create.js';
import { deleteSchedule } from '../models/schedule.delete.js';
import { patchSchedule } from '../models/schedule.edit.js';
import { getSchedule } from '../models/schedule.get.js';
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

ScheduleService.get('/:id', verify('all'), async (req, res, next) => {
  try {
    const result = await getSchedule(req);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

ScheduleService.patch(
  '/:id',
  verify(['DOSEN', 'KALAB', 'KAPRODI', 'KAJUR', 'ADMIN']),
  async (req, res, next) => {
    try {
      const result = await patchSchedule(req);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

ScheduleService.delete(
  '/:id',
  verify(['DOSEN', 'KALAB', 'KAPRODI', 'KAJUR', 'ADMIN']),
  async (req, res, next) => {
    try {
      const result = await deleteSchedule(req);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

export default ScheduleService;
