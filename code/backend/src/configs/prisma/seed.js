import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.createMany({
    data: [
      { email: 'vitofev15202@gmail.com', name: 'VITO FEVRIER', role: 'ADMIN' },
      {
        email: '6182001033@student.unpar.ac.id',
        name: 'ALEXANDER BLEUVITO FEVRIER',
        role: 'KALAB',
      },
      {
        email: 'putrahharta@gmail.com',
        name: 'PUTRA HARTA',
        role: 'MAHASISWA',
      },
      { email: 'renasarinah@gmail.com', name: 'RENA SARINAH', role: 'DOSEN' },
    ],
  });

  const tags = await prisma.announcementTag.create({
    data: {
      name: 'Labkom',
      author: { connect: { email: '6182001033@student.unpar.ac.id' } },
    },
  });

  const rooms = await prisma.room.createMany({
    data: [
      {
        name: '9018',
        capacity: 40,
        description:
          'Tersedia proytektor, dua buah AC, dua buah whiteboard akrilik, dan AC.',
      },
      {
        name: '9017',
        capacity: 45,
        description:
          'Tersedia proyektor, dua buah AC, dua buah whiteboard akrilik, dan AC.',
      },
      {
        name: '9016',
        capacity: 35,
        description:
          'Tersedia proyektor, dua buah AC, dua buah whiteboard akrilik, dan AC.',
      },
      {
        name: '9015',
        capacity: 35,
        description:
          'Tersedia proyektor, dua buah AC, dua buah whiteboard akrilik, dan AC.',
      },
    ],
  });

  console.log({ users, tags, rooms });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
