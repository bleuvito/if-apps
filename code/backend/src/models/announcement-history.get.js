import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getAnnouncementHistoryDetails(args) {
  const {
    params: { id, historyId },
  } = args;

  try {
    const announcementHistoryDetails =
      await prisma.announcementHeader.findFirst({
        select: {
          subject: true,
          bodies: {
            select: {
              author: {
                select: { name: true },
              },
              createdAt: true,
              body: true,
              attachments: true,
            },
            where: {
              id: historyId,
            },
          },
        },
        where: {
          id,
        },
      });

    const payload = announcementHistoryDetails;

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { getAnnouncementHistoryDetails };
