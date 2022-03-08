import { IRequestContext } from "@/utils/requestContext";

const articleList = async (_: unknown, __: undefined, context: IRequestContext) =>  await context.prisma.articles.findMany()

export default articleList