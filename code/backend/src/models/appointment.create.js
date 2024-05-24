import { PrismaClient } from '@prisma/client';
import { createEvent } from '../utils/googleCalendarApi.js';
import { checkUserOverlapAgenda, getRefreshToken } from '../utils/helpers.js';

const prisma = new PrismaClient();

async function createAppointment(args) {
  const {
    locals: { user, clientType },
    body: requestBody,
  } = args;

  const refreshToken = await getRefreshToken(clientType, user.id);

  try {
    const appointmentDay = new Date(requestBody.start)
      .toLocaleString('id-ID', { weekday: 'long' })
      .toUpperCase();

    await checkUserOverlapAgenda(
      user.id,
      null,
      requestBody.start,
      requestBody.end,
      appointmentDay
    );

    await checkUserOverlapAgenda(
      requestBody.participant.id,
      null,
      requestBody.start,
      requestBody.end,
      appointmentDay
    );

    const { email: participantEmail } = await prisma.user.findFirst({
      select: {
        email: true,
      },
      where: {
        id: {
          equals: requestBody.participant.id,
        },
      },
    });

    if (!participantEmail) {
      throw new Error('E_INVALID_VALUE');
    }

    const event = {
      summary: requestBody.topic,
      start: {
        dateTime: new Date(requestBody.start),
        timeZone: 'Asia/Jakarta',
      },
      end: {
        dateTime: new Date(requestBody.end),
        timeZone: 'Asia/Jakarta',
      },
      attendees: [{ email: participantEmail, responseStatus: 'needsAction' }],
      sendUpdates: 'all',
      location: requestBody.place,
    };

    if (requestBody.link.length > 0) {
      event.description = `<a href='${requestBody.link}'>${requestBody.link}</a>`;
    }

    const googleEvent = await createEvent(clientType, refreshToken, event);

    const result = await prisma.appointment.create({
      data: {
        gCalendarId: googleEvent.id,
        topic: requestBody.topic,
        date: requestBody.date,
        start: requestBody.start,
        end: requestBody.end,
        place: requestBody.place,
        link: requestBody.link,
        organizer: {
          connect: {
            id: user.id,
          },
        },
        participant: {
          connect: {
            id: requestBody.participant.id,
          },
        },
      },
    });

    const payload = result;

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { createAppointment };
