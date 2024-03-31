import { google } from "googleapis";

const oAuth2ClientWeb = new google.auth.OAuth2(
  process.env.GOOGLE_WEB_OAUTH_CLIENT_ID,
  process.env.GOOGLE_WEB_OAUTH_CLIENT_SECRET,
  'postmessage',
);

const oAuth2ClientAndroid = new google.auth.OAuth2(
  process.env.GOOGLE_WEB_OAUTH_CLIENT_ID,
  process.env.GOOGLE_WEB_OAUTH_CLIENT_SECRET,
  'http://localhost:8000',
);

const oAuth2Web = google.oauth2({
  auth: oAuth2ClientWeb,
  version: 'v2'
});

const oAuth2Android = google.oauth2({
  auth: oAuth2ClientAndroid,
  version: 'v2'
});

function getOAuth2Client(type) {
  if (type === 'web') return oAuth2ClientWeb;

  return oAuth2ClientAndroid;
}

function getOauth2(type) {
  if (type === 'web') return oAuth2Web;

  return oAuth2Android;
}

export { getOAuth2Client, getOauth2 }