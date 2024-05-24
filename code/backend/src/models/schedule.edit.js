import { PrismaClient } from '@prisma/client';
import { putEvent } from '../utils/googleCalendarApi.js';
import { checkUserOverlapAgenda, getRefreshToken } from '../utils/helpers.js';

const prisma = new PrismaClient();

async function patchSchedule(args) {
  const {
    locals: { user, clientType },
    body: requestBody,
    params: requestParams,
  } = args;

  try {
    const schedule = await prisma.lecturerSchedule.findFirst({
      where: {
        id: requestParams.id,
        lecturerId: user.id,
      },
    });

    if (!schedule) {
      throw Error('E_NOT_EXIST');
    }
    if (schedule.lecturerId !== user.id && user.role !== 'ADMIN') {
      throw Error('E_UNAUTHORIZED');
    }

    await checkUserOverlapAgenda(
      requestBody.lecturerId,
      schedule.id,
      requestBody.start,
      requestBody.end,
      requestBody.day
    );

    const updatedSchedule = await prisma.lecturerSchedule.update({
      where: {
        id: requestParams.id,
      },
      data: {
        ...requestBody,
        updatedAt: new Date(),
      },
    });

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

    const refreshToken = await getRefreshToken(clientType, user.id);
    const gCalendarEvent = await putEvent(
      clientType,
      refreshToken,
      schedule.gCalendarId,
      event
    );

    const payload = updatedSchedule;

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { patchSchedule };
