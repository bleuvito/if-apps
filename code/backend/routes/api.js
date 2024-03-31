import express from 'express';
import AuthRouter from './authentication.route.js';
import CalendarRouter from './calendar.js';
import EmailRouter from './email.js';
import { createDummyUser } from '../models/prisma.js';

const router = express.Router();

router.use('/auth', AuthRouter);
router.use('/calendar', CalendarRouter);
router.use('/email', EmailRouter);
router.use('/init-user', (req, res) => {
    try {
        createDummyUser();
        res.json('init-successful');
    } catch (e) {
        res.send('Init unsuccessful');
    }
});

export default router;