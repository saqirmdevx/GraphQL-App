import { QueryArticleArgs } from "@/generated/graphql";
import { IRequestContext } from "@/utils/requestContext";

const article =  async (_: unknown, {input}: QueryArticleArgs, context: IRequestContext) => await context.prisma.articles.findUnique({where: {id: input.id}});

export default article;