import { PrismaClient } from '@prisma/client';
import { getMessageMetadata, replyMessage } from '../utils/gmailApi.js';
import {
  generateAttachmentUrls,
  getRefreshToken,
  uploadAttachments,
} from '../utils/helpers.js';

const prisma = new PrismaClient();

async function putAnnouncement(args) {
  const {
    locals: { user },
    params: { id },
    body: requestBody,
  } = args;

  try {
    const payload = announcement;

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { putAnnouncement };
