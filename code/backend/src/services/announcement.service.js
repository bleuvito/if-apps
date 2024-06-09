import express from 'express';

import { getAnnouncementHistoryDetails } from '../models/announcement-history.get.js';
import { listAnnouncementHistory } from '../models/announcement-history.list.js';
import { createAnnouncement } from '../models/announcement.create.js';
import { deleteAnnouncement } from '../models/announcement.delete.js';
import { getAnnouncement } from '../models/announcement.get.js';
import { listAnnouncement } from '../models/announcement.list.js';
import { patchAnnouncement } from '../models/announcement.patch.js';
import { pinAnnouncement } from '../models/announcement.pin.js';
import { verify } from '../models/authentication.js';
import { upload } from '../utils/helpers.js';

const AnnouncementService = express.Router();

AnnouncementService.post(
  '/',
  verify(['DOSEN', 'KALAB', 'KAPRODI', 'KAJUR', 'ADMIN']),
  upload.array('attachments'),
  async (req, res, next) => {
    try {
      const result = await createAnnouncement(req);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

AnnouncementService.get('/:id', verify('all'), async (req, res, next) => {
  try {
    const result = await getAnnouncement(req);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

AnnouncementService.get('/', verify('all'), async (req, res, next) => {
  try {
    const result = await listAnnouncement(req);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

AnnouncementService.patch(
  '/:id',
  verify(['DOSEN', 'KALAB', 'KAPRODI', 'KAJUR', 'ADMIN']),
  upload.array('attachments'),
  async (req, res, next) => {
    console.log('PATCH IS HIT');
    try {
      const result = await patchAnnouncement(req);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

AnnouncementService.patch(
  '/:id/pin',
  verify(['DOSEN', 'KALAB', 'KAPRODI', 'KAJUR', 'ADMIN']),
  async (req, res, next) => {
    try {
      const result = await pinAnnouncement(req);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

AnnouncementService.delete(
  '/:id',
  verify(['DOSEN', 'KALAB', 'KAPRODI', 'KAJUR', 'ADMIN']),
  async (req, res, next) => {
    try {
      const result = await deleteAnnouncement(req);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

AnnouncementService.get(
  '/:id/history/:historyId',
  verify('all'),
  async (req, res, next) => {
    try {
      const result = await getAnnouncementHistoryDetails(req);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

AnnouncementService.get(
  '/:id/history',
  verify('all'),
  async (req, res, next) => {
    try {
      const result = await listAnnouncementHistory(req);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

export default AnnouncementService;
