import express from 'express'
import { protect, protectEmployer } from '../middleware/authMiddleware.js'
import PostMessage from '../models/postMessage.js'
const router =express.Router()
import User from '../models/registerUsers.js'
import Employer from '../models/employer.js'
//CREATE USER
//REQ.BODY TO GET DATA FROM THE CLIENT
router.post('/new', protectEmployer, async (req, res)=>{
    const {title, description, employer, phone,  location, salary, imageurl} = req.body
    const newPost = new PostMessage({
        title,
        description,
        employer,
        phone,
        location,
        salary,
        imageurl,
        employer: req.employer._id
    })
    try {
        await newPost.save();
        res.status(201).json(newPost)
    } catch (error) {
        console.log(error);
    }
}
)
//GET ALL USERS
//.FIND() TO GET ALL USERS FROM MONGOOSE SCHEMA

router.get('/', async (req, res)=>{
    try {
        const getData = await  PostMessage.find();

        
        res.json(getData)
    } catch (error) {
        console.log(error);
    }
})

router.get('/mypost',protectEmployer,  async(req, res)=>{
    const employer = await Employer.findById(req.employer._id)
    //check if user is logged in
    if(!employer){
        console.log("no employer found");
        res.status(401).send("No employer found")
    }
    const myPost = await PostMessage.find({employer: req.employer._id})
    res.json(myPost)
}
)


//simplified code
router.route('/:id').get((req, res)=>{
    res.send(`individual user with id ${req.params.id}`)
}).put( async(req, res)=>{
    const data = await PostMessage.findById(req.params.id)
    if(!data){
        console.log("no data found");
        res.status(400).send("No data found")
    }

    const updatedData = await PostMessage.findByIdAndUpdate(req.params.id, 
        req.body, {
            new: true
        })
    res.json(updatedData)
}).delete(protect, async (req, res)=>{
    const data = await PostMessage.findById(req.params.id)
    if(!data){
        console.log("no data found");
        res.status(400).send("Oops no data found")
    }

    const user = await User.findById(req.user._id)
    //check if user is logged in
    if(!user){
        console.log("no user found");
        res.status(401).send("No user found")
    } 
    //logged in user matches the user who created the post
    data.remove()
    res.send(`Deleted user with id ${req.params.id}`)
})

export default router