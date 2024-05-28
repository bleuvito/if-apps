import { google } from 'googleapis';
import { getReadyOauth2Client } from './googleOAuth2Client.js';

async function replyMessage(
  clientType,
  refreshToken,
  name,
  email,
  recipient,
  subject,
  body
) {
  const oAuth2Client = getReadyOauth2Client(clientType, refreshToken);

  const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

  const {
    data: { messages: emailList },
  } = await gmail.users.messages.list({
    userId: 'me',
    q: `subject:${subject}`,
  });

  const {
    data: { messages: threadMessages },
  } = await gmail.users.threads.get({
    userId: 'me',
    id: emailList[0].threadId,
    format: 'metadata',
  });

  let idMessages = [];
  for (let i = 0; i < threadMessages.length; i++) {
    const id = threadMessages[i].payload.headers.find(
      (obj) => obj.name.toLowerCase() === 'message-id'
    );

    idMessages.push(id.value);
  }

  let base64Message = btoa(
    `References: ${idMessages.join(' ')}\n` +
      `In-Reply-To ${idMessages[idMessages.length - 1]}\n` +
      `Subject: Re:${subject}\n` +
      `From: ${name} <${email}>\n` +
      `To: ${recipient}\n` +
      `Content-Type: text/html; charset=UTF-8\n\n` +
      `${body}`
  );

  try {
    console.log('--sending email--');
    const { data: message } = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        threadId: `${threadMessages[threadMessages.length - 1].threadId}`,
        raw: base64Message,
      },
    });

    return message;
  } catch (error) {
    console.error(error);
    throw Error('E_GMAIL_SEND', error);
  }
}

async function sendMessage(
  clientType,
  refreshToken,
  name,
  email,
  recipient,
  subject,
  body
) {
  const oAuth2Client = getReadyOauth2Client(clientType, refreshToken);

  const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

  let base64Message = btoa(
    `From: ${name} <${email}>\n` +
      `To: ${recipient}\n` +
      `Subject: ${subject}\n` +
      `Content-Type: text/html; charset=UTF-8\n\n` +
      `${body}`
  );

  try {
    console.log('--sending email--');
    const { data: message } = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: base64Message,
      },
    });

    return message;
  } catch (error) {
    throw Error('E_GMAIL_SEND', error);
  }
}

async function getMessageMetadata(clientType, refreshToken, messageId) {
  try {
    const oAuth2Client = getReadyOauth2Client(clientType, refreshToken);

    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

    const { data: message } = await gmail.users.messages.get({
      userId: 'me',
      id: messageId,
      format: 'metadata',
      metadataHeaders: ['Message-Id', 'References'],
    });

    return message;
  } catch (error) {
    throw Error('E_GMAIL_READ', error);
  }
}

export { getMessageMetadata, replyMessage, sendMessage };
