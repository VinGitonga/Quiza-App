import connectDB from "../../../../mongodb/connectDB";
import Question from "../../../../mongodb/models/Question";


export default async function handler(req, res) {
    connectDB();
    switch (req.method) {
        case "PUT":
            return updateQuestion(req, res);
        case "DELETE":
            return removeQuestion(req, res);
    }
}

async function updateQuestion(req, res) {
    let { questionId } = req.query;

    let question = await Question.findById(questionId);

    question.description = req.body.description;
    question.options = req.body.options;
    question.correctAnswer = req.body.correctAnswer;

    try {
        let result = await question.save();
        return res.status(200).json(result);
    } catch (err) {
        return res.status(400).json({
            message: `Unable to update question due to ${err.toString()}`
        });
    }
}

async function removeQuestion(req, res){
    let { questionId } = req.query;
    try {
        let question = await Question.findById(questionId);
        let result = await question.remove();
        return res.status(200).json(result);
    } catch (err) {
        return res.status(400).json({
            message: "Could not delete due to" + err.toString()
        })
    }
}