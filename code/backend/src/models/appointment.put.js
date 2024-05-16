import { PrismaClient } from '@prisma/client';
import { putEvent } from '../utils/googleCalendarApi.js';
import { getRefreshToken } from '../utils/helpers.js';

const prisma = new PrismaClient();

async function putAnnouncement(args) {
  const {
    locals: { user, clientType },
    params: { id },
    body: requestBody,
  } = args;

  const refreshToken = await getRefreshToken(clientType, user.id);

  try {
    const appointment = await prisma.appointment.findFirst({
      where: {
        id,
      },
      select: {
        gCalendarId: true,
        participant: {
          select: {
            email: true,
          },
        },
      },
    });

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
      attendees: [
        { email: appointment.participant.email, responseStatus: 'needsAction' },
      ],
      sendUpdates: 'all',
    };

    const updatedGCalendarEvent = await putEvent(
      clientType,
      refreshToken,
      appointment.gCalendarId,
      event
    );

    const updatedAppointment = await prisma.appointment.update({
      where: {
        id,
      },
      data: {
        ...requestBody,
        organizer: {
          connect: {
            id: requestBody.organizer.id,
          },
        },
        participant: {
          connect: {
            id: requestBody.participant.id,
          },
        },
        updatedAt: new Date(),
      },
    });

    const payload = updatedAppointment;

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { putAnnouncement };
