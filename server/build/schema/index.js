"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MutationSchema = exports.QuerySchema = void 0;
const graphql_1 = require("graphql");
const tempData_1 = require("../misc/tempData");
const ArticleType_1 = __importDefault(require("./types/ArticleType"));
const UserType_1 = __importDefault(require("./types/UserType"));
const QuerySchema = new graphql_1.GraphQLObjectType({
    name: "Query",
    description: "Root query schema",
    fields: () => ({
        users: {
            type: new graphql_1.GraphQLList(UserType_1.default),
            description: "get all users",
            resolve: () => tempData_1.users
        },
        articles: {
            type: new graphql_1.GraphQLList(ArticleType_1.default),
            description: "Get all articles",
            resolve: () => tempData_1.articles
        },
        user: {
            type: UserType_1.default,
            description: "Get certain User",
            args: {
                id: { type: graphql_1.GraphQLInt }
            },
            resolve: (_, args) => tempData_1.users.find(user => user.id === args.id),
        },
        article: {
            type: ArticleType_1.default,
            description: "Get certain Article",
            args: {
                id: { type: graphql_1.GraphQLInt }
            },
            resolve: (_, args) => tempData_1.articles.find(article => article.id === args.id),
        }
    })
});
exports.QuerySchema = QuerySchema;
const MutationSchema = undefined;
exports.MutationSchema = MutationSchema;
