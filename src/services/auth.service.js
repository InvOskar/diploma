import apiEnv from "../env/apiEnv";
import axios from "axios";

const HOST = apiEnv.HOST

class AuthService {
    async register(user){
        return await axios.post(`${HOST}/signup`, {...user})
        .then(res => {
            res.data;
        });
    }
    async login(user){
        return await axios.post(`${HOST}/login`, {...user})
        .then(res => {
            localStorage.setItem('token', res.data.token);
            res.data;
        });
    }
}

export default AuthService;