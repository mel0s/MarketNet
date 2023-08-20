import { Article } from "./Article"
import { Client } from "./Client"
export interface ClientArticle{
    id?: number
    clientId: number
    articleId: number
    client?:Client,
    article?: Article
}