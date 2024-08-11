import React, { useEffect, useRef, useState } from "react";
import './hotel.css'
import Input from "../Input/input";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import Item from "./Item/item";
import { useHistory } from "react-router-dom/cjs/react-router-dom";


export default function Hotel () {

    const inputRef = useRef(null)
    const location = useHistory()

    const [dest,setDest] = useState(
        location.location.state ? location.location.state.dest : ""
    )


    const [date,setDate] = useState(
        location.location.state? location.location.state.date : [
            {
              startDate: new Date(),
              endDate: new Date(),
              key: 'selection'
            }
        ]
    )

    const [datePerm, setDatePerm] = useState(false)

    const [prices, setPrices] = useState(
        {
            min:null,
            max:null
        }
    )

    const [options, setOptions] = useState(
        location.location.state ? location.location.state.attend : {
            adult:0,
            children:0,
            rooms:0
        }
    )

    function changeHandler (event) {
        if (event.id === "dest")
        {
            setDest(event.value)
        } else if (event.id === "") {

        }
    }

    function priceHandler (event) {
        if (event.value < 0) return
        if (event.id === "pri-1"){
            setPrices({...prices, min:event.value})
        } else if (event.id === "pri-2") {
            setPrices({...prices, max:event.value})
        }
    } 

    function optionsHandler (event) {
        if (event.id === "in-1")
        {
            if (event.value > 30 || event.value < 0) return;
            setOptions({...options,adult:event.value })
        } else if (event.id === "in-2") {
            if (event.value > 10 || event.value < 0) return;
            setOptions({...options,child:event.value })
        } else {
            if (event.value > 7 || event.value < 0) return;
            setOptions({...options,room:event.value })
        }
    }

    
    return (
        <>
            <section className="hotel">
                <div className="search">
                    <h1>Search</h1>
                    <input className="input-1" onChange={(e) => {changeHandler(e.currentTarget)}} value={dest} type="text" placeholder="Destination" ref={inputRef} id="dest"/>
                    <label>Check In Date</label>
                    <span className="date-span" onClick={() => {setDatePerm(datePerm ? false : true)}}>
                            {format(date[0].startDate,"MM/dd/yyyy")} to {format(date[0].endDate,"MM/dd/yyyy")}
                    </span>
                    { datePerm ? <DateRange
                    onChange={item => setDate([item.selection])}
                    ranges={date}
                    mindate={new Date()}
                    className="dateRange"/> : false}
                    <ul>
                        <li>
                            <span>Min Price per night</span>
                            <input onChange={(event) => {priceHandler(event.currentTarget)}} id="pri-1" type="number" value={prices.min}/>
                        </li>
                        <li>
                            <span>Max price per night</span>
                            <input onChange={(event) => {priceHandler(event.currentTarget)}} id="pri-2" type="number" value={prices.max}/>
                        </li>
                        <li>
                            <span>Adult</span>
                            <input onChange={(event) => {optionsHandler(event.currentTarget)}} id="in-1" type="number" value={options.adult}/>
                        </li>
                        <li>
                            <span>Children</span>
                            <input onChange={(event) => {optionsHandler(event.currentTarget)}} id="in-2" type="number" value={options.child}/>
                        </li>
                        <li>
                            <span>Rooms</span>
                            <input onChange={(event) => {optionsHandler(event.currentTarget)}} id="in-3" type="number" value={options.room}/>
                        </li>
                    </ul>
                    <button className="search-btn">Search</button>
                </div>
                <div className="list">
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                </div>
            </section>
        </>
    )
}