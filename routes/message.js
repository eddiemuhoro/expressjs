import express from 'express'
import { protect, protectEmployer, protectJob } from '../middleware/authMiddleware.js'
import Message from '../models/message.js'
import jwt from 'jsonwebtoken'
const router = express.Router()
//messages section
// router.post('/message', protectJob,  async(req, res)=>{
//     const message = req.body.message
//         const newMessage = await Message.create({ 
//                 message,
//                 job: req.job._id,
//                 employer: req.job.employer,
//             })
//             if(newMessage){
//                 res.status(201).json({
//                     _id: newMessage._id,
//                     message: newMessage.message,
//                     job: newMessage.job,
//                     employer: newMessage.employer,
//                 })
//             }else{
//                 res.status(400)
//                 res.send('Invalid message data')
//             }
// }
// )



// router.get('/mymessage',protectJob, protectEmployer,  async(req, res)=>{
//     //check if user is logged in
//     // const myPost = await Message.find({employer: req.employer._id})
//     const job = await Message.find()
//     res.json(job)
// })

// router.get('/message', protectJob,  async(req, res)=>{
//     const job = await Message.find({job: req.job._id})
//     res.json(job)
//  }
// )
export default router