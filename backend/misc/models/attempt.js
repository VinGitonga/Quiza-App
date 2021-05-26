import mongoose from 'mongoose'

const attemptSchema = new mongoose.Schema({
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Quiz'
    },
    playerId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    questions:[{
        questionId:{
            type:mongoose.Types.ObjectId,
            ref:'Question'
        },
        answers:[],
        isCorrect:{
            type:Boolean,
            default:false
        }
    }]
},{
    timestamps:true
})


const Attempt = mongoose.model('Attempt', attemptSchema)

export default Attempt;