import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import router from './routes/jobs.js'
import routerLogin from './routes/users.js'
import mongoose from 'mongoose'
import homeRoute from './routes/home.js'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
app.use(cors(
    {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
))

// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });
//connect with database
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
app.use('/jobs', cors(), router)
app.use('/', routerLogin)

const port= process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)
})