import express from 'express';
import { verify } from '../models/authentication.js';
import { createRoom } from '../models/room.create.js';

const RoomService = express.Router();

RoomService.post('/', verify(['ADMIN', 'KALAB']), async (req, res, next) => {
  try {
    const result = await createRoom(req);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// RoomService.get('/', verify('all'), async (req, res, next) => {
//   try {
//     const result = await listSchedule(req);
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// RoomService.get('/:id', verify('all'), async (req, res, next) => {
//   try {
//     const result = await getSchedule(req);
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// RoomService.patch(
//   '/:id',
//   verify(['DOSEN', 'KALAB', 'KAPRODI', 'KAJUR', 'ADMIN']),
//   async (req, res, next) => {
//     try {
//       const result = await patchSchedule(req);
//       res.json(result);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// RoomService.delete(
//   '/:id',
//   verify(['DOSEN', 'KALAB', 'KAPRODI', 'KAJUR', 'ADMIN']),
//   async (req, res, next) => {
//     try {
//       const result = await deleteSchedule(req);
//       res.json(result);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

export default RoomService;
