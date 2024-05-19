import { PrismaClient } from '@prisma/client';
import { getRefreshToken } from '../utils/helpers.js';

const prisma = new PrismaClient();

async function listSchedule(args) {
  const {
    locals: { user, clientType },
    body: requestBody,
  } = args;

  // const refreshToken = await getRefreshToken(clientType, user.id);

  try {
    const schedules = await prisma.lecturerSchedule.findMany({
      where: {
        OR: [
          {
            lecturerId: user.id,
            AND: [
              {
                start: {
                  lte: requestBody.end,
                },
              },
              {
                end: {
                  gte: requestBody.start,
                },
              },
            ],
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
