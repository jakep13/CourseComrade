const {database} = require("./database");
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
const app = require('./app');


const PORT = process.env.PORT;
const URI = process.env.URI;
console.log(PORT);


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

