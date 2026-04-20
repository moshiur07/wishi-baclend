import { prisma } from "../../lib/prisma";
import { WishItem } from "../../../generated/prisma/client";

const createWishItem = async (payload: Partial<WishItem>, userId: string) => {
    console.log("payload: in the service....", payload);
    const result = await prisma.wishItem.create({
        data: {
            ...payload,
            userId,
        } as any,
    });
    return result;
};

const getMyWishItems = async (userId: string) => {
    const result = await prisma.wishItem.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });
    return result;
};

const getPublicWishlist = async (username: string) => {
    const user = await prisma.user.findFirst({
        where: { username },
    });

    if (!user) throw new Error("User not found");

    const result = await prisma.wishItem.findMany({
        where: {
            userId: user.id,
            status: "OPEN" // Only show open items on public profile
        },
        orderBy: { createdAt: "desc" },
    });
    return result;
};

const getWishItemById = async (id: string) => {
    const result = await prisma.wishItem.findUnique({
        where: { id },
        include: { contributions: true }
    });
    return result;
};

const updateWishItem = async (id: string, userId: string, payload: Partial<WishItem>) => {
    const item = await prisma.wishItem.findUnique({ where: { id } });
    if (!item) throw new Error("Wish item not found");
    if (item.userId !== userId) throw new Error("Not authorized");

    const result = await prisma.wishItem.update({
        where: { id },
        data: payload,
    });
    return result;
};

const deleteWishItem = async (id: string, userId: string) => {
    const item = await prisma.wishItem.findUnique({ where: { id } });
    if (!item) throw new Error("Wish item not found");
    if (item.userId !== userId) throw new Error("Not authorized");

    const result = await prisma.wishItem.delete({
        where: { id },
    });
    return result;
};

export const WishlistServices = {
    createWishItem,
    getMyWishItems,
    getPublicWishlist,
    getWishItemById,
    updateWishItem,
    deleteWishItem,
};
