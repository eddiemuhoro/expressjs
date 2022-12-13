import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import User from '../models/registerUsers.js'
import { getUser, loginUser, registerUser } from '../controllers/user.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me',protect ,getUser)

router.get('/users', async(req, res)=>{
    try {
        const getData = await  User.find();
        res.json(getData)
    } catch (error) {
        console.log(error);
    }

})

export default router