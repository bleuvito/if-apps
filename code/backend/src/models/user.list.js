import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listUser(args) {
  const {
    locals: { user },
  } = args;

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
      },
      where: {
        id: {
          not: user.id,
        },
        role:
          user.role === 'MAHASISWA'
            ? {
                not: 'MAHASISWA',
              }
            : {
                equals: 'MAHASISWA',
              },
      },
    });

    const payload = users;

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { listUser };
