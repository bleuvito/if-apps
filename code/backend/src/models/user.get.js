import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getUser(args) {
  const { params: requestParams } = args;

  try {
    const user = await prisma.user.findFirst({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
      where: {
        id: requestParams.id,
      },
    });

    if (!user) {
      throw Error('E_NOT_EXIST');
    }

    const payload = user;

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { getUser };
