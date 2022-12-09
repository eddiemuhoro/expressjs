import express from 'express'
import PostMessage from '../models/postMessage.js'
const router =express.Router()

//CREATE USER
//REQ.BODY TO GET DATA FROM THE CLIENT
router.post('/new', async (req, res)=>{
    const post = req.body
    const newPost = new PostMessage(post)
    try {
        newPost.save()
    } catch (error) {
        console.log('error');
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
}).delete( async (req, res)=>{
    const data = await PostMessage.findById(req.params.id)
    if(!data){
        console.log("no data found");
        res.status(400).send("Oops no data found")
    }
    data.remove()
    res.send(`Deleted user with id ${req.params.id}`)
})

export default router