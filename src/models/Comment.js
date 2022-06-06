const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: String,
    userId: String,
    userName: String,
    postId: String,
    date: String,
});

const Comment = mongoose.model('Comment', commentSchema); 
module.exports = Comment;