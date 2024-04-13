import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getUserByEmail(email) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        return user;
    } catch (error) {
        console.error(`Error getting user.`);
    } finally {
        await prisma.$disconnect();
    }
}

async function getUserById(id) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id
            },
        });

        console.log(user);

        return user;
    } catch (error) {
        console.error(`Error getting user.`);
    } finally {
        await prisma.$disconnect();
    }
}

async function putUserRefreshToken(email, refreshToken) {
    try {
        await prisma.user.update({
            where: {
                email: email,
            },
            data: {
                refreshToken: refreshToken,
            }
        });
    } catch (error) {
        console.error(`Error updating refresh token.`);
    } finally {
        await prisma.$disconnect();
    }
}

export { getUserByEmail, getUserById, putUserRefreshToken }