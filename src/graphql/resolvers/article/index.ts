import { Article } from "@/generated/graphql"
import { IRequestContext } from "@/utils/requestContext"
import article from "./query/article"
import articleList from "./query/articleList"
import newArticle from "./mutations/newArticle"
import likeArticle from "./mutations/addLike"

export default {
    Query: {
        article,
        articles: articleList
    },
    Mutation: {
        newArticle,
        likeArticle,
    },
    Article: {
        author: async (parent: Article, _: null, context: IRequestContext) => await context.prisma.users.findUnique({where: { id: parent.authorId }})
    }
}