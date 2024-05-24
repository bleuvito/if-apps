import { PrismaClient } from '@prisma/client';
import { putEvent } from '../utils/googleCalendarApi.js';
import { checkRoomOverlapAgenda, getRefreshToken } from '../utils/helpers.js';

const prisma = new PrismaClient();

async function patchReservation(args) {
  const {
    locals: { user, clientType },
    body: requestBody,
    params: requestParams,
  } = args;

  console.log(requestParams);

  try {
    const reservation = await prisma.roomReservation.findFirst({
      where: {
        id: requestParams.id,
      },
    });

    if (!reservation) {
      throw Error('E_NOT_EXIST');
    }

    await checkRoomOverlapAgenda(
      requestBody.room.id,
      requestParams.id,
      requestBody.start,
      requestBody.end,
      requestBody.day
    );

    // console.log(requestBody);

    const updatedReservation = await prisma.roomReservation.update({
      where: {
        id: requestParams.id,
      },
      data: {
        title: requestBody.title,
        end: requestBody.end,
        start: requestBody.start,
        room: {
          connect: {
            id: requestBody.room.id,
          },
        },
        updatedAt: new Date(),
      },
    });

    const payload = updatedReservation;

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { patchReservation };
