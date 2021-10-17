const  mongoose  = require("mongoose");

const Schema  = mongoose.Schema;

const courseSchema = new Schema({
    code : {
        type : String,
        required : true,
        unique : true,
        dropDups : true
    }
})


module.exports = {Course :  mongoose.model("Course", courseSchema, "courseCollection")};