import express from 'express';
import { createAppointment } from '../models/appointment.create.js';
import { listAppointment } from '../models/appointment.list.js';
import { verify } from '../models/authentication.js';

const AppointmentService = express.Router();

AppointmentService.post('/', verify('all'), async (req, res, next) => {
  try {
    const result = await createAppointment(req);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

AppointmentService.get('/', verify('all'), async (req, res, next) => {
  try {
    const result = await listAppointment(req);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default AppointmentService;
