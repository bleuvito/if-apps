import express from 'express';
import * as CalendarController from '../controllers/calendar.js';

const router = express.Router();

router.get('/', CalendarController.list);
router.post('/', CalendarController.insert);
router.get('/:id', CalendarController.get);
router.patch('/:id', CalendarController.patch);
router.delete('/:id', CalendarController.destroy);

export default router;