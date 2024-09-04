import User from "../Modules/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const addUser = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const existingUser = await User.findOne({ userEmail: req.body.email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }

        const userDoc = await User.create({
            userName: req.body.name,
            userEmail: req.body.email,
            userPassword: hash,
        });

        return res.status(200).json({
            success: true,
            data: userDoc
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to post the data",
            error: err.message,
        });
    }
};

const getUser = async (req, res) => {
    try {
        const userDoc = await User.findOne({ userEmail: req.body.email });

        if (!userDoc) {
            return res.status(400).json({
                success: false,
                message: "Please register because your email does not exist"
            });
        }

        const passwordCorrect = await bcrypt.compare(req.body.password, userDoc.userPassword);

        if (!passwordCorrect) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password"
            });
        }

        const token = jwt.sign({
            userId: userDoc._id
        }, process.env.JWT, {
            expiresIn: process.env.EXP_TIME
        })

        res.status(200).json({
            success: true,
            message: "User authenticated successfully",
            data: userDoc,
            token: token
        });
    } catch (err) {
        console.error("Error in getUser:", err);
        res.status(500).json({
            success: false,
            message: "Failed to get the desired data",
            error: err.message
        });
    }
};

// send profile details by token
const getProfile = async (req, res) => {
    try {
        const {userId} = await req.userId
        const {userName, userEmail, userPhone, age} = await User.findOne({
            _id: userId
        })
        res.status(200).json({
            success: true,
            data: {
                name: userName,
                email: userEmail,
                phone: userPhone || null,
                age: age || null
            }
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error in network",
            error: err.message
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const {userId} = await req.userId
        const {name, email, phone, age} = await req.body
        const user = await User.updateOne({
            _id: userId
        }, {
            userName: name,
            userEmail: email,
            userPhone: phone || null,
            age: age || null
        }, {
            runValidator: true
        })
        const newUser = await User.findOne({
            _id: userId
        })
        if (user) {
            return res.status(200).json({
                success: true,
                data: newUser
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "NO Data Updated"
            })
        }
    } catch (err) {
        return res.status(500).json({
            success: false, 
            message: new Error(err)
        })
    }
}

export { addUser, getUser , getProfile, updateUser};
