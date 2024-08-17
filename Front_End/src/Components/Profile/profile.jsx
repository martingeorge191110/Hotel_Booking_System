import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import './profile.css'



export default function Profile () {

  const userToken = useSelector(state => state.userToken)
  // console.log(userToken)
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

  useEffect(() => {
    // user data loading during open the profile page
    fetchData()
    let formClasses = form.current.classList

    if (formClasses.contains("hidden") === false)
        formClasses.remove("hidden")

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
      <>
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
          <div className="card booking-card">
            <h4>Hotel Name: Grand Hotel</h4>
            <p>City: New York</p>
            <p>Rating: ★★★★☆</p>
            <p>Paid: $500</p>
            <p>Travelers: 2</p>
            <p>Check-in Date: 2024-01-10</p>
            <p>Check-out Date: 2024-01-15</p>
          </div>
          <div className="card booking-card">
            <h4>Hotel Name: Beach Resort</h4>
            <p>City: Miami</p>
            <p>Rating: ★★★☆☆</p>
            <p>Paid: $300</p>
            <p>Travelers: 1</p>
            <p>Check-in Date: 2024-02-05</p>
            <p>Check-out Date: 2024-02-10</p>
          </div>
        </div>

        <div className="section flights-section">
          <h3>Past Flight Bookings</h3>
          <div className="card flight-card">
            <h4>Flight Class: Business</h4>
            <p>Travelers: 2</p>
            <p>Paid: $1000</p>
            <p>Arrival Date: 2024-03-01</p>
            <p>Return Date: 2024-03-10</p>
          </div>
          <div className="card flight-card">
            <h4>Flight Class: Economy</h4>
            <p>Travelers: 1</p>
            <p>Paid: $600</p>
            <p>Arrival Date: 2024-04-05</p>
            <p>Return Date: 2024-04-15</p>
          </div>
        </div>
      </div>
    </div>

      </>
)
}