import connectDB from "../../../../mongodb/connectDB";
import User from "../../../../mongodb/models/User";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
    connectDB();
    switch (req.method) {
        case "GET":
            return getMyQuizSubmissions(req, res);
    }
}

async function getMyQuizSubmissions(req, res) {
    const session = await getSession({ req });
    const userId = session?.user?.id;
    try {
        const quizzes = await User.findById(userId)
            .populate({
                path: "quizesGiven",
                populate: {
                    path: "quizId",
                },
            })
            .exec();

        if (!quizzes) {
            return res.status(404).json({
                message: "No submissions yet",
            });
        }


        return res.status(200).json(quizzes.quizesGiven);
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            message: "Something went wrong",
        });
    }
}
