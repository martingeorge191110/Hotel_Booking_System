Data Base Using MONGODB with Mongoose Package
/[User]  (_id, userName, userEmail, userPassword, userPhone, age)
         User  <-- [_id] = [userId] --> UserHotel
../[UserHotel] --> (userId, userEmail, totalBooks [array of hotel books schema])
   ../../ hotel_books (name, city, travelers, start, end, totalPrice)
   