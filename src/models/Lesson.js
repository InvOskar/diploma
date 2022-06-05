const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
    title: String,
    description: String,
    content: Array,
    author: String,
    authorId: String,
    lang: String,
    date: String,
    assesments: Array,
    rating: Number,
});

const Lesson = mongoose.model('Lesson', lessonSchema); 
module.exports = Lesson;