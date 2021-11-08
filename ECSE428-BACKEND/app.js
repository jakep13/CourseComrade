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
    if (req.session == null || req.session.userid == null) {
        res.status(405); //tell them to login
        res.send({ message: "not logged in" });
    } else {
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

app.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})


app.post('/createAccount', (req, res) => {
    const verif_password = req.body.verif_password || req.body.password;

    const pass_regex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
    if (!pass_regex.test(req.body.password)) {
        res.status(400).send({ message: "invalid password" });
    } else if (req.body.password === verif_password) {
        var newUser = new User({ username: req.body.username, password: req.body.password })

        newUser.save(function (err, doc) {
            if (err) res.status(403).send({ message: "username already taken" });
            else res.send({ message: "user created successfully" })
        })
    } else {
        res.status(400).send({ message: "please enter your password twice" });
    }
});

app.post('/deleteAccount', auth, async (req, res) => {
    User.deleteOne({ username: req.session.userid }, function (err, user) {
        if (err) {
            res.status(403).send({ message: "error: account not deleted" });
        } else {
            req.session.destroy();
            res.status(200).send("account deleted");
        }
    });
})

// modify account
app.put('/modifyAccount', auth, async (req, res) => {
    const newUsername = req.body.username;
    const newPassword = req.body.password;
    let update;

    // set update
    if (newUsername && newPassword) {
        update = { username: newUsername, password: newPassword };
    } else if (newUsername) {
        update = { username: newUsername };
    } else if (newPassword) {
        update = { password: newPassword };
    } else {
        res.status(403).send({ error: "invalid input", message: "input new username or new password" })
        return;
    }

    // validate new entries
    if (newPassword) {
        const pass_regex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
        if (!pass_regex.test(newPassword)) {
            res.status(400).send({ error: "invalid input", message: "invalid password" });
            return;
        }
    }
    if (newUsername) {
        const user_regex = /^.{3,20}$/;
        if (!user_regex.test(newUsername)) {
            res.status(400).send({ error: "invalid input", message: "invalid username - must be between 3-20 characters" });
            return;
        }
    }

    // make sure username is not taken
    if (newUsername) {
        const user = await User.findOne({ username: newUsername });

        if (user) {
            res.status(403).send({ message: "username already taken" })
            return;
        }
    }

    // update
    User.findOneAndUpdate({ username: req.session.userid }, update, { new: true },
        function (err, user) {
            if (err) {
                res.status(403).send({ error: err, message: "error" });
            } else {
                req.session.destroy();
                res.status(200).send({ message: "account updated" });
            }
        });
})



//find User, and add course to list
app.post('/addCourse', auth, async (req, res) => {
    const course_regex = new RegExp('^[A-Z]{4}[0-9]{3}$');
    if (course_regex.test(req.body.course)) {
        var new_course = await Course.findOne({ code: req.body.course });

        //if course doesn't exist we populate it 
        if (new_course == null) {
            new_course = new Course({ code: req.body.course, name: req.body.name })
            new_course.save();
        }

        User.findOneAndUpdate(
            { username: req.session.userid },
            { $push: { courses: req.body.course } },
            function (err, doc) {
                if (err) {
                    res.status(403);
                    res.send({ message: "failure - course cannot be added " });
                }
                else res.send({ message: "success - course added" })
            });
    } else {
        res.status(402);
        res.send({ message: "failure - incorrect course format " });
    }
})

app.post('/removeCourse', auth, (req, res) => {
    User.findOneAndUpdate(
        { username: req.session.userid },
        { $pull: { courses: req.body.course } },
        function (err, user) {
            if (err) {
                res.status(403);
                return res.send({ message: "failing" });
            }
            return res.send({ message: "failure - cannot delete unregistered course" });
        })
})

app.post('/populateCourse', (req, res) => {
    var newCourse = new Course({ code: req.body.course, name: req.body.name })

    newCourse.save(function (err, course) {
        if (err) res.status(403).send({ message: "error: course already exists" });
        else res.send({ message: "course created successfully" })
    })
})

app.put('/resetCourses', (req, res) => {
    Course.deleteMany({}, function (err, courses) {
        if (err) {
            res.status(403);
            return res.send({ message: "error" });
        }
    });
});

//get all courses of logged in user
app.get('/courses', auth, async (req, res) => {
    const cur_user = await User.findOne({ username: req.session.userid });

    Course.find(
        { code: { $in: cur_user.courses } }, function (err, courses) {
            if (err) {
                res.status(403);
                return res.send({ message: "error" });
            }
            sendCourses = courses.map(c => {
                return {
                    code: c.code,
                    name: c.name
                };
            });
            return res.send(sendCourses);
        });
})

//get all courses in database
app.get('/getAllCourses', auth, async (req, res) => {
    Course.find({}, function (err, courses) {
        if (err) {
            res.status(403);
            return res.send({ message: "error" });
        }
        sendCourses = courses.map(c => {
            return {
                code: c.code,
                name: c.name
            };
        });
        return res.send(sendCourses);
    });
})


