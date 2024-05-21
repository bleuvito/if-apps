import express from 'express';
import { verify } from '../models/authentication.js';
import { createRoom } from '../models/room.create.js';
import { deleteRoom } from '../models/room.delete.js';
import { getRoom } from '../models/room.get.js';
import { listRoom } from '../models/room.list.js';
import { patchRoom } from '../models/room.patch.js';

const RoomService = express.Router();

RoomService.post('/', verify(['ADMIN', 'KALAB']), async (req, res, next) => {
  try {
    const result = await createRoom(req);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

RoomService.get('/', verify('all'), async (req, res, next) => {
  try {
    const result = await listRoom(req);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

RoomService.get('/:id', verify('all'), async (req, res, next) => {
  try {
    const result = await getRoom(req);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

RoomService.patch(
  '/:id',
  verify(['ADMIN', 'KAJUR', 'KALAB']),
  async (req, res, next) => {
    try {
      const result = await patchRoom(req);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

RoomService.delete(
  '/:id',
  verify(['ADMIN', 'KAJUR', 'KALAB']),
  async (req, res, next) => {
    try {
      const result = await deleteRoom(req);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

export default RoomService;
