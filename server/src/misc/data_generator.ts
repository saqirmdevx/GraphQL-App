// Generate Random Data //

import { random } from "./misc";
import { generateText } from "./syllabes";
import { Articles, PrismaClient, Users } from '@prisma/client'

// This is only for testing purpose
export const users: Users[] = [];
export const articles: Articles[] = [];

/**
 * Generate new user with random data.
 * @param newId - Last id of user
 * @returns Return single generated User
 */
const generateUser = (newId: number): Users => { 
    const id = newId + 1;
    const name = generateText();

    const age = random(15, 50);

    const result = {id, name, age, likes: 0};
    return result;
}

/**
 * Generate new article with random data.
 * @param newId - Last id of Articles
 * @returns Return single generated Article
 */
const generateArticle = (newId: number): Articles => {
    const id = newId +1;
    const title = generateText(4, 8, 16);
    const context = generateText(32, 64, 500, true);
    const curTime = BigInt(Date.now());
    const authorId = random(1, users.length - 1);

    const result = { id, title, context, authorId, addTime: curTime, likes: 0}
    return result;
}

/**
 * Generate @param count articles & users and store them into database.
 * @param count - Count of data to be generated
 */
const generateData = async (count: number) => {
    const newArticles = [];
    const newUsers = [];

    for (let i = 0; i < count; i++) {
        newUsers.push(generateUser(articles.length + newArticles.length));
        newArticles.push(generateArticle(users.length + newUsers.length));
    }

    const prisma = new PrismaClient()
    try {
        const allUsers = await prisma.users.createMany({data: newUsers })
        const allArticles = await prisma.articles.createMany({data: newArticles})

        // add them to list
        articles.push(...newArticles);
        users.push(...newUsers);

        console.log("Created users: ", allUsers, "Created Articles: ", allArticles);
    } catch (e) {
        throw e;
    } finally {
        await prisma.$disconnect();
    }
}


export default generateData;