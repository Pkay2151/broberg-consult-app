const bcrypt = require("bcrypt");
//
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();    


const registerUser = async (req, res) =>{
    const {name,email,password,secretKey} = req.body;
    if(!name|| !email|| !password || !secretKey){
  
        return res.status(400).json({message: "All fields are required"})
    }

    if(secretKey !== process.env.SECRET_KEY){
        return res.status(403).json({message:"INVALID ADMIN KEY"})
    }
    

    const existingUser = await prisma.user.findUnique({
        where:{email}

    })

if(existingUser){
     return res.status(409).json({message: "An account has been created with email already"})
}
const hashedPassword = await bcrypt.hash(password , 10)

const user = await prisma.user.create({
    data:{
        name,email,password:hashedPassword
    }
})
return res.status(201).json({id : user.id,
    email: user.email
})

}

const loginUser = async (req,res) =>{
    const {email,password} = req.body;
    if(!email|| !password){
        return res.status(400).json({message: "All fields are required"})
    }
    const user = await prisma.user.findUnique({
        where:{email}
    });
    if(!user){
        return res.status(401).json({message:"User not found"})
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(401).json({message:"IncorrectPassword"})
    }
    const token = jwt.sign({userId: user.id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"1h"});
     return res.status(200).json({ token });
}
module.exports = {
    registerUser,
    loginUser,
};