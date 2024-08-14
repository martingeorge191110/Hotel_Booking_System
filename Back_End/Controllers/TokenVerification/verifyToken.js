import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const token = req.cookies.key // Access the token correctly
    // console.log('Token received:', token);
    if (!token) {
        return res.status(401).json({
            accessToken: false,
            message: "You Are Not Authenticated"
        });
    }

    jwt.verify(token, process.env.JWT, (err, userInf) => {
        if (err) {
            return res.status(403).json({
                tokenVerification: false,
                message: "Token is Not Valid"
            });
        }
        req.user = userInf;
        next();
    });
};

const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user) {
            next();
        } else {
            console.log("req.user not exist");
            res.status(401).json({
                success: false,
                message: "You are not authorized"
            });
        }
    });
};

export { verifyToken, verifyUser };
