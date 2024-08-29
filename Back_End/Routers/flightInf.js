import exprees from 'express'
import {verifyToken} from '../Controllers/TokenVerification/verifyToken.js'
import { addFlight } from '../Controllers/flights.js'

const router = exprees.Router()


router.route("/new_flights").post(addFlight)


export default router
