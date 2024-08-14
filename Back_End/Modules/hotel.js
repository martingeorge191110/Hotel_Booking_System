import mongoose from "mongoose";

const HotelSchema = mongoose.Schema({
   Name: {
      type: String,
      required:true
   }, 
   type:{
      type: String,
      required:true
   },
   city: {
      type: String,
      required: true
   },
   address: {
      type: String,
      required: true
   },
   distance: {
      type: String,
      required: true
   },
   photo: {
      type: [String],
   },
   title: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   rating: {
      type: Number,
      min:0,
      max:7
   },
   rooms:{
      type: [String]
   },
   cheapest:{
      type:Number,
      required:true
   },
   featured: {
      type: Boolean,
      default:false
   }
})

const Hotel = mongoose.model("Hotel", HotelSchema)

export default Hotel