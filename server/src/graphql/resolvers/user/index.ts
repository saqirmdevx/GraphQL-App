import { User } from "@/generated/graphql";
import { IRequestContext } from "@/utils/requestContext";
import user from "./query/user";
import userList from "./query/userList";

export default {
    Query: {
        user,
        users: userList
    },
    User: {
        articles: async (parent: User, _: undefined, context: IRequestContext) => await context.prisma.articles.findMany({where: { authorId: parent.id }})
    }
}