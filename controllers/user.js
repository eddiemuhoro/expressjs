import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import User from '../models/registerUsers.js'

export const getUser = asyncHandler(async (req, res) => {
    const userId = req.user.id
    const {_id, name, email} = await User.findById(userId)


   res.status(200).json(req.user)
})

export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password , selectedFile} = req.body
    const userExists = await User.findOne({ email })    
    if (userExists) {
        res.status(400)
        res.send('User already exists')
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        selectedFile
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            //the id is passed to the generateToken function
            token: generateToken(user._id),
            selectedFile: user.selectedFile

             
         
        })} else {
            res.status(400)
            res.send('Invalid user data')
        }

  })

  export const loginUser= asyncHandler(async(req, res)=>{
    const {email, password} = req.body

    const user= await User.findOne({email})

    //check password
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            selectedFile: user.selectedFile
        })
    }else{
        res.status(400)
            res.send('Invalid user credentials')
    }

    res.json({message: 'login user'})
  })

  export const generateToken= (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: '30d'})
  }