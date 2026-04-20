import { z } from "zod";

const createContributionSchema = z.object({
  body: z.object({
    giver: z.string().min(1).max(100, "Giver name is too long"),
    amount: z.number().positive("Amount must be positive"),
    message: z.string().max(200, "Message is too long").optional(),
    wishItemId: z.string().min(1, "Wish Item ID is required"),
  }),
});

export const ContributionValidation = {
  createContributionSchema,
};
