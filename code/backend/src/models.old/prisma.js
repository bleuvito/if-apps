import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createDummyUser() {
    try {
        await prisma.user.createMany({
            data: [
                {
                    email: 'vitofev15202@gmail.com',
                    role: 'ADMIN'
                },
                {
                    email: 'renasarinah@gmail.com',
                    role: 'DOSEN'
                },
                {
                    email: '6182001033@student.unpar.ac.id',
                    role: 'MAHASISWA'
                },
                {
                    email: 'putrahharta@gmail.com',
                    role: 'PENGURUS'
                },
            ]
        });
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

export { createDummyUser }