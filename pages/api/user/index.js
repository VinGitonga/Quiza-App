import connectDB from "../../../mongodb/connectDB";
import User from "../../../mongodb/models/User";


export default async function handler(req, res) {
    connectDB();
    switch (req.method) {
        case "GET":
            return getUsers(req, res);
        case "POST":
            return createUser(req, res);
    }
}

async function createUser(req, res){
    console.log(req.body)
    const user = await User.create(req.body);
    try {
        await user.save()
        return res.status(200).json(user)
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            message: `An error occured due to ${err.toString()}`
        });
    }
}

async function getUsers(req, res){
    try {
        let users = await User.find();
        return res.status(200).json(users)
    } catch (err) {
        return res.status(400).json({
            message:  `Unable to fetch users due to ${err.toString()}`
        });
    }
}