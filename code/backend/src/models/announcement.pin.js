import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function pinAnnouncement(args) {
  const { params: requestParams, body: requestBody } = args;

  try {
    const updatedAnnouncement = await prisma.announcementHeader.update({
      where: {
        id: requestParams.id,
      },
      data: {
        isPinned: requestBody.isPinned,
      },
    });

    const payload = updatedAnnouncement;

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { pinAnnouncement };
