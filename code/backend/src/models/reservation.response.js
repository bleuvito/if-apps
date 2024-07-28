import { PrismaClient } from '@prisma/client';
import {
  checkRoomOverlapReservations,
  checkRoomOverlapSchedules,
} from '../utils/checkRoomOverlap.js';

const prisma = new PrismaClient();

async function responseReservation(args) {
  const {
    params: { id },
    body: requestBody,
  } = args;

  try {
    const reservation = await prisma.roomReservation.findFirst({
      where: {
        id,
      },
    });

    if (requestBody.status === 'ACCEPTED') {
      await checkRoomOverlapReservations(
        reservation.roomId,
        id,
        reservation.start,
        reservation.end
      );

      const reservationDay = new Date(reservation.start)
        .toLocaleString('id-ID', { weekday: 'long' })
        .toUpperCase();

      await checkRoomOverlapSchedules(
        reservation.roomId,
        null,
        reservation.start,
        reservation.end,
        reservationDay
      );
    }

    const updatedAppointment = await prisma.roomReservation.update({
      where: {
        id,
      },
      data: {
        status: requestBody.status,
        updatedAt: new Date(),
      },
    });

    const payload = updatedAppointment;

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { responseReservation };
