import connectDB from "../../../../mongodb/connectDB";
import Quiz from "../../../../mongodb/models/Quiz";

export default async function handler(req, res) {
    connectDB();
    switch (req.method) {
        case "GET":
            return getQuizDetails(req, res);
    }
}

async function getQuizDetails(req, res) {
    const { quizId } = req.query;

    const quiz = await Quiz.findById(quizId);

    return res.status(200).json({
        id: quiz._id,
        title: quiz.title,
        description: quiz.description,
        quizCode: quiz.quizCode,
        duration: quiz.duration,
    });
}
