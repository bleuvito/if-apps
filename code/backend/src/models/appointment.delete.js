import { PrismaClient } from '@prisma/client';
import { deleteEvent } from '../utils/googleCalendarApi.js';
import { getRefreshToken } from '../utils/helpers.js';

const prisma = new PrismaClient();

async function deleteAppointment(args) {
  const {
    locals: { user, clientType },
    params: { id },
  } = args;

  const refreshToken = await getRefreshToken(clientType, user.id);

  try {
    const appointment = await prisma.appointment.findFirst({
      where: {
        AND: [{ id }, { organizerId: user.id }],
      },
    });

    if (!appointment) {
      throw Error('E_UNAUTHORIZED');
    }

    const deleteAppointmentResponse = await deleteEvent(
      clientType,
      refreshToken,
      appointment.gCalendarId
    );

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
