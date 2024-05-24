import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function patchTag(args) {
  const {
    locals: { user },
    params: requestParams,
    body: requestBody,
  } = args;

  // console.log(requestBody);

  try {
    const tag = await prisma.announcementTag.findFirst({
      where: {
        id: requestParams.id,
      },
    });

    if (!tag) {
      throw Error('E_NOT_EXIST');
    }
    if (
      tag.authorId !== user.id &&
      !['ADMIN', 'KAJUR', 'KAPRODI'].includes(user.role)
    ) {
      throw Error('E_UNAUTHORIZED');
    }

    const updatedTag = await prisma.announcementTag.update({
      where: {
        id: requestParams.id,
      },
      data: { ...requestBody, authorId: user.id, updatedAt: new Date() },
    });

    const payload = updatedTag;

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { patchTag };
