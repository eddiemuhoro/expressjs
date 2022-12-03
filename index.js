import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import router from './routes/users.js'

import mongoose from 'mongoose'

import homeRoute from './routes/home.js'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
app.use(cors())

mongoose
.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('database connected');
})
.catch((err)=>{
    console.log(`oops not connected ${err}`)
})

app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

  
app.use('/',homeRoute)
app.use('/users', cors(), router)



const port= process.env.PORT || 7000


//app port ...

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)
})