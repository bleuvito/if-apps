import express from 'express';

import { verify } from '../models/authentication.js';
import { createRoomSchedule } from '../models/room-schedule.create.js';
import { deleteRoomSchedule } from '../models/room-schedule.delete.js';
import { getRoomSchedule } from '../models/room-schedule.get.js';
import { listRoomSchedule } from '../models/room-schedule.list.js';
import { patchRoomSchedule } from '../models/room-schedule.patch.js';

const RoomScheduleService = express.Router();

RoomScheduleService.post(
  '/:roomId',
  verify(['ADMIN', 'KAJUR', 'KALAB']),
  async (req, res, next) => {
    try {
      const result = await createRoomSchedule(req);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

RoomScheduleService.get('/:roomId', verify('all'), async (req, res, next) => {
  try {
    const result = await listRoomSchedule(req);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

RoomScheduleService.get(
  '/:roomId/schedule/:sheduleId',
  verify('all'),
  async (req, res, next) => {
    try {
      const result = await getRoomSchedule(req);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

RoomScheduleService.patch(
  '/:roomId/schedule/:sheduleId',
  verify(['ADMIN', 'KAJUR', 'KALAB']),
  async (req, res, next) => {
    try {
      const result = await patchRoomSchedule(req);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

RoomScheduleService.delete(
  '/:roomId/schedule/:sheduleId',
  verify(['ADMIN', 'KAJUR', 'KALAB']),
  async (req, res, next) => {
    try {
      const result = await deleteRoomSchedule(req);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

export default RoomScheduleService;
