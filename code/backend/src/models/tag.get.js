import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getTag(args) {
  const { params: requestParams } = args;

  try {
    const tag = await prisma.announcementTag.findFirst({
      select: {
        id: true,
        name: true,
        authorId: true,
      },
      where: {
        id: requestParams.id,
      },
    });

    const payload = tag;

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { getTag };
