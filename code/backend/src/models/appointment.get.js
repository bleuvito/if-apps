import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getAppointment(args) {
  const {
    params: { id },
    locals: { user },
  } = args;

  // console.log(id);

  try {
    const appointment = await prisma.appointment.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        gCalendarId: true,
        topic: true,
        start: true,
        end: true,
        place: true,
        link: true,
        status: true,
        type: true,
        declineReason: true,
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
      },
    });

    // console.log(appointment);

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
