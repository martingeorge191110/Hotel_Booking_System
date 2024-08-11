import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import Auth from "./Routers/userInf.js";

const app = express();
dotenv.config();
const Port = process.env.PORT || 4000
const uri = process.env.DATA_BASE;



app.use(cors());
app.use(morgan("tiny"));
app.use(express.urlencoded({extended: false}))
app.use(express.json());


mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


app.use("/api/user", Auth);

app.listen(Port, () => {
  console.log("Now we are listening to port number " + Port + "...");
});
