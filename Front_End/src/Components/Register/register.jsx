import React, { useEffect, useRef, useState} from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import {useDispatch} from "react-redux"
import { userLogIn } from "../Store/action.jsx";
import './register.css'
import 'bootstrap-icons/font/bootstrap-icons.css';



export default function Register () {

   const signUpButton = useRef(null)
	const signInButton = useRef(null);
	const container = useRef(null);
	const history = useHistory()

	// signIn inputs
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const dispatch = useDispatch()

	// handle the login inputs
	function changeLoginHandler (value, type) {
		if (type === "email")
			setEmail(value)
		else
			setPassword(value)
	}
	// fetch data from mongoDB
	const signIn = async () => {
		try {
			const response = await fetch("http://localhost:8000/api/user/getUser", {
				 method: "POST",
				 headers: { 
					  "Content-Type": "application/json" 
				 },
				 body: JSON.stringify({
					  email: email, 
					  password: password 
				 })
			});
 
			if (!response.ok) {
				 const errorData = await response.json(); 
				 throw new Error(errorData.message || 'Network response was not ok');
			}
 
			const data = await response.json();
			dispatch(userLogIn(data))
			localStorage.setItem("user", JSON.stringify(data))
			setEmail(""); setPassword("")
			setTimeout(() => {
				history.push({
					pathname:"/"
				})
			}, 500);
	  } catch (error) {
			console.log("Error fetching data:", error);
	  }
	}


	//signUp inputs
	const [usName, setUsName] = useState("")
	const [usEmail, setUsEmail] = useState("")
	const [usPassword, setUsPassword] = useState("")
	// handle the sign up inputs
	function changeSingUpHandler (value, type) {
		if (type === "name")
			setUsName(value)
		else if (type === "email")
			setUsEmail(value)
		else
			setUsPassword(value)
	}
	// fetch data to mongoDB
	const signUp = async () => {
		try {
			const response = await fetch("http://localhost:8000/api/user/addUser", {
				method:"POST",
				headers: { 
					"Content-Type": "application/json" 
			  },
			  body: JSON.stringify({
				name: usName,
				email: usEmail,
				password: usPassword
			  })
			})
			if (!response.ok)
			{
				const errorData = await response.json(); 
				throw new Error(errorData.message || 'Network response was not ok');
			}
			const data = await response.json()
			console.log(data)
			setUsName("");setUsEmail("");setUsPassword("")

		} catch (error) {
			console.log("Error Existing in send data: " , error)
		}
	}

	

function signUpHandler () {
    container.current.classList.add("right-panel-active");
}

function signInHandler () {
    container.current.classList.remove("right-panel-active");
}





    return (
        <>
        <section className="register">
<div class="container" id="container" ref={container}>
	<div class="form-container sign-up-container">
		<form action="#">
			<h1>Create Account</h1>
			<div class="social-container">
				{/* <a href="#" class="social"><i className="bi bi-facebook"></i></a> */}
				{/* <a href="#" class="social"><i class="bi bi-google"></i></a> */}
			</div>
			<span>or use your email for registration</span>
			<input onChange={(e) => {changeSingUpHandler(e.currentTarget.value, "name")}} value={usName} type="text" placeholder="Name" />
			<input onChange={(e) => {changeSingUpHandler(e.currentTarget.value, "email")}} value={usEmail} type="email" placeholder="Email" />
			<input onChange={(e) => {changeSingUpHandler(e.currentTarget.value, "password")}} value={usPassword} type="password" placeholder="Password" />
			<button onClick={(e) => {e.preventDefault(); signUp()}}>Sign Up</button>
		</form>
	</div>
	<div class="form-container sign-in-container">
		<form action="#">
			<h1>Sign in</h1>
			<div class="social-container">
                {/* <a href="#" class="social"><i className="bi bi-facebook"></i></a> */}
			    {/* <a href="#" class="social"><i class="bi bi-google"></i></a> */}
			</div>
			<span>or use your account</span>
			<input onChange={(e) => {changeLoginHandler(e.currentTarget.value, "email")}} type="email" value={email} placeholder="Email" />
			<input onChange={(e) => {changeLoginHandler(e.currentTarget.value, "password")}} type="password" value={password} placeholder="Password" />
			<a href="#">Forgot your password?</a>
			<button onClick={(e) => {e.preventDefault();signIn()}}>Sign In</button>
		</form>
	</div>
	<div class="overlay-container">
		<div class="overlay">
			<div class="overlay-panel overlay-left">
				<h1>Welcome Back!</h1>
				<p>To keep connected with us please login with your personal info</p>
				<button onClick={() => {signInHandler()}} class="ghost" id="signIn" ref={signInButton}>Sign In</button>
			</div>
			<div class="overlay-panel overlay-right">
				<h1>Hello, Friend!</h1>
				<p>Enter your personal details and start journey with us</p>
				<button onClick={() => {signUpHandler()}} class="ghost" id="signUp" ref={signUpButton}>Sign Up</button>
			</div>
		</div>
	</div>
</div>

        </section>
        </>
    )
}