import UserFlight from "../Modules/user_flight.js";
import Airline from "../Modules/flight.js";
import User from "../Modules/users.js";

const updateAirline = (req, res, next) => {

}

/**
 * Function to book a flight
 * get the token from user body
 * re.body.flight: {
 *    airline, airport, from, to, flightNumber, travelers (object), paid
 * }
 */
const addUserFlight = async (req, res, next) => {
   const {userId} = req.userId
   const flightBook = req.body.flight
   try {
      const userInf = await User.findOne({
         _id: userId
      })
      const userEmail = userInf.userEmail
      const findUserFlight = await UserFlight.findOne({
         userId: userId
      })
      if (!findUserFlight) {
         await UserFlight.create({
            userId: userId,
            userEmail: userEmail,
            flights: [flightBook]
         })
         next();
      }
      findUserFlight.flights.push(flightBook)

      await findUserFlight.save()

      next()
   } catch (err) {
      return (res.status(500).json({
         succes: false,
         message: "Failed to connect"
      }))
   }
}

export {addUserFlight, updateAirline}