"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const tempData_1 = require("../../misc/tempData");
const UserType_1 = __importDefault(require("./UserType"));
const ArticleType = new graphql_1.GraphQLObjectType({
    name: "Article",
    description: "Article written by a user",
    fields: () => ({
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
        title: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        context: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        authorId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        likes: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        addTime: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat) },
        author: {
            type: UserType_1.default,
            resolve: (parent) => tempData_1.users.find(user => user.id === parent.id)
        }
    })
});
exports.default = ArticleType;
