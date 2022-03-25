import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";

export default function useUser(redirectTo = false, redirectIfFound = false) {
    const { data: user, mutate: mutateUser } = useSWR("/api/user/auth");

    useEffect(() => {
        // if not redirect needed, just return /quizzes
        // if user not yet there (fetch in progress and log them in)
        if (!redirectTo || !user) return;

        if (
            // if redirectTo is set, redirect if the user was not found
            (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
            (redirectIfFound && user?.isLoggedIn)
        ) {
            Router.push(redirectTo);
        }
    }, [user, redirectIfFound, redirectTo]);

    return { user, mutateUser };
}
