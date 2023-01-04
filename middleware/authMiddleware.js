
import User from '../models/registerUsers.js'
import Employer from '../models/employer.js'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'

export const protect = asyncHandler(async(req, res, next)=>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //(decoded.id) is the id of the user that is passed to the token at the time of login
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

export const protectEmployer = asyncHandler(async(req, res, next)=>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //(decoded.id) is the id of the user that is passed to the token at the time of login
            req.employer = await Employer.findById(decoded.id).select('-password')
            if(!req.employer){
                res.status(401)
                res.json({message:'Not authorized, no employer found'})
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

  