import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import cors from "cors"
import mongoose from "mongoose"

const app = express()

dotenv.config()
app.use(cors())

const Port = process.env.PORT || 4000



app.listen(Port, () => {
   console.log(
      "now we are listening to Port numebr " + Port + "....."
   )
})