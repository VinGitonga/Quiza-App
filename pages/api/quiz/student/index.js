import Redis from "ioredis"
import { getSession } from "next-auth/react";

let client = new Redis(process.env.REDIS_URL);


export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            return getCachedQuiz(req, res);
    }
}

async function getCachedQuiz(req, res) {
    const session = await getSession({ req });
    console.log(session.user.id)
    var quizData = await client.get(session.user.id)
    quizData = JSON.parse(quizData)
    console.log(quizData)

    
    return res.status(200).json(quizData);
}
