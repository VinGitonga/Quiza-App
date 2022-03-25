import connectDB from "../../../../mongodb/connectDB";
import User from "../../../../mongodb/models/User";

export default async function handler(req, res) {
    connectDB();
    switch (req.method) {
        case "GET":
            return getUser(req, res);
    }
}

async function getUser(req, res) {
    const { authId: userId } = req.query;

    const user = await User.findById(userId);

    return res.status(200).json({
        id: user._id,
        name: user.name,
        image: user.image,
        role: user.role,
    });
}
