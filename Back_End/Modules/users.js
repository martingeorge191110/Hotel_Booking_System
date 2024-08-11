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
   }
})

const User = mongoose.model("UserSchema", UserSchema)


export default User