import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listReservation(args) {
  const {
    locals: { user },
    query: requestQuery,
    params: requestParams,
  } = args;

  try {
    const reservations = await prisma.roomReservation.findMany({
      where: {
        roomId: requestParams.roomId,
        reserveeId: user.id,
      },
      select: {
        id: true,
        title: true,
        type: true,
        start: true,
        end: true,
        room: {
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
