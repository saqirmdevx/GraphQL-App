import { PrismaClient } from "@prisma/client";

export interface IRequestContext {
    prisma: PrismaClient
}

const prisma = new PrismaClient;

export const GraphQLContext = async ():Promise<IRequestContext> => {
    // We can specify here what context will we use, we can use Auth context or guest context
    
    return {
        prisma,
    }
}