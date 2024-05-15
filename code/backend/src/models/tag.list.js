import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listTag() {
  try {
    const tags = await prisma.announcementTag.findMany({
      select: {
        id: true,
        name: true,
      },
      where: {
        isDeleted: false,
      },
    });

    const payload = tags;

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { listTag };
