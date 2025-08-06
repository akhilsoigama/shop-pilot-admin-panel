import { z } from "zod";

export const roleSchema = z.object({
  name: z.string().min(2, "Role name must be at least 2 characters"),
  permissions: z.array(z.string()).min(1, "At least one permission is required"),
});
