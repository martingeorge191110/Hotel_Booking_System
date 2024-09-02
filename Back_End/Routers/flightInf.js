import exprees from 'express'
import { addFlight, getOneWayFlihgts, getTwoWayFlights } from '../Controllers/flightControll.js'

const router = exprees.Router()

/**
 * For Adding new airline or new flight details
 *       (Dash Bord or Postman or Manuall on MongoDB)
 */
router.route("/new_flights").post(addFlight)

/**
 * Search about one way flights
 */
router.route("/search/one_way").post(getOneWayFlihgts)
router.route("/search/return").post(getTwoWayFlights)


export default router
