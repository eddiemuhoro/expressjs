import express from 'express'
import { protect, protectEmployer, protectJob } from '../middleware/authMiddleware.js'
import Message from '../models/message.js'
import jwt from 'jsonwebtoken'
import { generateToken } from './jobs.js'
const router = express.Router()


//messages section
router.post('/message', protect,  async(req, res)=>{ 
    const {message}= req.body
        const newMessage = await Message.create({
                message,
                user: req.user._id,
            })
            if(newMessage){
                res.status(201).json({
                    _id: newMessage._id,
                    message: newMessage.message,
                })
            }else{
                res.status(400)
                res.send('Invalid message data')
            }
}
)



// router.get('/mymessage',protectJob, protectEmployer,  async(req, res)=>{
//     //check if user is logged in
//     // const myPost = await Message.find({employer: req.employer._id})
//     const job = await Message.find()
//     res.json(job)
// })

router.get('/message',  async(req, res)=>{
    const job = await Message.find().populate('user')
    res.json(job)
 }
)
export default router