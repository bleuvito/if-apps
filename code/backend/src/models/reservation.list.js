import { PrismaClient } from '@prisma/client';
import { generateReservationWhere } from '../utils/helpers.js';

const prisma = new PrismaClient();

async function listReservation(args) {
  const {
    locals: { user },
    query: requestQuery,
    params: requestParams,
  } = args;

  // console.log(requestQuery);

  const where = generateReservationWhere(
    requestParams.roomId,
    requestQuery.search,
    requestQuery.status || ['PENDING', 'ACCEPTED', 'DECLINED', 'RESCHEDULE'],
    user
  );

  try {
    const reservations = await prisma.roomReservation.findMany({
      where,
      select: {
        id: true,
        status: true,
        title: true,
        type: true,
        start: true,
        end: true,
        room: {
          select: {
            name: true,
          },
        },
        reservee: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    const payload = reservations;

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { listReservation };
