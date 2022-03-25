import connectDB from "../../../mongodb/connectDB";
import Quiz from "../../../mongodb/models/Quiz";

export default async function handler(req, res) {
    connectDB();
    switch (req.method) {
        case "GET":
            return getQuizSubmissions(req, res);
    }
}

async function getQuizSubmissions(req, res) {
    const { quizId } = req.query;
    try {
        const users = await Quiz.findById(quizId)
            .populate({
                path: "usersParticipated",
                populate: { path: "userId" },
            })
            .exec();

        if(!users){
            return res.status(400).json({
                message: `An error was encountered while fetching`
            });
        }

        const userResults = users.usersParticipated;
        return res.status(200).json(userResults)
    } catch (err) {
        return res.status(400).json({
            message: "Something went wrong"
        })
    }
}
