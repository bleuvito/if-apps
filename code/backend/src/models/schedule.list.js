import { PrismaClient } from '@prisma/client';
import { getRefreshToken } from '../utils/helpers.js';

const prisma = new PrismaClient();

async function listSchedule(args) {
  const {
    locals: { user, clientType },
    body: requestBody,
    query: requestQuery,
  } = args;

  try {
    const schedules = await prisma.lecturerSchedule.findMany({
      where: {
        lecturerId: user.id,
        OR: [
          {
            AND: [
              {
                start: {
                  lte: new Date(requestQuery.end),
                },
              },
              {
                end: {
                  gte: new Date(requestQuery.start),
                },
              },
            ],
          },
          {
            isRecurring: true,
          },
        ],
      },
      select: {
        id: true,
        title: true,
        type: true,
        day: true,
        start: true,
        end: true,
        isRecurring: true,
      },
    });

    const payload = schedules;

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { listSchedule };
