import React, {useState, useRef} from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
// import dayjs from 'dayjs';
import './inputs.css'


export default function Inputs () {

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
  
      const handleDateChange2 = (newDate) => {
        const dayName = newDate ? newDate.format('dddd') : '';
        setSelectedTwoDate(newDate);
        setToDay(dayName)
      };

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
            <button className="search-btn">Search</button>
        </div>              
        </>
    )
}