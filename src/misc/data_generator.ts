// Generate Random Data //

import { random } from "./misc";
import { generateText } from "./syllabes";
import { Articles, PrismaClient, Users } from '@prisma/client'

/**
 * Generate new user with random data
 * @param prisma - Prisma client reference
 * @returns Users data
 */
const generateUser = async (prisma: PrismaClient): Promise<Users> => { 
    const name = generateText();
    const age = random(15, 50);

    const data = {name, age, likes: 0};

    return await prisma.users.create({data});;
}

/**
 * Generate new Article with random data
 * @param prisma - Prisma client reference
 * @param AuthorIds - List of AuthorIds, randomly generate index to select author
 * @returns Article Data
 */
const generateArticle = async (prisma: PrismaClient, authorIds: number[]): Promise<Articles> => {
    const title = generateText(4, 8, 16);
    const context = generateText(32, 64, 500, true);
    const curTime = BigInt(Date.now());
    const randomIndex = random(1, authorIds.length - 1);

    const data = { title, context, authorId: authorIds[randomIndex], addTime: curTime, likes: 0}

    return await prisma.articles.create({data});
}

/**
 * Generate @param count articles & users and store them into database.
 * @param count - Count of data to be generated
 */
const generateData = async (count: number) => {
    // Initialize prisma client (Connect)
    const prisma = new PrismaClient();

    // Get all user IDS
    const userIdsQry = await prisma.users.findMany({select: {id: true }})
    const userIdList = userIdsQry.map(data => data.id);
    
    try {
        for (let i = 0; i < count; i++) {
            const newUser = await generateUser(prisma);
            if (!newUser) {
                console.error("Creating user failed");
            } else
                console.log(`New user with name ${newUser.name} and ID: ${newUser.id} has been added`);

            userIdList.push(newUser.id);

            const newArticle = await generateArticle(prisma, userIdList);
            if (!newArticle) {
                console.error("Creating article failed");
            } else
                console.log(`New article with title ${newArticle.title} and ID: ${newArticle.id} has been added`);
        }

    } catch (e) {
        throw e;
    } finally {
        await prisma.$disconnect();
    }
}


export default generateData;