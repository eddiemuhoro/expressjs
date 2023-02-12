import express from 'express'
import { protect, protectEmployer } from '../middleware/authMiddleware.js'
import jwt from 'jsonwebtoken'
import PostMessage from '../models/postMessage.js'
const router =express.Router()
import User from '../models/registerUsers.js'
import Employer from '../models/employer.js'
//CREATE USER
//REQ.BODY TO GET DATA FROM THE CLIENT
router.post('/new', protectEmployer, async (req, res)=>{
    const {title, description, name, phone,  location, salary, imageurl} = req.body
    const job = await PostMessage.create({
        title,
        description,
        name,
        phone,
        location,
        salary,
        imageurl,
        employer: req.employer._id,

    })

    if (job) {
       
        res.status(201).json({
            _id: job._id,
            title: job.title,
            description: job.description,
            name: job.name,
            phone: job.phone,
            location: job.location,
            salary: job.salary,
            imageurl: job.imageurl,
            employer: job.employer,
            //the id is passed to the generateToken function
           
            
        })} else {
            res.status(400)
            res.send('Invalid user data')
        }


   
}
)


export const generateToken= (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: '30d'})
  }

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
    const myPost = await PostMessage.find({employer: req.employer._id})
    res.json(myPost)
    }
)

router.get('/employer', async(req, res)=>{
    const employer = await Employer.findById(req.employer._id)
    const employerInfo = await Employer.find({employer: req.employer._id})
    res.json(employerInfo)
})

//simplified code
router.route('/:id').get((req, res)=>{
    res.send(`individual user with id ${req.params.id}`)
}).put(  async(req, res)=>{
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
}).delete(protectEmployer, async (req, res)=>{
    const data = await PostMessage.findById(req.params.id)
    if(!data){
        console.log("no data found");
        res.status(400).send("Oops no data found")
    }

    const employer = await Employer.findById(req.employer._id)
    //check if user is logged in
    if(!employer){
        console.log("no user found");
        res.status(401).send("No user found")
    } 
    //logged in user matches the user who created the post
    data.remove()
    res.send(`Deleted job with id ${req.params.id}`)
})

export default router