import { PrismaClient } from '@prisma/client';
import { createEvent } from '../utils/googleCalendarApi.js';
import { getRefreshToken } from '../utils/helpers.js';

const prisma = new PrismaClient();

async function createSchedule(args) {
  const {
    locals: { user, clientType },
    body: requestBody,
  } = args;

  const refreshToken = await getRefreshToken(clientType, user.id);

  try {
    const event = {
      summary: requestBody.title,
      start: {
        dateTime: new Date(requestBody.start),
        timeZone: 'Asia/Jakarta',
      },
      end: {
        dateTime: new Date(requestBody.end),
        timeZone: 'Asia/Jakarta',
      },
      recurrence: ['RRULE:FREQ=WEEKLY'],
    };

    const gCalendarEvent = await createEvent(clientType, refreshToken, event);

    const schedule = await prisma.lecturerSchedule.create({
      data: {
        ...requestBody,
        lecturer: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    console.log(gCalendarEvent);
    console.log(schedule);

    const payload = schedule;

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { createSchedule };
