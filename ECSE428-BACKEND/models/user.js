const  mongoose  = require("mongoose");

const Schema  = mongoose.Schema;

const userSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        dropDups : true
    },
    password: {
        type: String, 
        required : true
    }
})


module.exports = {User :  mongoose.model("User", userSchema, "userCollection")};