import express from 'express';

import { verify } from '../models/authentication.js';
import { listUserAgenda } from '../models/user-agenda.list.js';
import { listInvitee } from '../models/user-invitee.list.js';
import { createUser } from '../models/user.create.js';
import { listUser } from '../models/user.list.js';

const UserService = express.Router();

UserService.post('/', verify(['ADMIN', 'KAJUR']), async (req, res, next) => {
  try {
    const result = await createUser(req);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

UserService.get('/', verify(['ADMIN', 'KAJUR']), async (req, res, next) => {
  try {
    const result = await listUser(req);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

UserService.get('/invitee', verify('all'), async (req, res, next) => {
  try {
    const result = await listInvitee(req);
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
