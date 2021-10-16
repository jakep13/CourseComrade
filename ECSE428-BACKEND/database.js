
const mongoose = require("mongoose");
const dotenv = require("dotenv").config({path: './.env'});

const atlas_uri = process.env.DB_URI
mongoose.connect(atlas_uri, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"))

db.once("open", function() {
    console.log("Connection Succesful!")
})

module.exports={ database : db };