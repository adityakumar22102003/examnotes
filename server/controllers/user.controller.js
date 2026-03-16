import UserModel from "../modals/user.models.js";

export const getCurrentUser = async (req,resp) => {
    try {
        const userId = req.userId;
        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            return resp.status(404).json({message:"current user not found"})
        }
        return resp.status(200).json(user);


    } catch (error) {
        return resp.status(500).json({ message: `getCurrent user error -> ${error}` })
    }
}