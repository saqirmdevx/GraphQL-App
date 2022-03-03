import { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLInt, GraphQLFloat } from "graphql";
import { IArticle } from "../../@types";
import { users } from "../../misc/tempData";
import UserType from "./UserType";

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

export default ArticleType;