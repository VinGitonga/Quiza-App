import useSWR from "swr";
import { useSession } from "next-auth/react";
import axios from "axios";
import AuthorQuizzes from "../components/Quiz/AuthorQuizzes";
import StudentQuizzes from "../components/Quiz/StudentQuizzes";

const fetcher = (url) => axios.get(url).then((resp) => resp.data);

const MyQuizzes = () => {
    const { data: session } = useSession();

    const { data: quizzes } = useSWR(
        () =>
            session?.user?.role === "Student"
                ? "/api/quiz/enrolled"
                : "/api/user/my_quizzes",
        fetcher
    );

    return session?.user?.role === "Student" ? (
        <StudentQuizzes quizzes={quizzes} />
    ) : (
        <AuthorQuizzes quizzes={quizzes} />
    );
};

export default MyQuizzes;
