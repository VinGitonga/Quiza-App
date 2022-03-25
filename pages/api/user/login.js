import withSession from "../../../lib/session";
import connectDB from "../../../mongodb/connectDB";
import User from "../../../mongodb/models/User";

export default withSession(async (req, res) => {
    connectDB();
    switch (req.method) {
        case "POST":
            return login(req, res);
    }
});

async function login(req, res) {
    try {
        let user = await User.findOne({
            email: req.body.email,
        });

        if (!user) {
            console.log("err user")
            return res.status(404).json({
                message: "User not found",
            });
        }

        if (!user.authenticate(req.body.password)) {
            console.log("err email & pass")
            return res.status(401).json({
                message: "Email or Password dont match",
            });
        }

        req.session.set("user", {
            id: user._id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
        });
        await req.session.save();
        return res.status(200).json(user);
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            message: "An error occured due to" + err,
        });
    }
}
