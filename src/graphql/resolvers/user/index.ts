import { User } from "@/generated/graphql";
import { IRequestContext } from "@/utils/requestContext";
import user from "./query/user";
import userList from "./query/userList";
import newUser from "./mutation/newUser";
import likeUser from "./mutation/likeUser";

export default {
    Query: {
        user,
        users: userList
    },
    Mutation: {
        newUser,
        likeUser
    },
    User: {
        articles: async (parent: User, _: undefined, context: IRequestContext) => await context.prisma.articles.findMany({where: { authorId: parent.id }})
    }
}