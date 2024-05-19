import { PrismaClient } from '@prisma/client';
import { createEvent } from '../utils/googleCalendarApi.js';
import { getRefreshToken } from '../utils/helpers.js';

const prisma = new PrismaClient();

function convertToIntTime(inputDate) {
  const date = new Date(inputDate);
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');

  return parseInt(`${hour}${minute}`);
}

async function createSchedule(args) {
  const {
    locals: { user, clientType },
    body: requestBody,
  } = args;

  const refreshToken = await getRefreshToken(clientType, user.id);

  try {
    const oneTimeSchedules = await prisma.lecturerSchedule.findMany({
      where: {
        lecturerId: user.id,
        isRecurring: false,
        start: {
          lte: requestBody.end,
        },
        end: {
          gte: requestBody.start,
        },
      },
      select: {
        id: true,
        start: true,
        end: true,
      },
    });

    if (oneTimeSchedules.length > 0) {
      throw Error('E_OVERLAP_SCHEDULE');
    }

    const recurringSchedules = await prisma.lecturerSchedule.findMany({
      where: {
        lecturerId: user.id,
        isRecurring: true,
        day: requestBody.day,
      },
      select: {
        id: true,
        start: true,
        end: true,
      },
    });

    const reqStart = convertToIntTime(requestBody.start);
    const reqEnd = convertToIntTime(requestBody.end);
    const overlapRecurringSchedules = recurringSchedules.filter((schedule) => {
      const scheduleStartTime = convertToIntTime(schedule.start);
      const scheduleEndTime = convertToIntTime(schedule.end);

      return scheduleStartTime <= reqEnd && scheduleEndTime >= reqStart;
    });

    if (overlapRecurringSchedules.length > 0) {
      throw Error('E_OVERLAP_SCHEDULE');
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        OR: [
          {
            organizerId: user.id,
          },
          {
            participantId: user.id,
          },
        ],
        status: 'ACCEPTED',
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
      select: {
        id: true,
      },
    });

    if (appointments.length > 0) {
      throw Error('E_OVERLAP_APPOINTMENT');
    }

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
