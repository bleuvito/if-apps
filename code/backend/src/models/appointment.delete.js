import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deleteAppointment(args) {
  const {
    locals: { user },
    params: { id },
  } = args;

  try {
    const appointment = await prisma.appointment.findFirst({
      where: {
        AND: [{ id }, { organizerId: user.id }],
      },
    });

    if (!appointment) {
      throw Error('E_UNAUTHORIZED');
    }

    const payload = { foo: 'bar' };

    return payload;
  } catch (error) {
    console.error('Error deleting announcement: ', error);
  }
}

export { deleteAppointment };
