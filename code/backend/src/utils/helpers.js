import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import multer from 'multer';
import {
  createFile,
  createIfAppsFolder,
  getIfAppsFolder,
} from '../utils/googleDriveApi.js';

const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/assets');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});
const upload = multer({ storage });

async function getRefreshToken(clientType, userId) {
  if (clientType === 'web') {
    const { webRefreshToken } = await prisma.user.findFirst({
      select: {
        webRefreshToken: true,
      },
      where: {
        id: userId,
      },
    });

    return webRefreshToken;
  }

  const { androidRefreshToken } = await prisma.user.findFirst({
    select: {
      androidRefreshToken: true,
    },
    where: {
      id: userId,
    },
  });

  return androidRefreshToken;
}

async function uploadAttachments(clientType, refreshToken, attachments) {
  let gDriveFileInfos = [];

  if (attachments.length > 0) {
    let [ifAppsFolder] = await getIfAppsFolder(clientType, refreshToken);
    if (!ifAppsFolder) {
      ifAppsFolder = await createIfAppsFolder(clientType, refreshToken);
    }
    const ifAppsFolderId = ifAppsFolder.id;

    for (const attachment of attachments) {
      const metadata = {
        name: attachment.originalname,
        mimeType: attachment.mimeType,
        parents: [ifAppsFolderId],
      };
      const fields = 'id, name, size, webViewLink';
      const media = {
        mimeType: attachment.mimeType,
        body: fs.createReadStream(attachment.path),
      };

      const gDriveResponse = await createFile(
        clientType,
        refreshToken,
        metadata,
        fields,
        media
      );

      fs.unlinkSync(attachment.path);
      gDriveFileInfos.push(gDriveResponse);
    }
  }

  return gDriveFileInfos;
}

async function generateAttachmentUrls(attachments) {
  let attachmentString = '';
  if (attachments.length > 0) {
    attachmentString = '<br/><h3>Lampiran</h3>';
    for (const attachment of attachments) {
      const attachmentLink = `<div><a href=${attachment.webViewLink}>${attachment.name}</a></div>`;
      attachmentString += attachmentLink;
    }
  }

  return attachmentString;
}

export function convertToIntTime(inputDate) {
  const date = new Date(inputDate);
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');

  return parseInt(`${hour}${minute}`);
}

async function checkUserOverlapAgenda(
  userId,
  scheduleId,
  startTime,
  endTime,
  day
) {
  const oneTimeScheduleWhere = {
    lecturerId: userId,
    isRecurring: false,
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
  };

  if (scheduleId !== null) {
    oneTimeScheduleWhere.id = {
      not: scheduleId,
    };
  }

  // console.log(oneTimeScheduleWhere);

  const oneTimeSchedules = await prisma.lecturerSchedule.findMany({
    where: { ...oneTimeScheduleWhere },
    select: {
      id: true,
      title: true,
    },
  });

  // console.log(oneTimeSchedules);
  console.log('onetime', oneTimeSchedules);

  if (oneTimeSchedules.length > 0) {
    throw Error('E_OVERLAP_SCHEDULE');
  }

  const recurringScheduleWhere = {
    lecturerId: userId,
    isRecurring: true,
    day,
  };

  if (scheduleId !== null) {
    recurringScheduleWhere.id = {
      not: scheduleId,
    };
  }

  const recurringSchedules = await prisma.lecturerSchedule.findMany({
    where: { ...recurringScheduleWhere },
    select: {
      id: true,
      start: true,
      end: true,
      title: true,
    },
  });

  const reqStart = convertToIntTime(startTime);
  const reqEnd = convertToIntTime(endTime);
  const overlapRecurringSchedules = recurringSchedules.filter((schedule) => {
    const scheduleStartTime = convertToIntTime(schedule.start);
    const scheduleEndTime = convertToIntTime(schedule.end);

    return scheduleStartTime < reqEnd && scheduleEndTime > reqStart;
  });

  console.log('overlap', overlapRecurringSchedules);

  if (overlapRecurringSchedules.length > 0) {
    throw Error('E_OVERLAP_SCHEDULE');
  }

  const appointments = await prisma.appointment.findMany({
    where: {
      status: 'ACCEPTED',
      OR: [
        {
          organizerId: userId,
        },
        {
          participantId: userId,
        },
      ],
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
      topic: true,
    },
  });

  if (appointments.length > 0) {
    throw Error('E_OVERLAP_APPOINTMENT');
  }
}

async function checkRoomOverlapAgenda(
  roomId,
  reservationId,
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

  if (reservationId !== null) {
    oneTimeScheduleWhere.id = {
      not: reservationId,
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

  if (reservationId !== null) {
    recurringScheduleWhere.id = {
      not: reservationId,
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

  const reservationWhere = {
    roomId,
  };

  if (reservationId !== null) {
    oneTimeScheduleWhere.id = {
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

function validateName(name) {
  const length = name.length;
  if (length <= 0 && length > 256) {
    return 'Jumlah karakter tidak sesuai';
  }

  return false;
}

function validateEmailFormat(email) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

async function validateEmail(email) {
  if (!validateEmailFormat(email)) {
    return 'Bagian email memiliki format salah';
  }

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (user) {
    return 'Terdapat user dengan email yang sama';
  }

  return false;
}

function validateRole(role) {
  if (
    !['ADMIN', 'KAJUR', 'KAPRODI', 'KALAB', 'DOSEN', 'MAHASISWA'].includes(role)
  ) {
    return 'Role user tidak valid';
  }
  return false;
}

async function validateUsers(usersString) {
  const list = usersString.split('\n');
  const errorUsers = [];
  const passedUsers = [];

  const users = list.filter((item) => {
    return item.length > 0;
  });

  for (const user of users) {
    const args = user.split(',');

    if (args.length !== 3) {
      errorUsers.push({
        line: user,
        error: 'Kesalahan syntax',
      });
      continue;
    }

    const nameError = validateName(args[0]);
    if (nameError) {
      errorUsers.push({
        line: user,
        error: nameError,
      });
      continue;
    }

    const emailError = await validateEmail(args[1]);
    if (emailError) {
      errorUsers.push({
        line: user,
        error: emailError,
      });
      continue;
    }

    const roleError = validateRole(args[2]);
    if (roleError) {
      errorUsers.push({
        line: user,
        error: roleError,
      });
      continue;
    }

    passedUsers.push({ name: args[0], email: args[1], role: args[2] });
  }

  return [passedUsers, errorUsers];
}

export {
  checkRoomOverlapAgenda,
  checkUserOverlapAgenda,
  generateAttachmentUrls,
  getRefreshToken,
  upload,
  uploadAttachments,
  validateUsers,
};
