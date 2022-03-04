import { Articles, PrismaClient, Users } from "@prisma/client";

type GetAllUsers = {
    limit?: number
}

type GetAllArticles = {
    limit?: number
}

/**
 * Function will use prisma databse to fetch users from databse and return it back.
 * @param limit - Maximum size of users that will be returned
 * @returns Return list of users stored in databse
 */
export const getAllUsers = async ({limit}: GetAllUsers = {limit: 1000}): Promise<Users[]> => {
    // Connect Prisma client
    const prisma = new PrismaClient;

    try {
        // Add User to database
        return await prisma.users.findMany({take: limit});
    } catch (e) {
        throw e;
    } finally {
        await prisma.$disconnect();
    }
}

/**
 * Function will use prisma databse to fetch articles from databse and return it back.
 * @param limit - Maximum size of articles that will be returned
 * @returns Return list of articles stored in databse
 */
export const getAllArticles = async ({limit}: GetAllArticles = {limit: 1000}): Promise<Articles[]> => {
    // Connect Prisma client
    const prisma = new PrismaClient;

    try {
        // Add User to database
        return await prisma.articles.findMany({take: limit});
    } catch (e) {
        throw e;
    } finally {
        await prisma.$disconnect();
    }
}

/**
 * Find a single user by ID
 * @param id - Unique Id of user
 * @returns Return a certain user with specific unique ID or NULL if does not exists
 */
export const getUserById = async (id: number): Promise<Users|null> => {
    // Connect Prisma client
    const prisma = new PrismaClient;

    try {
        // Add User to database
        return await prisma.users.findUnique({where: { id }});
    } catch (e) {
        throw e;
    } finally {
        await prisma.$disconnect();
    }
}

/**
 * Find a single article by ID
 * @param id - Unique Id of article
 * @returns Return a certain article with specific unique ID or NULL if does not exists
 */
 export const getArticleById = async (id: number): Promise<Articles|null> => {
    // Connect Prisma client
    const prisma = new PrismaClient;

    try {
        // Add User to database
        const result = await prisma.articles.findUnique({where: { id }});

        return result;
    } catch (e) {
        throw e;
    } finally {
        await prisma.$disconnect();
    }
}

/**
 * Find a single article by ID
 * @param id - Unique Id of article
 * @returns Return a certain article with specific unique ID or NULL if does not exists
 */
 export const getArticlesByAuthorId = async (authorId: number): Promise<Articles[]|null> => {
    // Connect Prisma client
    const prisma = new PrismaClient;

    try {
        // Add User to database
        return await prisma.articles.findMany({where: { authorId }});
    } catch (e) {
        throw e;
    } finally {
        await prisma.$disconnect();
    }
}