import { PrismaClient } from '@prisma/client';
import { createEvent } from '../utils/googleCalendarApi.js';
import { checkOverlap, getRefreshToken } from '../utils/helpers.js';

const prisma = new PrismaClient();

async function createSchedule(args) {
  const {
    locals: { user, clientType },
    body: requestBody,
  } = args;

  const refreshToken = await getRefreshToken(clientType, user.id);

  try {
    await checkOverlap(
      user.Id,
      null,
      requestBody.start,
      requestBody.end,
      requestBody.day
    );

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
    };

    if (requestBody.isRecurring) {
      event.recurrence = ['RRULE:FREQ=WEEKLY'];
    }

    const gCalendarEvent = await createEvent(clientType, refreshToken, event);

    const schedule = await prisma.lecturerSchedule.create({
      data: {
        ...requestBody,
        gCalendarId: gCalendarEvent.id,
        lecturer: {
          connect: {
            id: user.id,
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

export { createSchedule };
