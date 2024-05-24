import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createTag(args) {
  try {
    const {
      locals: { user },
      body: requestBody,
    } = args;

    const tag = await prisma.announcementTag.create({
      data: {
        ...requestBody,
        author: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    const payload = tag;
    return payload;
  } catch (error) {
    throw new Error('Tag already exist', { type: 'E_EXIST' });
  }
}

export { createTag };
