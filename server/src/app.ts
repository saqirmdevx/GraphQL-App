import { ApolloServer } from "apollo-server";
import { GraphQLSchema } from "graphql";
import { MutationSchema, QuerySchema } from "./schema";
import { loadData } from "./database/db";
import generateData, { articles, users } from "./misc/tempData";

const GENERATE = 0; // Number of new rows of article and Users

const apolloServer = new ApolloServer({
    schema: new GraphQLSchema({
        query: QuerySchema,
        mutation: MutationSchema

    }),
});

const start = async () => {
    await loadData();

    if (GENERATE > 0)
        await generateData(GENERATE); // Generate 10 Articles and Users

    await apolloServer.listen(4000);

    console.log("Server is running");
    console.log(`gql path is ${apolloServer.graphqlPath}`);

    console.log(`We loaded: ${articles.length} articles and ${users.length} users`);
}

start();