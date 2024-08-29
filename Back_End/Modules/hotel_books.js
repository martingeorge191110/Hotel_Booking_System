import mongoose from "mongoose";


const hotel_books = mongoose.Schema({
   name: {
      type: String,
      required:true
   },
   city:{
      type: String,
      required:true
   },
   travelers:{
      type:Object,
      required:true
   },
   startDate:{
      type: String,
      required:true
   },
   endDate: {
      type: String,
      required:true
   },
   totalPrice:{
      type:Number,
      required:true
   }
})

export default hotel_books