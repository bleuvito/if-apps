import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listAnnouncement() {
  try {
    const announcements = await prisma.announcementHeader.findMany({
      select: {
        id: true,
        isPinned: true,
        subject: true,
        bodies: {
          select: {
            createdAt: true,
            snippet: true,
          },
          where: {
            isLatest: true,
          },
        },
        tags: {
          select: {
            name: true,
          },
        },
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: [{ isPinned: 'desc' }, { updatedAt: 'desc' }],
    });

    const payload = announcements;
    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { listAnnouncement };
