import dayjs from 'dayjs';
import { Platform } from 'react-native';

function createAnnouncementFormData(data) {
  const { pin, recipient, subject, body, attachments, tags } = data;

  const form = new FormData();
  form.append('pin', JSON.stringify(pin));
  form.append('recipient', recipient);
  form.append('subject', subject);
  form.append('body', body);
  form.append('tags', JSON.stringify(tags));
  for (const attachment of attachments) {
    let { file } = attachment;
    if (Platform.OS === 'android') {
      file = {
        uri: file.uri,
        name: file.name,
        type: file.mimeType,
      };
    }

    form.append('attachments', file);
  }

  // const pendingAttachments = attachments.filter((attachment) => {
  //   return !attachment.file.hasOwnProperty('webViewLink');
  // });
  // for (const attachment of pendingAttachments) {
  //   let { file } = attachment;
  //   if (Platform.OS === 'android') {
  //     file = {
  //       uri: file.uri,
  //       name: file.name,
  //       type: file.mimeType,
  //     };
  //   }

  //   form.append('pendingAttachments', file);
  // }
  // const uploadedAttachments = attachments
  //   .filter((attachment) => {
  //     return attachment.file.hasOwnProperty('webViewLink');
  //   })
  //   .map((attachment) => {
  //     return attachment.file;
  //   });
  // uploadedAttachments;
  // form.append('uploadedAttachments', JSON.stringify(uploadedAttachments));

  return form;
}

const convertToString = (number) => {
  return number.toString().padStart(2, '0');
};

const getTimeString = (date) => {
  const hour = convertToString(date.getHours());
  const minute = convertToString(date.getMinutes());

  return `${hour}:${minute}`;
};

const getTimeDuration = (start, end) => {
  return `${getTimeString(new Date(start))}-${getTimeString(new Date(end))}`;
};

const updateDateTime = (date, appointmentTime) => {
  let dateObj = dayjs(date).toDate();
  const day = dateObj.getDate();
  const month = dateObj.getMonth();
  const year = dateObj.getFullYear();

  dateObj = dayjs(appointmentTime).toDate();
  dateObj.setDate(day);
  dateObj.setMonth(month);
  dateObj.setFullYear(year);

  return dateObj;
};

const atLeastOneDefined = (obj) =>
  Object.values(obj).some((v) => v !== undefined);

export {
  atLeastOneDefined,
  createAnnouncementFormData,
  getTimeDuration,
  updateDateTime,
};
