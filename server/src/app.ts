import { ApolloServer } from "apollo-server-express";
import express from "express";
import generateData from "./misc/tempData";
import { GraphQLSchema } from "graphql";
import { MutationSchema, QuerySchema } from "./schema";

const app = express();

const apolloServer = new ApolloServer({
    schema: new GraphQLSchema({
        query: QuerySchema,
        mutation: MutationSchema

    }),
});

app.get("/", (req, res) => {
    res.send("Anything");
})

const start = async () => {
    generateData();
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    app.listen({ port: 4000 }, () => {
        console.log("Server is running");
        console.log(`gql path is ${apolloServer.graphqlPath}`);
    });
}

start();