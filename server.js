const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('./src/models/User');
const Article = require('./src/models/Article');
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

//user
app.post('/signup', (req, res, next) => {
    const user = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        workExperience: req.body.workExperience,
        currentWork: req.body.currentWork,
        detailInfo: "",
        listOfLessons: [],
        listOfArticles: [],
        ratedArticles: [],
        ratedLessons: [],
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

app.put('/user', (req, res, next) => {
    User.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, user) => {
        if(err) {
            res.send(err);
            next();
        }
        res.json(user);
    });
})

app.put('/user/rating', (req, res, next) => {
    User.findByIdAndUpdate(req.body.userId, {$set: {rating: req.body.rating}}, {new: true}, (err, user) => {
        if(err) {
            res.send(err);
            next();
        }
        res.json(user);
    });
})

//article
app.post('/article', (req, res, next) => {
    const article = new Article({
        title: req.body.title,
        subtitle: req.body.subtitle,
        content: req.body.content,
        lang: req.body.lang,
        author: req.body.author,
        authorId: req.body.authorId,
        date: req.body.date,
        assesments: [
            {
                userId: "default",
                assesment: 4.5,
            }
        ],
        rating: 4.5,
    });
    article.save((err) => {
        if(err) {
            return res.status(400).json({
                title: 'Error',
                error: err
            })
        }
        return res.status(200).json({
            title: 'Success'
        })
    });
    User.findByIdAndUpdate(req.body.authorId, {$push: {listOfArticles: article._id}}, {new: true}, (err, user) => {
        if(err) {
            console.log(err)
        }else{
            console.log('success')
        }
    });  
})

app.get('/article/:id', (req, res, next) => {
    Article.findById(req.params.id)
    .then(article => {
        if(!article) { return res.status(404).end(); }
        return res.status(200).json(article);
    })
    .catch(err => next(err));
})

app.get('/articles/:id', (req, res, next) => {
    Article.find({authorId: req.params.id}, (err, articles) => {
        if(err){
            res.send(err);
            next();
        }
        return res.json(articles);
    });
})

app.get('/articles', (req, res, next) => {
    Article.find({}, (err, articles) => {
        if(err){
            res.send(err);
            next();
        }
        res.json(articles);
    });
})

app.delete('/article/:id', (req, res, next) => {
    Article.findByIdAndRemove(req.params.id, (err, article) => {
        if(err) {
            res.send(err);
            next();
        }
        User.findByIdAndUpdate(article.authorId, {$pull: {listOfArticles: article._id, ratedArticles: article._id}}, {new: true}, (err, user) => {
            if(err) {
                console.log(err)
            }else{
                console.log('success');
            }
        });
        res.json(article);
    });
})

app.put('/article/update', (req, res, next) => {
    Article.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, article) => {
        if(err) {
            res.send(err);
            next();
        }
        res.json(article);
    });
})

app.put('/article/rating', (req, res, next) => {
    let assesment = {
        userId: req.body.userId,
        assesment: req.body.rating
    }
    Article.findByIdAndUpdate(req.body.articleId, {$push: {assesments: assesment }}, {new: true}, (err, article) => {
        if(err) {
            res.send(err);
            next();
        }
        User.findByIdAndUpdate(req.body.userId, {$push: { ratedArticles: article._id }}, {new: true}, (err, user) => {
            if(err) {
                console.log(err)
            }else{
                console.log('success');
            }
        });
        let assesments = [];
        article.assesments.forEach(assesment => {
            assesments.push(assesment.assesment);
        });
        let avarage = assesments.reduce((a, b) => a + b, 0) / assesments.length;
        Article.findByIdAndUpdate(req.body.articleId, {$set: {rating: avarage}}, {new: true}, (err, article) => {
            if(err) {
                res.send(err);
                next();
            }
            res.json(article);
        });
    });
})

