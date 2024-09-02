import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import Auth from "./Routers/userInf.js";
import Hotels from './Routers/hotelInf.js'
import cookieParser from "cookie-parser";
import UserHotel from './Routers/user_hotel_inf.js'
import Flights from './Routers/flightInf.js'
import UserFlightInf from "./Routers/userFlightInf.js"
import { errorHanlder } from "./MiddleWares/errHnalder.js";


const app = express();
dotenv.config();
const Port = process.env.PORT || 4000
const uri = process.env.DATA_BASE;


        

mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));
  app.use(morgan("tiny"));
  app.use(express.urlencoded({extended: false}))
  app.use(express.json());
  app.use(cookieParser());

app.use("/api/user", Auth);
app.use("/api/hotels", Hotels)
app.use("/api/user_hotel", UserHotel)
app.use("/api/flights", Flights)

app.use("/api/userFlights/flight", UserFlightInf)

app.use("*", errorHanlder)

app.listen(Port, () => {
  console.log("Now we are listening to port number " + Port + "...");
});
