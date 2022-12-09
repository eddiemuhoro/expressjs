import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import User from '../models/registerUsers.js'

const router = express.Router()

router.post('/', asyncHandler( async (req, res)=>{
    const {name, email, password} = req.body

    if(!name || !email || !password){
        res.status(400)
        res.send('Please fill all the fields')
    }
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        res.send('User already exists')
    }
    //hash password


    const user = await User.create({
        name,
        email,
        password
    })
    if(user){
        res.status(201).json(
            {
                _id: user._id,
                name: user.name,
                email: user.email,
            }
        )
    }else{
        res.status(400)
        res.send('Invalid user data')
    }
}))

router.get('/me',asyncHandler (async (req, res)=>{
    res.send('My details')
}))

export default router