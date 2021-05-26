import mongoose from 'mongoose'

const quizaSchema = new mongoose.Schema({
    name:{
        type: String,
        trim:true,
        required:true
    },
    duration:{
        type: Number,
        required:true
    },
    scheduledFor:{
        type:Date,
    },
    quizaCode:String,
    description:{
        type: String,
        required:true
    },
    authorId:{
        type: mongoose.Types.ObjectId,
        ref:'User'
    },
    quizaStatus:{
        type:String,
        default:'Open',
        enum:['Open','Closed'],
        trim:true
    },
    usersParticipated:[
        {
            userId:{
                type:mongoose.Types.ObjectId,
                ref:'User'
            },
            score:Number,
            responses:[],
            timeStarted:Number,
            timeEnded:Number,
            attemptId:String
        }
    ],
    usersEnrolled:[
        {
            userId:{
                type: mongoose.Types.ObjectId,
                ref:'User'
            }
        }
    ]
},{
    timestamps:true
})

const Quiza = mongoose.model('Quiza', quizaSchema);

export default Quiza;
