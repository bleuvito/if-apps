import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getRoom(args) {
  const { params: requestParams } = args;

  try {
    const room = await prisma.room.findFirst({
      where: {
        id: requestParams.id,
      },
    });

    const payload = room;

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { getRoom };
