import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import PostMessage from '../models/postMessage.js'
const router =express.Router()
import User from '../models/registerUsers.js'
//CREATE USER
//REQ.BODY TO GET DATA FROM THE CLIENT
router.post('/new', protect, async (req, res)=>{
    const {title, description, employer, location, salary, imageurl} = req.body
    const newPost = new PostMessage({
        title,
        description,
        employer,
        location,
        salary,
        imageurl,
        user: req.user._id
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

router.get('/mypost',protect,  async(req, res)=>{
    const user = await User.findById(req.user._id)
    //check if user is logged in
    if(!user){
        console.log("no user found");
        res.status(401).send("No user found")
    }
    const myPost = await PostMessage.find({user: req.user._id})
    res.json(myPost)
}
)


//simplified code
router.route('/:id').get((req, res)=>{
    res.send(`individual user with id ${req.params.id}`)
}).put(protect, async(req, res)=>{
    const data = await PostMessage.findById(req.params.id)
    if(!data){
        console.log("no data found");
        res.status(400).send("No data found")
    }

    const user = await User.findById(req.user._id)
    //check if user is logged in
    if(!user){
        console.log("no user found");
        res.status(401).send("No user found")
    } 
    //logged in user matches the user who created the post
    if(data.user.toString() !== user._id.toString()){
        console.log("not authorized");
        res.status(401).send("Not authorized")
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