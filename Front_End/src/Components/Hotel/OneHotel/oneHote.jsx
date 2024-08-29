import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useSelector } from "react-redux";
import  { DateRange } from "react-date-range";
import { format} from "date-fns";
import './oneHotel.css';

export default function HotelComponent() {

  const token = useSelector(state => state.userToken)
  const [loading, setLoading] = useState(false)

   const location = useHistory()
   const locationState = location.location.state

   const windowRef = useRef(null)
   const options = locationState.attend
   // Replace these placeholder values with your actual data

   const [hotelId, setHotelId] = useState(locationState.id)
   const [hotelData, setHotelData] = useState({
      Name:"",
      address:"",
      city: "",
      distance:"",
      cheapest:"",
      photo:[],
      title:"",
      description:""
   })

   const[adult, setAdult] = useState(Number(options.adult))
   const[children, setChildren] = useState(Number(options.children))
   const[rooms, setRooms] = useState(Number(options.rooms))
   // Function to add and remove options (attend)
   const optionsHandling = (type, op) => {
    if (type === "adult") {
        if (op === 1) {
          setAdult(adult + 1)
        } else {
          if (adult > 1) {
            setAdult(adult - 1)
          }
        }
      } else if (type === "children") {
        if (op === 1) {
          setChildren(children + 1)
        } else {
          if (children > 0) {
            setChildren(children - 1)
          }
        }
      } else if (type === "rooms") {
        if (op === 1) {
          setRooms(rooms + 1)
        } else {
          if (rooms > 1) {
            setRooms(rooms - 1)
          }
        }
      }
    }

    // handle date range
    const [date, setDate] = useState(
        locationState && locationState.dateRange ? locationState.dateRange :[
          {
              startDate: new Date(),
              endDate: new Date(),
              key: 'selection',
              color: "#3ecf8e"
          }
      ]
  );
  const activeRange = (dateElement) => {
    if (!dateElement.classList.contains("activeRange"))
      dateElement.classList.add("activeRange")
    else
      dateElement.classList.remove("activeRange")
  }


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

    const [days, setDays] = useState(locationState ? locationState.days : 1)
    useEffect(() => {
      setDays(Math.ceil((date[0].endDate - date[0].startDate) / (1000 * 60 * 60 * 24)))
    }, [date])

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

    const bookHotel = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/user_hotel/book", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            token: token,
            hotelName: hotelData.Name,
            city: hotelData.city,
            travelars: {
              adult: adult,
              children: children,
              rooms: rooms
            },
            startDate: format(date[0].startDate, "MM/dd/yyyy"),
            endDate: format(date[0].endDate, "MM/dd/yyyy"),
            totalPrice: days * rooms * hotelData.cheapest || 50
          })
        })
        
        if (!response.ok)
          throw new Error(await response.json().message)
      
        setLoading(false)
        location.push({
          pathname: "/"
        })
      } catch (err) {
        console.log("error:", err)
      }
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
      <h2>Perfect for a 1-night stay! {locationState.attend.rooms} Rooms</h2>
      <span>Located in the real heart of the city, this property has an excellent location score of 9.8!</span>
      <h2><b>${hotelData.cheapest}</b> (1 nights)</h2>
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
          <button onClick={() => optionsHandling("adult", 2)}>-</button>
          <span>{adult}</span>
          <button onClick={() => optionsHandling("adult", 1)}>+</button>
        </div>
      </div>

      <div className="numbers">
        <label>Children</label>
        <div className="inputControl">
          <button onClick={() => optionsHandling("children", 2)}>-</button>
          <span>{children}</span>
          <button onClick={() => optionsHandling("children", 1)}>+</button>
        </div>
      </div>

      <div className="numbers">
        <label>Rooms</label>
        <div className="inputControl">
          <button onClick={() => optionsHandling("rooms", 2)}>-</button>
          <span>{rooms}</span>
          <button onClick={() => optionsHandling("rooms", 1)}>+</button>
        </div>
      </div>

      <div className="date readonly">
        <label>Stay Duration</label>
        <input onClick={(e) => activeRange(e.currentTarget.parentElement.children[2])} readOnly type='text' value={`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}/>
        <DateRange
          onChange={item => {
            const updatedDate = {
              ...item.selection,
              color: "#3ecf8e"
            };
            setDate([updatedDate]);
          }}
          ranges={date}
          minDate={new Date()}
          className="dateRange"
        />
      </div>

      <div className="readonly">
        <label>Number of Days</label>
        <input type="number" value={days} readonly />
      </div>

      <div className="readonly">
        <label>Total Price</label>
        <input type="number" value={days * rooms * hotelData.cheapest || 50} readonly />
      </div>

    </div>
    <button className="confirmBtn" onClick={() => {
      //  location.push({
      //   pathname: `/hotels/payment/${locationState.id}`,
      //   state: {
      //     hotel: hotelData,
      //     travelers: options,
      //     days: days,
      //     date: locationState.date,
      //     totalPrice: days * options.rooms * hotelData.cheapest
      //   }
      // })
      setLoading(true)
      bookHotel();
    }}>{loading ? "Loading data": "Confirm Reservation"}</button>
  </div>
    </div>
</div>

      
    );
}
