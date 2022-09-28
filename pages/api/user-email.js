import mongoose from "mongoose";
import UserProfile from "../../models/userProfile";

export default async function handler(req, res) {
    mongoose
        .connect(
            "mongodb+srv://sarvesh2902:Hi5JUL8XES1YAmOU@cluster0.wfnik3x.mongodb.net/portfolio?retryWrites=true&w=majority",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )
        .then(() => {
            console.log("Connected to Mongo");
        })
        .catch((e) => {
            console.log("Failed to connect to Mongo");
            console.log(e);
        });

    if (req.method === "GET") {
        let userProfile = await UserProfile.findOne({ email: req.query.email });
        if (!userProfile) {
            const user = new UserProfile({ email: req.query.email });
            await user.save();
            userProfile = await UserProfile.findOne({
                email: req.query.email,
            });
        }
        res.status(200).json(userProfile);
    }
    // else if (req.method === "POST") {
    //     const formData = req.body.formData;
    //     const user = new UserProfile(formData);
    //     await user.save();
    //     res.send(user);
    // }
}
