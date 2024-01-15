import { z } from 'zod';

const emailSchema = z.string().email();
const uuidSchema = z.string().uuid();

export function isEmail(email: string) {
  try {
    emailSchema.parse(email);
    return true;
  } catch (error) {
    return false;
  }
}

export function isUUID(id: string) {
  try {
    uuidSchema.parse(id);
    return true;
  } catch (error) {
    return false;
  }
}

