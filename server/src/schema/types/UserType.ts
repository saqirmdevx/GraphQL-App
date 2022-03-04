import { Users } from "@prisma/client";
import { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLInt, GraphQLList } from "graphql";
import { getArticlesByAuthorId } from "../../database/dataGetters";
import ArticleType from "./ArticleType"

/**
 * GraphQL Object Type of User, This can be replaced with .graphql schemas that generate this.
 */
const UserType = new GraphQLObjectType<Users>({
    name: "User",
    description: "User registered to write an article.",
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLID) },
        name: {type: new GraphQLNonNull(GraphQLString) },
        age: {type: new GraphQLNonNull(GraphQLInt) },
        likes: {type: new GraphQLNonNull(GraphQLInt) },
        articles: {
            type: new GraphQLList(ArticleType),
            resolve: (parent) => getArticlesByAuthorId(parent.id)
        }
    })
})

export default UserType;