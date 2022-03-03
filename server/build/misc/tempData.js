"use strict";
// Generate Random Data //
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
exports.articles = exports.users = void 0;
const misc_1 = require("./misc");
const syllabes_1 = require("./syllabes");
const client_1 = require("@prisma/client");
// Generate 10 Random Articlesa and 10 Random Users //
exports.users = [];
exports.articles = [];
const syllabes = ["tes", "ges", "mus", "sim", "thl", "get", "fet", "tmt"];
// Generate 10 Random Users
const generateUser = (newId) => {
    const id = newId + 1;
    const name = (0, syllabes_1.generateText)();
    const age = (0, misc_1.random)(15, 50);
    const result = { id, name, age, likes: 0 };
    return result;
};
const generateArticle = (newId) => {
    const id = newId + 1;
    const title = (0, syllabes_1.generateText)(4, 8, 16);
    const context = (0, syllabes_1.generateText)(32, 64, 500, true);
    const curTime = BigInt(Date.now());
    const authorId = (0, misc_1.random)(1, exports.users.length - 1);
    const result = { id, title, context, authorId, addTime: curTime, likes: 0 };
    return result;
};
const generateData = (count) => __awaiter(void 0, void 0, void 0, function* () {
    const newArticles = [];
    const newUsers = [];
    for (let i = 0; i < count; i++) {
        newUsers.push(generateUser(exports.articles.length + newArticles.length));
        newArticles.push(generateArticle(exports.users.length + newUsers.length));
    }
    const prisma = new client_1.PrismaClient();
    try {
        const allUsers = yield prisma.users.createMany({ data: newUsers });
        const allArticles = yield prisma.articles.createMany({ data: newArticles });
        // add them to list
        exports.articles.push(...newArticles);
        exports.users.push(...newUsers);
        console.log("Created users: ", allUsers, "Created Articles: ", allArticles);
    }
    catch (e) {
        throw e;
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.default = generateData;
