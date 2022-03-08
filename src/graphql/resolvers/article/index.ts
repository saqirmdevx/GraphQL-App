import { Article } from "@/generated/graphql"
import { IRequestContext } from "@/utils/requestContext"
import article from "./query/article"
import articleList from "./query/articleList"

export default {
    Query: {
        article,
        articles: articleList
    },
    Article: {
        author: async (parent: Article, _: null, context: IRequestContext) => await context.prisma.users.findUnique({where: { id: parent.authorId }})
    }
}