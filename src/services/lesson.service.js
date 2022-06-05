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
}

export default LessonService;