import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
   userName:{
      type:String,
      required:true
   },
   userEmail:{
      type:String,
      required:true,
      unique:true
   },
   userPassword:{
      type:String,
      required:true
   },
   userPhone: {
      type: Number,
      unique:true
   },
   age:{
      type: Number
   }
})

const User = mongoose.model("UserSchema", UserSchema)


export default User