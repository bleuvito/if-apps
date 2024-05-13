import express from 'express';
import { authenticate } from '../models/authentication.js';
import { createResponse } from '../utils/createResponse.js';

const AuthenticationService = express.Router();

AuthenticationService.post('/', async (req, res, next) => {
  try {
    const result = await authenticate(req.body);
    res.json(
      createResponse(undefined, 'User authentication successful', result)
    );
  } catch (error) {
    next(error);
  }
});

export default AuthenticationService;
