import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  mobile: z.string().min(10, 'Mobile number must be at least 10 digits'),
  email: z.email(),
  password: z.string().min(6),
  roleId: z.string().min(1, 'Role is required'),
});

export const updateUserSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  mobile: z.string().min(10, 'Mobile number must be at least 10 digits'),
  email: z.email(),
  roleId: z.string().optional(),
});
