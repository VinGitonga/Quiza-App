import connectDB from "../../../../mongodb/connectDB";
import Quiz from "../../../../mongodb/models/Quiz";
import User from "../../../../mongodb/models/User";

export default async function handler(req, res) {
    connectDB();
    switch (req.method) {
        case "PATCH":
            return unenrollFromQuiz(req, res);
    }
}

/**
 * Function that unenrolls a student from a quiz
 *
 * the slugs should be quizId followed by userId
 * i.e /api/quiz/unenroll/{quizId}/{userId}
 *
 */

async function unenrollFromQuiz(req, res) {
    const { slug } = req.query;
    let quizId = slug[0];
    let userId = slug[0];

    let user = await User.findById(userId);

    for (let i = 0; i < user.quizzesEnrolled.length; i++) {
        if (user.quizzesEnrolled[i].quizId.equals(quizId)) {
            try {
                await User.findByIdAndUpdate(
                    userId,
                    {
                        $pull: {
                            quizzesEnrolled: { quizId: quizId },
                        },
                    },
                    { safe: true }
                );
                await Quiz.findByIdAndUpdate(quizId, {
                    $pull: {
                        usersEnrolled: { userId: userId },
                    },
                });
                return res.status(200).json({
                    message: "Successfully unenrolled",
                });
            } catch (err) {
                return res.status(400).json({
                    message: `Something went wrong due to ${err.toString()}`,
                });
            }
        }
    }
}
