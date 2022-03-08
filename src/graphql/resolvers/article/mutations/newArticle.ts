import { MutationNewArticleArgs } from "@/generated/graphql";
import { IRequestContext } from "@/utils/requestContext";

const newArticle =  async (_: unknown, {input}: MutationNewArticleArgs, context: IRequestContext) => {
    /* Create new Article */
    const addTime = Date.now();
    const likes = 0; // Initial value
    
    return await context.prisma.articles.create({data: {...input, addTime, likes}});
}

export default newArticle;