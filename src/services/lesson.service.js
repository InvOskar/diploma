import apiEnv from "../env/apiEnv";
import axios from "axios";

const HOST = apiEnv.HOST

class LessonService {
    async createLesson(lesson){
        return await axios.post(`${HOST}/lesson`, {...lesson})
        .then(res => {
            let lesson = res.data;
            return lesson;
        });
    }
    async getLessons(){
        return await axios.get(`${HOST}/lessons`)
        .then(res => {
            let lessons = res.data;
            return lessons;
        });
    }
    async getLessonById(id){
        return await axios.get(`${HOST}/lesson/${id}`)
        .then(res => {
            let lesson = res.data;
            return lesson;
        });
    }
    async getLessonsByUserId(id){
        return await axios.get(`${HOST}/lessons/${id}`)
        .then(res => {
            let lessons = res.data;
            return lessons;
        });
    }
    async deleteLesson(id){
        return await axios.delete(`${HOST}/lesson/${id}`)
        .then(res => {
            let lesson = res.data;
            return lesson;
        });
    }
    async updateLesson(lesson){
        return await axios.put(`${HOST}/lesson/update`, lesson)
        .then(res => {
            let user = res.data;
            return user;
        });
    }
    async updateRating(item){
        return await axios.put(`${HOST}/lesson/rating`, item)
        .then(res => {
            let lesson = res.data;
            return lesson;
        });
    }
}

export default LessonService;