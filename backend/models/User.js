const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/login-todo")
.then(()=>{
    console.log("database is connected")
})
.catch((err)=>{
    console.log(err);
})

const userSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String}
})

const User = mongoose.model('User' , userSchema);
module.exports = User;