import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listUser(args) {
  const { query: requestQuery } = args;

  const where = {
    name: {
      contains: requestQuery.name,
      mode: 'insensitive',
    },
  };
  if (requestQuery.role?.length > 0) {
    where.OR = requestQuery.role.map((role) => {
      role;
    });
  }

  console.log(where);

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
      where,
    });

    console.log(users);

    const payload = users;

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { listUser };
