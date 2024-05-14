import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.createMany({
    data: [
      { email: 'vitofev15202@gmail.com', role: 'ADMIN' },
      { email: '6182001033@student.unpar.ac.id', role: 'KALAB' },
      { email: 'putrahharta@gmail.com', role: 'MAHASISWA' },
      { email: 'renasarinah@gmail.com', role: 'DOSEN' },
    ],
  });

  const tags = await prisma.announcementTag.create({
    data: {
      name: 'Labkom',
      author: { connect: { email: '6182001033@student.unpar.ac.id' } },
    },
  });

  console.log({ users, tags });
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
