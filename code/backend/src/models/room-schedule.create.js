import { PrismaClient } from '@prisma/client';

import { checkRoomOverlapAgenda } from '../utils/helpers.js';

const prisma = new PrismaClient();

async function createRoomSchedule(args) {
  const { body: requestBody, params: requestParams } = args;

  try {
    await checkRoomOverlapAgenda(
      requestParams.roomId,
      null,
      requestBody.start,
      requestBody.end,
      requestBody.day
    );

    const schedule = await prisma.roomSchedule.create({
      data: {
        ...requestBody,
        room: {
          connect: {
            id: requestParams.roomId,
          },
        },
      },
    });

    const payload = schedule;

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { createRoomSchedule };
