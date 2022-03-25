import mongoose from 'mongoose'

const attemptSchema = new mongoose.Schema({
    quizaId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Quiza'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    specId:{
        type:String,
        required:true
    }
})

const Attempt = mongoose.model('Attempt', attemptSchema)

export default Attempt;