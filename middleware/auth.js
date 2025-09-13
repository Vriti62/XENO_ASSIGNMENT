const express = require('express');
const app = express();
const prisma = require('../db/db.config');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET

exports.authenticationToken = async(req,res, next)=>{
    const token = req.cookies['token'];
    if(!token) return res.status(404).json("Token not found.");

    jwt.verify(token,secret,async (err, result)=>{
        if(result){
            const user= await prisma.store.findFirst({
                where:{
                    id:result.id
                }
            })
            if(!user) return res.status(404).json("User not found."); 
            req.user = user;
        }
        
    })
    next();
}