import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deleteRoomSchedule(args) {
  const { params: requestParams } = args;

  // console.log(requestParams.sheduleId);

  try {
    const roomSchedule = await prisma.roomSchedule.findFirst({
      where: {
        id: requestParams.sheduleId,
      },
    });

    // console.log(roomSchedule);

    if (!roomSchedule) {
      throw Error('E_NOT_EXIST');
    }

    const deletedRoom = await prisma.roomSchedule.delete({
      where: {
        id: requestParams.sheduleId,
      },
    });

    const payload = deletedRoom;

    return payload;
  } catch (error) {
    console.error('Error deleting room: ', error);
  }
}

export { deleteRoomSchedule };
