import { mergeResolvers } from '@graphql-tools/merge';

// Resolvers
import user from "./user"
import article from "./article"

export default mergeResolvers([
    user,
    article
  ])