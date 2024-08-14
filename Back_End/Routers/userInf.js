import express from "express"
import { addUser, getUser } from '../Controllers/userControll.js'
import { verifyUser } from "../Controllers/TokenVerification/verifyToken.js"

const router = express.Router()


router.route("/addUser").post(addUser)
router.post("/getUser", verifyUser, getUser)


export default router