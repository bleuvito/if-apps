import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listUser() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    const payload = users;

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { listUser };
