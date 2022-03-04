import { Articles } from "@prisma/client";
import { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLInt, GraphQLFloat } from "graphql";
import { getUserById } from "../../database/dataGetters";
import UserType from "./UserType";

/**
 * GraphQL Object Type of Articles, This can be replaced with .graphql schemas that generate this.
 */
const ArticleType: GraphQLObjectType<Articles> = new GraphQLObjectType({
    name: "Article",
    description: "Article written by a user",
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLID) },
        title: {type: new GraphQLNonNull(GraphQLString) },
        context: {type: new GraphQLNonNull(GraphQLString) },
        authorId: {type: new GraphQLNonNull(GraphQLInt) },
        likes: {type: new GraphQLNonNull(GraphQLInt) },
        addTime: {type: new GraphQLNonNull(GraphQLFloat) },
        
        author: {
            type: UserType,
            resolve: async (parent) => await getUserById(parent.authorId)
        }
    })
})

export default ArticleType;