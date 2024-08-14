import express from "express"
import { addHotel, allHotels, findHotels, specificHotel } from "../Controllers/hotelControll.js"


const router = express.Router()


router.route("/addHotel").post(addHotel)
router.route("/getHotels").get(allHotels)
router.route("/search").get(findHotels) // must write a query with city and max and min
router.route("/:id").get(specificHotel) // must write the id of hotel in MongoDB

export default router