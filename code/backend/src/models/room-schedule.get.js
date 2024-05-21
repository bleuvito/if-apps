import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getRoomSchedule(args) {
  const { params: requestParams } = args;

  try {
    const roomSchedule = await prisma.roomSchedule.findFirst({
      where: {
        id: requestParams.sheduleId,
      },
      select: {
        roomId: true,
        title: true,
        type: true,
        isRecurring: true,
        start: true,
        end: true,
      },
    });

    if (!roomSchedule) {
      throw Error('E_NOT_EXIST');
    }

    const payload = roomSchedule;

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { getRoomSchedule };
