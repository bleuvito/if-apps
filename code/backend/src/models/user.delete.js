import { PrismaClient } from '@prisma/client';
import { validateUsers } from '../utils/helpers.js';

const prisma = new PrismaClient();

async function deleteUser(args) {
  const { params: requestParams } = args;

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: requestParams.id,
      },
    });

    if (!user) {
      throw Error('E_UNAUTHORIZED');
    }

    const deletedUser = await prisma.user.delete({
      where: {
        id: requestParams.id,
      },
    });

    const payload = deletedUser;

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { deleteUser };
