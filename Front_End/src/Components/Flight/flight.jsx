import React from "react";
import './flight.css'
import Inputs from "./Inputs/inputs";
import Options from "./Options/options";

export default function Flight () {


    return (
        <>
        <section className="flight">
            <h1 className="title-1">
                where do you want to go?
            </h1>
            <div className="search">
              <Options/>
              <Inputs/>
            </div>

        </section>
         </>
    )
}