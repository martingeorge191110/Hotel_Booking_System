import express from 'express'
import { verifyToken } from '../MiddleWares/TokenVerification/verifyToken.js'
import { addUserFlight, updateAirline } from '../Controllers/userFlightControll.js'

const router = express.Router()

router.use(verifyToken)

router.route("/flight").post(addUserFlight, updateAirline)

export default router
