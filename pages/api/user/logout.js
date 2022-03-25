import withSession from "../../../lib/session"

export default withSession(async (req, res) => {
    if (req.method === "GET"){
        await req.session.destroy();
        return res.status(200).json({ message: "Logout success" })
    }
});
