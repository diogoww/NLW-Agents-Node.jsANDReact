import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().url().startsWith('postgresql://'),
  OPENAI_API_KEY: z.string().optional(),
  HUGGING_FACE_TOKEN: z.string().optional(),
});

export const env = envSchema.parse(process.env);
