import { PrismaClient } from '@prisma/client';
import { getMessageMetadata, sendMessage } from '../utils/gmailApi.js';
import {
  generateAttachmentUrls,
  getRefreshToken,
  uploadAttachments,
} from '../utils/helpers.js';

const prisma = new PrismaClient();

async function createAnnouncement(args) {
  const {
    locals: { user, clientType },
    body: requestBody,
    files: attachments,
  } = args;

  const { pin, recipient, subject, body, tags } = requestBody;
  const refreshToken = await getRefreshToken(clientType, user.id);

  let emailRecipient = recipient;
  // if (user.role !== 'ADMIN') {
  const adminEmails = await prisma.user.findMany({
    where: {
      role: 'ADMIN',
    },
    select: {
      email: true,
    },
  });

  if (adminEmails.length > 0) {
    const parsedAdminEmails =
      adminEmails.map((obj) => obj.email).join(',') + ',' + emailRecipient;
    emailRecipient = parsedAdminEmails;
  }
  // }
  // if (user.role !== 'KAJUR') {
  const kajurEmails = await prisma.user.findMany({
    where: {
      role: 'KAJUR',
    },
    select: {
      email: true,
    },
  });

  if (kajurEmails.length > 0) {
    const parsedKajurEmails =
      kajurEmails.map((obj) => obj.email).join(',') + ',' + emailRecipient;
    emailRecipient = parsedKajurEmails;
  }
  // }

  // if (user.role !== 'KAPRODI') {
  const kaprodiEmails = await prisma.user.findMany({
    where: {
      role: 'KAPRODI',
    },
    select: {
      email: true,
    },
  });

  if (kaprodiEmails.length > 0) {
    const parsedKaprodiEmails =
      kaprodiEmails.map((obj) => obj.email).join(',') + ',' + emailRecipient;
    emailRecipient = parsedKaprodiEmails;
  }
  // }

  try {
    const uploadResponse = await uploadAttachments(
      clientType,
      refreshToken,
      attachments
    );
    const transformedAttachments = uploadResponse.map(
      ({ id, name, webViewLink, size }) => {
        return { gDriveId: id, name, webViewLink, size };
      }
    );
    const attachmentString = await generateAttachmentUrls(
      transformedAttachments
    );

    const emailContent = body + attachmentString;
    const gmailSendResponse = await sendMessage(
      clientType,
      refreshToken,
      user.name,
      user.email,
      emailRecipient,
      subject,
      emailContent
    );

    const gmailGetResponse = await getMessageMetadata(
      clientType,
      refreshToken,
      gmailSendResponse.id
    );

    const gmailId = gmailGetResponse.payload.headers.find(
      (obj) => obj.name.toLowerCase() === 'message-id'
    );

    const announcement = await prisma.announcementHeader.create({
      data: {
        subject,
        isPinned: JSON.parse(pin),
        bodies: {
          create: {
            gmailId: gmailId.value,
            recipient: emailRecipient,
            snippet: gmailGetResponse.snippet,
            body,
            attachments: {
              createMany: {
                data: transformedAttachments,
              },
            },
            author: {
              connect: {
                id: user.id,
              },
            },
          },
        },
        tags: {
          connect: JSON.parse(tags),
        },
      },
    });

    const payload = announcement;

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { createAnnouncement };
