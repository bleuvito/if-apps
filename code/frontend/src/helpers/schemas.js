import z from 'zod';

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
