import { google } from 'googleapis';
import { getReadyOauth2Client } from './googleOAuth2Client.js';

async function createEvent(clientType, refreshToken, eventData) {
  const oAuth2Client = getReadyOauth2Client(clientType, refreshToken);
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

  const googleEvent = await calendar.events.insert({
    calendarId: 'primary',
    resource: eventData,
  });

  return googleEvent;
}

export { createEvent };
