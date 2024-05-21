import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function patchRoom(args) {
  const { params: requestParams, body: requestBody } = args;

  try {
    const room = await prisma.room.findFirst({
      where: {
        id: requestParams.id,
      },
    });

    if (!room) {
      throw Error('E_NOT_EXIST');
    }

    const updatedRoom = await prisma.room.update({
      where: {
        id: requestParams.id,
      },
      data: {
        ...requestBody,
      },
    });

    const payload = updatedRoom;

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { patchRoom };
