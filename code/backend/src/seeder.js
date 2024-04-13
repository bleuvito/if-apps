import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createDummyUser() {
  try {
    await prisma.user.createMany({
      data: [
        {
          email: 'vitofev15202@gmail.com',
        },
        {
          email: 'renasarinah@gmail.com',
        },
        {
          email: '6182001033@student.unpar.ac.id',
        },
        {
          email: 'putrahharta@gmail.com',
        },
      ],
    });
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

createDummyUser();

console.log('DONE SEEDING');
