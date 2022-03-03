import { PrismaClient } from "@prisma/client"
import { articles, users } from "../misc/tempData"

export const loadData = async () => {
    const prisma = new PrismaClient();

    try {
        const allUsers = await prisma.users.findMany();
        const allArticles = await prisma.articles.findMany();


        users.push(...allUsers);
        articles.push(...allArticles);
    } catch (e) {
        throw e;
    } finally {
        prisma.$disconnect;
    }
}