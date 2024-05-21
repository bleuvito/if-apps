import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deleteRoomSchedule(args) {
  const { params: requestParams } = args;

  try {
    const roomSchedule = await prisma.roomSchedule.findFirst({
      where: {
        id: requestParams.scheduleId,
      },
    });

    if (!roomSchedule) {
      throw Error('E_NOT_EXIST');
    }

    const deletedRoom = await prisma.room.delete({
      where: {
        id: requestParams.scheduleId,
      },
    });

    const payload = deletedRoom;

    return payload;
  } catch (error) {
    console.error('Error deleting room: ', error);
  }
}

export { deleteRoomSchedule };
