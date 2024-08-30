import Redis from "ioredis";
import { getSession } from "next-auth/react";

let client = new Redis(
    "redis-17110.c251.east-us-mz.azure.redns.redis-cloud.com:17110"
);

export default async function handler(req, res) {
    switch (req.method) {
        case "PATCH":
            return resetQuiz(req, res);
    }
}

async function resetQuiz(req, res) {
    const session = getSession({ req });

    // reset the quiz
    const val = await client.del((await session).user.id.toString);

    return res.status(200).json(val);
}
