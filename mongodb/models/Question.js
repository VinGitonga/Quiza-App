import mongoose from "mongoose"

const questionSchema = new mongoose.Schema({
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
    },
    description: String,
    options: [
        {
            text: String,
        }
    ],
    correctAnswer: String,
}, {
    timestamps: true
});

const Question = mongoose.models.Question || mongoose.model('Question', questionSchema);

export default Question;