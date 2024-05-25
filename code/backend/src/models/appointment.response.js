import { PrismaClient } from '@prisma/client';
import { putEvent } from '../utils/googleCalendarApi.js';
import { checkUserOverlapAgenda, getRefreshToken } from '../utils/helpers.js';

const prisma = new PrismaClient();

async function responseAppointment(args) {
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
        start: true,
        end: true,
        gCalendarId: true,
        organizer: {
          select: {
            id: true,
            email: true,
          },
        },
        participant: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    if (requestBody.status === 'ACCEPTED') {
      const appointmentDay = new Date(requestBody.start)
        .toLocaleString('id-ID', { weekday: 'long' })
        .toUpperCase();

      await checkUserOverlapAgenda(
        appointment.organizer.id,
        null,
        appointment.start,
        appointment.end,
        appointmentDay
      );
      await checkUserOverlapAgenda(
        appointment.participant.id,
        null,
        appointment.start,
        appointment.end,
        appointmentDay
      );
    }

    const event = {
      attendees: [
        {
          email: appointment.participant.email,
          responseStatus:
            requestBody.status === 'PENDING'
              ? 'needsAction'
              : requestBody.status.toLowerCase(),
        },
      ],
      sendUpdates: 'all',
    };
    if (requestBody.topic) {
      event.summary = requestBody.topic;
    }
    if (requestBody.start) {
      event.start = {
        dateTime: new Date(requestBody.start),
        timeZone: 'Asia/Jakarta',
      };
    }
    if (requestBody.end) {
      event.end = {
        dateTime: new Date(requestBody.end),
        timeZone: 'Asia/Jakarta',
      };
    }

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
            id: appointment.organizer.id,
          },
        },
        participant: {
          connect: {
            id: appointment.participant.id,
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

export { responseAppointment };
