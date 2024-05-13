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
            createDate: true,
            snippet: true,
          },
          where: {
            isLatest: false,
          },
          orderBy: {
            createDate: 'desc',
          },
        },
      },
      where: {
        id,
      },
    });

    const payload = announcementHistory;
    // console.log(payload);

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { listAnnouncementHistory };
