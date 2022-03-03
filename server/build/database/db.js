"use strict";
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
exports.loadData = void 0;
const client_1 = require("@prisma/client");
const tempData_1 = require("../misc/tempData");
const loadData = () => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new client_1.PrismaClient();
    try {
        const allUsers = yield prisma.users.findMany();
        const allArticles = yield prisma.articles.findMany();
        tempData_1.users.push(...allUsers);
        tempData_1.articles.push(...allArticles);
    }
    catch (e) {
        throw e;
    }
    finally {
        prisma.$disconnect;
    }
});
exports.loadData = loadData;
