import { PrismaClient } from "@prisma/client"
import { users } from "../misc/data_generator";

/**
 * 
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
        const result = await prisma.users.create({data: userData});

        // Add user to result array
        users.push(result);
    } catch (e) {
        throw e;
    } finally {
        await prisma.$disconnect();
    }
}