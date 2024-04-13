import express from 'express';
import { authenticate } from '../model/authentication.js';

const AuthenticationService = express.Router();

AuthenticationService.post('/', async (req, res, next) => {
  try {
    console.log('/api/v1/authenticate is HIT');
    const result = await authenticate(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default AuthenticationService;
