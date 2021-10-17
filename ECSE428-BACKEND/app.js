const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config({ path: './.env' });
const env = require('env');
var cors = require('cors');
const exphbs = require('express-handlebars')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { deserializeUser } = require("passport");
const cookieParser = require('cookie-parser')
const sessions = require('express-session')
const { User } = require('./models/user')
const { Course } = require('./models/course')

const PORT = process.env.PORT;
const URI = process.env.URI;

var app = express();

const SESSION_LIFE = 1000 * 60 * 60 * 24; //max time for a cookie before expiration

app.use(sessions({
    secret: "thisismysecrctesdfewe212keyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: SESSION_LIFE },
    resave: false
}));

app.use(cookieParser()); //add the cookie parser middleware


app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3100'], //access-control-allow-credentials:true
    credentials: true
}));

app.use(express.urlencoded({ extended: false }))
app.use(express.json());


app.get('/', (req, res) => {
    var session = req.session;
    if (session.userid) {
        res.status(200).send({ message: "you are logged in" + session.userid + " " + JSON.stringify(session) })
    } else {
        res.status(400).send({ message: "you are not logged in" })
    }
})

const auth = (req, res, next) => {
    console.log(JSON.stringify(req.session))
    if (req.session == null || req.session.userid == null) {
        console.log("not logged in")
        res.status(405); //tell them to login
        res.send({ message: "wow" });
    } else {
        console.log("ALL GOOD - logged in")
        next();
    }
}

app.post('/login', async (req, res) => {
    //find the corresponding user to authenticate the password with
    const cur = await User.findOne({ username: req.body.username })

    //authenticate the password
    if (cur != null && req.body.password == cur.password) {
        session = req.session;
        session.userid = req.body.username;

        res.status(200).send({
            message: "logged in"
        });
    } else {
        res.status(400).send({
            message: 'login failed: incorrect username or password'
        });
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})


app.post('/createAccount', (req, res) => {
    var newUser = new User({ username: req.body.username, password: req.body.password })

    newUser.save(function (err, doc) {
        if (err) res.status(403).send({ message: "user not created" });
        else res.send({ message: "user created successfully" })
    })
})

app.post('/deleteAccount', auth, async (req, res) => {
    console.log("here it is man")
    // console.log(req.session.userid);
    // var usr = JSON.stringify(req.session.userid);
    User.deleteOne({username:req.session.userid}).then(function(){
        console.log("Data deleted\n"); // Success
    }).catch(function(error){
        console.log(error); // Failure
    });
    // var usr = User.findOne({username: req.session.userid} ).remove();

    console.log(req.session.userid)

    req.session.destroy();
    res.send("account deleted");
})

// deleteAccount = (username, password) => {
//     var usr = User.findOne({username: username})
//     if (usr.password === password) {
//         User.deleteOne({username: username});
//         return true; 
//     }else{
//         return false;
//     }
// }

//user wants to add COMP250, 
//is it in the courses collection, 
//if not, don't add it to user
// if it is
//find User, and add course to list

app.post('/addCourse', auth, async (req, res) => {

    var new_course = await Course.findOne({ code: req.body.course });

    //if course doesn't exist we populate it 
    // if(new_course == null){
    //     new_course = new Course({code : req.body.course})
    //     new_course.save();
    // }

    User.findOneAndUpdate(
        { username: req.session.userid },
        { $push: { courses: req.body.course } },
        function (err, doc) {
            if (err) {
                res.status(403);
                res.send({ message: "failure - course cannot be added " });
            }
            else res.send({ message: "success - course added" })
        })
})



app.post('/removeCourse', auth, (req, res) => {

    User.findOneAndUpdate(
        { username: req.session.userid },
        { $pull: { courses: req.body.course } },
        function (err, doc) {
            if (err) {
                res.status(403);
                res.send({ message: "failure - course cannot be REMOVED" });
            }
            else res.send({ message: "success - course REMOVED" })
        })
})

app.post('/populateCourse', (req, res) => {


})

//get all events of logged in user
app.get('/userCourses', auth, async (req, res) => {
    const cur_user = await User.findOne({ username: req.session.userid });
    res.send(cur_user.courses);
})



module.exports = app;
