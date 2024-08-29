import UserHotel from "../Modules/user_hotel.js";
import User from "../Modules/users.js"


const resError = (res, errMessage, err = null) => {
   res.status(404).json({
      success: false,
      message: errMessage,
      error: err
   })
}

const bookSuccess = (res, jsonObject) => {
   res.status(200).json({
      success: true,
      data: jsonObject
   })
}

const bookHotel = async (req, res) => {
   try {
      // travelers is obejct contains adult and adult and children
      const {hotelName, city, travelars, startDate, endDate, totalPrice} = req.body;
      const {userId} = req.userId
      const user = await User.findOne({_id: userId})
      if (!user)
         return resError(res, "User Not Found with thid id")

      const userHotelFind = await UserHotel.findOne({userId: userId});

      if (userHotelFind) {
         if (!userHotelFind.totalBooks)
               userHotelFind.totalBooks = [];

         userHotelFind.totalBooks.push({
            name: hotelName,
            city: city,
            travelers: travelars,
            startDate: startDate,
            endDate: endDate,
            totalPrice: totalPrice
         });

         await userHotelFind.save();
         return bookSuccess(res, { hotelName, city, travelars, startDate, endDate, totalPrice });
      }
      const userHotel = await UserHotel.create({
         userId: user._id,
         userEmail: user.userEmail,
         totalBooks: [{
            name: hotelName,
            city: city,
            travelers: travelars,
            startDate: startDate,
            endDate: endDate,
            totalPrice: totalPrice
         }]
      })
      return bookSuccess(res, {hotelName, city, travelars, startDate, endDate, totalPrice})
   } catch (err)
   {
      return resError(res, "Failed to Connect", err)
   }
}

// POST method with get just the token
const getBooks = async (req, res) => {
   try {
      const {userId} = req.userId
      const user = await User.findOne ({
         _id: userId
      })
      if (!user)
         return resError(res, "User Not Found")
      const userHotel = await UserHotel.findOne({
         userId: userId
      })
      if (!userHotel)
         return bookSuccess(res, {
      success: true,
      data: []})
   
      const {totalBooks} = userHotel
      return bookSuccess(res, totalBooks)
   } catch (err) {
      return resError(res, "Connection Failed to send Data", err)
   }
}

export {bookHotel, getBooks}