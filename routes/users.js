import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import User from '../models/registerUsers.js'
import { getUser, loginEmployer, loginUser, registerEmployer, registerUser, sendResetPasswordEmail } from '../controllers/user.js'
import { protect } from '../middleware/authMiddleware.js'
import Employer from '../models/employer.js'

const router = express.Router()




router.post('/register', registerUser)
router.post('/registerEmployer', registerEmployer)
router.post('/login', loginUser)
router.post('/loginEmployer', loginEmployer)
router.get('/me',protect ,getUser)
router.post('/forgot_password', sendResetPasswordEmail)
router.put('/resetpassword/:id', async(req, res)=>{
    const {password} = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await User.findById(req.user._id)
    user.password = hashedPassword
    await user.save()
    res.send("password updated")
    }
)

router.get('/users', async(req, res)=>{
        try {
            const getData = await  User.find();
            res.json(getData)
        } catch (error) {
            console.log(error);
        }
    }
)

router.get('/employers', async(req, res)=>{
    try {
        const getData = await  Employer.find();
        res.json(getData)
    } catch (error) {
        console.log(error);
    }
})

export default router