import { ApolloServer } from "apollo-server";
import generateData, { articles, users } from "./misc/tempData";
import { IArticle, IUser  } from "./@types";
import { GraphQLFloat, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";

const ArticleType: GraphQLObjectType<IArticle> = new GraphQLObjectType({
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
            resolve: (parent) => users.find(user => user.id === parent.id)
        }
    })
})

const UserType = new GraphQLObjectType<IUser>({
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

const server = new ApolloServer({
    schema: new GraphQLSchema({
        query: QuerySchema,

    }),
});

const start = async () => {
    generateData();
    try {
        await server.listen(4000);
    } catch (e) {
        console.error(e);
    }

}

start();