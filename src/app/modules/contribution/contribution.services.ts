import { prisma } from "../../lib/prisma";
import AppError from "../../../helper/AppError";
import status from "http-status";

const createContribution = async (payload: { giver: string, amount: number, message?: string, wishItemId: string }, userId?: string) => {
    // Check if wish item exists
    const wishItem = await prisma.wishItem.findUnique({
        where: { id: payload.wishItemId }
    });

    if (!wishItem) {
        throw new AppError(status.NOT_FOUND, "Wish item not found");
    }

    const result = await prisma.contribution.create({
        data: {
            ...payload,
            userId, // Optional, links to the user if logged in
        },
    });
    return result;
};

const getContributionsByWishItem = async (wishItemId: string) => {
    const result = await prisma.contribution.findMany({
        where: { wishItemId },
        orderBy: { createdAt: "desc" },
    });
    return result;
};

export const ContributionServices = {
    createContribution,
    getContributionsByWishItem,
};
