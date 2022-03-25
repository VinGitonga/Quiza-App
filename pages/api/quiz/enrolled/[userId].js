import connectDB from "../../../../mongodb/connectDB";
import Quiz from "../../../../mongodb/models/Quiz";

export default async function handler(req, res) {
    connectDB();
    switch (req.method) {
        case "GET":
            return getEnrolledQuizzes(req, res);
    }
}

async function getEnrolledQuizzes(req, res) {
    const { userId } = req.query;

    try {
        let query = { userId: userId };

        let quizzes = await Quiz.find({ "usersEnrolled.userId": query.userId });

        return res.status(200).json(quizzes);
    } catch (err) {
        return res.status(400).json({
            message: `An error was encountered due to ${err.toString()}`,
        });
    }
}
