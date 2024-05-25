import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deleteRoom(args) {
  const { params: requestParams } = args;

  try {
    const room = await prisma.room.findFirst({
      where: {
        id: requestParams.id,
      },
    });

    if (!room) {
      throw Error('E_NOT_EXIST');
    }

    const deletedRoom = await prisma.room.delete({
      where: {
        id: requestParams.id,
      },
    });

    const payload = deletedRoom;

    return payload;
  } catch (error) {
    console.error('Error deleting room: ', error);
  }
}

export { deleteRoom };
