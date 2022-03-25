import connectDB from "../../../mongodb/connectDB";
import Quiz from "../../../mongodb/models/Quiz";
import { nanoid } from "nanoid"


export default async function handler(req, res) {
    connectDB();
    switch (req.method) {
        case "GET":
            return getQuizzes(req, res);
        case "POST":
            return createQuiz(req, res);
    }
}

async function getQuizzes(req, res) {
    try {
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes)
    } catch (err) {
        console.log(err)
        res.status(401).json({
            message: `Unable to fetch quizzes due to ${err}`
        });
    }
}

async function createQuiz(req, res) {
    let quiz = new Quiz({
        title: req.body.title,
        quizCode: nanoid(8),
        duration: req.body.duration,
        description: req.body.description,
        authorId: req.body.authorId,
        image: req.body.image,
    });
    try {
        let result = await quiz.save()
        return res.json(result);
    } catch (err) {
        res.status(401).json({
            message: `Unable to save quiz due to ${err}`
        });
    }
}
