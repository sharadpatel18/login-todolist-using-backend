const mongoose = require('mongoose')

const todolistSchema = new mongoose.Schema({
    title:{
        type:String
    },
    note:{
        type:String
    },
    user:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
})

const Todolist = mongoose.model('Todolist' , todolistSchema)
module.exports = Todolist;