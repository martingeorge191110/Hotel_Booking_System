import exprees from 'express'
import { addFlight } from '../Controllers/flights.js'

const router = exprees.Router()


router.route("/new_flights").post(addFlight)


export default router
