import { PrismaClient } from '@prisma/client';
import { getRefreshToken } from '../utils/helpers.js';

const prisma = new PrismaClient();

async function createAppointment(args) {
  const {
    locals: { user, clientType },
    body: requestBody,
  } = args;

  const refreshToken = await getRefreshToken(clientType, user.id);

  try {
    const result = await prisma.appointment.create({
      data: {
        topic: requestBody.topic,
        date: requestBody.date,
        startTime: requestBody.startTime,
        endTime: requestBody.endTime,
        organizer: {
          connect: {
            id: user.id,
          },
        },
        participant: {
          connect: {
            id: requestBody.selectedParticipant.id,
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
