import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  try {
    await prisma.role.createMany({
      data: [
        { name: 'MAHASISWA' },
        { name: 'DOSEN' },
        { name: 'KALAB' },
        { name: 'KAJUR' },
      ],
    });

    const users = [
      {
        email: 'vitofev15202@gmail.com',
        role: {
          connectOrCreate: {
            where: {
              name: 'MAHASISWA',
            },
            create: {
              name: 'MAHASISWA',
            },
          },
        },
      },
      {
        email: 'renasarinah@gmail.com',
        role: {
          connect: {
            name: 'DOSEN',
          },
        },
      },
      {
        email: '6182001033@student.unpar.ac.id',
        role: {
          connect: {
            name: 'KALAB',
          },
        },
      },
      {
        email: 'putrahharta@gmail.com',
        role: {
          connect: {
            name: 'KAJUR',
          },
        },
      },
    ];

    users.map(async (user) => {
      await prisma.user.create({ data: user });
    });
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

seed();

console.log('DONE SEEDING');
