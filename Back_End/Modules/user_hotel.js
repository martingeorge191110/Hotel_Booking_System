import mongoose from 'mongoose'
import hotel_books from './hotel_books.js'

const user_hotel_schema = mongoose.Schema({
   userId:{
      type: String,
      ref: 'User',
      required: true,
      unique: true
   },
   userEmail: {
      type: String,
      required:true,
      unique:true
   },
   totalBooks:[hotel_books]
})

const UserHotel = mongoose.model("UserHotel", user_hotel_schema)

export default UserHotel;