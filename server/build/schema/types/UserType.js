"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const tempData_1 = require("../../misc/tempData");
const ArticleType_1 = __importDefault(require("./ArticleType"));
const UserType = new graphql_1.GraphQLObjectType({
    name: "User",
    description: "User registered to write an article.",
    fields: () => ({
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
        name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        age: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        likes: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        articles: {
            type: new graphql_1.GraphQLList(ArticleType_1.default),
            resolve: (parent) => tempData_1.articles.filter(article => article.authorId === parent.id),
        }
    })
});
exports.default = UserType;
