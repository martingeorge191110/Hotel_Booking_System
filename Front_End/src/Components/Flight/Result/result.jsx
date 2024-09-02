import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import './result.css'


export default function Result () {

	/* get searching data from the store state (flightSearch) */
	const stateSearch = useSelector(
		state => state.flightSearch
	)

	const [content, setContent] = useState([])
	const [loading, setLoading] = useState(true)

	const fetchApi = async (api) => {
		try {
		const response = await fetch(api, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({...stateSearch.bodyData})
		})

		const data = await response.json()
		if (!response.ok)
				throw new Error(data.message || "Connection Failed")
		
		console.log(data)
		if (data.data.arriving)
				setContent([...data.data.arriving, ...data.data.return])
		else
				setContent(data.data)
		setLoading(false)
	} catch (err) {
		console.log(err, "From error")
	}
	} 

	useEffect(() => {
		if (stateSearch.flghtState === "Return")
				fetchApi(`http://localhost:8000/api/flights/search/return?fClass=${stateSearch.queryData.fClass}&from=${stateSearch.queryData.from}&to=${stateSearch.queryData.to}`)
		else
			fetchApi(`http://localhost:8000/api/flights/search/one_way?fClass=${stateSearch.queryData.fClass}&from=${stateSearch.queryData.from}&to=${stateSearch.queryData.to}`)
	}, [])

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
			{
				content.length > 0 && !loading ? content.map((flight) => {
					return (
						<div class="flight-item">
							<div class="flight-info">
								<h3 class="flight-name">AirLine:	{flight.airline}</h3>
								<p class="flight-detail">Airport: {flight.airport}</p>
								<p class="flight-detail">From: {flight.from}</p>
								<p class="flight-detail">To: {flight.flight.arrivalCity}</p>
								<p class="flight-detail">Date: {flight.flight.date}</p>
							</div>
							<div class="flight-details">
								<p class="flight-price">Price: {
								stateSearch.queryData.fClass === "Economy" ? flight.flight.classes[0].price :
								stateSearch.queryData.fClass === "Business" ? flight.flight.classes[1].price : flight.flight.classes[2].price
								} for ticket: {stateSearch.queryData.fClass}</p>
								<p class="flight-duration">Duration: 6h 30m</p>
								<button onClick={() => {

								}} class="flight-book-btn">Book Now</button>
							</div>
						</div>
					)
				}) : "No Flights Found with these details"
			}
		</div>
	</div>
</section>



				</>
		)
}