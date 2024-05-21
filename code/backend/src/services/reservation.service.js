import express from 'express';

import { verify } from '../models/authentication.js';
import { createReservation } from '../models/reservation.create.js';
import { deleteReservation } from '../models/reservation.delete.js';
import { getReservasion } from '../models/reservation.get.js';
import { listReservation } from '../models/reservation.list.js';
import { patchReservation } from '../models/reservation.patch.js';

const ReservationService = express.Router();

ReservationService.post('/', verify('all'), async (req, res, next) => {
  try {
    const result = await createReservation(req);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

ReservationService.get('/', verify('all'), async (req, res, next) => {
  try {
    const result = await listReservation(req);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

ReservationService.get('/:id', verify('all'), async (req, res, next) => {
  try {
    const result = await getReservasion(req);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

ReservationService.patch('/:id', verify('all'), async (req, res, next) => {
  try {
    const result = await patchReservation(req);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

ReservationService.delete('/:id', verify('all'), async (req, res, next) => {
  try {
    const result = await deleteReservation(req);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default ReservationService;
