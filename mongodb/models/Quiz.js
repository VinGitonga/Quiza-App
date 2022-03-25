import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    quizCode: String,
    duration: String,
    description: String,
    image: String,
    authorId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    usersParticipated: [
        {
            userId: {
                type: mongoose.Types.ObjectId,
                ref: 'User',
            },
            score: Number,
            responses: [],
            timeStarted: Number,
            timeEnded: Number,
            attemptId: String,
        }
    ],
    usersEnrolled: [
        {
            userId: {
                type: mongoose.Types.ObjectId,
                ref: "User",
            },
        },
    ],
},{
    timestamps: true,
});

const Quiz = mongoose.models.Quiz || mongoose.model("Quiz", quizSchema);

export default Quiz;