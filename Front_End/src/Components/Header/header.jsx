import React, { useEffect, useRef, useState } from "react";
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel, faHome, faPlane, faStepBackward } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import {useSelector} from "react-redux"

export default function Header() {
    // title variables and state
    const h1Title = ["Flight Booking", "Hotels Booking"];
    const [title, setTitle] = useState(null);

    // location variables and states
    const facilitiesList = useRef(null);
    const location = useLocation();
    const pathNames = ["/", "/hotels", "/flights"];
    const hist = useHistory();
    const [navigate, setNavigate] = useState(0);

    // profile variables and state
    const profileRef = useRef(null);
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState({
        userName: "",
        userEmail: ""
    });
    const userData = useSelector(state => state.userInf)

    useEffect(() => {
        if (userData) {
            setAuth(true);
            setUser({
                userName: userData.data.userName,
                userEmail: userData.data.userEmail
            });
        } else {
            setAuth(false);
            setUser({
                userName: "",
                userEmail: ""
            });
        }
        console.log(userData)
    }, [userData]);

    useEffect(() => {
        if (auth === true)
            console.log(user)
    }, auth)
    // handling the title animation
    useEffect(() => {
        let counter, arrCount, condition;
        let tempTilte;

        counter = 0;
        arrCount = 0;
        condition = true;
        tempTilte = "";
        setInterval(() => {
            if (counter === h1Title[arrCount].length) {
                condition = false;
            } else if (counter === 0) {
                condition = true;
            }

            if (condition === true) {
                tempTilte += h1Title[arrCount][counter];
                counter++;
            } else {
                tempTilte = tempTilte.slice(0, counter - 1);
                counter--;
            }

            if (counter === 0) {
                if (arrCount === 0) {
                    arrCount = 1;
                } else {
                    arrCount = 0;
                }
            }
            setTitle(tempTilte);
        }, 500);
    }, []);

    function navigateHandler(index) {
        setNavigate(navigate == index ? -index : index);
    }

    // handling each section
    useEffect(() => {
        const facListIndex = facilitiesList.current.children;
        for (let i = 0; i < facListIndex.length; i++) {
            facListIndex[i].firstChild.classList.remove("active");
            if (location.pathname === pathNames[i]) {
                facListIndex[i].firstChild.classList.add("active");
            }
        }
    }, [navigate, hist.location.pathname]);

    // handling profile child div
    function profileHandler() {
        const classList = profileRef.current.classList;
        if (classList.contains("activeDiv"))
            classList.remove("activeDiv");
        else
            classList.add("activeDiv");
    }

    return (
        <header>
            <nav className="navOne">
                <h1>{title}<span></span></h1>
                {!auth ? (
                    <ul>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/register">Log In</Link></li>
                    </ul>
                ) : (
                    <div className="profile">
                        <a onClick={profileHandler}>Profile</a>
                        <div ref={profileRef}>
                            <li><button>{user.userName}</button></li>
                            <li><button>Hotel Books</button></li>
                            <li><button>Flight Books</button></li>
                            <hr />
                            <li><button>Log-Out</button></li>
                        </div>
                    </div>
                )}
            </nav>
            <nav className="navTwo">
                <ul ref={facilitiesList}>
                    <li><Link onClick={() => { navigateHandler(1) }} to="/"><FontAwesomeIcon icon={faHome} />Home</Link></li>
                    <li><Link onClick={() => { navigateHandler(1) }} to="/hotels"><FontAwesomeIcon icon={faHotel} />Hotels</Link></li>
                    <li><Link onClick={() => { navigateHandler(1) }} to="/flights"><FontAwesomeIcon icon={faPlane} />Flights</Link></li>
                </ul>
            </nav>
        </header>
    );
}
