import React from "react";
import Options from "../Options/options";
import Inputs from "../Inputs/inputs";


export default function Result () {



    return (
        <>
            <section className="s-result">
                <div className="s-search">
                    <Options/>
                    <Inputs/>
                </div>
            </section>
        </>
    )
}