import { Router } from "express";
import { OccasionController } from "./occasion.controller";
import validateRequest from "../../middleware/validateRequest";
import { OccasionValidation } from "./occasion.validation";
import { auth } from "../../middleware/auth";

const router = Router();

router.post(
    "/",
    auth(),
    validateRequest(OccasionValidation.createOccasionSchema),
    OccasionController.createOccasion
);

router.get(
    "/",
    auth(),
    OccasionController.getMyOccasions
);

router.patch(
    "/:id",
    auth(),
    validateRequest(OccasionValidation.updateOccasionSchema),
    OccasionController.updateOccasion
);

router.delete(
    "/:id",
    auth(),
    OccasionController.deleteOccasion
);

export const OccasionRoutes = router;
