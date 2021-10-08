const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config({path: './.env'});
const env = require('env');
var cors = require('cors');
const exphbs = require('express-handlebars')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { deserializeUser } = require("passport");
const cookieParser = require('cookie-parser')
const sessions = require('express-session')
const {User} = require('./models/user')

const PORT = process.env.PORT;
const URI = process.env.URI;
console.log(PORT);

const atlas_uri = process.env.DB_URI
mongoose.connect(atlas_uri, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"))

db.once("open", function() {
    console.log("Connection Succesful!")
})

const app = express();

const oneDay = 1000 * 60 * 60 * 24; //max time for a cookie before expiration

app.use(sessions({
    secret: "thisismysecrctesdfewe212keyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

app.use(cookieParser()); //add the cookie parser middleware

// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }

app.use(cors({
    origin: '*' //access-control-allow-credentials:true
}));

app.use(express.urlencoded({extended: false}))
app.use(express.json());

app.get('/', (req, res)=>{
    var session = req.session;
    if(session.userid){
        res.send("you are logged in" + session.userid + " " + JSON.stringify(session))
    }else{
        res.send("go to hell")
    }
})

const auth = (req, res, next) => {
    console.log(JSON.stringify(req.session) ) 
    if(req.session==null || req.session.userid==null ){
        console.log("not logged in")
        res.status(405); //tell them to login
        res.send("wow");
    }else{
        console.log("ALL GOOD - logged in")
        next();
    }
}

app.post('/login', async (req, res) => {
    //find the corresponding user to authenticate the password with
    const cur = await User.findOne({username: req.body.username})
    console.log(JSON.stringify(cur));
    //authenticate the password
    if(cur!= null && req.body.password == cur.password){
        session = req.session;
        session.userid = req.body.username;
        // console.log(req.session)
        res.send("here you are all logged in wow")
    } else {
        // res.send(JSON.stringify(req))
        res.send("we got it: " + JSON.stringify(req.body) )
    }
})

app.get('/logout', (req,res)=> {
    req.session.destroy();
    res.redirect('/');
})


app.post('/createAccount', (req, res) => {
    var newUser = new User({username: req.body.username , password: req.body.password })

    newUser.save(function(err, doc) {
        if(err) res.status(403);
        else res.send("user created successfully")
        console.log("User registered successfully!");
    })
})

app.post('/deleteAccount', auth, (req, res) => {
    User.deleteOne({username: req.session.userid});
    req.session.destroy();
    res.send("account deleted " + req.session.userid);
})

app.post('addCourse', auth, (req,res) => {




})

app.post('removeCourse', auth, (req, res) => {


    




})

//get all events of logged in user
app.get('userCourses' ,  auth, async (req, res) => {
    const cur_user = await User.findOne({username: req.session.userid});
    res.send(cur_user.courses);
})


app.get("/", (req, res) => {
//    res.render("index", {title: "Home"}) //render from template 
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

module.exports = app;

