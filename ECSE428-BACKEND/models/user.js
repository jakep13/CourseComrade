const mongoose = require("mongoose");
const friends = require("mongoose-friends")

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    password: {
        type: String,
        required: true
    },

    courses: {
        type: [String]
    }
})

userSchema.plugin(friends());
module.exports = { User: mongoose.model("User", userSchema, "userCollection") };



//courses collection


//user -> [courses]



