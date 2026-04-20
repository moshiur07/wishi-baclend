import { z } from "zod";

const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(50).optional(),
    bio: z.string().max(300).optional(),
    username: z.string().min(3).max(30).optional(),
    phone: z.string().optional(),
    image: z.string().url().optional(),
    location: z.string().max(100).optional(),
    // socialLinks: z.optional(),
  }),
});

export const UserValidation = {
  updateProfileSchema,
};
