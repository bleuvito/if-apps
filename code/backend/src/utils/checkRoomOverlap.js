import { PrismaClient } from '@prisma/client';
import { convertToIntTime } from './helpers.js';

const prisma = new PrismaClient();

export async function checkRoomOverlapReservations(
  roomId,
  reservationId,
  startTime,
  endTime
) {
  const reservationWhere = {
    roomId,
  };

  if (reservationId !== null) {
    reservationWhere.id = {
      not: reservationId,
    };
  }

  const reservations = await prisma.roomReservation.findMany({
    where: {
      ...reservationWhere,
      AND: [
        {
          start: {
            lt: endTime,
          },
        },
        {
          end: {
            gt: startTime,
          },
        },
      ],
    },
    select: {
      id: true,
    },
  });

  if (reservations.length > 0) {
    throw Error('E_OVERLAP_APPOINTMENT');
  }
}

export async function checkRoomOverlapSchedules(
  roomId,
  scheduleId,
  startTime,
  endTime,
  day
) {
  const oneTimeScheduleWhere = {
    roomId,
    isRecurring: false,
    start: {
      lt: endTime,
    },
    end: {
      gt: startTime,
    },
  };

  if (scheduleId !== null) {
    oneTimeScheduleWhere.id = {
      not: scheduleId,
    };
  }

  const oneTimeSchedules = await prisma.roomSchedule.findMany({
    where: { ...oneTimeScheduleWhere },
    select: {
      id: true,
      start: true,
      end: true,
    },
  });

  // console.log(oneTimeSchedules);

  if (oneTimeSchedules.length > 0) {
    throw Error('E_OVERLAP_SCHEDULE');
  }

  const recurringScheduleWhere = {
    roomId,
    isRecurring: true,
    day,
  };

  if (scheduleId !== null) {
    recurringScheduleWhere.id = {
      not: scheduleId,
    };
  }

  const recurringSchedules = await prisma.roomSchedule.findMany({
    where: { ...recurringScheduleWhere },
    select: {
      id: true,
      start: true,
      end: true,
    },
  });

  const reqStart = convertToIntTime(startTime);
  const reqEnd = convertToIntTime(endTime);
  const overlapRecurringSchedules = recurringSchedules.filter((schedule) => {
    const scheduleStartTime = convertToIntTime(schedule.start);
    const scheduleEndTime = convertToIntTime(schedule.end);

    return scheduleStartTime < reqEnd && scheduleEndTime > reqStart;
  });

  // console.log(overlapRecurringSchedules);

  if (overlapRecurringSchedules.length > 0) {
    throw Error('E_OVERLAP_SCHEDULE');
  }
}
