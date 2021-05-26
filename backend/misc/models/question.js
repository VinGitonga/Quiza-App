import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema({
    quizId:{
        type:mongoose.Types.ObjectId,
        ref:'Quiz'
    },
    authorId:{
        type: mongoose.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        required:true
    },
    answers:[{
        type:String,
        required:true
    }],
    options:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const Question = mongoose.model('Question', questionSchema)

export default Question