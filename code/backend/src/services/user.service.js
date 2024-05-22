import express from 'express';

import { verify } from '../models/authentication.js';
import { listUserAgenda } from '../models/user-agenda.list.js';
import { listUser } from '../models/user.list.js';

const UserService = express.Router();

UserService.get('/', verify('all'), async (req, res, next) => {
  try {
    const result = await listUser(req);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

UserService.get('/:id/agenda', verify('all'), async (req, res, next) => {
  try {
    const result = await listUserAgenda(req);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default UserService;
