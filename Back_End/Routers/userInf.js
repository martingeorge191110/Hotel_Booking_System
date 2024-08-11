import express from "express"
import { addUser, getUser } from '../Controllers/userControll.js'

const router = express.Router()


router.route("/addUser").post(addUser)
router.route("/getUser").post(getUser)


export default router