import express from 'express';

import { verify } from '../models/authentication.js';
import { createTag } from '../models/tag.create.js';
import { deleteTag } from '../models/tag.delete.js';
import { getTag } from '../models/tag.get.js';
import { listTag } from '../models/tag.list.js';
import { patchTag } from '../models/tag.patch.js';

const TagService = express.Router();

TagService.post(
  '/',
  verify(['ADMIN', 'KAJUR', 'KAPRODI', 'KALAB', 'DOSEN']),
  async (req, res, next) => {
    try {
      const result = await createTag(req);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

TagService.get('/', verify('all'), async (req, res, next) => {
  try {
    const result = await listTag(req);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

TagService.get('/:id', verify('all'), async (req, res, next) => {
  try {
    const result = await getTag(req);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

TagService.delete(
  '/:id',
  verify(['ADMIN', 'KAJUR', 'KAPRODI', 'KALAB', 'DOSEN']),
  async (req, res, next) => {
    try {
      const result = await deleteTag(req);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

TagService.patch(
  '/:id',
  verify(['ADMIN', 'KAJUR', 'KAPRODI', 'KALAB', 'DOSEN']),
  async (req, res, next) => {
    try {
      const result = await patchTag(req);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

export default TagService;
