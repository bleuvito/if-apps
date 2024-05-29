import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getAnnouncement(args) {
  const {
    params: { id },
  } = args;

  try {
    const announcement = await prisma.announcementHeader.findFirst({
      select: {
        isPinned: true,
        recipient: true,
        subject: true,
        bodies: {
          select: {
            createdAt: true,
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
        tags: {
          select: {
            id: true,
            name: true,
          },
        },
        author: {
          select: {
            name: true,
            id: true,
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
