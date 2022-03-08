import { mergeTypeDefs } from '@graphql-tools/merge'

// typeDefs
import * as ArticleType from "./typedefs/articleType.graphql";
import * as UserType from "./typedefs/userType.graphql";

export const mergedTypeDefs = mergeTypeDefs([
    ArticleType,
    UserType
]);