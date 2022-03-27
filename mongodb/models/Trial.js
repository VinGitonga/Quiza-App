import mongoose from "mongoose";

const trialSchema = new mongoose.Schema({
    quizId: {
        type: mongoose.Types.ObjectId,
        ref: "Quiz",
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    specId: {
        type: String,
        required: true,
    },
});

const Trial =
    mongoose.models.Trial || mongoose.model("Trial", trialSchema);

export default Trial;
