import mongoose from "mongoose";

const flightSchema = mongoose.Schema({
   airline: {
      type: String,
      required: true
   },
   airport: {
      type: String,
      required: true
   },
   from: {
      type: String,
      required: true
   },
   to: {
      type: String,
      required: true
   },
   flightNum: {
      type: Number,
      required: true
   },
   travelers: {
      type: Object,
      required: true
   },
   paid: {
      type: Number,
      required: true
   }
})

const userFlightSchema = mongoose.Schema({
   useId: {
      type: String,
      required: true,
      unique: true,
      ref: 'User'
   },
   userEmail: {
         type: String,
         required: true,
         unique: true
   },
   flights: [flightSchema]
})

const UserFlight = mongoose.model("UserHotel", userFlightSchema)

export default UserFlight