import express from 'express';
import { verify } from '../models/authentication.js';
import { createTag } from '../models/tag.create.js';
import { listTag } from '../models/tag.list.js';
import { createResponse } from '../utils/createResponse.js';

const TagService = express.Router();

TagService.get('/', verify('all'), async (req, res, next) => {
  try {
    const result = await listTag(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

TagService.post(
  '/',
  verify(['DOSEN', 'KALAB', 'KAPRODI', 'KAJUR', 'ADMIN']),
  async (req, res, next) => {
    try {
      const result = await createTag(req);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

export default TagService;
