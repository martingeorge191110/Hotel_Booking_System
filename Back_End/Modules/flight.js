import mongoose from "mongoose";

const classes_schema = mongoose.Schema({
   flightClass: {
      type: String,
      required: true
   }, 
   tickets: {
      type: Number,
      required: true
   },
   price: {
      type: Number,
      required: true
   }
})

const flight_schema = mongoose.Schema({
   number: { // flight number
      type: Number,
      required: true,
      unique: true
   },
   arrivalCity:{ // To
      type: String,
      required: true
   },
   availableTickets: {
      type: Number,
      required: true
   },
   date:{
      type: String,
      required: true
   },
   classes: [classes_schema]
})

const airline_schema = mongoose.Schema({
   airline:{
      type:String,
      required: true,
      unique: true
   },
   airportName:{
      type: String,
      required: true,
      unique: true
   },
   city: {  // From
      type: String,
      required: true
   },
   flights:[flight_schema]
})

const Airline = mongoose.model("Airline", airline_schema)


export default Airline