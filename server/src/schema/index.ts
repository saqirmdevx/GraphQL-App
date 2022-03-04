import { GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLString, GraphQLNonNull } from "graphql";
import { getAllArticles, getAllUsers, getArticleById, getUserById } from "../database/dataGetters";
import { addUser, likeUser } from "../database/dataMutation";
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
            resolve: async () => await getAllUsers()
        },
        articles: {
            type: new GraphQLList(ArticleType),
            description: "Get all articles",
            resolve: async () => await getAllArticles()
        },
        user: {
            type: UserType,
            description: "Get certain User",
            args: {
                id: {type: GraphQLInt }
            },
            resolve: async (_, args) => await getUserById(args.id)
        },
        article: {
            type: ArticleType,
            description: "Get certain Article",
            args: {
                id: {type: GraphQLInt }
            },
            resolve: async (_, args) => await getArticleById(args.id)
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
            resolve: async (_, args) => await addUser(args.name, args.age)
        },
        likeUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt)},
            },
            resolve: async (_, args) => await likeUser(args.id)
        }
    })
});

export { QuerySchema, MutationSchema }