import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faUser, faCalendarAlt, faLock, faHome, faCity, faMapMarkerAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './payment.css'

export default function Payment () {

   // history.state include: hotel data, data from start to end, total price, days, travelers, 
   const history = useHistory().location
   const historyState = history.state
   const hotelData = history.state.hotel

   const totalPice = historyState.totalPrice

   // get user token from reduc state
   const token = useSelector(state => state.userToken)

   const bookHotel = async () => {
      try {
         const response = await fetch("http://localhost:8000/api/user_hotel/book", {
            method: "POST",
            headers: {
               "Content-Type":"application/json",
               "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
               token: token,
               hotelName:hotelData.Name,
               city: hotelData.city,
               travelars: historyState.travelers,
               startDate: historyState.date,
               endDate: historyState.date,
               totalPrice: historyState.totalPice
            })
         })

         if (!response.ok)
            throw new Error((await response.json().message)|| "Connection Error")

         
      } catch (err) {

      }
   }

   const handlePayment = (e) => {
      e.preventDefault();

      alert('Payment successful!');
    };
  

    // dont forget when inlcude stripe to put attribute required for each input
    return (
      <div className="paymentWrapper">
        <h1 className="paymentTitle">Payment Page</h1>
        <div className="paymentDetails">
          <h2>Total Price: ${totalPice}</h2>
        </div>
        <form className="paymentForm" onSubmit={handlePayment}>
          <h2>Payment Method</h2>
          <div className="formControl">
            <label htmlFor="cardName"><FontAwesomeIcon icon={faUser} /> Name on Card</label>
            <input type="text" id="cardName" placeholder="Name on Card" />
          </div>
          <div className="formControl">
            <label htmlFor="cardNumber"><FontAwesomeIcon icon={faCreditCard} /> Card Number</label>
            <input type="text" id="cardNumber" placeholder="Card Number" maxLength="16" />
          </div>
          <div className="formGroup">
            <div className="formControl">
              <label htmlFor="expDate"><FontAwesomeIcon icon={faCalendarAlt} /> Expiration Date</label>
              <input type="text" id="expDate" placeholder="MM/YY" maxLength="5" />
            </div>
            <div className="formControl">
              <label htmlFor="cvv"><FontAwesomeIcon icon={faLock} /> CVV</label>
              <input type="text" id="cvv" placeholder="CVV" maxLength="3" />
            </div>
          </div>
          <h2>Billing Address</h2>
          <div className="formControl">
            <label htmlFor="address"><FontAwesomeIcon icon={faHome} /> Address</label>
            <input type="text" id="address" placeholder="Address" />
          </div>
          <div className="formControl">
            <label htmlFor="city"><FontAwesomeIcon icon={faCity} /> City</label>
            <input type="text" id="city" placeholder="City" />
          </div>
          <div className="formGroup">
            <div className="formControl">
              <label htmlFor="state"><FontAwesomeIcon icon={faMapMarkerAlt} /> State</label>
              <input type="text" id="state" placeholder="State" />
            </div>
            <div className="formControl">
              <label htmlFor="zip"><FontAwesomeIcon icon={faEnvelope} /> Zip Code</label>
              <input type="text" id="zip" placeholder="Zip Code" />
            </div>
          </div>
          <button type="submit" className="submitBtn">Pay Now</button>
        </form>
      </div>
    );
}