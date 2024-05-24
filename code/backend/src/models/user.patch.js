import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function patchUser(args) {
  const { params: requestParams, body: requestBody } = args;

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: requestParams.id,
      },
    });

    if (!user) {
      throw Error('E_NOT_EXIST');
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: requestParams.id,
      },
      data: {
        name: requestBody.name,
        email: requestBody.email,
        role: requestBody.role,
      },
    });

    const payload = updatedUser;

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { patchUser };
