import express from "express"
import { addUser, getUser, getProfile, updateUser } from '../Controllers/userControll.js'
import { verifyToken } from '../MiddleWares/TokenVerification/verifyToken.js'

const router = express.Router()


router.route("/addUser").post(addUser)
router.post("/getUser", getUser)
router.post("/getId",verifyToken, getProfile)
router.route("/updateUser").put(verifyToken ,updateUser)


export default router