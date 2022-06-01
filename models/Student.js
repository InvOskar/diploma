const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    email: {
        unique: true,
        type: String
    },
    password: String,
    firstName: String,
    lastName: String,
    dataOfBirth: String,
    grade: String,
    school: String,
});

const Student = mongoose.model('Student', studentSchema); 
module.exports = Student;