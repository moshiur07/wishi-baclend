import { z } from "zod";

const createOccasionSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100, "Name is too long"),
    date: z.string().datetime().optional().or(z.date().optional()),
  }),
});

const updateOccasionSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100, "Name is too long").optional(),
    date: z.string().datetime().optional().or(z.date().optional()),
  }),
});

export const OccasionValidation = {
  createOccasionSchema,
  updateOccasionSchema,
};
