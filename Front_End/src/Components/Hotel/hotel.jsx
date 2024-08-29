import React, { useEffect, useRef, useState } from "react";
import './hotel.css';
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers } from 'react-icons/fa';
import { BsFillHouseFill } from 'react-icons/bs';
import { MdAttachMoney } from 'react-icons/md';
import { format} from "date-fns";
import { DateRange } from "react-date-range";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

export default function Hotel() {
    const inputRef = useRef(null);
    const location = useHistory();

    const [dest, setDest] = useState(
        location.location.state ? location.location.state.dest : null
    );

    const [date, setDate] = useState(
        location.location.state ? location.location.state.date : [
            {
                startDate: new Date(),
                endDate: new Date(),
                key: 'selection'
            }
        ]
    );

    const initalDays = Math.ceil(date[0].endDate - date[0].startDate) / (1000 * 60 * 60 * 24)
    const [days,setDays] = useState(location.location.state ? location.location.state.days : initalDays)
    useEffect(() => {
        const dayCount = Math.ceil((date[0].endDate - date[0].startDate) / (1000 * 60 * 60 * 24));
        setDays(dayCount);
    }, [date]);

        // check if user enter min and max pricess per night
        const [click, setClick] = useState(true)
    const [datePerm, setDatePerm] = useState(false);

    const [prices, setPrices] = useState({
        min: 0,
        max: null
    });

    const [options, setOptions] = useState(
        location.location.state ? location.location.state.attend : {
            adult: 1,
            children: 0,
            rooms: 1
        }
    );

    function changeHandler(event) {
        if (event.id === "dest") {
            setDest(event.value);
        }
    }

    function priceHandler(event) {
        if (event.value < 0) return;
        if (event.id === "pri-1") {
            setPrices({ ...prices, min: event.value });
        } else if (event.id === "pri-2") {
            setPrices({ ...prices, max: event.value });
        }
    }
    useEffect(() => {
        if (prices.max > 0 || prices.max === null)
            setClick(true)
        else
            setClick(false)

        if (dest === null || dest.length === 0)
            setClick(false)
        else
            setClick(true)
    }, [prices , dest])

    function optionsHandler(event) {
        if (event.id === "in-1") {
            if (event.value > 30 || event.value < 0) return;
            setOptions({ ...options, adult: event.value });
        } else if (event.id === "in-2") {
            if (event.value > 10 || event.value < 0) return;
            setOptions({ ...options, children: event.value });
        } else {
            if (event.value > 7 || event.value < 0) return;
            setOptions({ ...options, rooms: event.value });
        }
    }

    const fetSpecData = async () => {
        try {
            const response = await fetch(`/api/hotels/search?city=${encodeURIComponent(dest)}&min=${prices.min}&max=${isNaN(prices.max) ? 1000000 : prices.max}`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch hotels');
            }
            const data = await response.json();
            setHotels(data.data);
        } catch (err) {
            console.error('Error fetching hotels:', err);
        }
    }

    const [hotels, setHotels] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/hotels/getHotels");
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Network response was not ok');
                }

                const data = await response.json();
                setHotels(data.data);
            } catch (err) {
                console.log("Error fetching data:", err);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <section className="hotel">
                <div className="search">
                    <h1>Search</h1>
                    <div className="input-group">
                        <FaMapMarkerAlt style={{ marginRight: "0.5rem" }} />
                        <input
                            className="input-1"
                            onChange={(e) => { changeHandler(e.currentTarget); }}
                            value={dest}
                            type="text"
                            placeholder="Destination"
                            ref={inputRef}
                            id="dest"
                        />
                    </div>
                    <label>Check In Date</label>
                    <div className="input-group">
                        <FaCalendarAlt style={{ marginRight: "0.5rem" }} />
                        <span className="date-span" onClick={() => { setDatePerm(datePerm ? false : true); }}>
                            {format(date[0].startDate, "MM/dd/yyyy")} to {format(date[0].endDate, "MM/dd/yyyy")}
                        </span>
                    </div>
                    {datePerm ? <DateRange
                        onChange={item => setDate([item.selection])}
                        ranges={date}
                        minDate={new Date()}
                        className="dateRange"
                    /> : null}
                    <ul>
                        <li>
                            <span><MdAttachMoney /> Min Price per night</span>
                            <input onChange={(event) => { priceHandler(event.currentTarget); }} id="pri-1" type="number" value={prices.min} />
                        </li>
                        <li>
                            <span><MdAttachMoney /> Max Price per night</span>
                            <input onChange={(event) => { priceHandler(event.currentTarget); }} id="pri-2" type="number" value={prices.max} />
                        </li>
                        <li>
                            <span><FaUsers /> Adult</span>
                            <input onChange={(event) => { optionsHandler(event.currentTarget); }} id="in-1" type="number" value={options.adult || 1} />
                        </li>
                        <li>
                            <span><FaUsers /> Children</span>
                            <input onChange={(event) => { optionsHandler(event.currentTarget); }} id="in-2" type="number" value={options.children || 0} />
                        </li>
                        <li>
                            <span><BsFillHouseFill /> Rooms</span>
                            <input onChange={(event) => { optionsHandler(event.currentTarget); }} id="in-3" type="number" value={options.rooms || 1} />
                        </li>
                    </ul>
                    <button onClick={() =>{if (!click) return; fetSpecData()}} className="search-btn">Search</button>
                    {!click ? <i>Please Enter all details about your desired Place</i> : ""}
                </div>
                <div className="list">
                    {hotels.length > 0 ? hotels.map((hotel) => (
                        <div className="item" key={hotel.id}>
                            <img src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1" alt="" />
                            <div className="desc">
                                <h1>{hotel.Name}</h1>
                                <span className="dist">
                                    <FaMapMarkerAlt style={{ marginRight: "0.5rem" }} />
                                    {hotel.distance}m from center
                                </span>
                                <span className="texi">Free airport taxi</span>
                                <span className="subTitle">
                                    Studio Apartment with Air conditioning
                                </span>
                                <span className="feature">
                                    Entire studio • 1 bathroom • 21m² 1 full bed
                                </span>
                                <span className="cancle-1">Free cancellation </span>
                                <span className="cancle-2">
                                    You can cancel later, so lock in this great price today!
                                </span>
                            </div>
                            <div className="details">
                                <div className="rate">
                                    <span>Excellent</span>
                                    <button>8.9</button>
                                </div>
                                <div className="prices">
                                    <span className="price">$112</span>
                                    <span className="tax">Includes taxes and fees</span>
                                    <button onClick={() => {
                                        location.push({
                                            pathname:`/hotels/${hotel._id}`,
                                            state:{
                                                id:hotel._id,
                                                days:days,
                                                attend: options,
                                                dateRange: date,
                                                date:`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`
                                            }
                                        })
                                    }} className="check-btn">See availability</button>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div>No hotels found.</div>
                    )}
                </div>
            </section>
        </>
    );
}
