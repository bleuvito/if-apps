import { PrismaClient } from '@prisma/client';
import { getMessageMetadata, replyMessage } from '../utils/gmailApi.js';
import { getReadyOauth2Client } from '../utils/googleOAuth2Client.js';
import {
  generateAttachmentUrls,
  getRefreshToken,
  uploadAttachments,
} from '../utils/helpers.js';

const prisma = new PrismaClient();

async function putAnnouncement(args) {
  const {
    locals: { user, clientType },
    params: { id },
    body: requestBody,
    files: attachments,
  } = args;

  const { pin, recipient, subject, body, tags } = requestBody;
  const refreshToken = await getRefreshToken(clientType, user.id);

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
    const announcementHeader = await prisma.announcementHeader.findFirst({
      select: {
        bodies: {
          select: {
            id: true,
            gmailId: true,
            author: true,
          },
          where: {
            isLatest: true,
          },
        },
        gmailThreadId: true,
      },
      where: {
        id,
      },
    });

    const {
      gmailThreadId,
      bodies: [latestMessage],
    } = announcementHeader;

    let from = latestMessage.author.email;
    let to = recipient;
    console.log('recipient2', recipient.includes(user.email));
    if (recipient.includes(user.email)) {
      const emailArray = recipient.split(',');
      console.log('emailArray', recipient);
      const filteredEmails = emailArray.filter((email) => email !== user.email);

      from = user.email;
      to = filteredEmails.join(',') + ',' + latestMessage.author.email;
    }

    const gmailSendResponse = await replyMessage(
      clientType,
      refreshToken,
      user.name,
      user.email,
      to,
      subject,
      emailContent
    );

    const gmailGetResponse = await getMessageMetadata(
      clientType,
      refreshToken,
      gmailSendResponse.id
    );

    await prisma.announcementBody.update({
      where: {
        id: latestMessage.id,
      },
      data: {
        isLatest: false,
      },
    });

    const announcement = await prisma.announcementHeader.update({
      where: {
        id,
      },
      data: {
        isPinned: JSON.parse(pin),
        recipient: to,
        tags: {
          connect: JSON.parse(tags),
        },
        bodies: {
          create: {
            gmailId: gmailGetResponse.id,
            body,
            snippet: gmailGetResponse.snippet,
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
        author: {
          connect: {
            id: user.id,
          },
        },
        updatedAt: new Date(),
      },
    });

    const payload = announcement;
    return payload;
  } catch (error) {
    throw new Error(error);
  }
}

export { putAnnouncement };
