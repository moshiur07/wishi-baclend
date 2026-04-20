import { z } from "zod";

const createWishItemSchema = z.object({
  body: z.object({
    title: z.string().max(80, "Title is too long"),
    description: z.string().max(300, "Description is too long").optional(),
    imageUrl: z.string().optional(),
    price: z.number().positive("Price must be a positive number"),
    category: z.enum(["WANT", "NEED"]),
    status: z.enum(["OPEN", "CLOSED", "CANCELLED"]).optional(),
    productUrl: z.string().url("Must be a valid URL").optional(),
    isPinned: z.boolean().optional(),
    occasionId: z.string().optional(),
  }),
});

const updateWishItemSchema = z.object({
  body: z.object({
    title: z.string().max(80, "Title is too long").optional(),
    description: z.string().max(300, "Description is too long").optional(),
    imageUrl: z.string().optional(),
    price: z.number().positive("Price must be a positive number").optional(),
    category: z.enum(["WANT", "NEED"]).optional(),
    status: z.enum(["OPEN", "CLOSED", "CANCELLED"]).optional(),
    productUrl: z.string().url("Must be a valid URL").optional(),
    isPinned: z.boolean().optional(),
    occasionId: z.string().optional(),
  }),
});

export const WishlistValidation = {
  createWishItemSchema,
  updateWishItemSchema,
};
