import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function generateWhere(type, user) {
  if (type === '') {
    return {
      OR: [
        {
          organizerId: {
            equals: user.id,
          },
        },
        {
          participantId: {
            equals: user.id,
          },
        },
      ],
    };
  }

  if (type === 'participant') {
    return {
      participantId: user.id,
    };
  }

  return {
    organizerId: user.id,
  };
}

async function listAppointment(args) {
  const {
    locals: { user },
    query: requestQuery,
  } = args;

  try {
    const appointsments = await prisma.appointment.findMany({
      where: generateWhere(requestQuery.type, user),
      select: {
        id: true,
        topic: true,
        date: true,
        startTime: true,
        endTime: true,
        organizer: {
          select: {
            name: true,
          },
        },
        participant: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createDate: 'desc',
      },
    });

    const payload = appointsments;

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { listAppointment };
