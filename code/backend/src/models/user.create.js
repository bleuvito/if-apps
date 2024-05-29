import { PrismaClient } from '@prisma/client';
import { validateUsers } from '../utils/helpers.js';

const prisma = new PrismaClient();

async function createUser(args) {
  const { body: requestBody } = args;

  try {
    const [passedUsers, errorUsers] = await validateUsers(requestBody.users);
    console.log(errorUsers);

    const users = await prisma.user.createMany({
      data: passedUsers,
    });

    const payload = { error: errorUsers };

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { createUser };
