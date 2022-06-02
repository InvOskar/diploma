const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        unique: true,
        type: String
    },
    password: String,
    firstName: String,
    lastName: String,
    dateOfBirth: String,
    workExperience: String,
    currentWork: String,
    role: String,
    listOfLessons: [],
    listOfArticles: [],
    rating: Number
});

const User = mongoose.model('User', userSchema); 
module.exports = User;