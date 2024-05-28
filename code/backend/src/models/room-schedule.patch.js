import { PrismaClient } from '@prisma/client';
import { checkRoomOverlapAgenda } from '../utils/helpers.js';

const prisma = new PrismaClient();

async function patchRoomSchedule(args) {
  const {
    locals: { user, clientType },
    body: requestBody,
    params: requestParams,
  } = args;

  try {
    const schedule = await prisma.roomSchedule.findFirst({
      where: {
        id: requestParams.sheduleId,
      },
    });

    if (!schedule) {
      throw Error('E_NOT_EXIST');
    }

    console.log(requestBody);
    await checkRoomOverlapAgenda(
      requestParams.roomId,
      requestParams.sheduleId,
      requestBody.start,
      requestBody.end,
      requestBody.day
    );

    // console.log(requestBody);

    const updatedSchedule = await prisma.roomSchedule.update({
      where: {
        id: requestParams.sheduleId,
      },
      data: {
        ...requestBody,
        updatedAt: new Date(),
      },
    });

    const payload = updatedSchedule;

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { patchRoomSchedule };
