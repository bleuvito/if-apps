import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listAnnouncementHistory(args) {
  const {
    params: { id },
  } = args;

  try {
    const announcementHistory = await prisma.announcementHeader.findMany({
      select: {
        bodies: {
          select: {
            id: true,
            createdAt: true,
            snippet: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
      where: {
        id,
      },
    });

    const payload = announcementHistory;

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { listAnnouncementHistory };
