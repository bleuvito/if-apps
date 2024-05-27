import { PrismaClient } from '@prisma/client';
import { putEvent } from '../utils/googleCalendarApi.js';
import { checkUserOverlapAgenda, getRefreshToken } from '../utils/helpers.js';

const prisma = new PrismaClient();

async function putAnnouncement(args) {
  const {
    locals: { user, clientType },
    params: { id },
    body: requestBody,
  } = args;

  console.log(requestBody.status);

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

    let status = requestBody.status;
    if (status === 'DECLINED') {
      status = 'RESCHEDULE';
    }

    const appointmentDay = new Date(requestBody.start)
      .toLocaleString('id-ID', { weekday: 'long' })
      .toUpperCase();

    await checkUserOverlapAgenda(
      user.id,
      appointment.id,
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

    const event = {
      attendees: [
        {
          email: appointment.participant.email,
          responseStatus:
            status === 'PENDING' || status === 'RESCHEDULE'
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
        status,
        organizer: {
          connect: {
            id: requestBody.organizer?.id,
          },
        },
        participant: {
          connect: {
            id: requestBody.participant?.id,
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
