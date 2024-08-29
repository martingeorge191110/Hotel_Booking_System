import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import './flight.css'
import Inputs from "./Inputs/inputs";
import Options from "./Options/options";

export default function Flight () {

    const travSelector = useSelector(state => state.travelers)
    const[travelers, setTraverlers] = useState(travSelector)

    useEffect(() => {
        console.log(travelers)
    }, [travSelector])

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