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

function convertToIntTime(inputDate) {
  const date = new Date(inputDate);
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');

  return parseInt(`${hour}${minute}`);
}

async function checkOverlap(userId, scheduleId, startTime, endTime, day) {
  const oneTimeScheduleWhere = {
    lecturerId: userId,
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

  // console.log(oneTimeScheduleWhere);

  const oneTimeSchedules = await prisma.lecturerSchedule.findMany({
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
    },
  });

  const reqStart = convertToIntTime(startTime);
  const reqEnd = convertToIntTime(endTime);
  const overlapRecurringSchedules = recurringSchedules.filter((schedule) => {
    const scheduleStartTime = convertToIntTime(schedule.start);
    const scheduleEndTime = convertToIntTime(schedule.end);

    return scheduleStartTime < reqEnd && scheduleEndTime > reqStart;
  });

  if (overlapRecurringSchedules.length > 0) {
    throw Error('E_OVERLAP_SCHEDULE');
  }

  const appointments = await prisma.appointment.findMany({
    where: {
      OR: [
        {
          organizerId: userId,
        },
        {
          participantId: userId,
        },
      ],
      status: 'ACCEPTED',
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

  if (appointments.length > 0) {
    throw Error('E_OVERLAP_APPOINTMENT');
  }
}

export {
  checkOverlap,
  generateAttachmentUrls,
  getRefreshToken,
  upload,
  uploadAttachments,
};
