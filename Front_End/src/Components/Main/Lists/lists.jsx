import React from "react";
import './lists.css'
import {firstList}  from "./List-1/list-1";
import { secondList } from "./List-2/list-2";


export default function Lists (props) {
    let index =+(props.type) - 1
    const listArray = [
        firstList,
        secondList
    ]
    return (
        <>
        <div className="listContainer">
            {
                props.title ? <h1>{props.title}</h1> : null
            }
            <ul className={`list${index+1}`}>
                {
                    
                    listArray[index].map((ele, i) => {
                        return (
                            <li key={i} className={`${i + 1}-ele`}>
                                <img src={ele.i} alt="" />
                                <h1>{ele.t}</h1>
                                <h2>{ele.n} {index == 0 ? "property" : (index == 1 ? "Hotels": null)}</h2>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
        </>
    )
}