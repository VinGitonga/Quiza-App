import redis from "redis";
import { nanoid } from "nanoid";
import connectDB from "../../../../mongodb/connectDB";
import Quiz from "../../../../mongodb/models/Quiz";
import Question from "../../../../mongodb/models/Question";
import User from "../../../../mongodb/models/User";
import Attempt from "../../../../mongodb/models/Attempt";

const REDIS_PORT = 6379;

const client = redis.createClient(REDIS_PORT);

export default async function handler(req, res) {
    connectDB();
    switch (req.method) {
        case "GET":
            return getResponses(req, res);
        case "PATCH":
            return startQuiz(req, res);
        case "POST":
            return markQuiz(req, res);
    }
}

/**
 * Function that starts quiz and stores the quiz data in redis cache server
 *
 * the slugs should be quizId followed by userId
 * i.e /api/quiz/start/{quizId}/{userId}
 *
 */

async function startQuiz(req, res) {
    const { slug } = req.query;
    const quizId = slug[0];
    const userId = slug[1];

    try {
        let user = await User.findById(userId);
        let quiz = await Quiz.findById(quizId);

        let query = { quizId: quizId };

        let questions = await Question.find({ quizId: query.quizId });

        var status = false;

        /**
         * Check if user is enrolled first
         */

        for (let i = 0; i < user.quizzesEnrolled.length; i++) {
            if (user.quizzesEnrolled[i].quizId.equals(quizId)) {
                status = true;
            }
        }

        /**
         * Return false if user is not enrolled
         */

        if (!status) {
            return res.status(409).json({
                message: `You are not enrolled`,
            });
        }

        /**
         * Save the questions in cache database
         */

        client.setex(userId.toString(), 3600, JSON.stringify(questions));

        var data = [];

        /**
         * Return the questions to frontend without the correctAns
         */
        for (let i = 0; i < questions.length; i++) {
            var object = {
                quizId: questions[i].quizId,
                description: questions[i].description,
                options: questions[i].options,
                questionId: questions[i]._id,
            };
            data.push(object);
        }

        /**
         * Return the response to the frontend
         */

        await res.status(200).json({
            questions: data,
            duration: quiz.duration,
        });
    } catch (err) {
        return res.status(400).json({
            message: `An error was encountered due to ${err}`,
        });
    }
}

async function markQuiz(req, res) {
    const { slug } = req.query;
    const quizId = slug[0];
    const userId = slug[1];
    const questions = req.body.questions;
    const timeStarted = req.body.timeStarted;
    const timeEnded = req.body.timeEnded;
    var responses = [];
    var score = 0;
    var attemptId = nanoid(8);

    /**
     * Retrieve the questions stored in the redis
     */
    client.get(userId.toString(), async (err, data) => {
        if (err) {
            return res.status(400).json({
                message: "Error fetching cache",
            });
        }

        /**
         * Parse through the questions
         */

        var dataQuestions = JSON.parse(data);

        if (data !== null) {
            for (let i = 0; i < dataQuestions.length; i++) {
                /**
                 * Start marking the questions by cross checking the answers
                 */
                if (
                    questions[i].selectedOption ===
                    dataQuestions[i].correctAnswer
                ) {
                    score += 1;
                }

                /**
                 * Save the marking info into an object for saving
                 */
                var object = {
                    description: dataQuestions[i].description,
                    selected: questions[i].selectedOption,
                    questionId: questions[i].quizId,
                    correctAnswer: dataQuestions[i].correctAnswer,
                    options: dataQuestions[i].options,
                };
                responses.push(object);
            }

            /**
             * Update the User Object
             */
            await User.updateOne(
                { _id: userId },
                {
                    $push: {
                        quizzesGiven: {
                            quizID,
                            score,
                            responses,
                            timeEnded,
                            timeStarted,
                            attemptId,
                        },
                    },
                }
            ).then(async (res1) => {
                /**
                 * Update Quiz Object
                 */
                await Quiz.updateOne(
                    { _id: quizId },
                    {
                        $push: {
                            usersParticipated: {
                                userId,
                                score,
                                responses,
                                timeEnded,
                                timeStarted,
                                attemptId,
                            },
                        },
                    }
                )
                    .then(async (res3) => {
                        /**
                         * Create new attempt object containing both userId and quizId and unique id for attempt
                         */
                        let attempt = new Attempt({
                            quizId: quizId,
                            userId: userId,
                            specId: attemptId,
                        });
                        await attempt.save();
                    })
                    .then(() => {
                        return res.status(200).json({
                            message: "Successfully submitted the quiz",
                        });
                    });
            });
        } else {
            return res.status(400).json({
                message: "No data stored in cache",
            });
        }
    });
}

/**
 * Fetch Student's Responses by passing quizId
 */
async function getResponses(req, res) {
    const { slug } = req.query;
    try {
        let quizId = slug[0];
        let quiz = await Quiz.findById(quizId);
        var query = {
            quizId: quizId,
        };

        let attempts = await Attempt.find({
            quizId: query.quizId,
        });

        /**
         * At this point we loop through the quiza's usersParticipants and attempst as well
         * We point against which attempt's specId corresponds we the participants attemptId
         * Thereafter we dispatch the results to the frontend
         */
        let i, j;
        for (i = 0; i < quiz.usersParticipated.length; i++) {
            for (j = 0; j < attempts.length; j++) {
                if (
                    attempts[j].specId === quiz.usersParticipated[i].attemptId
                ) {
                    var attemptInfo = quiz.usersParticipated[i];
                }
            }
        }

        return res.status(200).json(attemptInfo);
    } catch (err) {
        return res.status(400).json({
            message: "Couldn't fetch the responses",
        });
    }
}
