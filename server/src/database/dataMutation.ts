import { PrismaClient } from "@prisma/client"

/**
 * add New User and Update Database
 * @param name - [String] Name of the user 
 * @param age - [Number] Age of the user
 */
export const addUser = async (name: string, age: number) => {
    // Connect Prisma client
    const prisma = new PrismaClient;

    /** Get last ID */
    const userData = {
        name,
        age,
        likes: 0
    }

    try {
        // Add User to database
        const result = await prisma.users.create({ data: userData });
        console.log("User has been added: ");
        console.dir(result);
    } catch (e) {
        throw e;
    } finally {
        await prisma.$disconnect();
    }
}

/**
 *  Add 1 like to User and update database
 * @param id - [Number] ID of the user
 */
export const likeUser = async (id: number) => {
    // Connect Prisma client
    const prisma = new PrismaClient;

    try {
        // Add User to database
        const result = await prisma.users.update({
            where: { id },
            data: { likes: { increment: 1 } }
        });

        console.log(result);
    } catch (e) {
        throw e;
    } finally {
        await prisma.$disconnect();
    }
}

type ArticleProps = {
    title: string
    context: string
    authorId: number
}

/**
 * Add new article to database
 * @param title - [String] - Title of your article
 * @param context - [String] - Context of your article
 * @param authorId - [Number] - ID of author
 */
export const addArticle = async ({ title, context, authorId }: ArticleProps) => {
    // Connect Prisma client
    const prisma = new PrismaClient;

    try {
        // First we check if author exists
        const author = await prisma.users.count({where: {id: authorId}});
        if (!author) {
            console.error(`Author with ID: ${authorId} does not exists! Aborting.`);
            return;
        }

        const currentTime = BigInt(Date.now());

        const result = await prisma.articles.create({ data: {
             title,
             context, 
             authorId,
             likes: 0,
             addTime: currentTime,
        }});

        console.log("Article has been added: ");
        console.dir(result);
    } catch (e) {
        throw e;
    } finally {
        await prisma.$disconnect();
    }
}

/**
 *  Add 1 like to Article and update database
 * @param id - [Number] Id of the Article
 */
export const likeArticle = async (id: number) => {
    // Connect Prisma client
    const prisma = new PrismaClient;

    try {
        // Add User to database
        const result = await prisma.articles.update({
            where: { id },
            data: { likes: { increment: 1 } }
        });

        console.log(result);
    } catch (e) {
        throw e;
    } finally {
        await prisma.$disconnect();
    }
}

/**
 *  Add 1 like to all Articles of author
 * @param authorId - [Number] Id of the author of articles
 */
 export const likeAllAuthorArticles = async (authorId: number) => {
    // Connect Prisma client
    const prisma = new PrismaClient;

    try {
        // Add User to database
        const result = await prisma.articles.updateMany({
            where: { authorId },
            data: { likes: { increment: 1 } }
        });

        console.log(result);
    } catch (e) {
        throw e;
    } finally {
        await prisma.$disconnect();
    }
}