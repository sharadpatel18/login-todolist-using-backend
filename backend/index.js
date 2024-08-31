const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const AuthRouter = require('./routes/AuthRoute')
const {Authenticated} = require('./middleware/Auth')
const Todolist = require('./models/Todolist')
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json())
app.use('/auth' , AuthRouter)

app.post('/todolist' , async (req,res)=>{
  const todo = new Todolist(req.body)
  todo.save();
})

app.get('/api' , Authenticated , async (req,res)=>{
  const id = req.user._id;
  const todos = await Todolist.find({user:id});
  console.log(id);
  res.send(todos)
})

app.put('/todolist/:id' , async(req,res)=>{
  const {id} = req.params;
  const task = req.body;
  const list = await Todolist.findByIdAndUpdate(id , task)
  .then(()=>{
    res.send('todo is updated');
  })
  .catch((err)=>{
    console.log(err);
    res.send({error:err , message:"error this is not update"})
  })
})
app.delete('/todolist/:id' , async(req,res)=>{
  const {id} = req.params;
  const list = await Todolist.findByIdAndDelete(id)
  .then(()=>{
    res.send('todo is deleted');
  })
  .catch((err)=>{
    console.log(err);
    res.send({error:err , message:"error this is not deleted"})
  })
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})