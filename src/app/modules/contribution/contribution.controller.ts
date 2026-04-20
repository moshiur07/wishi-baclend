import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ContributionServices } from "./contribution.services";
import status from "http-status";
import { auth as betterAuth } from "../../lib/auth";

const createContribution = catchAsync(async (req: Request, res: Response) => {
    // Try to get session to optionally link the contribution to a user
    const session = await betterAuth.api.getSession({
        headers: req.headers as any,
    });
    const userId = session?.user?.id;

    const result = await ContributionServices.createContribution(req.body, userId);

    sendResponse(res, {
        statusCode: status.CREATED,
        success: true,
        message: "Contribution recorded successfully",
        data: result,
    });
});

const getContributionsByWishItem = catchAsync(async (req: Request, res: Response) => {
    const { wishItemId } = req.params;
    const result = await ContributionServices.getContributionsByWishItem(wishItemId as string);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Contributions fetched successfully",
        data: result,
    });
});

export const ContributionController = {
    createContribution,
    getContributionsByWishItem,
};
