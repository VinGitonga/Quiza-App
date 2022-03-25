import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if(!MONGODB_URI){
    throw new Error("Please define the Mongo DB URI in .env file")
}

/**
 * set mongoose to global
 */

let cached = global.mongoose;

if (!cached){
    cached = global.mongoose = {conn: null, promise: null};
}

async function connectDB(){
    if (cached.conn){
        return cached.conn;
    }

    if (!cached.promise){
        const opts = {
            bufferCommands: true,
        }

        cached.promise = await mongoose.connect(MONGODB_URI, opts).then(mongoose => {
            return mongoose;
        })

    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDB;