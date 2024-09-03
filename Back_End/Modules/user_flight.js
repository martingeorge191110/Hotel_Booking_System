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
   flightNumber: {
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
   },
   fClass: {
      type: String,
      required: true
   }
})

const userFlightSchema = mongoose.Schema({
   userId: {
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

const UserFlight = mongoose.model("UserFlight", userFlightSchema)

export default UserFlight