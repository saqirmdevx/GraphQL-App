import { GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLString, GraphQLNonNull } from "graphql";
import { addUser, likeUser } from "../database/mutateData";
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
});

/** Mutation Schema */
const MutationSchema = new GraphQLObjectType({
    name: "Mutation",
    description: "Mutation query object",
    fields: () => ({
        addUser: {
            type: UserType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve: (parent, args) => addUser(args.name, args.age)
        },
        likeUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt)},
            },
            resolve: (parent, args) => likeUser(args.id)
        }
    })
});

export { QuerySchema, MutationSchema }