import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { OccasionServices } from "./occasion.services";
import status from "http-status";

const createOccasion = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const result = await OccasionServices.createOccasion(userId as string, req.body);

    sendResponse(res, {
        statusCode: status.CREATED,
        success: true,
        message: "Occasion created successfully",
        data: result,
    });
});

const getMyOccasions = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const result = await OccasionServices.getMyOccasions(userId as string);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Occasions fetched successfully",
        data: result,
    });
});

const updateOccasion = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req?.user?.id;
    const result = await OccasionServices.updateOccasion(id as string, userId as string, req.body);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Occasion updated successfully",
        data: result,
    });
});

const deleteOccasion = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user?.id;
    const result = await OccasionServices.deleteOccasion(id as string, userId as string);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Occasion deleted successfully",
        data: result,
    });
});

export const OccasionController = {
    createOccasion,
    getMyOccasions,
    updateOccasion,
    deleteOccasion,
};
