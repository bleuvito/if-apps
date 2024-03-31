import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function authenticate(email) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    console.log("user in authenticate function in authentication.js\n", user)

    return user;
  } catch (error) {
    console.log("[ERROR] authenticate function in authentication.js")
  } finally {
    await prisma.$disconnect();
  }
}