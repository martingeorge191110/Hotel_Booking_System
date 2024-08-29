import React from "react";
import './result.css'


export default function Result () {



  const elementTogle = (elementClassList) => {
    if (elementClassList.contains("active"))
      elementClassList.remove("active")
    else
      elementClassList.add("active")
  }

    return (
        <>
    <section class="flight-results">
  <div class="flight-search-container">
    <h1 class="flight-search-title">Search Flights</h1>
    <div class="flight-options">
      <div class="flight-option trip-type">
        <span onClick={(e) => {elementTogle(e.currentTarget.parentElement.children[1].classList)}} class="trip-type-toggle">Trip Type<i className="bi bi-chevron-down"></i></span>
        <ul class="trip-type-list">
          <li class="trip-type-item">Return</li>
          <li class="trip-type-item">One Way</li>
          <li class="trip-type-item">Multi Ways</li>
        </ul>
      </div>
      <div class="flight-option travelers">
        <span onClick={(e) => {elementTogle(e.currentTarget.parentElement.children[1].classList)}} class="travelers-toggle">Travelers<i className="bi bi-chevron-down"></i></span>
        <ul class="travelers-list">
          <li class="travelers-item">
            <span>Adult</span>
            <button class="travelers-btn">-</button>
            <span class="travelers-count">1</span>
            <button class="travelers-btn">+</button>
          </li>
          <li class="travelers-item">
            <span>Seniors</span>
            <button class="travelers-btn">-</button>
            <span class="travelers-count">0</span>
            <button class="travelers-btn">+</button>
          </li>
          <li class="travelers-item">
            <span>Children</span>
            <button class="travelers-btn">-</button>
            <span class="travelers-count">0</span>
            <button class="travelers-btn">+</button>
          </li>
        </ul>
      </div>
      <div class="flight-option class-type">
        <span onClick={(e) => {elementTogle(e.currentTarget.parentElement.children[1].classList)}} class="class-type-toggle">Class<i class="bi bi-chevron-down"></i></span>
        <ul class="class-type-list">
          <li class="class-type-item">Economy</li>
          <li class="class-type-item">Business</li>
          <li class="class-type-item">First Class</li>
        </ul>
      </div>
    </div>
    <div class="flight-inputs">
      <input class="flight-input" type="text" placeholder="From" />
      <input class="flight-input" type="text" placeholder="To" />
      <div class="from-cal">
        <input class="flight-date-input" type="text" readOnly placeholder="Select Departure Date" />
      </div>
      <div class="to-cal">
        <input class="flight-date-input" type="text" readOnly placeholder="Select Return Date" />
      </div>
      <button class="flight-search-btn">Search</button>
    </div>
  </div>
  <div class="flight-results-container">
    <h2 class="flight-results-title">Available Flights</h2>
    <div class="flights-list">
      <div class="flight-item">
        <div class="flight-info">
          <h3 class="flight-name">Flight 1</h3>
          <p class="flight-detail">From: New York (JFK)</p>
          <p class="flight-detail">To: Los Angeles (LAX)</p>
          <p class="flight-detail">Date: 2023-09-15</p>
        </div>
        <div class="flight-details">
          <p class="flight-price">Price: $300</p>
          <p class="flight-duration">Duration: 6h 30m</p>
          <button class="flight-book-btn">Book Now</button>
        </div>
      </div>
      {/* <!-- Add more flight items as needed --> */}
    </div>
  </div>
</section>



        </>
    )
}