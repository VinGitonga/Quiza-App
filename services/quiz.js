import axios from "axios";
const BASE_URL = "http://localhost:3000/api";

export const createQuiz = async quizData => {
    try {
        const config = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };

        let resp = await axios.post(`${BASE_URL}/quiz`, quizData, config)

        return resp.data

    } catch (err) {
        console.log(err)
    }
}

export async function getQuizzes() {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        let resp = await axios.get(`${BASE_URL}/quiz`, config)

        return resp.data

    } catch (err) {
        console.log(err)
    }
}


export const getQuizDetail = async quizId => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        let resp = await axios.get(`${BASE_URL}/quiz/details/${quizId}`, config)

        return resp.data
    } catch (err) {
        console.log(err)
    }
}