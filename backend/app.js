/* eslint-disable no-unused-vars */
import express from 'express'
import userRoutes from './routes/user.js'
import authRoutes from './routes/auth.js'
//import examsRoutes from './routes/quiz.js'
import questionsRoutes from './routes/question.js'
import quizaRoutes from './routes/quiza.js'
import morgan from 'morgan'
import cors from 'cors'
import connectDB from './config/db.js'
import config from './config/config.js'
import colors from 'colors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

//config the .env variables
dotenv.config()

//connect to the database
connectDB()

const app = express()

//use morgan during development in order to get a glimpse on 
//server activities
if(config.env){
    app.use(morgan('dev'))
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(cors())

app.use('/api/users',userRoutes)
app.use('/api/auth',authRoutes)
//app.use('/api/exams', examsRoutes)
app.use('/api/questions',questionsRoutes)
app.use('/api/quizas', quizaRoutes)


/*app.use((req, res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','OPTIONS,GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next()
})*/

app.use((err, req, res, next)=>{
    res.status(err.status || 500).json({
        message: err.response
    })
})

app.listen(
    config.port,
    console.log(
        `Server running in ${config.env} mode on port ${config.port}`.yellow.bold
    )
)