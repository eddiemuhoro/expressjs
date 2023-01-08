import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import User from '../models/registerUsers.js'
import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'
import Employer from '../models/employer.js'
dotenv.config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


export const getUser = asyncHandler(async (req, res) => {
   res.status(200).json(req.user)
}
)

export const getEmployer = asyncHandler(async (req, res) => {
    const employerId = req.employer.id
    const {_id, name, email} = await Employer.findById(employerId)
    res.status(200).json(req.employer)
})

//user registration

export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, phoneNum, selectedFile} = req.body
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
        phoneNum,
        selectedFile
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
           
            //the id is passed to the generateToken function
            token: generateToken(user._id),
            phoneNum: user.phoneNum,
            selectedFile: user.selectedFile

             
         
        })} else {
            res.status(400)
            res.send('Invalid user data')
        }

  })

//employer registration
  export const registerEmployer = asyncHandler(async (req, res) => {
    const { name, email, password, phoneNum, selectedFile} = req.body
    const employerExists = await Employer.findOne({ email })    
    if (employerExists) {
        res.status(400)
        res.send('Employer already exists')
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const employer = await Employer.create({
        name,
        email,
        password: hashedPassword,
        phoneNum,
        selectedFile
    })

    if (employer) {
        res.status(201).json({
            _id: employer._id,
            name: employer.name,
            email: employer.email,
           
            //the id is passed to the generateToken function
            token: generateToken(employer._id),
            phoneNum: employer.phoneNum,
            selectedFile: employer.selectedFile
        })} else {
            res.status(400)
            res.send('Invalid employer data')
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
            phoneNum: user.phoneNum,
            selectedFile: user.selectedFile
        })
    }else{
        res.status(400)
            res.send('Invalid user credentials')
    }

    res.json({message: 'login user'})
  })

//employers login
  export const loginEmployer= asyncHandler(async(req, res)=>{
    const {email, password} = req.body

    const employer= await Employer.findOne({email})

    //check password
    if(employer && (await bcrypt.compare(password, employer.password))){
        res.json({
            _id: employer._id,
            name: employer.name,
            email: employer.email,
            token: generateToken(employer._id),
            phoneNum: employer.phoneNum,
            selectedFile: employer.selectedFile
        })
    }else{
        res.status(400)
            res.send('Invalid employer credentials')
    }

    res.json({message: 'login employer'})
  })


  export const generateToken= (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: '30d'})
  }
//reset password
  export const sendResetPasswordEmail = asyncHandler(async(req, res)=>{
    const {email} = req.body
    const user = User.findOne({where: {email}})
    if(!user){
        res.status(404)
        res.send('User not found')
    }
    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'})
    const link = `http://localhost:3000/resetpassword/${token}`
    const msg = {
        to: 'edueddymwas@gmail.com',
        from: 'eddiemuhoro@gmail.com',
        subject: 'Reset Password',
        text: link,
        html: link,
    }
    sgMail.send(msg)
    res.send('Email sent')
}
) 