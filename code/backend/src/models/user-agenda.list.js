import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listUserAgenda(args) {
  const { query: requestQuery, params: requestParams } = args;

  try {
    const schedules = await prisma.lecturerSchedule.findMany({
      where: {
        lecturerId: requestParams.id,
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

    const appointments = await prisma.appointment.findMany({
      where: {
        OR: [
          {
            organizerId: requestParams.id,
          },
          {
            participantId: requestParams.id,
          },
        ],
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
        status: 'ACCEPTED',
      },
      select: {
        id: true,
        type: true,
        start: true,
        end: true,
      },
    });

    const payload = [...schedules, ...appointments];

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { listUserAgenda };
