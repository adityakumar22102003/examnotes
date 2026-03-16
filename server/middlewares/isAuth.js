import jwt from "jsonwebtoken";


const isAuth = async (req, resp, next) => {
    try {
        let { token } = req.cookies
        if (!token) {
            return resp.status(400).json({message:"Token is not found"})
        }
        let verifyToken = jwt.verify(token, process.env.JWT_SECRET)
        if (!verifyToken) {
            return resp.status(400).json({ message: "User doesn't have valid token" })
        }
        req.userId = verifyToken.userId;
        next()
    } catch (error) {
        return resp.status(500).json({ message: `is auth error ${error}` })
    }
}
export default isAuth