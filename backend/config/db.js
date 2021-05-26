import mongoose from 'mongoose'
import config from './config.js'

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(config.mongoUri, {
            useUnifiedTopology:true,
            useNewUrlParser:true,
            useCreateIndex:true,
            useFindAndModify:true
        })

        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline)
    } catch (err) {
        console.error(`Error: ${err.message}`.red.underline.bold)
        process.exit(1)
    }
}

export default connectDB;