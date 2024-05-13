import express from 'express';

import { resourcesettings } from 'googleapis/build/src/apis/resourcesettings/index.js';
import { getAnnouncementHistoryDetails } from '../models/announcement-history.get.js';
import { listAnnouncementHistory } from '../models/announcement-history.list.js';
import { createAnnouncement } from '../models/announcement.create.js';
import { deleteAnnouncement } from '../models/announcement.delete.js';
import { getAnnouncement } from '../models/announcement.get.js';
import { listAnnouncement } from '../models/announcement.list.js';
import { putAnnouncement } from '../models/announcement.put.js';
import { verify } from '../models/authentication.js';
import { createResponse } from '../utils/createResponse.js';
import { upload } from '../utils/helpers.js';

const AnnouncementService = express.Router();

AnnouncementService.post(
  '/',
  verify(['DOSEN', 'KALAB', 'KAPRODI', 'ADMIN']),
  upload.array('attachments'),
  async (req, res, next) => {
    try {
      const result = await createAnnouncement(req);
      res.json(
        createResponse(
          undefined,
          'Announcement created successfully',
          JSON.stringify(result)
        )
      );
    } catch (error) {
      next(error);
    }
  }
);

AnnouncementService.get('/:id', verify('all'), async (req, res, next) => {
  try {
    const result = await getAnnouncement(req);
    res.json(createResponse(undefined, 'Announcement get successful', result));
  } catch (error) {
    next(error);
  }
});

AnnouncementService.get('/', verify('all'), async (req, res, next) => {
  try {
    const result = await listAnnouncement();
    res.json(
      createResponse(
        undefined,
        'Announcement listed successfully',
        JSON.stringify(result)
      )
    );
  } catch (error) {
    next(error);
  }
});

AnnouncementService.put(
  '/:id',
  verify(['DOSEN', 'KALAB', 'KAPRODI', 'ADMIN']),
  upload.array('attachments'),
  async (req, res, next) => {
    try {
      console.log('PUT IS HIT');
      const result = await putAnnouncement(req);
      res.json(
        createResponse(
          undefined,
          'Announcement edited successfully',
          JSON.stringify(result)
        )
      );
    } catch (error) {
      next(error);
    }
  }
);

AnnouncementService.delete(
  '/:id',
  verify(['DOSEN', 'KALAB', 'KAPRODI', 'ADMIN']),
  async (req, res, next) => {
    try {
      const result = await deleteAnnouncement(req);
      res.json(
        createResponse(undefined, 'Announcement deleted successfully', result)
      );
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
      res.json(
        createResponse(undefined, 'Announcement history get successful', result)
      );
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
      res.json(
        createResponse(
          undefined,
          'Announcement history listed successfully',
          result
        )
      );
    } catch (error) {
      next(error);
    }
  }
);

export default AnnouncementService;
