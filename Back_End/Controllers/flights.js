import Airline from '../Modules/flight.js'

const newAirLine = (res, jsonObj) => {
	return res.status(200).json({
		success: true,
		data: jsonObj
	})
}

const updateAirLine = (res, jsonObj) => {
	return res.status(200).json({
		success: true,
		data: jsonObj,
		mess: "Updated Successfully"
	})
}


const addFlight = async (req, res) => {
	try {
	const { /* flights is array contains (number, arrivalCity,
		array of classess
		(flightClass, price))*/
		airline, airport, city, flights
	} = req.body
	const FindAirLine = await Airline.findOne({
		airline: airline
	})
	if (!FindAirLine) {
		const Flight = await Airline.create({
			airline: airline,
			airportName: airport,
			city: city,
			flights: flights,
		})
		return (newAirLine(res, Flight));
	} 
	const updatedFlights = [...FindAirLine.flights, ...flights];
	const UpdatedAirline = await Airline.updateOne({
		airline: airline
	}, {
		flights: updatedFlights,
	}, {
		runValidator: true
	})
	const jsonObj = {
		airLine: airline,
		newFlights: flights
	}
	return (updateAirLine(res, jsonObj));
} catch (err) {
	return res.status(500).json({
		success: false,
		message: "Connection Failed",
		error: err
	})
}
}

/**
 * Function to handle error data for not available data
 * 				(searching api)
 */

const handleError = (res, mess, details) => {
	return (res.status(404).json({
		success: false,
		message: mess,
		details: details
	}))
}

/**
 * Function to hanlde one way flights
 * 
 *	Url EX: --> http://localhost:8000/api/flights/search/one_way?fClass=Economy&from=Atlanta&to=Los%20Angeles
 * Body EX: --> {
		"travelersNum": 10,
		"dates": {
			"arrivingDate": "Tue 2024-09-10"
		}
}
 */
const getOneWayFlihgts = async (req, res) => {
	/**
	 * select data from query
	 */
	const {fClass, from, to} = req.query
	/**
	 * travelers is object of travelers
			dates object of to ,and return dates if exists
	*/
	const {travelersNum, dates} = req.body
	if (!from || !to || !dates || !travelersNum || !fClass) {
		return handleError(res, 400, "Bad Request", "Missing required fields");
  }
	try {
		/* find array of flights from desired city*/
		const oneWayFlights = await Airline.find({
			city: from,
		})
		/* if no flights from desired location exists */
		if (!oneWayFlights) {
			return (res.status(404).json({
				success: false,
				message: "Data One Way Not found",
				details: "No air flights will be available now"
			}))
		}
		/* creating array to storing the flights */
		let flightsArr = [];

		for (let i = 0; i < oneWayFlights.length; i++) {
			const airline = oneWayFlights[i];
			
			for (let j = 0; j < airline.flights.length; j++) {
				const flight = airline.flights[j];
				let desiredClass = null;
				for (let k = 0; k < flight.classes.length; k++) {
					if (fClass === flight.classes[k].flightClass) {
						desiredClass = flight.classes[k];
							break;
						}
					}
			if (desiredClass && desiredClass.tickets >= travelersNum) {
				if (
						flight.availableTickets >= travelersNum &&
						flight.arrivalCity === to &&
						flight.date === dates.arrivingDate
					) {
						flightsArr.push({
						airline: airline.airline,
						airport: airline.airportName,
						from: airline.city,
						flight: flight
							});
						}
					}
				}
		  }

		  if (flightsArr.length === 0) {
				return handleError(res, 404, "No Flights Available", "No flights match the provided criteria");
		  }

		  return res.status(200).json({
				success: true,
				message: "Flights found",
				data: flightsArr
		  });
	} catch (err) {
		return (res.status(500).json({
			success: false,
			message: "Connection Failed",
			error: err
		}))
	}
}

/**
  * Function to return array of flights available
  * @airLineArr: airline array fron Data Base
  * @fClass: Desired class from the user
  * @travelersNum: number of travelers
  * @date: date of travelling
  *
  * Return: array of Found (Flights)
 */

const findDesiredFlights = (airLineArr, fClass, travelersNum, date) => {
	let flightArray = [];

	airLineArr.forEach((airline) => {
		/* First loop on airlines existing with same locations desired */
		if (airline.flights && Array.isArray(airline.flights)) {

			/* Second loop to search on flights with those eickets number and date */
			airline.flights.forEach((flight) => {
				if (flight.availableTickets >= travelersNum && flight.date === date) {

					/*	Third loop to check on the classes */
					for (let flyClass of flight.classes) {
						if (flyClass.flightClass === fClass && flyClass.tickets >= travelersNum) {
							flightArray.push({
								  airline: airline.airline,
								  airport: airline.airportName,
								  from: airline.city,
								  flight: flight,
							});
							break;
						}
					}
				}
			});
		}
	});

	return (flightArray);
}

/**
 * Function to return the Desired Data
 * URl EX: --> http://localhost:8000/api/flights/search/return?fClass=Economy&from=Atlanta&to=Los%20Angeles
 * Body EX: --> {
    "travelersNum": 2,
    "dates": {
        "arrivingDate": "Tue 2024-09-10",
        "returnDate": "Fri 2024-09-15"
    }
}
 */
const getTwoWayFlights = async (req, res) => {
	/**
	 * Get data from query params and request body
	 */
	const {fClass, from, to} = req.query
	const {travelersNum, dates} = req.body

	try {
		let fromLocation = [], toLocation = [];
		const findFromFlights = await Airline.find({
			city: from,
			"flights.arrivalCity": to,
		})
		if (!findFromFlights)
			return (handleError(res, "Failed to Find desired Flights", "No Flights From your desired location"))
		/**
		 * Return object about (From) location data details
		 */
		fromLocation = findDesiredFlights(findFromFlights, fClass, travelersNum, dates.arrivingDate)
		/* If no flights found from user location */
		if (fromLocation.length === 0)
			return (handleError(res, "No Flights Available", `No Flights with your Crietria classes tickets available ${findFromFlights.flights.classes}`))

		const findToFlights = await Airline.find({
			city: to,
			"flights.arrivalCity": from
		})
		if (!findToFlights)
			return (res.status(200).json({
				success: true,
				message: "Fond Flights Just about your current location, no any other flights retrun with your desired return date",
				data: fromLocation
			}))
		/**
		 * Return object about (To) location data details
		 */
		toLocation = findDesiredFlights(findToFlights, fClass, travelersNum, dates.returnDate)
		/* If no flights found To user location */
		if (toLocation.length === 0) {
			return (res.status(200).json({
				success: true,
				message: "Fond Flights Just about your current location, no others found with your Critria",
				data: fromLocation
			}))
		}
		

		return (res.status(200).json({
			success: true,
			message: "Flights with Retrun one Found",
			data: {
				arriving: fromLocation,
				return: toLocation
			}
		}))
	} catch (err) {
		return (res.status(500).json({
			success: false,
			message: "Connection Failed",
			error: err
		}))
	}
}

export {addFlight, getOneWayFlihgts, getTwoWayFlights}
