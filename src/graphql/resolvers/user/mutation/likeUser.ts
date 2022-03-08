import { IRequestContext } from "@/utils/requestContext";

const likeUser =  async (_: unknown, {id}: {id: number}, context: IRequestContext) => 
    await context.prisma.users.update({data: {likes: {increment: 1}}, where: {id}});


export default likeUser;