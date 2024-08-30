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

// const verifyUser = (req, res, next) => {
//     verifyToken(req, res, () => {
//         if (req.user) {
//             next();
//         } else {
//             console.log("req.user not exist");
//             res.status(401).json({
//                 success: false,
//                 message: "You are not authorized"
//             });
//         }
//     });
// };

export { verifyToken };
