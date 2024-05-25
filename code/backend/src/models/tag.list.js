import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listTag(args) {
  const { query: requestParams } = args;

  try {
    const tags = await prisma.announcementTag.findMany({
      select: {
        id: true,
        name: true,
        authorId: true,
      },
      where: {
        name: {
          contains: requestParams.name,
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    const payload = tags;

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { listTag };
