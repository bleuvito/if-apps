import { google } from 'googleapis';
import { getReadyOauth2Client } from './googleOAuth2Client.js';

async function createFile(
  clientType,
  refreshToken,
  fileRequestBody,
  fields,
  media
) {
  const oAuth2Client = getReadyOauth2Client(clientType, refreshToken);

  const drive = google.drive({ version: 'v3', auth: oAuth2Client });
  try {
    console.log('--uploading file--');
    const file = await drive.files.create({
      resource: fileRequestBody,
      media,
      fields,
    });

    const permissionRequestBody = {
      role: 'reader',
      type: 'domain',
      domain: 'unpar.ac.id',
    };

    const filePermission = await drive.permissions.create({
      fileId: file.data.id,
      resource: permissionRequestBody,
      fields: 'id',
    });

    return file.data;
  } catch (error) {
    throw new Error('E_GDRIVE_UPLOAD', error);
  }
}

async function createIfAppsFolder(clientType, refresh_token) {
  try {
    const metadata = {
      name: 'IF Apps',
      mimeType: 'application/vnd.google-apps.folder',
    };
    const fields = 'id';

    const file = await createFile(clientType, refresh_token, metadata, fields);

    return file;
  } catch (error) {
    throw Error('E_GDRIVE_CREATE_FOLDER');
  }
}

async function getIfAppsFolder(clientType, refreshToken) {
  const oAuth2Client = getReadyOauth2Client(clientType, refreshToken);

  const drive = google.drive({ version: 'v3', auth: oAuth2Client });
  try {
    const res = await drive.files.list({
      q: "mimeType = 'application/vnd.google-apps.folder' and name = 'IF Apps'",
      spaces: 'drive',
      fields: 'files(id, name, webViewLink)',
    });

    return res.data.files;
  } catch (error) {
    throw Error('E_GDRIVE_GET_FOLDER', error);
  }
}

export { createFile, createIfAppsFolder, getIfAppsFolder };
