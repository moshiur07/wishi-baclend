import { Router } from "express";
import { WishlistController } from "./wishlist.controller";
import validateRequest from "../../middleware/validateRequest";
import { WishlistValidation } from "./wishlist.validation";
import { auth } from "../../middleware/auth";

const router = Router();

router.post(
    "/",
    auth(),
    validateRequest(WishlistValidation.createWishItemSchema),
    WishlistController.createWishItem
);

router.get(
    "/",
    auth(),
    WishlistController.getMyWishItems
);

router.get(
    "/public/:username",
    WishlistController.getPublicWishlist
);

router.get(
    "/:id",
    WishlistController.getWishItemById
);

router.patch(
    "/:id",
    auth(),
    validateRequest(WishlistValidation.updateWishItemSchema),
    WishlistController.updateWishItem
);

router.delete(
    "/:id",
    auth(),
    WishlistController.deleteWishItem
);

export const WishlistRoutes = router;
