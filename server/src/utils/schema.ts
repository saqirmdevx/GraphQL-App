import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergedTypeDefs } from "../graphql";
import resolvers  from "../graphql/resolvers";

export const schema = makeExecutableSchema({
    typeDefs: mergedTypeDefs,
    resolvers
})