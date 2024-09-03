import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const { token } = req.body;
    if (!token) {
        return res.status(404).json({
            success: false,
            message: "Token not found"
        });
    }

    jwt.verify(token, process.env.JWT, (err, userInformation) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: "Token is not valid"
            });
        }
        req.userId = userInformation
    });
    next()
};


export { verifyToken };
