import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getAppointment(args) {
  const {
    params: { id },
    locals: { user },
  } = args;

  try {
    const appointment = await prisma.appointment.findFirst({
      where: {
        id,
      },
      select: {
        topic: true,
        status: true,
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
        start: true,
        end: true,
      },
    });

    if (
      appointment.organizer.id !== user.id &&
      appointment.participant.id !== user.id
    ) {
      throw Error('E_UNAUTHORIZED');
    }

    const payload = appointment;

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { getAppointment };
