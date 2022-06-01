const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    email: {
        unique: true,
        type: String
    },
    password: String,
    firstName: String,
    lastName: String,
    dataOfBirth: String,

    workExperience: String,
    currentWork: String,
});

const Teacher = mongoose.model('Teacher', teacherSchema); 
module.exports = Teacher;