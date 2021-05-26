import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema({
    quizaId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Quiz'
    },
    description:{
        type:String,
        required:'Question description is required',
    },
    options:[
        {
            text:{
                type:String,
                required:'Question options are required'
            }
        }
    ],
    correctAnswer:{
        type:String,required:'Correct answer for the question is required'
    }
})

const Question = mongoose.model('Question', questionSchema)

export default Question