import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faTreeCity } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import './oneHotel.css';

export default function HotelComponent() {

   const location = useHistory()
   const locationState = location.location.state
   console.log(locationState)
   const windowRef = useRef(null)
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

    const openWindow = () => {
        let classList = windowRef.current.classList
        if (classList.contains("activeModel") === false)
            classList.add("activeModel")
    }
    const closeWindow = () => {
        let classList = windowRef.current.classList
        if (classList.contains("activeModel") === true)
            classList.remove("activeModel")
    }

    return (
        <div className="hotelWrapper">
  <div className="hotelHeader">
    <h1 className="hotelTitle">{hotelData.Name}</h1>
    <button className="bookNow" onClick={() => {openWindow()}}>Reserve or Book Now!</button>
  </div>
  <div className="hotelInfo">
    <div className="hotelAddress">
      <i className="fa fa-map-marker"></i>
      <span>{hotelData.address}</span>
    </div>
    <span className="hotelDistance">Excellent location – {hotelData.distance}m from center</span>
    <span className="hotelPriceHighlight">Book a stay over $200 at this property and get a free airport taxi</span>
  </div>
  <div className="hotelImages">
    {
         hotelData.photo.length > 0 ? hotelData.photo.map((photo) => {
            return <div className="hotelImgWrapper"><img src={`${photo}`} alt="Hotel photo 1" className="hotelImg"/></div>
        })  : "NO Photos Yet"
    }
    </div>
  <div className="hotelDetails">
    <div className="hotelDetailsTexts">
      <h2 className="hotelSubtitle">{hotelData.title}</h2>
      <p className="hotelDesc">{hotelData.description}</p>
    </div>
    <div className="hotelDetailsPrice">
      <h2>Perfect for a {days}-night stay! {locationState.attend.rooms} Rooms</h2>
      <span>Located in the real heart of the city, this property has an excellent location score of 9.8!</span>
      <h2><b>${days * options.rooms * hotelData.cheapest}</b> (3 nights)</h2>
      <button className="bookNow" onClick={() => {openWindow()}}>Reserve or Book Now!</button>
    </div>
  </div>

  <div ref={windowRef} id="reservationModal" className="modal">
  <div className="modalContent">
    <span className="close" onClick={() => closeWindow()}>&times;</span>
    <h2>Reservation Details</h2>
    <div className="modalDetails">

      <div className="numbers">
        <label>Adult</label>
        <div className="inputControl">
          <button>-</button>
          <span>{options.adult}</span>
          <button>+</button>
        </div>
      </div>

      <div className="numbers">
        <label>Children</label>
        <div className="inputControl">
          <button>-</button>
          <span>{options.children}</span>
          <button>+</button>
        </div>
      </div>

      <div className="numbers">
        <label>Rooms</label>
        <div className="inputControl">
          <button>-</button>
          <span>{options.rooms}</span>
          <button>+</button>
        </div>
      </div>

      <div className="readonly">
        <label>Stay Duration</label>
        <input readOnly type='text'  value={locationState.date}/>
      </div>

      <div className="readonly">
        <label>Number of Days</label>
        <input type="number" value={days} readonly />
      </div>

      <div className="readonly">
        <label>Total Price</label>
        <input type="number" value={days * options.rooms * hotelData.cheapest} readonly />
      </div>

    </div>
    <button className="confirmBtn">Confirm Reservation</button>
  </div>
    </div>
</div>

      
    );
}
