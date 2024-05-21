import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listRoom(args) {
  const {
    locals: { user, clientType },
    body: requestBody,
    query: requestQuery,
  } = args;

  try {
    const rooms = await prisma.room.findMany();

    console.log(rooms);

    const payload = rooms;

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { listRoom };
