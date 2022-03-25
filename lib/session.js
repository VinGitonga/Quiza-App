import { withIronSession } from "next-iron-session"

export default function withSession(handler){
    return withIronSession(handler, {
        password: process.env.SECRET_COOKIE_PASSWORD,
        cookieName: 'JessQuiz',
        cookieOptions: {
            // able to run in non-https env
            maxAge: 60 * 60 * 24 * 30, // 30 days,
            secure: process.env.NODE_ENV === 'production' ? true : false,
        },
    });
}
