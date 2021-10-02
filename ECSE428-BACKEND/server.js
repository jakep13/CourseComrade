const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config({path: './.env'});
const env = require('env');
var cors = require('cors')

const PORT = process.env.PORT;
const URI = process.env.URI;
console.log(PORT);

const atlas_uri = process.env.DB_URI
mongoose.connect(atlas_uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }

app.use(cors({
    origin: '*' //access-control-allow-credentials:true
}));

// app.use(postRoutes);
app.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
    res.send("WOW TIME TO PLAY");
    res.status(200);
});


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

module.exports = app;

