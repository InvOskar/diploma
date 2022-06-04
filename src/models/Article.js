const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: String,
    subtitle: String,
    content: Array,
    author: String,
    authorId: String,
    lang: String,
    date: String,
    assesments: Array,
    rating: Number,
});

const Article = mongoose.model('Article', articleSchema); 
module.exports = Article;