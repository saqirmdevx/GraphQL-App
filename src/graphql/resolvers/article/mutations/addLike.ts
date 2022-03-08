import { IRequestContext } from "@/utils/requestContext";

const likeArticle =  async (_: unknown, {id}: {id: number}, context: IRequestContext) => 
    await context.prisma.articles.update({data: {likes: {increment: 1}}, where: {id}});


export default likeArticle;