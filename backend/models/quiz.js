import mongoose from 'mongoose'

const quizSchema = new mongoose.Schema({
    quizName:{
        type:String,required:'Quiz Name is required'
    },
    quizCode:String,
    adminId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    usersParticipated:[
        {
            userId:{
                type: mongoose.Types.ObjectId,
                ref:'User'
            },
            marks:Number,
            response:[],
            timeEnded:Number,
            timStarted:Number,
            attemptId:String //nanoid
        }
    ],
    usersEnrolled:[
        {
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
            }
        }
    ],
    quizDuration:String,
    quizStatus:{
        type:String,
        default:'Open',
        enum:['Open','Closed']
    },
    scheduledFor:{
        type:String,
    }
})

const Quiz = mongoose.model('Quiz', quizSchema)

export default Quiz;