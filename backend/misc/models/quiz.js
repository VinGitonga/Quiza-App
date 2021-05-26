import mongoose from 'mongoose'

const quizSchema = new mongoose.Schema({
    title:{
        type:String,
        minlength:4,
        required:true
    },
    authorId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    questions:[{
        type:mongoose.Types.ObjectId,
        ref:'Question'
    }]
},{
    timestamps:true
})

const Quiz = mongoose.model('Quiz', quizSchema)

export default Quiz;