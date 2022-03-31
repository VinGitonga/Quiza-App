import connectDB from "../../../mongodb/connectDB";
import Quiz from "../../../mongodb/models/Quiz";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
    connectDB();
    switch (req.method) {
        case "GET":
            return getMyAuthoredQuizes(req, res);
    }
}

async function getMyAuthoredQuizes(req, res) {
    const session = await getSession({ req });

    var query = { userId: session?.user?.id };

    let quizzes = await Quiz.find({ authorId: query.userId });

    return res.status(200).json(quizzes);
}
