import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deleteAnnouncement(args) {
  const {
    params: { id },
  } = args;

  try {
    const response = await prisma.announcementHeader.delete({
      where: { id },
    });

    const payload = response;

    return payload;
  } catch (error) {
    console.error('Error deleting announcement: ', error);
  }
}

export { deleteAnnouncement };
