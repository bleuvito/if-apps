import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deleteTag(args) {
  const {
    params: requestParams,
    locals: { user },
  } = args;

  try {
    const tag = await prisma.announcementTag.findFirst({
      where: {
        id: requestParams.id,
      },
    });

    if (!tag) {
      throw Error('E_NOT_EXIST');
    }

    console.log(user.id);
    console.log(tag.authorId);
    console.log(!['ADMIN', 'KAJUR', 'KAPRODI'].includes(user.role));
    console.log(user.id !== tag.authorId);

    if (
      user.id !== tag.authorId &&
      !['ADMIN', 'KAJUR', 'KAPRODI'].includes(user.role)
    ) {
      throw Error('E_UNAUTHORIZED');
    }

    const deletedTag = await prisma.announcementTag.delete({
      where: {
        id: requestParams.id,
      },
      select: {
        id: true,
        name: true,
        authorId: true,
      },
    });

    const payload = deletedTag;

    return payload;
  } catch (error) {
    console.error('Error deleting room: ', error);
  }
}

export { deleteTag };
