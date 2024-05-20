import { PrismaClient } from '@prisma/client';
import { deleteEvent } from '../utils/googleCalendarApi.js';
import { getRefreshToken } from '../utils/helpers.js';

const prisma = new PrismaClient();

async function deleteSchedule(args) {
  const {
    locals: { user, clientType },
    params: { id },
  } = args;

  try {
    const schedule = await prisma.lecturerSchedule.findFirst({
      where: {
        id,
      },
    });

    if (!schedule) {
      throw Error('E_NOT_EXIST');
    }
    if (schedule.lecturerId !== user.id && user.role !== 'ADMIN') {
      throw Error('E_UNAUTHORIZED');
    }

    const refreshToken = await getRefreshToken(clientType, user.id);
    await deleteEvent(clientType, refreshToken, schedule.gCalendarId);

    const deletedAppointment = await prisma.lecturerSchedule.delete({
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

export { deleteSchedule };
