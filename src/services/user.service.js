import apiEnv from "../env/apiEnv";
import axios from "axios";

const HOST = apiEnv.HOST

class UserService {
    getIdByToken(token){
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return (JSON.parse(jsonPayload).userId);
    }
    async getAuthUser(){
        let token = localStorage.getItem('token');
        let userId = this.getIdByToken(token);
        return await axios.get(`${HOST}/user/${userId}`)
        .then(res => {
            let user = res.data;
            return user;
        });
    }
    async getUserById(id){
        return await axios.get(`${HOST}/user/${id}`)
        .then(res => {
            let user = res.data;
            return user;
        });
    }
    async getUsers(){
        return await axios.get(`${HOST}/users`)
        .then(res => {
            let users = res.data;
            return users;
        });
    }
    async updateUser(user){
        return await axios.put(`${HOST}/user`, user)
        .then(res => {
            let user = res.data;
            return user;
        });
    }
    async updateRating(item){
        return await axios.put(`${HOST}/user/rating`, item)
        .then(res => {
            let user = res.data;
            return user;
        });
    }
}

export default UserService;