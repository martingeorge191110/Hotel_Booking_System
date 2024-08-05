import React, { useEffect, useState } from "react";
import './main.css'
import Intro from "./Intro/intro";
import Lists from "./Lists/lists";
import Mail from "./Mail/mail";
import Footer from "../Footer/footer";


export default function MainPage () {

      useEffect(() => {
        
      }, [])
      
    return (
        <>
        <section className="mainP">
            <Intro/>
            <Lists type="1"/>
            <Lists title="Browse by property type" type="2"/>
            <Mail/>
            <Footer/>
        </section>
        </>
    )
}