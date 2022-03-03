import { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLInt, GraphQLList } from "graphql";
import { IUser } from "../../@types";
import { articles } from "../../misc/tempData";
import ArticleType from "./ArticleType"

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

export default UserType;