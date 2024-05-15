import { PrismaClient } from '@prisma/client';
import { createEvent } from '../utils/googleCalendarApi.js';
import { getRefreshToken } from '../utils/helpers.js';

const prisma = new PrismaClient();

async function createAppointment(args) {
  const {
    locals: { user, clientType },
    body: requestBody,
  } = args;

  const refreshToken = await getRefreshToken(clientType, user.id);

  try {
    const { email: participantEmail } = await prisma.user.findFirst({
      select: {
        email: true,
      },
      where: {
        id: {
          equals: user.id,
        },
      },
    });

    if (!participantEmail) {
      throw new Error('E_INVALID_VALUE');
    }

    const event = {
      summary: requestBody.topic,
      start: {
        dateTime: new Date(requestBody.startDateTime),
        timeZone: 'Asia/Jakarta',
      },
      end: {
        dateTime: new Date(requestBody.endDateTime),
        timeZone: 'Asia/Jakarta',
      },
      attendees: [{ email: participantEmail, responseStatus: 'accepted' }],
      sendUpdates: 'all',
    };

    const { data: googleEvent } = await createEvent(
      clientType,
      refreshToken,
      event
    );
    console.log('googleEvent: ', googleEvent);
    console.log('requestbody: ', requestBody);

    const result = await prisma.appointment.create({
      data: {
        gCalendarId: googleEvent.id,
        topic: requestBody.topic,
        date: requestBody.date,
        startDateTime: requestBody.startDateTime,
        endDateTime: requestBody.endDateTime,
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
