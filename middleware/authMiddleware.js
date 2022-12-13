
import User from '../models/registerUsers.js'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'

export const protect = asyncHandler(async(req, res, next)=>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            if(!req.user){
                res.status(401)
                res.json({message:'Not authorized, no user found'})
            }
            next()
        }catch(error){
            console.error(error)
            res.status(401)
            res.json({message:'Not authorized'})
        }
    }
    if(!token){
        res.status(401)
        res.json({message:'Not authorized, no token'})
    }
})