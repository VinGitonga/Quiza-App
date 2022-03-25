import connectDB from "../../../../mongodb/connectDB";
import Quiz from "../../../../mongodb/models/Quiz";
import User from "../../../../mongodb/models/User";

export default async function handler(req, res) {
    connectDB();
    switch (req.method) {
        case "PATCH":
            return enrollToQuiz(req, res);
    }
}


/**
 * Function that enrolls a student to a quiz
 * 
 * the slugs should be quizId followed by userId
 * i.e /api/quiz/enroll/{quizId}/{userId}
 * 
 */
async function enrollToQuiz(req, res) {
    const { slug } = req.query;
    let quizId = slug[0];
    let userId = slug[1];

    let quiz = await Quiz.findById(quizId);

    try {
        // confirm if the user is enrolled first
        for (let i = 0; i < quiz.usersEnrolled.length; i++) {
            if (quiz.usersEnrolled[i].userId.equals(userId)) {
                return res.status(409).json({
                    message: `User already enrolled`,
                });
            }
        }

        // If not proceed
        await Quiz.updateOne(
            { _id: quizId },
            { $push: { usersEnrolled: { userId } } }
        )
            .then(async (result) => {
                await User.updateOne(
                    { _id: userId },
                    { $push: { quizzesEnrolled: { quizId } } }
                )
                    .then(async (res2) => {
                        return res.status(200).json({
                            message: "Successfully enrolled",
                        });
                    })
                    .catch((err) => {
                        return res.status(400).json({
                            message: `Something went wrong due to ${err.toString()}`,
                        });
                    });
            })
            .catch((err) => {
                return res.status(400).json({
                    message: `An error was encountered due to ${err.toString()}`,
                });
            });
    } catch (err) {
        return res.status(400).json({
            message: `Something weird occured due to ${err.toString()}`,
        });
    }
}
