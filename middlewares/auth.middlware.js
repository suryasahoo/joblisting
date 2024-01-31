import jwt from "jsonwebtoken"

const verifyToken = (req, res, next) => {
    try {
        const token = req.header("Authorization")
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized user"
            })
        }
        // Verify token
        const verifiedUser = jwt.verify(token, process.env.JWT_SECRET)
        if (!verifiedUser) return res.status(401).json({
            message: "Invalid token"
        })
        req.userId = verifiedUser.userId
        next()
    } catch (error) {
        req.status(401).json({
            message: "Invalid token"
        })
    }
}

export { verifyToken }