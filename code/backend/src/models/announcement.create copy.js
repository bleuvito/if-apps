import { PrismaClient } from '@prisma/client';
import { getMessageMetadata, sendMessage } from '../utils/gmailApi.js';
import {
  generateAttachmentUrls,
  getRefreshToken,
  uploadPendingAttachments,
} from '../utils/helpers.js';

const prisma = new PrismaClient();

async function createAnnouncement(args) {
  const {
    locals: { user, clientType },
    body: requestBody,
    files: pendingAttachments,
  } = args;

  const { pin, recipient, subject, body, tags } = requestBody;

  const refreshToken = await getRefreshToken(clientType, user.id);

  try {
    const gDriveFileInfos = await uploadPendingAttachments(pendingAttachments);
    const attachments = gDriveFileInfos.map(
      ({ id, name, webViewLink, size }) => {
        return { gDriveId: id, name, webViewLink, size };
      }
    );
    const attachmentString = await generateAttachmentUrls(attachments);

    const emailContent = body + attachmentString;
    const gmailSendResponse = await sendMessage(
      clientType,
      refreshToken,
      user.name,
      user.email,
      recipient,
      subject,
      emailContent
    );

    const gmailGetResponse = await getMessageMetadata(
      clientType,
      refreshToken,
      gmailSendResponse.id
    );

    const announcement = await prisma.announcementHeader.create({
      data: {
        gmailId: gmailGetResponse.id,
        gmailThreadId: gmailGetResponse.threadId,
        recipient,
        subject,
        isPinned: JSON.parse(pin),
        bodies: {
          create: {
            body,
            snippet: gmailGetResponse.snippet,
            attachments: {
              createMany: {
                data: gDriveFileInfos.map(({ id, name, webViewLink, size }) => {
                  return { gDriveId: id, name, webViewLink, size };
                }),
              },
            },
          },
        },
        tags: {
          connect: JSON.parse(tags).map(({ id }) => {
            return { id };
          }),
        },
        author: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    const payload = {
      announcement,
    };

    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { createAnnouncement };
