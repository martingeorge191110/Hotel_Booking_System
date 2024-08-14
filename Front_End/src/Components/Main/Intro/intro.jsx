import React, { useEffect, useRef, useState } from "react";
import './intro.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCalendarAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { DateRange } from 'react-date-range';
import { format } from "date-fns";
import Input from "../../Input/input";
import { Link, useHistory } from "react-router-dom";

export default function Intro() {
    const destRef = useRef(null);
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [attend, setAttend] = useState({
        adult: 0,
        child: 0,
        room: 0,
    });
    const history = useHistory();

    function addingActive(event) {
        if (event.classList.contains("active")) {
            event.classList.remove("active");
        } else {
            event.classList.add("active");
        }
    }

    function addingNumbers(index) {
        if (index === 1) {
            setAttend({ ...attend, adult: attend.adult + 1 });
        } else if (index === 2) {
            setAttend({ ...attend, child: attend.child + 1 });
        } else {
            setAttend({ ...attend, room: attend.room + 1 });
        }
    }

    function removeNumbers(index) {
        if (Object.values(attend)[index - 1] === 0) return;
        if (index === 1) {
            setAttend({ ...attend, adult: attend.adult - 1 });
        } else if (index === 2) {
            setAttend({ ...attend, child: attend.child - 1 });
        } else {
            setAttend({ ...attend, room: attend.room - 1 });
        }
    }

    function clickHandler(index) {
        history.push({
            pathname: "/hotels",
            state: { dest: destRef.current.value ? destRef.current.value : "", date, attend, index: index }
        });
    }

    return (
        <>
            <div className="intro">
                <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit</h1>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem officia porro perferendis dolore </p>
                {/* <Link to="/register">Register / Sign In</Link> */}
                <div className="search">
                    <div className="location">
                        <FontAwesomeIcon className="activeOpacity" icon={faMapMarkerAlt} />
                        <Input ref={destRef} type="search" id="locat" placeholder="Where are you going?" />
                    </div>
                    <div className="date">
                        <FontAwesomeIcon className="activeOpacity" icon={faCalendarAlt} />
                        <span className="activeOpacity" onClick={(e) => { addingActive(e.currentTarget.parentElement.children[e.currentTarget.parentElement.childNodes.length - 1]) }}>
                            {format(date[0].startDate, "MM/dd/yyyy")} to {format(date[0].endDate, "MM/dd/yyyy")}
                        </span>
                        <DateRange
                            editableDateInputs={true}
                            onChange={item => setDate([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={date}
                            className="dateRange"
                        />
                    </div>
                    <div className="numbers">
                        <FontAwesomeIcon icon={faUser} className="activeOpacity" />
                        <span className="activeOpacity" onClick={(e) => addingActive(e.currentTarget.parentElement.children[e.currentTarget.parentElement.childNodes.length - 1])}>
                            {`${attend.adult} adult. ${attend.child} children. ${attend.room} room`}
                        </span>
                        <ul className="options">
                            <li><span>Adult</span><button onClick={() => { removeNumbers(1) }}>−</button>{attend.adult}<button onClick={() => { addingNumbers(1) }}>+</button></li>
                            <li><span>Children</span><button onClick={() => { removeNumbers(2) }}>−</button>{attend.child}<button onClick={() => { addingNumbers(2) }}>+</button></li>
                            <li><span>Room</span><button onClick={() => { removeNumbers(3) }}>−</button>{attend.room}<button onClick={() => { addingNumbers(3) }}>+</button></li>
                        </ul>
                    </div>
                    <button className="submit" onClick={() => { clickHandler(2) }}>Search</button>
                </div>
            </div>
        </>
    );
}
