import { PrismaClient } from "@prisma/client"
import { users } from "../misc/data_generator";

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

        // Add user to result array
        users.push(result);
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
        await prisma.users.update({
            where: { id },
            data: { likes: { increment: 1 }}
        });

        const usr = users.find(user => user.id == id);
        usr && (usr.likes = usr.likes ? usr.likes + 1 : 1);

        /** NOTE: 
          * Depends on our structure, here we can just check if in DB something has changed and show result
          * If we store all records, we can perform changes only inside this temp records and then once per X minutes we can sync records with Database.
          * In case of 1 milion users, we should not store all users inside list and memory, we should use databsae for it.
         */

        console.log(usr);
    } catch (e) {
        throw e;
    } finally {
        await prisma.$disconnect();
    }
}