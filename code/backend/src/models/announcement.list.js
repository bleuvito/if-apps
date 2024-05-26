import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listAnnouncement(args) {
  const { query: requestQuery, params: requestParams } = args;

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
      where,
      orderBy: [{ isPinned: 'desc' }, { updatedAt: 'desc' }],
    });

    console.log(announcements);

    const payload = announcements;
    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { listAnnouncement };
