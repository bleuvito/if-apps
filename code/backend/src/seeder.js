import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  try {
    await prisma.role.createMany({
      data: [
        { name: 'MAHASISWA' },
        { name: 'DOSEN' },
        { name: 'KALAB' },
        { name: 'KAPRODI' },
        { name: 'ADMIN' },
      ],
    });

    const users = [
      {
        email: 'vitofev15202@gmail.com',
        role: {
          connect: {
            name: 'ADMIN',
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
            name: 'MAHASISWA',
          },
        },
      },
    ];

    users.map(async (user) => {
      await prisma.user.create({ data: user });
    });

    await prisma.announcementTag.create({
      data: {
        name: 'Labkom',
        author: { connect: { email: 'vitofev15202@gmail.com' } },
      },
    });
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

seed();

console.log('DONE SEEDING');
