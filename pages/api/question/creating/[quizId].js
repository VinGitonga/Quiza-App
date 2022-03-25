import connectDB from "../../../../mongodb/connectDB";
import Question from "../../../../mongodb/models/Question";


export default async function handler(req, res) {
    connectDB();
    switch (req.method) {
        case "GET":
            return getQuestions(req, res);
        case "POST":
            return createQuestion(req, res);
    }
}

async function createQuestion(req, res) {
    let { quizId } = req.query;

    let question = new Question({
        quizId: quizId,
        description: req.body.description,
        options: req.body.options,
        correctAnswer: req.body.correctAnswer,
    });
    try {
        let result = await question.save();
        return res.status(200).json(result);
    } catch (err) {
        return res.status(400).json({
            message: `Unable to create question due to ${err.toString()}`
        });
    }
}

async function getQuestions(req, res) {
    let { quizId } = req.query;

    try {
        let questions = await Question.find({ quizId: quizId });
        return res.status(200).json(questions)
    } catch (err) {
        return res.status(400).json({
            message: `Unable to fetch questions due to ${err.toString()}`
        });
    }
}