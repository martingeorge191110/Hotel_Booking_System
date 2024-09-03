import React, { useEffect, useState, useRef } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import {useDispatch } from 'react-redux'
import {useHistory} from 'react-router-dom'
import { flightData } from "../Store/action";
import './flight.css'


export default function Flight () {

	const history = useHistory()
	const dispatch = useDispatch()
	const [valid, setValid] = useState(true)
	const [flghtState, setFlightState] = useState("Return")
	const [queryData, setQueryData] = useState({
		fClass: null,
		from: null,
		to: null
	})
	const [dates, setDates] = useState({
		arrivingDate: null,
		returnDate: null
	})
	const [bodyData, setBodyData] = useState({
		travelersNum: 0,
		dates: dates
	})
	/**
	 * Options Functions and logic
	 */
		const listOneRef = useRef(null)
		const flightsList = useRef(null)
		const listTwoRef = useRef(null)
		const [listOne,setListOne] = useState()
		const [listTwo,setListTwo] = useState()
		const [attend,setAttend] = useState({
			adult:1,
			seniors:0,
			children:0,
			condition:true
		})
		const [travelers,setTraverlers] = useState(1)

		useEffect(() => {
	  setListOne(listOneRef.current.children[1].children[0].textContent)
	  setListTwo(listTwoRef.current.children[1].children[0].textContent)
		} , [])

		function listHandler (event) {
		if (event.children[1].classList.contains('activeList') ){
		  event.children[1].classList.remove("activeList")
		} else {
		  event.children[1].classList.add("activeList")
		}

		if (!event.children[0].children[0].classList.contains("activeI"))
		{
			event.children[0].children[0].classList.add("activeI")
		} else {
			event.children[0].children[0].classList.remove("activeI")
		}
		}

		/* Function to change Flight Status (listOne) state */
		function listOneValue (event) {
		let eventParent = event.parentElement
		let spanIClass = eventParent.parentElement.children[0].children[0].classList

		setListOne(event.textContent)
		if (eventParent.classList.contains('activeList') ){
		  eventParent.classList.remove("activeList")
		} else {
		  eventParent.classList.add("activeList")
		}
		spanIClass.remove("activeI")
		setFlightState(event.textContent)
		}

		useEffect(() => {
			if (flightsList.current.children[1].textContent == listOne){
				document.querySelector(".toCal").classList.add("idol")
			} else {
				document.querySelector(".toCal").classList.remove("idol")
			}
		} , [listOne])

		/* Function to change class (listTwo) state */
		function listTwoValue (event) {
		let eventParent = event.parentElement
		let spanIClass = eventParent.parentElement.children[0].children[0].classList

		setListTwo(event.textContent)
		if (eventParent.classList.contains('activeList') ){
		  eventParent.classList.remove("activeList")
		} else {
		  eventParent.classList.add("activeList")
		}

		spanIClass.remove("activeI")
		}
		/* updateing fClass in queryData aftrer change class options */
		useEffect(() => {
			if (queryData.fClass !== listTwo) {
			setQueryData({
				...queryData, fClass: listTwo
			})
		}
		}, [listTwo])

		function addingAttend ( type) {
		if (type ===  1)
		  setAttend({
			...attend,adult: attend.adult + 1
		  })
		if (type === 2)
		  setAttend({
			...attend,seniors: attend.seniors + 1
		  })
		if (type === 3)
		{
		  setAttend({
			...attend, children: (attend.adult > 0 || attend.seniors > 0) ? attend.children + 1 : 0
		  })
		  
		}
		setTraverlers(travelers + 1)
		}

		function removeAttend (type) {
		let condition = true
		if (type ===  1)
		{
		  setAttend({
			...attend,adult: attend.adult > 1 ? attend.adult - 1  : (attend.seniors === 0 ? 1 : 0)
		  })
		  if ((attend.adult - 1 === 0 && attend.seniors === 0) || attend.adult - 1 === -1)
			  condition = false
		}
		if (type === 2){
		  setAttend({
			...attend,seniors: attend.seniors > 1 ? attend.seniors - 1 : (attend.adult === 0 ? 1 : 0)
		  })
		  if ((attend.seniors - 1 === 0 && attend.adult === 0) || attend.seniors - 1 === -1)
			condition = false
		}
		if (type === 3){
		  setAttend({
			...attend,children: attend.children > 0  ? attend.children - 1 : 0
		  })
		  if (attend.children - 1 === -1)
			  condition = false
		}

		if (condition)
		  setTraverlers(travelers - 1)
		}

		useEffect(() => {
			if (bodyData.travelersNum !== travelers) {
				setBodyData({
					...bodyData, travelersNum: travelers
				})}
				console.log(travelers)
			}, [attend])

	/**
	 * Inputs Functionalities
	 */
		const[from,setFrom] = useState("")
		const[to,setTo] = useState("")
		const calRefOne = useRef(null)
		const calRefTwo = useRef(null)
		const returnDiv = useRef(null)
  
		const [selectedDate, setSelectedDate] = useState(null);
		const [fromDay, setFromDay] = useState("");
		const [selectTwoDate, setSelectedTwoDate] = useState(null);
		const [toDay, setToDay] = useState("");
  
		const handleDateChange = (newDate) => {
		  const dayName = newDate ? newDate.format('dddd') : '';
		  setSelectedDate(newDate);
		  setFromDay(dayName)
		};
		/* Updating from attribute from queryData after change fromday */
		useEffect(() => {
			setDates({
				...dates, arrivingDate: fromDay && selectedDate ? `${fromDay.slice(0 , 3)} ${selectedDate.format("YYYY-MM-DD")}` : null
			})
		}, [fromDay, selectedDate])
		/* Updating the dates in Body date */
		useEffect(() => {
			if (bodyData.dates !== dates)
				setBodyData({
					...bodyData, dates: dates
				})
		}, dates.arrivingDate)
	
		const handleDateChange2 = (newDate) => {
		  const dayName = newDate ? newDate.format('dddd') : '';
		  setSelectedTwoDate(newDate);
		  setToDay(dayName)
		};
		useEffect(() => {
			setDates({
				...dates, returnDate: toDay && selectTwoDate ? `${toDay.slice(0 , 3)} ${selectTwoDate.format("YYYY-MM-DD")}` : null
			})
		}, [toDay, selectTwoDate])
		/* Updating the dates in body */
		useEffect(() => {
			if (bodyData.dates !== dates)
				setBodyData({
					...bodyData, dates: dates
				})
		}, [dates.returnDate])
  
		function inputsHandler (eventVal, index) {
		  if (index === 1) {
			setFrom(eventVal)
			return;
		  }
		  if (index === 2) {
			setTo(eventVal)
			return;
		  }
		}
		useEffect(() => {
			if (queryData.from != from)
				setQueryData({
					...queryData, from: from
				})
		}, [from])
		useEffect(() => {
			if (queryData.to !== to)
				setQueryData({
					...queryData, to: to
				})
		}, [to])
	// adding class activeDate to calender
		function calnederHanlder (index) {
		  if (index === 1){
			calRefTwo.current.classList.remove("activeDate")
			if (calRefOne.current.classList.contains("activeDate")) {
			  calRefOne.current.classList.remove("activeDate")
			} else {
			  calRefOne.current.classList.add("activeDate")
			}
			return;
		  }
		  if (index === 2) {
			calRefOne.current.classList.remove("activeDate")
			if (calRefTwo.current.classList.contains("activeDate")) {
			  calRefTwo.current.classList.remove("activeDate")
			} else {
			  calRefTwo.current.classList.add("activeDate")
			}
			return;
		  }
		}
  
	return (
		<>
		<section className="flight">
			<h1 className="title-1">
				where do you want to go?
			</h1>
			<div className="search">
			<div className="options">
				<div className="option" ref={listOneRef}>
				  <span onClick={(event) => {listHandler(event.currentTarget.parentElement)}}>{listOne}<i className="bi bi-chevron-down"></i></span>
				  <ul ref={flightsList}>
					<li onClick={(e) => {listOneValue(e.currentTarget)}} value="Return">Return</li>
					<li onClick={(e) => {listOneValue(e.currentTarget)}} value="One Way">One Way</li>
					{/* <li onClick={(e) => {listOneValue(e.currentTarget)}} value="Multi Ways">Multi Ways</li> */}
				  </ul>
				</div>
				<div className="option">
				  <span onClick={(event) => {listHandler(event.currentTarget.parentElement)}}>{travelers} Travelers<i className="bi bi-chevron-down"></i></span>
				  <ul>
					<li value="One Way">
						<span>
						  Adult
						</span>
						<button onClick={() => {removeAttend(1)}}>-</button>
						{attend.adult}
						<button onClick={(e) => {addingAttend(1)}}>+</button>
					</li>
					<li value="Return">
					<span>
						  Seniors
						</span>
						<button onClick={() => {removeAttend(2)}}>-</button>
						{attend.seniors}
						<button onClick={() => {addingAttend(2)}}>+</button>
					</li>
					<li value="Return">
					<span>
						  Children
						</span>
						<button onClick={() => {removeAttend(3)}}>-</button>
						{attend.children}
						<button onClick={() => {addingAttend(3)}}>+</button>
					</li>
				  </ul>
				</div>
				<div className="option" ref={listTwoRef}>
				  <span onClick={(event) => {listHandler(event.currentTarget.parentElement)}}>{listTwo}<i class="bi bi-chevron-down"></i></span>
				  <ul>
					<li onClick={(e) => {listTwoValue(e.currentTarget)}} value="One Way">Economy</li>
					<li onClick={(e) => {listTwoValue(e.currentTarget)}} value="Return">Business</li>
					<li onClick={(e) => {listTwoValue(e.currentTarget)}} value="Multi Ways">First Class</li>
				  </ul>
				</div>
				</div>
			<div className="inputs">
			<input onChange={(e) => inputsHandler(e.currentTarget.value, 1)} type="text" placeholder="From" value={from}/>
			<input onChange={(e) => inputsHandler(e.currentTarget.value, 2)} type="text" placeholder="To" value={to}/>
			<div className="fromCal">
				<input type="text" onClick={() => {calnederHanlder(1)}} readOnly value={`${fromDay ? fromDay.slice(0 , 3) : "Select Arriving Date"} ${selectedDate ? selectedDate.format("YYYY-MM-DD") : ""}`}/>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DateCalendar value={selectedDate} onChange={handleDateChange}  ref={calRefOne} className="date" />
					</LocalizationProvider>
			</div>
			<div ref={returnDiv} className="toCal">
				<input onClick={() => {calnederHanlder(2)}} type="text" readOnly value={`${toDay ? toDay.slice(0 , 3) : "Select Return Date"} ${selectTwoDate ? selectTwoDate.format("YYYY-MM-DD") : ""}`}/>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DateCalendar value={selectedDate} onChange={handleDateChange2}  ref={calRefTwo} className="dateTwo"/>
					</LocalizationProvider>
				</div>
			<button className="search-btn" onClick={() => {
				if (flghtState && queryData.from !== "" && queryData.to !== "" && bodyData.dates.arrivingDate) {
					dispatch(flightData({
						flghtState, queryData, bodyData , travelers: {
							adult: attend.adult, children: attend.children, senior: attend.seniors 
						}
					}))
					setValid(true)
					sessionStorage.setItem("flight", JSON.stringify({
						flghtState, queryData, bodyData, travelers: {
							adult: attend.adult, children: attend.children, senior: attend.seniors 
						}
					}))
					history.push({
						pathname: "/flights/?search=flights"
					})
				} else {
					setValid(false)
				}
			}}>Search</button>
			{ !valid ?
				<p><strong><i>Please FullFill all of Searching requirements</i></strong></p> : null
			}
				</div>              
			</div>

		</section>
		 </>
	)
}