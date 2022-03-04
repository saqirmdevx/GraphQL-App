import { PrismaClient } from "@prisma/client"
import { articles, users } from "../misc/data_generator"

/**
 * Load all data from database. This is initial function
 */
export const initData = async () => {
    const prisma = new PrismaClient();

    try {
        // Fetch all data from database and fill our arrays
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