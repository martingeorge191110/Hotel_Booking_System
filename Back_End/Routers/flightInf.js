import exprees from 'express'
import { addFlight, getOneWayFlihgts } from '../Controllers/flights.js'

const router = exprees.Router()


router.route("/new_flights").post(addFlight)
router.route("/search/one_way").post(getOneWayFlihgts)

export default router
