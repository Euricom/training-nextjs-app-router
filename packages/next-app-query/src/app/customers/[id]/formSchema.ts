import { z } from 'zod';

export const customerSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
});

export type FormValues = z.infer<typeof customerSchema>;
