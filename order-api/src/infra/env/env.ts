import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().optional().default(3000),
  KAFKA_USER: z.string(),
  KAFKA_PASSWORD: z.string(),
  KAFKA_BROKER: z.string(),
  KAFKA_ORDERS_TOPIC: z.string().default('ORDERS'),
});

export type Env = z.infer<typeof envSchema>;