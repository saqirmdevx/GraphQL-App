"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const graphql_1 = require("graphql");
const schema_1 = require("./schema");
const db_1 = require("./database/db");
const tempData_1 = __importStar(require("./misc/tempData"));
const GENERATE = 0; // Number of new rows of article and Users
const apolloServer = new apollo_server_1.ApolloServer({
    schema: new graphql_1.GraphQLSchema({
        query: schema_1.QuerySchema,
        mutation: schema_1.MutationSchema
    }),
});
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.loadData)();
    if (GENERATE > 0)
        yield (0, tempData_1.default)(GENERATE); // Generate 10 Articles and Users
    yield apolloServer.listen(4000);
    console.log("Server is running");
    console.log(`gql path is ${apolloServer.graphqlPath}`);
    console.log(`We loaded: ${tempData_1.articles.length} articles and ${tempData_1.users.length} users`);
});
start();
