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


const atlas_uri = process.env.DB_URI
mongoose.connect(atlas_uri, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"))

db.once("open", function() {
    console.log("Connection Succesful!")
})