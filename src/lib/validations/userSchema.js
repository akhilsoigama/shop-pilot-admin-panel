// /lib/validations/userSchema.js
import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  roleId: z.string().min(1, 'Role is required'),
});

export const updateUserSchema = z.object({
  email: z.email(),
  roleId: z.string().optional(),
});
