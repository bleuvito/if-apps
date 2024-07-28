import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listRoom(args) {
  const {
    locals: { user, clientType },
    body: requestBody,
    query: requestQuery,
  } = args;

  try {
    const rooms = await prisma.room.findMany({
      select: {
        id: true,
        name: true,
        capacity: true,
        description: true,
      },
      where: {
        name: {
          contains: requestQuery.name,
          mode: 'insensitive',
        },
      },
    });

    // console.log(requestQuery);
    // console.log(rooms);

    // console.log(rooms);

    const payload = rooms;

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { listRoom };
