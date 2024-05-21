import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listRoomAgenda(args) {
  const { query: requestQuery, params: requestParams } = args;

  try {
    const schedules = await prisma.roomSchedule.findMany({
      where: {
        roomId: requestParams.id,
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
        type: true,
        day: true,
        start: true,
        end: true,
        isRecurring: true,
      },
    });

    const reservations = await prisma.roomReservation.findMany({
      where: {
        roomId: requestParams.id,
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
      select: {
        id: true,
        type: true,
        start: true,
        end: true,
      },
    });

    const payload = [...schedules, ...reservations];

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { listRoomAgenda };
