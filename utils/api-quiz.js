import axios from "axios"

const BASE_URL = "http://localhost:3000/api"

const create = async (quiz) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        let resp = await axios.post(`${BASE_URL}/quiz`, quiz, config)
        return await resp.data;
    } catch (err) {
        console.log(err)
    }
}

export { create }