import connectDB from "../../../../mongodb/connectDB";
import Quiz from "../../../../mongodb/models/Quiz";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
    connectDB();
    switch (req.method) {
        case "GET":
            return getEnrolledQuizzes(req, res);
    }
}

async function getEnrolledQuizzes(req, res) {
    const session = await getSession({ req });

    try {
        let query = { userId: session.user.id };

        let quizzes = await Quiz.find({ "usersEnrolled.userId": query.userId });

        return res.status(200).json(quizzes);
    } catch (err) {
        return res.status(400).json({
            message: `An error was encountered due to ${err.toString()}`,
        });
    }
}
