import apiEnv from "../env/apiEnv";
import axios from "axios";

const HOST = apiEnv.HOST

class ArticleService {
    async getArticles(){
        return await axios.get(`${HOST}/articles`)
        .then(res => {
            let articles = res.data;
            return articles;
        });
    }
    async getArticleById(id){
        return await axios.get(`${HOST}/article/${id}`)
        .then(res => {
            let article = res.data;
            return article;
        });
    }
    async getArticlesByUserId(id){
        return await axios.get(`${HOST}/articles/${id}`)
        .then(res => {
            let articles = res.data;
            return articles;
        });
    }
    async createArticle(article){
        return await axios.post(`${HOST}/article`, {...article})
        .then(res => {
            let article = res.data;
            return article;
        });
    }
    async updateArticle(article){
        return await axios.put(`${HOST}/article/update`, article)
        .then(res => {
            let user = res.data;
            return user;
        });
    }
    async deleteArticle(id){
        return await axios.delete(`${HOST}/article/${id}`)
        .then(res => {
            let article = res.data;
            return article;
        });
    }
    async updateRating(item){
        return await axios.put(`${HOST}/article/rating`, item)
        .then(res => {
            let article = res.data;
            return article;
        });
    }
}

export default ArticleService;