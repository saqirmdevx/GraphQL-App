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
 * @param id - [Number] Age of the user
 */
export const likeUser = async (id: number) => {
    // Connect Prisma client
    const prisma = new PrismaClient;

    try {
        // Add User to database
        const result = await prisma.users.update({
            where: { id },
            data: { likes: { increment: 1 }}
        });

        console.log(result);
    } catch (e) {
        throw e;
    } finally {
        await prisma.$disconnect();
    }
}