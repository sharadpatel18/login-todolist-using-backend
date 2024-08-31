const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const signup = async (req,res)=>{
    try {
        const {name,email,password} = req.body;
        const user = await UserModel.findOne({email});
        if (user) {
          return res.status(409)  
          .json({message:"user is already existed" , success:false})
        } 
        const userModel = new UserModel({name,email,password});
        userModel.password = await bcrypt.hash(password,10);
        await userModel.save();
        res.status(203)
            .json({
                message: "Signup successfully",
                success:true
            })
    } catch (error) {
        res.status(500)
            .json({
                message: "internal server error",
                success:false
            })
    }
}

const login = async (req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await UserModel.findOne({email});
        if (!user) {
          return res.status(409)  
          .json({message:"email and password is wrong" , success:false})
        } 

        const isPasswordEqual = await bcrypt.compare(password , user.password)
      
        if (!isPasswordEqual) {
            return res.ststus(403)
            .json({message:"email and password is wrong"})
        }
        const jwttoken = jwt.sign({
            email:user.email ,
            name:user.name,
            _id:user.id
        },
        process.env.JWT_TOKEN,
        {expiresIn:"24h"}
    )
        res.status(203)
            .json({
                message: "Login successfully",
                success:true,
                jwttoken,
                email,
                name:user.name,
                id:user._id
            })
    } catch (error) {
        res.status(500)
            .json({
                message: "internal server error",
                success:false
            })
            console.log(error);
    }
}

module.exports = {signup , login}