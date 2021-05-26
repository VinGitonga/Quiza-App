import mongoose from 'mongoose'

import {hash,compare} from 'bcryptjs'
import { FunctionsOutlined } from '@material-ui/icons';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        match:/@/,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    }
},{
    timestamps:true
})

userSchema.pre("save", async function(next){
    try {
        if(this.password && this.isModified("password")){
            this.password = await hash(this.password, 10)
            console.log(this.password)
        }
        next()
    } catch (err) {
        next(err)
    }
});

userSchema.methods.verifyPassword = async function (password, next){
    try {
        return await compare(password, this.password)
    } catch (err) {
        next(err)
    }
}

userSchema.methods.format = function(){
    return {
        id:this._id,
        email:this.email,
        name:this.name,
        quizzes:this.quizzes
    }
}

const User = mongoose.model('User', userSchema)

export default User;