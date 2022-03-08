import 'graphql-import-node';
import { ApolloServer } from "apollo-server";
import { GraphQLContext } from "./utils/requestContext";
import generateData from "./misc/data_generator";
import { schema } from "./utils/schema";

const GENERATE = 0; // Number of new rows of article and Users

const apolloServer = new ApolloServer({
    schema,
    context: GraphQLContext
});

const start = async () => {
    if (GENERATE > 0)
        await generateData(GENERATE); // Generate 10 Articles and Users

    await apolloServer.listen(4000);

    console.log("Server is running");
    console.log(`gql path is ${apolloServer.graphqlPath}`);
}

start();