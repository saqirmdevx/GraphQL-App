// Generate Random Data //

import { IArticle, IUser } from "../@types";
import { random } from "./misc";
import { generateText } from "./syllabes";

// Generate 10 Random Articlesa and 10 Random Users //

export const users: IUser[] = [];
export const articles: IArticle[] = [];

const syllabes = ["tes", "ges", "mus", "sim", "thl", "get", "fet", "tmt"]


// Generate 10 Random Users
const generateUser = (): IUser => { 
    const id = users.length + 1;
    const name = generateText();

    const age = random(15, 50);

    const result = {id, name, age, likes: 0};
    return result;
}

const generateArticle = (): IArticle => {
    const id = articles.length +1;
    const title = generateText(4, 8, 16);
    const context = generateText(32, 64, 500, true);
    const curTime = Date.now();
    const authorId = random(1, users.length - 1);

    const result = { id, title, context, authorId, addTime: curTime, likes: 0}
    return result;
}

const generateData = () => {
    for (let i = 0; i < 10; i++) {
        users.push(generateUser());
        articles.push(generateArticle());
    }
}

export default generateData;