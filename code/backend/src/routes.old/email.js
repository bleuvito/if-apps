import express from 'express';
import * as EmailController from '../controllers/email.js';

const router = express.Router();

router.get('/', EmailController.list);
router.post('/', EmailController.send);
router.get('/:id', EmailController.get);
router.patch('/:id', EmailController.patch);
router.delete('/:id', EmailController.destroy);

export default router;