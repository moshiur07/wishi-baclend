import { prisma } from "../../lib/prisma";
import AppError from "../../../helper/AppError";
import status from "http-status";

const createOccasion = async (userId: string, payload: { name: string, date?: string | Date }) => {
    const result = await prisma.occasion.create({
        data: {
            ...payload,
            userId,
        },
    });
    return result;
};

const getMyOccasions = async (userId: string) => {
    const result = await prisma.occasion.findMany({
        where: { userId },
        orderBy: { date: "asc" },
        include: {
            wishItems: true,
        }
    });
    return result;
};

const updateOccasion = async (id: string, userId: string, payload: Partial<{ name: string, date: string | Date }>) => {
    const occasion = await prisma.occasion.findUnique({ where: { id } });
    
    if (!occasion) throw new AppError(status.NOT_FOUND, "Occasion not found");
    if (occasion.userId !== userId) throw new AppError(status.FORBIDDEN, "Not authorized to update this occasion");

    const result = await prisma.occasion.update({
        where: { id },
        data: payload,
    });
    return result;
};

const deleteOccasion = async (id: string, userId: string) => {
    const occasion = await prisma.occasion.findUnique({ where: { id } });
    
    if (!occasion) throw new AppError(status.NOT_FOUND, "Occasion not found");
    if (occasion.userId !== userId) throw new AppError(status.FORBIDDEN, "Not authorized to delete this occasion");

    const result = await prisma.occasion.delete({
        where: { id },
    });
    return result;
};

export const OccasionServices = {
    createOccasion,
    getMyOccasions,
    updateOccasion,
    deleteOccasion,
};
