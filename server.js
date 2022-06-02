const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('./src/models/User');
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
    const user = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        workExperience: req.body.workExperience,
        currentWork: req.body.currentWork,
        role: req.body.role,
        listOfLessons: [],
        listOfArticles: [],
        rating: 4.5
    });
    user.save((err) => {
        if(err) {
            return res.status(400).json({
                title: 'Error',
                error: 'Email already in use'
            })
        }
        return res.status(200).json({
            title: 'Success'
        })
    });
})

app.post('/login', (req, res, next) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) return res.status(500).json({
            title: 'server error',
            error: err
        })
        if (!user) {
            return res.status(401).json({
              title: 'User not found',
              error: 'Invalid credentials'
            })
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
              tite: 'Login failed',
              error: 'Invalid credentials'
            })
        }
        let token = jwt.sign({ userId: user._id }, 'secretkey');
        return res.status(200).json({
            title: 'login sucess',
            token: token
        })
    });
})


app.get('/user/:id', (req, res, next) => {
    User.findById(req.params.id)
    .then(user => {
        if(!user) { return res.status(404).end(); }
        return res.status(200).json(user);
    })
    .catch(err => next(err));
})

app.get('/users', (req, res, next) => {
    User.find({}, (err, users) => {
        if(err){
            res.send(err);
            next();
        }
        res.json(users);
    });
})