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

export {addFlight}
