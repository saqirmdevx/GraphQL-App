import { GraphQLObjectType, GraphQLList, GraphQLInt } from "graphql";
import { users, articles } from "../misc/data_generator";
import ArticleType from "./types/ArticleType";
import UserType from "./types/UserType";

/**
 * Main Query schema
 */
const QuerySchema = new GraphQLObjectType({
    name: "Query",
    description: "Root query schema",
    fields: () => ({
        users: {
            type: new GraphQLList(UserType),
            description: "get all users",
            resolve: () => users
        },
        articles: {
            type: new GraphQLList(ArticleType),
            description: "Get all articles",
            resolve: () => articles
        },
        user: {
            type: UserType,
            description: "Get certain User",
            args: {
                id: {type: GraphQLInt }
            },
            resolve: (_, args) => users.find(user => user.id === args.id),
        },
        article: {
            type: ArticleType,
            description: "Get certain Article",
            args: {
                id: {type: GraphQLInt }
            },
            resolve: (_, args) => articles.find(article => article.id === args.id),
        }
    })
})

const MutationSchema = undefined;

export { QuerySchema, MutationSchema }