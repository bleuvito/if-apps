import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deleteAppointment(args) {
  const {
    locals: { user },
    params: { id },
  } = args;

  console.log(id);

  try {
    const appointment = await prisma.appointment.findFirst({
      where: {
        AND: [{ id }, { organizerId: user.id }],
      },
    });

    if (!appointment) {
      throw Error('E_UNAUTHORIZED');
    }

    const deletedAppointment = await prisma.appointment.delete({
      where: {
        id,
      },
    });

    const payload = deletedAppointment;

    return payload;
  } catch (error) {
    console.error('Error deleting announcement: ', error);
  }
}

export { deleteAppointment };
