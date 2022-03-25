import axios from "axios";
const BASE_URL = "http://localhost:3000/api/question";

export const createQuestion = async (quizId, questionData) => {
    try {
        const config = {
            headers: {
                Accept: "application/json",
                "Content-Type":"application/json"
            }
        }

        const resp = await axios.post(`${BASE_URL}/creating/${quizId}`, questionData, config);
        return resp.data;

    } catch (err) {
        console.log(err)
    }
}

export const getQuestions = async quizId => {
    try {
        const config = {
            headers: {
                "Content-Type":"application/json"
            }
        }

        const resp = await axios.get(`${BASE_URL}/creating/${quizId}`, config)

        return resp.data;

    } catch (err) {
        console.log(err)
    }
}


