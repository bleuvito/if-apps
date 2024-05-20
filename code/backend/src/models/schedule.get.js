import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getSchedule(args) {
  const {
    params: { id },
    locals: { user },
  } = args;

  try {
    const schedule = await prisma.lecturerSchedule.findFirst({
      where: {
        id,
      },
      select: {
        lecturerId: true,
        title: true,
        type: true,
        isRecurring: true,
        start: true,
        end: true,
      },
    });

    if (
      schedule.lecturerId !== user.id &&
      (user.role !== 'ADMIN' ||
        user.role !== 'KAJUR' ||
        user.role !== 'KAPRODI')
    ) {
      throw Error('E_UNAUTHORIZED');
    }

    const payload = schedule;

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { getSchedule };
