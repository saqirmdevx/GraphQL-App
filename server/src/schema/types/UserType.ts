import { Users } from "@prisma/client";
import { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLInt, GraphQLList } from "graphql";
import { articles } from "../../misc/data_generator";
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
            resolve: (parent) => articles.filter(article => article.authorId === parent.id),
        }
    })
})

export default UserType;