import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import './oneHotel.css';

export default function HotelComponent() {

   const location = useHistory()
   const locationState = location.location.state
   const options = locationState.attend
   // Replace these placeholder values with your actual data

   const [hotelId, setHotelId] = useState(locationState.id)
   const [hotelData, setHotelData] = useState({
      Name:"",
      address:"",
      distance:"",
      cheapest:"",
      photo:[],
      title:"",
      description:""
   })
   // fetch Hotel data with id from location
    useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await fetch(`http://localhost:8000/api/hotels/${hotelId}`)

            if (!response.ok)
            {
               const errorData = await response.json();
               throw new Error(errorData.message || 'Network response was not ok');
            }
            const data = await response.json()
            console.log(data)
            setHotelData(data.data)
         } catch (err) {
            console.log("Error fetching data:", err);
         }
      }
      fetchData();
    } , [])

    const days = locationState.days > 0 ? locationState.days : 1

    // Dummy handlers
    const handleOpen = (i) => {
        console.log(`Open photo ${i}`);
    };

    const handleClick = () => {
        console.log("Book Now clicked");
    };
    useEffect(() => {
      console.log(options)
    } , [options])

    return (
        <div className="hotelWrapper">
            <button className="bookNow">Reserve or Book Now!</button>
            <h1 className="hotelTitle">{hotelData.Name}</h1>
            <div className="hotelAddress">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{hotelData.address}</span>
            </div>
            <span className="hotelDistance">
                Excellent location – {hotelData.distance}m from center
            </span>
            <span className="hotelPriceHighlight">
                Book a stay over ${hotelData.cheapest} at this property and get a free airport taxi
            </span>
            <div className="hotelImages">
                {hotelData.photo?.map((photo, i) => (
                    <div className="hotelImgWrapper" key={i}>
                        <img
                            onClick={() => handleOpen(i)}
                            src={photo}
                            alt={`Hotel photo ${i}`}
                            className="hotelImg"
                        />
                    </div>
                ))}
            </div>
            <div className="hotelDetails">
                <div className="hotelDetailsTexts">
                    <h1 className="hotelTitle">{hotelData.title}</h1>
                    <p className="hotelDesc">{hotelData.desc}</p>
                </div>
                <div className="hotelDetailsPrice">
                    <h1>Perfect for a {days}-night stay! {`${options.rooms} Rooms`}</h1>
                    <span>
                        Located in the real heart of the city, this property has an
                        excellent location score of 9.8!
                    </span>
                    <h2>
                        <b>${days * hotelData.cheapest * Number(options.rooms)}</b> ({days} nights)
                    </h2>
                    <button onClick={handleClick}>Reserve or Book Now!</button>
                </div>
            </div>
        </div>
    );
}
