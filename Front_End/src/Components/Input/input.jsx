import React, { forwardRef, useEffect, useState} from "react";


const Input = forwardRef((props, ref) => {
    const [inputVal,setInputVal] = useState(null)

    function changeInVal (eventValue) {
        setInputVal(eventValue)
    }

    

    return (
        <>
            <input ref={ref} onChange={(e) => {changeInVal(e.currentTarget.value)}} value={inputVal} placeholder={props.placeholder} type={props.type} id={props.id || ""} name={props.name || ""}  />
        </>
    )
})

export default Input