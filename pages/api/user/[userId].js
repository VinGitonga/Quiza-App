import connectDB from "../../../mongodb/connectDB";
import User from "../../../mongodb/models/User";

export default async function handler(req, res) {
    connectDB();
    switch (req.method) {
        case "GET":
            return getMyQuizSubmissions(req, res);
    }
}

async function getMyQuizSubmissions(req, res) {
    const { userId } = req.query;
    try {
        const quizzes = await User.findById(userId)
            .populate({
                path: "quizzesGiven",
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

        return res.status(200).json(quizzes.quizzesGiven);
    } catch (err) {
        return res.status(400).json({
            message: "Something went wrong",
        });
    }
}
