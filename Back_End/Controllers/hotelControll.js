import Hotel from "../Modules/hotel.js";


const addHotel = async (req, res) => {
   try {
      const hotel = await Hotel.create(req.body)
      res.status(200).json({
         success: true,
         data: hotel
      })
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Failed to connect to API",
         error: new Error(error)
      })
   }
}

const allHotels = async (req, res)  => {
   try {
      const allHotels = await Hotel.find()
      res.status(200).json({
         success: true,
         data: allHotels
      })
   } catch (error) {
      res.status(500).json({
         success:false,
         message:"Failed to connect",
         error: new Error(error)
      })
   }
}

const findHotels = async (req, res) => {
   try{
      const {city, min, max } = req.query
      const query = {city: city.toLowerCase() }
      const hotel = await Hotel.find(query)
      let hotelsData = []
      for (let i = 0 ; i < hotel.length; i++) {
         if (hotel[i].cheapest >= Number(min) && hotel[i].cheapest <= Number(max)) {
            hotelsData.push(hotel[i])
         }
      }
      if (hotelsData.length < 1) {
         return res.status(404).json({
            success: false,
            data: "Not found Hotel with these requirements"
         });
      }
      res.status(200).json({
            success: true,
            data: hotelsData
         })
   } catch (error) {
      res.status(500).json({
         success:false,
         message: "Error happend while connecting to Data Base",
         error:new Error (error)
      })
   }
}

const specificHotel = async (req, res) => {
   try {
      const {id} = req.params
      const hotel = await Hotel.findOne({_id:id})
      if (!hotel) {
         res.status(404).json ({
            success: false,
            data: "Note Found Any Hotel With This Id"
         })
      }
      res.status(200).json({
         success: true,
         data: hotel
      })
   } catch (err) {
      res.status(500).json({
         success: false,
         message: "Connesction Error",
         error: err
      })
   }
}

export {addHotel, allHotels, findHotels, specificHotel}