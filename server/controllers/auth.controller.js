import {getToken} from "../utils/token.js"

import UserModel from "../modals/user.models.js"

export const googleAuth = async (req, resp) => {
    try {
        const { name, email } = req.body
        let user = await UserModel.findOne({ email })
        if (!user) {
            user = await UserModel.create({
                name, email
            })
        }
        let token = await getToken(user._id)
        resp.cookie("token", token, { httpOnly: true, secure: false, samesite: "strict", maxAge: 7 * 24 * 60 * 60 * 1000 })
        return resp.status(200).json(user)
    } catch (error) {
        return resp.status(500).json({ message: `GooglesignUp error -> ${error}` })
    }

}

export const logout = async (req, resp) => {
    try {
        await resp.clearCookie("token")
        return resp.status(200).json({message:"Logout Successfully"})
    } catch (error) {
        return resp.status(500).json({ message: `logout error -> ${error}` })
    }
}