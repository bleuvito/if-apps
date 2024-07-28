import z from 'zod';
import { atLeastOneDefined, updateDateTime } from './utils';

export const announcementSchema = z
  .object({
    recipient: z
      .string()
      .refine((emailValue) =>
        emailValue
          .split(',')
          .every((item) => z.string().email().safeParse(item).success)
      ),
    subject: z.string().min(1, { message: 'Subjek harus diisi!' }),
  })
  .passthrough();

export const tagSchema = z.object({
  name: z.string().min(1),
});

export const appointmentSchema = z
  .object({
    topic: z.string().min(1, { message: 'Topik harus diisi' }),
    date: z.coerce.date(),
    start: z.coerce.date(),
    end: z.coerce.date(),
    place: z.coerce.string().min(1, { message: 'Tempat harus diisi' }),
    status: z.string(),
    link: z
      .string()
      .url({ message: 'Harus berupa URL' })
      .optional()
      .or(z.literal('')),
    organizer: z.object({
      id: z.string(),
    }),
    participant: z
      .object({
        id: z.string(),
        name: z.string(),
      })
      .partial()
      .refine(atLeastOneDefined, { message: 'Partisipan harus dipilih' }),
  })
  .refine(
    (data) => {
      return data.end >= data.start;
    },
    {
      message: 'Waktu mulai tidak boleh lebih dari waktu selesai',
      path: ['start'],
    }
  )
  .refine(
    (data) => {
      const upEnd = updateDateTime(data.date, data.end);
      return upEnd > new Date();
    },
    {
      message: 'Waktu selesai harus melebihi waktu saat ini.',
      path: ['end'],
    }
  )
  .refine(
    (data) => {
      const upStart = updateDateTime(data.date, data.start);
      return upStart > new Date();
    },
    {
      message: 'Waktu mulai harus melebihi waktu saat ini.',
      path: ['start'],
    }
  );

export const reservationSchema = z
  .object({
    title: z.string().min(1),
    date: z.coerce.date(),
    start: z.coerce.date(),
    end: z.coerce.date(),
    room: z
      .object({
        id: z.string(),
        name: z.string(),
        capacity: z.number(),
        description: z.string(),
      })
      .partial()
      .refine(atLeastOneDefined, { message: 'Ruangan harus dipilih' }),
  })
  .refine(
    (data) => {
      return data.end > data.start;
    },
    {
      message: 'Waktu mulai tidak boleh lebih dari waktu selesai',
      path: ['start'],
    }
  )
  .refine(
    (data) => {
      const upEnd = updateDateTime(data.date, data.end);

      return upEnd > new Date();
    },
    {
      message: 'Waktu selesai harus melebihi waktu saat ini.',
      path: ['end'],
    }
  )
  .refine(
    (data) => {
      const upStart = updateDateTime(data.date, data.start);
      return upStart > new Date();
    },
    {
      message: 'Waktu mulai harus melebihi waktu saat ini.',
      path: ['start'],
    }
  );
