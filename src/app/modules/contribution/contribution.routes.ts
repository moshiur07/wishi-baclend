import { Router } from "express";
import { ContributionController } from "./contribution.controller";
import validateRequest from "../../middleware/validateRequest";
import { ContributionValidation } from "./contribution.validation";

const router = Router();

router.post(
    "/",
    validateRequest(ContributionValidation.createContributionSchema),
    ContributionController.createContribution
);

router.get(
    "/:wishItemId",
    ContributionController.getContributionsByWishItem
);

export const ContributionRoutes = router;
