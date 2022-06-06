const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('./src/models/User');
const Article = require('./src/models/Article');
const Lesson = require('./src/models/Lesson');
const Comment = require('./src/models/Comment');
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
    User.findByIdAndUpdate(req.body.id, {$set: {rating: req.body.newRating}}, {new: true}, (err, user) => {
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
        User.findByIdAndUpdate(req.body.authorId, {$push: {listOfArticles: article._id}}, {new: true}, (err, user) => {
            if(err) {
                console.log(err)
            }else{
                console.log('success')
            }
        });  
        return res.status(200).json({
            title: 'Success'
        })
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

//lesson
app.post('/lesson', (req, res, next) => {
    const lesson = new Lesson({
        title: req.body.title,
        description: req.body.description,
        subject: req.body.subject,
        content: [],
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
    lesson.save((err) => {
        if(err) {
            return res.status(400).json({
                title: 'Error',
                error: err
            })
        }
        return res.status(200).json(lesson);
    });
    User.findByIdAndUpdate(req.body.authorId, {$push: {listOfLessons: lesson._id}}, {new: true}, (err, user) => {
        if(err) {
            console.log(err)
        }else{
            return lesson._id;
        }
    });
})

app.get('/lessons/', (req, res, next) => {
    Lesson.find({}, (err, lessons) => {
        if(err){
            res.send(err);
            next();
        }
        res.json(lessons);
    });
})

app.get('/lesson/:id/', (req, res, next) => {
    Lesson.findById(req.params.id)
    .then(lesson => {
        if(!lesson) { return res.status(404).end(); }
        return res.status(200).json(lesson);
    })
    .catch(err => next(err));
})

app.get('/lessons/:id', (req, res, next) => {
    Lesson.find({authorId: req.params.id}, (err, lessons) => {
        if(err){
            res.send(err);
            next();
        }
        res.json(lessons);
    });
})

app.delete('/lesson/:id', (req, res, next) => {
    Lesson.findByIdAndRemove(req.params.id, (err, lesson) => {
        if(err) {
            res.send(err);
            next();
        }
        User.findByIdAndUpdate(lesson.authorId, {$pull: {listOfLessons: lesson._id, ratedLessons: lesson._id}}, {new: true}, (err, user) => {
            if(err) {
                console.log(err)
            }else{
                console.log('success');
            }
        });
        res.json(lesson);
    });
})

app.put('/lesson/update', (req, res, next) => {
    Lesson.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, lesson) => {
        if(err) {
            res.send(err);
            next();
        }
        res.json(lesson);
    });
})

app.put('/lesson/rating', (req, res, next) => {
    let assesment = {
        userId: req.body.userId,
        assesment: req.body.rating
    }
    Lesson.findByIdAndUpdate(req.body.lessonId, {$push: {assesments: assesment }}, {new: true}, (err, lesson) => {
        if(err) {
            res.send(err);
            next();
        }
        User.findByIdAndUpdate(req.body.userId, {$push: { ratedLessons: lesson._id }}, {new: true}, (err, user) => {
            if(err) {
                console.log(err)
            }else{
                console.log('success');
            }
        });
        let assesments = [];
        lesson.assesments.forEach(assesment => {
            assesments.push(assesment.assesment);
        });
        let avarage = assesments.reduce((a, b) => a + b, 0) / assesments.length;
        Lesson.findByIdAndUpdate(req.body.lessonId, {$set: {rating: avarage}}, {new: true}, (err, lesson) => {
            if(err) {
                res.send(err);
                next();
            }
            res.json(lesson);
        });
    });
})

//comment
app.post('/comment', (req, res, next) => {
    const comment = new Comment({
        content: req.body.content,
        userId: req.body.userId,
        userName: req.body.userName,
        postId: req.body.postId,
        date: req.body.date,
    });
    comment.save((err) => {
        if(err) {
            return res.status(400).json({
                title: 'Error',
                error: err
            })
        }
        return res.status(200).json(comment);
    });
})

app.get('/comments/:id', (req, res, next) => {
    Comment.find({postId: req.params.id}, (err, comments) => {
        if(err){
            res.send(err);
            next();
        }
        res.json(comments);
    });
})

app.put('/comment/update', (req, res, next) => {
    Comment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, comment) => {
        if(err) {
            res.send(err);
            next();
        }
        res.json(comment);
    });
})

app.delete('/comment/:id', (req, res, next) => {
    Comment.findByIdAndRemove(req.params.id, (err, comment) => {
        if(err) {
            res.send(err);
            next();
        }
        res.json(comment);
    });
})



