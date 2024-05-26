import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function generateWhere(topic, type, filter, user) {
  const where = {
    topic: {
      contains: topic,
    },
  };

  let typeCondition = {
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

  if (type === 'participant') {
    typeCondition = {
      participantId: user.id,
    };
  } else if (type === 'organizer') {
    typeCondition = {
      organizerId: user.id,
    };
  }

  where.AND = [typeCondition];
  if (filter?.length > 0) {
    where.AND = [
      ...where.AND,
      {
        OR: filter.map((status) => {
          return { status };
        }),
      },
    ];
  }

  return where;
}

async function listAppointment(args) {
  const {
    locals: { user },
    query: requestQuery,
  } = args;

  try {
    const where = generateWhere(
      requestQuery.search,
      requestQuery.type,
      requestQuery.status,
      user
    );

    const appointments = await prisma.appointment.findMany({
      where,
      select: {
        id: true,
        status: true,
        topic: true,
        start: true,
        end: true,
        place: true,
        organizer: {
          select: {
            id: true,
            name: true,
          },
        },
        participant: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const payload = appointments;

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { listAppointment };
