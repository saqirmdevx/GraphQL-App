// Define data type
interface IUser {
    id: number
    name: string
    age: number
    likes: number
}

interface IArticle {
    id: number
    title: string
    context: string
    authorId: number
    likes: number
    addTime: number // We can convert it to actual time
}

export { IUser, IArticle }