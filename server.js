const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const Teacher = require('./models/Teacher');
const Student = require('./models/Student');
const bcrypt = require('bcrypt');

const app = express();

mongoose.connect('mongodb+srv://invosik:askar@diploma.roj8j.mongodb.net/?retryWrites=true&w=majority');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
    if (err) return console.log(`Server started on port ${port}`);
    console.log(`Server started on port ${port}`);
});

//routes
app.post('/signup', (req, res, next) => {
    if(req.body.role === 'teacher'){
        const teacher = new Teacher({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dataOfBirth: req.body.dataOfBirth,
            workExperience: req.body.workExperience,
            currentWork: req.body.currentWork,
        });
        teacher.save((err) => {
            if(err) {
                return res.status(400).json({
                    title: 'Error',
                    error: 'email in use'
                })
            }
            return res.status(200).json({
                title: 'Success'
            })
        });
    }else if(req.body.role === 'student'){
        const student = new Student({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dataOfBirth: req.body.dataOfBirth,
            grade: req.body.grade,
            school: req.body.school,
        });
        student.save((err, doc) => {
            if(err) return res.json({success: false, err});
            res.status(200).json({
                success: true,
                student: doc
            });
        });
    }
})

app.post('/login', (req, res, next) => {
    Teacher.findOne({email: req.body.email}, (err, user) => {
        if (err) return res.status(500).json({
            title: 'server error',
            error: err
          })
          if (!user) {
            return res.status(401).json({
              title: 'user not found',
              error: 'invalid credentials'
            })
          }
          if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
              tite: 'login failed',
              error: 'invalid credentials'
            })
          }
          let token = jwt.sign({ userId: user._id}, 'secretkey');
          return res.status(200).json({
            title: 'login sucess',
            token: token
          })
    });
})

app.get('/teacher', (req, res, next) => {
    let token = req.header.token;
    jwt.verify(token, 'secretkey', (err, decoded) => {
        if(err) return res.status(401).json({
            title: 'Not Authenticated',
        })
        Teacher.findOne({_id: decoded.userId}, (err, user) => {
            if(err) return res.status(500).json({
                title: 'server error',
                error: err
            })
            if(!user) return res.status(401).json({
                title: 'Not Authenticated',
            })
            return res.status(200).json({
                title: 'Success',
                user: user
            })
        })
    })
})