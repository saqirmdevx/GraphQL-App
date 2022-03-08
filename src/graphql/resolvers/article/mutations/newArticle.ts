import { MutationNewArticleArgs } from "@/generated/graphql";
import { IRequestContext } from "@/utils/requestContext";

const newArticle =  async (_: unknown, {input}: MutationNewArticleArgs, context: IRequestContext) => {
    /* Create new Article */
    const addTime = Date.now();
    
    return await context.prisma.articles.create({data: {...input, addTime}});
}

export default newArticle;