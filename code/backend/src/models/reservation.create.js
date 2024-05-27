import { PrismaClient } from '@prisma/client';
import {
  checkRoomOverlapReservations,
  checkRoomOverlapSchedules,
} from '../utils/checkRoomOverlap.js';
import { createEvent } from '../utils/googleCalendarApi.js';
import { checkRoomOverlapAgenda, getRefreshToken } from '../utils/helpers.js';

const prisma = new PrismaClient();

async function createReservation(args) {
  const {
    locals: { user, clientType },
    body: requestBody,
  } = args;

  // console.log(requestBody);

  try {
    await checkRoomOverlapSchedules(
      requestBody.room.id,
      null,
      requestBody.start,
      requestBody.end,
      requestBody.day
    );

    await checkRoomOverlapReservations(
      requestBody.room.id,
      null,
      requestBody.start,
      requestBody.end,
      requestBody.day
    );

    delete requestBody.day;
    const reservation = await prisma.roomReservation.create({
      data: {
        ...requestBody,
        type: 'PINJAMRUANG',
        reservee: {
          connect: {
            id: user.id,
          },
        },
        room: {
          connect: {
            id: requestBody.room.id,
          },
        },
      },
    });

    // console.log(reservation);

    const payload = reservation;

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { createReservation };
