import express from 'express'
import { verifyToken } from '../MiddleWares/TokenVerification/verifyToken.js'
import { addUserFlight, getUserFlights, updateAirline } from '../Controllers/userFlightControll.js'

const router = express.Router()

router.use(verifyToken)

router.route("/flight").post(addUserFlight, updateAirline)
router.route("/").post(getUserFlights)

export default router
