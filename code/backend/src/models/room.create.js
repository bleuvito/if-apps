import { PrismaClient } from '@prisma/client';
import { createEvent } from '../utils/googleCalendarApi.js';
import { getRefreshToken } from '../utils/helpers.js';

const prisma = new PrismaClient();

async function createRoom(args) {
  const {
    locals: { user, clientType },
    body: requestBody,
  } = args;

  try {
    const room = await prisma.room.create({
      data: {
        ...requestBody,
      },
    });

    const payload = room;

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { createRoom };
