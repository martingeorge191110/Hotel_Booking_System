import express from 'express'
import { bookHotel, getBooks } from '../Controllers/user_Hotel_controller.js'
import { verifyToken } from '../MiddleWares/TokenVerification/verifyToken.js'

const router = express.Router()

router.use(verifyToken)

router.route("/book").post( bookHotel)
router.route("/get_books").post( getBooks)

export default router