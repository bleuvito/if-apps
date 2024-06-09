import { PrismaClient } from '@prisma/client';
import { getMessageMetadata, replyMessage } from '../utils/gmailApi.js';
import {
  generateAttachmentUrls,
  getRefreshToken,
  uploadAttachments,
} from '../utils/helpers.js';

const prisma = new PrismaClient();

async function patchAnnouncement(args) {
  const {
    locals: { user, clientType },
    params: { id },
    body: requestBody,
    files: attachments,
  } = args;

  console.log('attachments', attachments);

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
      },
      where: {
        id,
      },
    });

    const {
      bodies: [latestMessage],
    } = announcementHeader;

    let from = latestMessage.author.email;
    let to = recipient;
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
      emailContent,
      latestMessage.gmailId
    );

    const gmailGetResponse = await getMessageMetadata(
      clientType,
      refreshToken,
      gmailSendResponse.id
    );

    const gmailId = gmailGetResponse.payload.headers.find(
      (obj) => obj.name.toLowerCase() === 'message-id'
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
        tags: {
          connect: JSON.parse(tags),
        },
        bodies: {
          create: {
            gmailId: gmailId.value,
            author: {
              connect: {
                id: user.id,
              },
            },
            recipient: to,
            snippet: gmailGetResponse.snippet,
            body,
            attachments: {
              createMany: {
                data: transformedAttachments,
              },
            },
          },
        },
        updatedAt: new Date(),
      },
    });

    const payload = announcement;
    return payload;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export { patchAnnouncement };
