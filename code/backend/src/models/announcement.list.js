import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listAnnouncement(args) {
  const { query: requestQuery } = args;

  try {
    const tagIds = requestQuery.tags?.map((tag) => tag.id);
    const where = {
      subject: {
        contains: requestQuery.subject,
        mode: 'insensitive',
      },
    };
    if (tagIds) {
      where.tags = {
        some: {
          id: {
            in: tagIds,
          },
        },
      };
    }

    const announcements = await prisma.announcementHeader.findMany({
      select: {
        id: true,
        isPinned: true,
        subject: true,
        updatedAt: true,
        bodies: {
          select: {
            author: { select: { name: true } },
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
      },
      where,
      orderBy: [{ isPinned: 'desc' }, { updatedAt: 'desc' }],
    });

    const payload = announcements;
    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { listAnnouncement };
