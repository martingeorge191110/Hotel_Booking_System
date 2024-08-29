import express from 'express'
import { bookHotel, getBooks } from '../Controllers/user_Hotel_controller.js'
import { verifyToken } from '../Controllers/TokenVerification/verifyToken.js'

const router = express.Router()

router.route("/book").post(verifyToken, bookHotel)
router.route("/get_books").post(verifyToken, getBooks)

export default router