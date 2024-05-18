import express from 'express';

import { createAppointment } from '../models/appointment.create.js';
import { deleteAppointment } from '../models/appointment.delete.js';
import { getAppointment } from '../models/appointment.get.js';
import { listAppointment } from '../models/appointment.list.js';
import { putAnnouncement } from '../models/appointment.put.js';
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

AppointmentService.get('/:id', verify('all'), async (req, res, next) => {
  try {
    const result = await getAppointment(req);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

AppointmentService.put('/:id', verify('all'), async (req, res, next) => {
  try {
    const result = await putAnnouncement(req);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

AppointmentService.delete('/:id', verify('all'), async (req, res, next) => {
  try {
    const result = await deleteAppointment(req);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default AppointmentService;
