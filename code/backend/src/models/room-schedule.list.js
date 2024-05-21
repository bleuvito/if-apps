import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listRoomSchedule(args) {
  const { query: requestQuery, params: requestParams } = args;

  try {
    const schedules = await prisma.roomSchedule.findMany({
      where: {
        roomId: requestParams.roomId,
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

export { listRoomSchedule };
