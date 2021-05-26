import mongoose from 'mongoose'
import crypto from 'crypto'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:'Name is required'
    },
    email:{
        type:String,
        required:'Email address is required',
        match:[/.+@.+\..+/, 'Please fill a valid email address']
    },
    hashed_password:{
        type:String,
        required:"Password is required"
    },
    salt:String,
    updated:Date,
    created:{
        type:Date,
        default:Date.now
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:['Student','Administrator'],
        required:true
    },
    mobileNo:{
        type:Number,
        required:true
    },
    quizas:[
        {
            quizaId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Quiza'
            }
        }
    ],
    quizasGiven:[
        {
            quizaId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Quiza'
            },
            score:Number,
            responses:[],
            timeEnded:Number,
            timeStarted:Number,
            attemptId:String
        }
    ],
    quizasEnrolled:[
        {
            quizaId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Quiza'
            }
        }
    ],
    createdAt:{
        type: Date,
        default: Date.now()
    },
    image:{
        data: Buffer,
        contentType:String
    },
    gender:{
        type:String,
        enum:['Male','Female','Others']
    },
    physicalAddress:String,
    postalAddress:String
})

userSchema.virtual('password')
   .set(function(password){
       this._password = password;
       this.salt = this.makeSalt()
       this.hashed_password = this.encryptPassword(password)
   })
   .get(function(){
       return this._password
   })


userSchema.path('hashed_password').validate(function(v){
    if(this._password && this._password.length < 6){
        this.invalidate('password','Password must be atleast 6 characters')
    }

    if(this.isNew && !this._password){
        this.invalidate('password', 'Password is required')
    }
}, null)

userSchema.methods = {
    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function (password){
        if(!password) return ''
        try {
            return crypto
               .createHmac('sha1', this.salt)
               .update(password)
               .digest('hex')
        } catch (err) {
            return ''
        }
    },
    makeSalt: function(){
        return Math.round((new Date().valueOf() * Math.random()))
    }
}

const User = mongoose.model('User', userSchema)

export default User;