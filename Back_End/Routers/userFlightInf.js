import express from 'express'
import { verifyToken } from '../MiddleWares/TokenVerification/verifyToken'
import { addUserFlight, updateAirline } from '../Controllers/userFlightControll'

const router = express.Router()

router.use(verifyToken)

router.route("/flight").post(addUserFlight).put(updateAirline)

export default router
