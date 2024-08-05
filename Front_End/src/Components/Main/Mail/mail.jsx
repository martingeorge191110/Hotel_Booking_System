import React from "react";
import './mail.css'
import Input from "../../Input/input";

export default function Mail () {


    return (
        <>
            <section className="mail">
                <h1>Save Time, Save Money</h1>
                <h3>Sign Up, and we will Send you Offers</h3>
                <Input placeholder="Your Emial" type="mail"/>
                <button>Subiscribe</button>
            </section>    
        </>
    )
}