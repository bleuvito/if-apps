import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deleteReservation(args) {
  const { params: requestParams } = args;

  try {
    const reservation = await prisma.roomReservation.findFirst({
      where: {
        id: requestParams.id,
      },
    });

    if (!reservation) {
      throw Error('E_NOT_EXIST');
    }

    const deletedReservation = await prisma.roomReservation.delete({
      where: {
        id: requestParams.id,
      },
    });

    const payload = deletedReservation;

    return payload;
  } catch (error) {
    console.error('Error deleting room: ', error);
  }
}

export { deleteReservation };
