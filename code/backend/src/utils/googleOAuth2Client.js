import { google } from 'googleapis';

const oAuth2ClientWeb = new google.auth.OAuth2(
  process.env.GOOGLE_WEB_OAUTH_CLIENT_ID,
  process.env.GOOGLE_WEB_OAUTH_CLIENT_SECRET,
  'http://localhost:3000'
);

const oAuth2ClientAndroid = new google.auth.OAuth2(
  process.env.GOOGLE_WEB_OAUTH_CLIENT_ID,
  process.env.GOOGLE_WEB_OAUTH_CLIENT_SECRET,
  'http://localhost:8000'
);

const oAuth2Web = google.oauth2({
  auth: oAuth2ClientWeb,
  version: 'v2',
});

const oAuth2Android = google.oauth2({
  auth: oAuth2ClientAndroid,
  version: 'v2',
});

function getOAuth2Client(clientType) {
  if (clientType === 'web') return oAuth2ClientWeb;

  return oAuth2ClientAndroid;
}

function getOauth2(clientType) {
  if (clientType === 'web') return oAuth2Web;

  return oAuth2Android;
}

function getReadyOauth2Client(clientType, refreshToken) {
  const oAuth2Client = getOAuth2Client(clientType);
  oAuth2Client.setCredentials({
    refresh_token: refreshToken,
  });

  return oAuth2Client;
}

async function refreshAccessToken(clientType, refreshToken) {
  const oAuth2Client = getOAuth2Client(clientType);

  oAuth2Client.setCredentials({
    refresh_token: refreshToken,
  });

  const { credentials } = await oAuth2Client.refreshAccessToken();
  return {
    token: credentials.access_token,
    exp: credentials.expiry_date,
  };
}

export { getOAuth2Client, getOauth2, getReadyOauth2Client, refreshAccessToken };
