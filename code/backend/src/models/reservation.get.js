import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getReservasion(args) {
  const { params: requestParams } = args;

  try {
    const reservasion = await prisma.roomReservation.findFirst({
      where: {
        id: requestParams.id,
      },
      select: {
        status: true,
        title: true,
        start: true,
        end: true,
        room: true,
        reserveeId: true,
      },
    });

    if (!reservasion) {
      throw Error('E_NOT_EXIST');
    }

    const payload = reservasion;

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { getReservasion };
