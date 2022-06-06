import apiEnv from "../env/apiEnv";
import axios from "axios";

const HOST = apiEnv.HOST

class CommentService {
    async createComment(comment){
        return await axios.post(`${HOST}/comment`, {...comment})
        .then(res => {
            let comment = res.data;
            return comment;
        });
    }
    async getCommentsByPostId(id){
        return await axios.get(`${HOST}/comments/${id}`)
        .then(res => {
            let comments = res.data;
            return comments;
        });
    }
    async updateComment(comment){
        return await axios.put(`${HOST}/comment/update`, comment)
        .then(res => {
            let comment = res.data;
            return comment;
        });
    }
    async deleteComment(id){
        return await axios.delete(`${HOST}/comment/${id}`)
        .then(res => {
            let comment = res.data;
            return comment;
        });
    }
}

export default CommentService;