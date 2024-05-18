import { google } from 'googleapis';
import { getReadyOauth2Client } from './googleOAuth2Client.js';

async function createEvent(clientType, refreshToken, eventData) {
  const oAuth2Client = getReadyOauth2Client(clientType, refreshToken);
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

  const googleEvent = await calendar.events.insert({
    calendarId: 'primary',
    sendUpdates: 'all',
    resource: eventData,
  });

  return googleEvent;
}

async function putEvent(clientType, refreshToken, gCalendarId, eventData) {
  const oAuth2Client = getReadyOauth2Client(clientType, refreshToken);
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

  let { data: gCalendarEvent } = await calendar.events.get({
    calendarId: 'primary',
    eventId: gCalendarId,
  });

  gCalendarEvent = { ...gCalendarEvent, ...eventData };

  const { data: updatedGCalendarEvent } = await calendar.events.patch({
    calendarId: 'primary',
    eventId: gCalendarId,
    resource: gCalendarEvent,
  });

  return updatedGCalendarEvent;
}

async function deleteEvent(clientType, refreshToken, gCalendarId, eventData) {
  const oAuth2Client = getReadyOauth2Client(clientType, refreshToken);
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
}

export { createEvent, putEvent };
