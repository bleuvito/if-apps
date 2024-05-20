import cors from 'cors';
import 'dotenv/config';
import express from 'express';

import AnnouncementService from './services/announcement.service.js';
import AppointmentService from './services/appointment.service.js';
import AuthenticationService from './services/authentication.service.js';
import RoomService from './services/room.service.js';
import ScheduleService from './services/schedule.service.js';
import TagService from './services/tag.service.js';
import UserService from './services/user.service.js';

import { createResponse } from './utils/createResponse.js';

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors());

app.use('/api/v1/authenticate', AuthenticationService);
app.use('/api/v1/user', UserService);
app.use('/api/v1/announcement', AnnouncementService);
app.use('/api/v1/tag', TagService);
app.use('/api/v1/appointment', AppointmentService);
app.use('/api/v1/schedule', ScheduleService);
app.use('/api/v1/room', RoomService);

app.use((err, req, res, next) => {
  console.error(err);
  if (err.message === 'Invalid credentials') {
    res.status(401).json(createResponse(401, err.message));
  } else {
    res
      .status(err.status || 500)
      .json(createResponse(err.status || 500, 'Internal server error'));
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
