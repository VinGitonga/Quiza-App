import mongoose from "mongoose"
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    hashed_password: String,
    salt: String,
    role: {
        type: String,
        enum: ["Student", "Administrator"],
    },
    quizzesEnrolled: [
        {
            quizId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Quiz",
            },
        },
    ],
    quizesGiven: [
        {
            quizId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Quiz",
            },
            score: Number,
            responses: [],
            timeEnded: Number,
            timeStarted: Number,
            attemptId: String,
        },
    ],
    image: String,
}, {
    timestamps: true
});

userSchema.virtual("password")
    .set(function(password){
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    }).get(function(){
        return this._password;
    });


userSchema.path('hashed_password').validate(function(v){
    if(this._password && this._password.length < 6){
        this.invalidate('password', 'Passwords must be alteast 6 characters');
    }

    if(this.isNew && !this._password){
        this.invalidate('password', 'Password is required');
    }
}, null);

userSchema.methods = {
    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function (password){
        if(!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return ''
        }
    },
    makeSalt: function(){
        return Math.round((new Date().valueOf() * Math.random()));
    }
}

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;