import axios from "axios";
const BASE_URL = "http://localhost:3000/api";

const login = async (email, password) => {
    try {
        const config = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };
        let resp = await axios.post(
            `${BASE_URL}/user/login`,
            {
                email,
                password,
            },
            config
        );
        console.log(resp)

        return resp.data;
    } catch (err) {
        console.log(err);
    }
};

const register = async (userData) => {
    try {
        const config = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };

        let resp = await axios.post(`${BASE_URL}/user`, userData, config);
        console.log(resp.data)
        return resp.data;
    } catch (err) {
        console.log(err);
    }
};

const logout = async() => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    let resp = await axios.get(`${BASE_URL}/user/logout`, config)
    return resp.data;
}

const uploadImage = async (imageData) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        let resp = await axios.post("https://api.cloudinary.com/v1_1/quiza/image/upload", imageData, config);
        console.log(resp.data)
        return resp.data

    } catch (err) {
        console.log(err)
    }
}

const getUser = async userId => {
    try {
        const config = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };

        let resp = await axios.get(`${BASE_URL}/user/authenticated/${userId}`)
        return resp.data;

    } catch (err) {
        console.log(err)
    }
}

export { login, register, uploadImage, logout, getUser };
