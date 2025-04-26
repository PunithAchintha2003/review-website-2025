import express, { request, response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './config/connectDB.js'
import userRouter from './route/user.route.js'

import bookRouter from './route/book.route.js'
import movieRouter from './route/movie.route.js'
import router from './route/other.route.js'
import reviewRouter from './route/review.route.js'
import songRouter from './route/song.route.js'
import teledramaRouter from './route/teledrama.route.js'
import uploadRouter from './route/upload.router.js'
import categoryRouter from './route/category.route.js'

const app = express()
app.use(cors({
    credentials : true,
    origin : process.env.FRONTEND_URL
}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy : false // Frontend & Backend domain difference error solve
}))

const PORT = 8080 || process.env.PORT

app.get("/",(request,response)=>{
    // Server to Client
    response.json({
        message : "Server is running " + PORT
    })
})

app.use('/api/user',userRouter)
app.use("/api/category",categoryRouter)
app.use("/api/file",uploadRouter)

app.use('/api/book',bookRouter)
app.use('/api/movie',movieRouter)
app.use('/api/other',router)
app.use('/api/review',reviewRouter)
app.use('/api/song',songRouter)
app.use('/api/teledrama',teledramaRouter)

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Server is running",PORT)
    })
})