// get specific course
app.get('/getCourse', auth, async (req, res) => {
    const course = await Course.findOne({ code: req.body.course }).exec();
    if (course == null) {
        res.status(403);
        return res.send({ message: "invalid course input" });
    }
    return res.status(200).send({
        code: course.code,
        name: course.name
    });

    // Course.find({}, function (err, courses) {
    //     if (err) {
    //         res.status(403);
    //         return res.send({ message: "error" });
    //     }
    //     var courseToSend = courses.find(c => c.code === req.body.course);
    //     if (courseToSend == undefined) {
    //         res.status(403);
    //         return res.send({ message: "invalid course input" });
    //     }
    //     return res.send(courseToSend);
    // });
})


// search for student 
app.get('/user', auth, async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    // authenticate user exists
    if (user != null) {
        const send_user = {
            username: user.username,
            courses: user.courses
        }
        res.status(200).send({ user: send_user });
    } else {
        res.status(400).send({
            message: 'no user exists with that username'
        });
    }
})

// get all users
app.get('/users', auth, async (req, res) => {
    User.find({}, function (err, users) {
        let usernames = {}

        for (let i = 0; i < users.length; i++) {
            usernames[i] = users[i].username;
        }

        res.send(usernames);
    });
})

// request friend
app.post('/addFriend', auth, async (req, res) => {
    const cur_user = await User.findOne({ username: req.session.userid });
    const user = await User.findOne({ username: req.body.username });

    if (user == null) {
        res.status(400).send({
            message: 'no user exists with that username'
        });
    } else if (user.username === cur_user.username) {
        res.status(400).send({
            message: 'cannot add yourself as a friend'
        });
    } else {
        User.getFriends(cur_user, { username: user.username }, function (err, friends) {
            if (err) {
                res.status(400).send({ message: err });
            } else {
                let exists = false;
                friends.forEach(f => {
                    exists = exists || f.friend.username === user.username;
                });

                if (exists) {
                    res.status(400).send({
                        message: 'cannot request this user'
                    });
                } else {
                    User.requestFriend(cur_user._id, user._id, function (err, c) {
                        if (err) {
                            res.status(400).send({ message: err });
                        } else {
                            res.status(200).send({ message: "friend request sent" });
                        }
                    });
                }
            }
        });
    }
})

// accept friend
app.post('/acceptFriend', auth, async (req, res) => {
    const cur_user = await User.findOne({ username: req.session.userid });
    const user = await User.findOne({ username: req.body.username });

    if (user == null) {
        res.status(400).send({
            message: 'no user exists with that username'
        });
    } else {
        User.getPendingFriends(cur_user, { username: user.username }, function (err, friends) {
            if (err) {
                res.status(400).send({ message: err });
            } else {
                if (friends.length === 0) {
                    res.status(400).send({
                        message: 'friend request does not exist'
                    });
                } else {
                    User.requestFriend(cur_user._id, user._id, function (err, c) {
                        if (err) {
                            res.status(400).send({ message: err });
                        } else {
                            res.status(200).send({ message: "friend request accepted" });
                        }
                    });
                }
            }
        });
    }
})



// remove friend
app.post('/removeFriend', auth, async (req, res) => {
    // console.log(" \n")
    const cur_user = await User.findOne({ username: req.session.userid });
    const user = await User.findOne({ username: req.body.username });

    if (user == null) {
        res.status(400).send({
            message: 'no user exists with that username'
        });
    } else {
        User.getFriends(cur_user, { username: user.username }, function (err, friends) {
            if (err) {
                res.status(400).send({ message: err });
            } else {
                if (friends.length === 0) {
                    res.status(400).send({
                        message: 'user is not your friend'
                    });
                } else {
                    User.removeFriend(cur_user._id, user._id, function (err, c) {
                        if (err) {
                            res.status(400).send({ message: err });
                        } else {
                            res.status(200).send({ message: "friend removed" });
                        }
                    });
                }
            }
        });
    }
})



// decline friend request
app.post('/declineFriend', auth, async (req, res) => {
    const cur_user = await User.findOne({ username: req.session.userid });
    const user = await User.findOne({ username: req.body.username });

    if (user == null) {
        res.status(400).send({
            message: 'no user exists with that username'
        });
    } else {
        User.getPendingFriends(cur_user, { username: user.username }, function (err, friends) {
            if (err) {
                res.status(400).send({ message: err });
            } else {
                if (friends.length === 0) {
                    res.status(400).send({
                        message: 'friend request does not exist'
                    });
                } else {
                    User.removeFriend(cur_user._id, user._id, function (err, cb) {
                        if (err) {
                            res.status(400).send({ message: err });
                        } else {
                            res.status(200).send({ message: "friend request declined" });
                        }
                    });
                }
            }
        });
    }
})




// get friends
app.get('/friends', auth, async (req, res) => {
    const cur_user = await User.findOne({ username: req.session.userid });

    User.getFriends(cur_user, {},
        { username: 1, courses: 1 },
        { sort: { username: 1 } },
        function (err, friends) {
            if (err) {
                res.status(400).send({ message: err });
            } else {
                res.status(200).send({ friends });
            }
        });
})


module.exports = app;
