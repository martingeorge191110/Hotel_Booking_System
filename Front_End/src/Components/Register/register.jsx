import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogIn } from "../Store/action";
import './register.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function Register() {
    const signUpButton = useRef(null);
    const signInButton = useRef(null);
    const container = useRef(null);
    const history = useHistory();
    const dispatch = useDispatch();

    // Sign In inputs
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Handle the login inputs
    function changeLoginHandler(value, type) {
        if (type === "email") setEmail(value);
        else setPassword(value);
    }

    // Fetch data from MongoDB (Sign In)
    const signIn = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/user/getUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Network response was not ok');
            }

            const data = await response.json();

            // Store user information in local storage
            localStorage.setItem("user", JSON.stringify(data));
            localStorage.setItem("token", data.token)

            // Dispatch login action
            dispatch(userLogIn(data));

            // Redirect after a short delay
            setEmail(""); 
            setPassword("");
            setTimeout(() => {
                history.push({ pathname: "/" });
            }, 500);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Sign Up inputs
    const [usName, setUsName] = useState("");
    const [usEmail, setUsEmail] = useState("");
    const [usPassword, setUsPassword] = useState("");

    // Handle the sign up inputs
    function changeSignUpHandler(value, type) {
        if (type === "name") setUsName(value);
        else if (type === "email") setUsEmail(value);
        else setUsPassword(value);
    }

    // Fetch data to MongoDB (Sign Up)
    const signUp = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/user/addUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: usName,
                    email: usEmail,
                    password: usPassword
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Network response was not ok');
            }

            const data = await response.json();

            // Clear inputs
            setUsName(""); 
            setUsEmail(""); 
            setUsPassword("");
        } catch (error) {
            console.log("Error Existing in send data:", error);
        }
    };

    function signUpHandler() {
        container.current.classList.add("right-panel-active");
    }

    function signInHandler() {
        container.current.classList.remove("right-panel-active");
    }

    return (
        <>
            <section className="register">
                <div className="container" id="container" ref={container}>
                    <div className="form-container sign-up-container">
                        <form action="#">
                            <h1>Create Account</h1>
                            <div className="social-container">
                                {/* Social media links */}
                            </div>
                            <span>or use your email for registration</span>
                            <input onChange={(e) => changeSignUpHandler(e.currentTarget.value, "name")} value={usName} type="text" placeholder="Name" />
                            <input onChange={(e) => changeSignUpHandler(e.currentTarget.value, "email")} value={usEmail} type="email" placeholder="Email" />
                            <input onChange={(e) => changeSignUpHandler(e.currentTarget.value, "password")} value={usPassword} type="password" placeholder="Password" />
                            <button onClick={(e) => { e.preventDefault(); signUp(); }}>Sign Up</button>
                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                        <form action="#">
                            <h1>Sign In</h1>
                            <div className="social-container">
                                {/* Social media links */}
                            </div>
                            <span>or use your account</span>
                            <input onChange={(e) => changeLoginHandler(e.currentTarget.value, "email")} type="email" value={email} placeholder="Email" />
                            <input onChange={(e) => changeLoginHandler(e.currentTarget.value, "password")} type="password" value={password} placeholder="Password" />
                            <Link>Forgot your password?</Link>
                            <button onClick={(e) => { e.preventDefault(); signIn(); }}>Sign In</button>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Welcome Back!</h1>
                                <p>To keep connected with us please login with your personal info</p>
                                <button onClick={signInHandler} className="ghost" id="signIn" ref={signInButton}>Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Hello, Friend!</h1>
                                <p>Enter your personal details and start your journey with us</p>
                                <button onClick={signUpHandler} className="ghost" id="signUp" ref={signUpButton}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
