import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getAnnouncement(args) {
  const {
    params: { id },
  } = args;

  try {
    const announcement = await prisma.announcementHeader.findFirst({
      select: {
        subject: true,
        isPinned: true,
        tags: {
          select: {
            id: true,
            name: true,
          },
        },
        bodies: {
          select: {
            author: {
              select: {
                name: true,
                id: true,
              },
            },
            createdAt: true,
            recipient: true,
            body: true,
            attachments: {
              select: {
                gDriveId: true,
                name: true,
                size: true,
                webViewLink: true,
              },
            },
          },
          where: {
            isLatest: true,
          },
        },
      },
      where: {
        id,
      },
    });

    const payload = announcement;
    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { getAnnouncement };
