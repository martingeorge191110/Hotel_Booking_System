import express from "express"
import { addUser, getUser, getProfile, updateUser } from '../Controllers/userControll.js'
import { verifyToken } from '../MiddleWares/TokenVerification/verifyToken.js'

const router = express.Router()


router.route("/addUser").post(addUser)
router.post("/getUser", getUser)

/* Verify token middle ware for the following apis */
router.use(verifyToken)

router.post("/getId", getProfile)
router.route("/updateUser").put(updateUser)


export default router