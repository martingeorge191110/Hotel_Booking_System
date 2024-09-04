import React, { useEffect, useRef, useState} from "react";
import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import './profile.css'

const override = {
  display: "block",
  margin: "20rem auto",
  borderColor: "rgb(2, 2, 66)",
};

export default function Profile () {

  const userToken = useSelector(state => state.userToken)

  const [user, setUser] = useState({
    name: "",
    email:"",
    age:null,
    phone:null
  })
  const form = useRef(null)

  // get user data by token
  const fetchData = async () => {
    const response = await fetch("http://localhost:8000/api/user/getId", {
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        token: userToken
      })
    })

    const data = await response.json()

    if (!response.ok)
    {
      throw new Error(data.message || "Network is not Good")
    }

    const {name, email, phone, age} = data.data
    setUser({
      name: name,
      email: email,
      phone: phone,
      age: age
    })
  }
    // inputs to change information stetes
    const [nameIn, setNameIn] = useState(user.name)
    const [phoneIn, setPhoneIn] = useState(user.phone)
    const [ageIn, setAgeIn] = useState(user.age)
  
  // update data using fetch api and user Token
  const updateData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/user/updateUser", {
        method: "PUT",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: userToken,
          name: nameIn,
          // email: emailIn,
          phone: phoneIn,
          age: ageIn
        })
      })
      const data = await response.json()
      const {userName, userPhone, age} = data.data
      setUser({
        name: userName,
        phone: userPhone,
        age: age
      })

      if (!response.ok) {
        throw new Error(data.message)
      }
      form.current.classList.toggle("hidden")
    } catch (err) {
      console.log(new Error("Error in fetchoing data"))
    }
  }

  const [loading, setLoading] = useState(true)
  let [color, setColor] = useState("#ffffff");
  const [hotelBooks, setHotelBooks] = useState()
  // fetch hotel Books Data
  const fetchHotelBooks = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/user_hotel/get_books", {
        method:"POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: userToken
        })
      })

      if (!response.ok)
          throw new Error(await response.json().message)
      const data = await response.json();

      setHotelBooks(data.data)
    } catch (err) {
      console.log("Error Found:" , err)
    }
  }

  /**
   * Fetch user flight books
   */
  const [flights, setFlights] = useState([])
  const fetchFlightBooks = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/userFlights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: userToken
        })
      })

      const data = await response.json()
      if (!response.ok)
          throw new Error(data.message || "Connection Failed or somthing went wrong")

      setFlights(data.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    setTimeout(() => {
    /* stop loading */
    setLoading(false)
    }, 2000);
    /* user data loading during open the profile page */
    fetchData()
    /* Hotel Books fetching */
    fetchHotelBooks()
    /* Flight Books Fetching */
    fetchFlightBooks()
    // let formClasses = form.current.classList

    // if (formClasses.contains("hidden") === false)
    //     formClasses.remove("hidden")
  }, [])
  // Function to toggle the form inputs
  const toggleForm = () => {
    let formClasses = form.current.classList
    if (formClasses.contains("hidden") === false)
        formClasses.add("hidden")
    else
        formClasses.remove("hidden")
  }

  // function to change userInputs states
  const cahngeUser = (value, type) => {
    if (type === "name")
      setNameIn(value)
    else if (type === "phone")
      setPhoneIn(Number(value))
    else
      setAgeIn(Number(value))
    }
   return (
      <>{
        loading ? <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      /> :
     <div className="profile-container">
      <div className="profile-info">
        <div className="profile-details">
          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-email">{user.email}</p>
          <p className="profile-age">Age: {!user.age ? "Undefined" : user.age}</p>
          <p className="profile-phone">Phone: {!user.phone ? "Undefined" : user.phone}</p>
          <button onClick={() => {toggleForm()}} className="reset-button">Reset Information</button>
        </div>

        <div ref={form} className="profile-form">
          <input onChange={(e) => {cahngeUser(e.currentTarget.value, "name")}}  type="text" placeholder="Name"  value={nameIn} id="nameInput" />
          <input onChange={(e) => {cahngeUser(e.currentTarget.value, "phone")}} type="phone" placeholder="Phone"  value={phoneIn} id="phoneInput" />
          <input onChange={(e) => {cahngeUser(e.currentTarget.value, "age")}} type="number" placeholder="Age"  value={ageIn} id="ageInput" />
          <button onClick={() => {updateData()}} className="submit-button">Change Data</button>
        </div>
      </div>

      <div className="sections">
        <div className="section bookings-section">
          <h3>Past Hotel Bookings</h3>
          {
            hotelBooks.length > 0 ? hotelBooks.map((book) => {
              return (
                <div className="card booking-card">
                  <h4>Hotel Name: {book.name}</h4>
                  <p>City: {book.city}</p>
                  <p>Rating: ★★★★☆</p>
                  <p>Paid: ${book.totalPrice}</p>
                  <p>Travelers: {`[Adult: ${book.travelers.adult}, Children: ${book.travelers.children}]`}</p>
                  <p>Check-in Date: {book.startDate}</p>
                  <p>Check-out Date: {book.endDate}</p>
                </div>
              )
            }) : "NO Hotel Books"
          }
        </div>

        <div className="section flights-section">
          <h3>Past Flight Bookings</h3>
          {flights.length > 0 ? flights.map((flight) => {
            return (
              <div className="card flight-card">
                <h4>Airline: {flight.airline}</h4>
                <p>Flight Class: {flight.fClass}</p>
                <p>Airport Name: {flight.airport}</p>
                <p>Flight Number: {flight.flightNumber}</p>
                <p>Travelers: {`[Adult: ${flight.travelers.adult}, Children: ${flight.travelers.children}, Seniors: ${flight.travelers.senior}]`}</p>
                <p>Paid: ${flight.paid}</p>
                <p>From: {flight.from}</p>
                <p>Arrival City: {flight.to}</p>
              </div>
            )
          }): "Loading ..." }
        </div>
      </div>
    </div>

}</>
)
}