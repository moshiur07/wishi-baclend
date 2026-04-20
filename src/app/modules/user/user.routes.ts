import { Router } from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { UserValidation } from "./user.validation";
import { auth } from "../../middleware/auth";

const router = Router();

router.get(
    "/me",
    auth(),
    UserController.getMyProfile
);

router.patch(
    "/me",
    auth(),
    validateRequest(UserValidation.updateProfileSchema),
    UserController.updateProfile
);

router.get(
    "/public/:username",
    UserController.getPublicProfile
);

export const UserRoutes = router;
