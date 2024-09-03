import UserFlight from "../Modules/user_flight.js";
import Airline from "../Modules/flight.js";
import User from "../Modules/users.js";

/**
 * Function to reduce tickets which user booked
 */

const updateAirline = async (req, res) => {
	const {airline, flightNumber, travelers, fClass} = req.body.flight
	try {
		let travelerNum = Number(travelers.adult) + Number(travelers.children) + Number(travelers.senior)
		const updatedAirline = await Airline.updateOne({
			airline: airline,
			"flights.number": flightNumber,
			"flights.classes.flightClass": fClass
		}, {
			$inc: {
				"flights.$[flight].availableTickets": -travelerNum,
				"flights.$[flight].classes.$[class].tickets": -travelerNum
			},
		}, {
			arrayFilters: [
				{ "flight.number": flightNumber },
				{ "class.flightClass": fClass }
			]
		})
		if (updatedAirline.nModified === 0)
			return (res.status(404).json({
				succes: false,
				message: "Something Went Wrong duirng updating flight data"
			}))
		
		return (res.status(200).json({
			succes: true,
			message: "Data Sent to UserFlight Document, and updated airline flight document"
		}))
	} catch (err) {
		return (res.status(500).json({
			succes: false,
			message: "Connection Failed or Somthing went Wrong"
		}))
	}
}

/**
 * Function to book a flight
 * get the token from user body
 * re.body.flight: {
 *    airline, airport, from, to, flightNumber, travelers ({adult, children, seniors}), paid, fClass
 * }
 */
const addUserFlight = async (req, res, next) => {
	const {userId} = req.userId
	const flightBook = req.body.flight
	try {
		const userInf = await User.findOne({
			_id: userId
		})
		if (!userInf) {
			return (res.status(404).json({
				succes: false,
				message: "User is not Found"
			}))
		}
		const userEmail = userInf.userEmail
		let findUserFlight = await UserFlight.findOne({
			userId: userId
		})
		if (!findUserFlight) {
			findUserFlight = UserFlight.create({
				 userId: userId,
				 userEmail: userEmail,
				 flights: [flightBook]
			});
		} else {
			findUserFlight.flights.push(flightBook);
		}

		await findUserFlight.save();
		next();
	} catch (err) {
		console.log(err)
		return (res.status(500).json({
			succes: false,
			message: "Failed to connect"
		}))
	}
}

export {addUserFlight, updateAirline}