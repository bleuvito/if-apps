import express from 'express';
import * as AuthController from '../controllers/authentication.controller.js';

const router = express.Router();

router.post('/', AuthController.authenticate);

export default router;