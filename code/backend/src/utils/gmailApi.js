import { google } from 'googleapis';
import { getReadyOauth2Client } from './googleOAuth2Client.js';

async function replyMessage(
  clientType,
  refreshToken,
  name,
  email,
  recipient,
  subject,
  body,
  threadId,
  messageId
) {
  const oAuth2Client = getReadyOauth2Client(clientType, refreshToken);

  const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

  const messageMetadata = await getMessageMetadata(
    clientType,
    refreshToken,
    messageId
  );
  const [metadataMessageId, metadataReferences] =
    messageMetadata.payload.headers;

  let base64Message = btoa(
    `From: ${name} <${email}>\n` +
      `To: ${recipient}\n` +
      `Subject: Re: ${subject}\n` +
      `In-Reply-To ${metadataMessageId.value}\n` +
      `References: ${metadataMessageId.value}\n` +
      `Content-Type: text/html; charset=UTF-8\n\n` +
      `${body}`
  );

  try {
    console.log('--sending email--');
    const { data: message } = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        threadId,
        raw: base64Message,
      },
    });

    return message;
  } catch (error) {
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
